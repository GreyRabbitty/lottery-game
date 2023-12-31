import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Manager,
  MyAddress,
  Players,
  Register,
  WinnerPicker,
} from "./components";
import Lottery from "./contracts/Lottery.json";
import { getWeb3, getWeb3Socket } from "./utils";

export default function App() {
  // #region Data
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [prizeAmount, setPrizeAmount] = useState(1);

  // Initial necessary variables
  // Handle socket events
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
              title: "No winner",
              text: `The lucky number is ${luckyNumber}`,
              icon: "question",
            });

            setPlayers([]);
          }
        });

        socket.events.WinnerPicked({}, (error, event) => {
          if (!error) {
            const luckyNumber = event.returnValues.luckyNumber;
            const winnerAddress = event.returnValues.winner;

            if (accounts[0] === winnerAddress) {
              Swal.fire({
                title: "Congratulations",
                text: `The lucky number is ${luckyNumber}. Your are the winner!`,
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Apologies",
                text: `The lucky number is ${luckyNumber}. Winner is ${winnerAddress}. Better luck next time!`,
                icon: "warning",
              });
            }

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

  // Fetch the very first data
  useEffect(() => {
    const fetch = async () => {
      try {
        const managerData = await contract.methods.manager().call();
        const playersData = await contract.methods.getPlayers().call();
        const prizeAmountData = await contract.methods.prizeAmount().call();

        setManager(managerData);
        setPlayers(playersData);
        setPrizeAmount(prizeAmountData);
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
  // #endregion

  // #region Events
  const handleEnter = async (number) => {
    const accounts = await web3.eth.getAccounts();

    await contract.methods.enter(number).send({
      from: accounts[0],
      value: web3.utils.toWei(prizeAmount.toString(), "ether"),
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
  };
  // #endregion

  return (
    <div className="d-flex justify-content-center">
      {!web3 ? (
        <div className="p-1">Loading Web3, accounts, and contract...</div>
      ) : (
        <div>
          <h2
            className="shadow-sm mt-2 mb-4 p-4 text-center text-light rounded"
            style={{
              background: "linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)",
            }}
          >
            Lucky number 🍀
          </h2>
          <div className="d-flex">
            <div className="me-4" style={{ maxWidth: "400px" }}>
              <Manager manager={manager} />

              {!players
                ?.map((player) => player.playerAddress)
                ?.includes(accounts[0]) && (
                <Register handleEnter={handleEnter} />
              )}

              {accounts[0] === manager && (
                <WinnerPicker
                  players={players}
                  handlePickWinner={handlePickWinner}
                />
              )}
            </div>

            <div>
              <MyAddress accounts={accounts} />
              <Players
                accounts={accounts}
                players={players}
                prizeAmount={prizeAmount}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
