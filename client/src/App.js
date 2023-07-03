import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Players from "./components/Players";
import Register from "./components/Register";
import WinnerPicker from "./components/WinnerPicker";
import Lottery from "./contracts/Lottery.json";
import getWeb3 from "./getWeb3";

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Lottery.networks[networkId];
        const instance = new web3.eth.Contract(
          Lottery.abi,
          deployedNetwork && deployedNetwork.address
        );

        setWeb3(web3);
        setContract(instance);
        setAccounts(accounts);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to load web3, accounts, or contract",
          text: "Did you migrate the contract or install MetaMask? Check console for details.",
        });
        console.error(error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const runExample = async () => {
      try {
        const r1 = await contract.methods.manager().call();
        const r2 = await contract.methods.getPlayers().call();
        const r3 = await web3.eth.getBalance(contract.options.address);
        setManager(r1);
        setPlayers(r2);
        setBalance(r3);
      } catch {
        Swal.fire({
          icon: "error",
          title: "Connection error",
          text: "Please check MetaMask network, reset account, and reload page for contract/account error",
          confirmButtonText: "Ok",
        });
      }
    };
    if (
      typeof web3 != "undefined" &&
      typeof accounts != "undefined" &&
      typeof contract != "undefined"
    ) {
      runExample();
    }
  }, [web3, accounts, contract]);

  // #region Events
  const handleEnter = async (number) => {
    const accounts = await web3.eth.getAccounts();

    await contract.methods.enter(number).send({
      from: accounts[0],
      value: web3.utils.toWei("1.75", "ether"),
    });

    await Swal.fire({
      title: "Success!",
      text: "You have joined the game",
      icon: "success",
      confirmButtonText: "Ok",
    });
    window.location.reload();
  };

  const handlePickWinner = async () => {
    const accounts = await web3.eth.getAccounts();

    await contract.methods.pickWinner().send({
      from: accounts[0],
    });
    try {
      const result = await contract.methods.getWinnerData().call();
      const luckyNumber = result[0];
      const winnerAddress = result[1];

      await Swal.fire({
        icon: "success",
        title: "Winner found",
        text: `Winner: ${winnerAddress}. Lucky number: ${luckyNumber}`,
        confirmButtonText: "Ok",
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Winner not found",
        text: "No winner now",
        confirmButtonText: "Ok",
      });
    }
  };
  // #endregion

  return (
    <div className="d-flex justify-content-center">
      {typeof web3 === "undefined" ? (
        <div className="p-1">Loading Web3, accounts, and contract...</div>
      ) : (
        <div>
          <h2 className="text-center p-2">Lottery Contract</h2>
          <div className="d-flex">
            <div className="me-4">
              <p>
                The current game is managed by
                <br />
                <span className="fst-italic fw-semibold">{manager}</span>
              </p>

              {!players
                ?.map((player) => player.playerAddress)
                ?.includes(accounts[0]) && (
                <Register handleEnter={handleEnter} />
              )}

              {accounts[0] === "0x603b987db398830576B661aeDfB9E8EDdd119C6b" && (
                <WinnerPicker
                  players={players}
                  handlePickWinner={handlePickWinner}
                />
              )}
            </div>

            <Players
              accounts={accounts}
              players={players}
              balance={balance}
              web3={web3}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
