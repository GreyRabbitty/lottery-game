import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Manager from "./components/Manager";
import Players from "./components/Players";
import Register from "./components/Register";
import WinnerPicker from "./components/WinnerPicker";
import Lottery from "./contracts/Lottery.json";
import getWeb3Socket from "./utils/getWeb3Socket";
import getWeb3 from "./utils/getWeb3";

export default function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const web3 = await getWeb3();
        const web3Socket = getWeb3Socket();

        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Lottery.networks[networkId];

        const instance = new web3.eth.Contract(
          Lottery.abi,
          deployedNetwork && deployedNetwork.address
        );
        const socket = new web3Socket.eth.Contract(
          Lottery.abi,
          deployedNetwork && deployedNetwork.address
        );

        socket.events.PlayerEntered({}, (error, event) => {
          if (!error) {
            const playersData = event.returnValues.players.map((player) => ({
              playerAddress: player.playerAddress,
              number: player.number,
            }));

            setPlayers(playersData);
          }
        });

        socket.events.NoWinnerFound({}, (error, event) => {
          if (!error) {
            const luckyNumber = event.returnValues.luckyNumber;

            Swal.fire({
              title: "No winner found",
              text: `The lucky number is ${luckyNumber}`,
              icon: "question",
            });

            setPlayers([]);
          }
        });

        socket.events.WinnerPicked({}, (error, event) => {
          if (!error) {
            const luckyNumber = event.returnValues.luckyNumber;
            const winnerAddress = event.returnValues.winner.playerAddress;

            Swal.fire({
              title: "Winner picked",
              text: `The lucky number is ${luckyNumber}. Winner is ${winnerAddress}`,
              icon: "success",
            });

            setPlayers([]);
          }
        });

        setWeb3(web3);
        setContract(instance);
        setAccounts(accounts);
      } catch (error) {
        Swal.fire({
          title: "Failed to load web3, accounts, or contract",
          text: "Did you migrate the contract or install MetaMask? Check console for details.",
          icon: "error",
        });
        console.error(error);
      }
    })();
  }, [setPlayers]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const managerData = await contract.methods.manager().call();
        const playersData = await contract.methods.getPlayers().call();
        setManager(managerData);
        setPlayers(playersData);
      } catch {
        Swal.fire({
          title: "Connection error",
          text: "Please check MetaMask network, reset account, and reload page for contract/account error",
          icon: "error",
        });
      }
    };
    if (web3 !== null && accounts !== null && contract !== null) {
      fetch();
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
    });
  };

  const handlePickWinner = async () => {
    const accounts = await web3.eth.getAccounts();

    await contract.methods.pickWinner().send({
      from: accounts[0],
    });
    try {
      const result = await contract.methods.getWinnerData().call();
      const winnerAddress = result[0];
      const luckyNumber = result[1];

      await Swal.fire({
        title: "Winner found",
        text: `Winner: ${winnerAddress}. Lucky number: ${luckyNumber}`,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Winner not found",
        text: "No winner now",
        icon: "error",
      });
    }
  };
  // #endregion

  return (
    <div className="d-flex justify-content-center">
      {!web3 ? (
        <div className="p-1">Loading Web3, accounts, and contract...</div>
      ) : (
        <div>
          <h2 className="shadow-sm mt-2 mb-4 p-4 text-bg-primary text-center rounded">
            Lottery game 🍀🍀
          </h2>
          <div className="d-flex">
            <div className="me-4" style={{ maxWidth: "400px" }}>
              <Manager manager={manager} />

              {!players
                ?.map((player) => player.playerAddress)
                ?.includes(accounts[0]) && (
                <Register handleEnter={handleEnter} />
              )}

              {accounts[0] === "0xf1B45d65C6a646c9684c578CC2c2C7d751319848" && (
                <WinnerPicker
                  players={players}
                  handlePickWinner={handlePickWinner}
                />
              )}
            </div>

            <Players accounts={accounts} players={players} />
          </div>
        </div>
      )}
    </div>
  );
}
