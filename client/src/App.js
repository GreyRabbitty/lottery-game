import React, { useState, useEffect } from "react";
import Lottery from "./contracts/Lottery.json";
import getWeb3 from "./getWeb3";

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
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
        alert(
          `Failed to load web3, accounts, or contract. Did you migrate the contract or install MetaMask? Check console for details.`
        );
        console.error(error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const runExample = async () => {
      try {
        // await contract.methods.set(387).send({ from: accounts[0] });
        const r1 = await contract.methods.manager().call();
        const r2 = await contract.methods.getPlayers().call();
        const r3 = await web3.eth.getBalance(contract.options.address);
        setManager(r1);
        setPlayers(r2);
        setBalance(r3);
      } catch {
        alert(
          "No contract deployed or account error; please check that MetaMask is on the correct network, reset the account and reload page"
        );
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on  transaction success...");
    await contract.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });
    setMessage("You have been entered!");
  };

  const onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on  transaction success...");
    await contract.methods.pickWinner().send({
      from: accounts[0],
    });
    setMessage("You result has been declared");
  };

  if (typeof web3 === "undefined") {
    return (
      <div className="App">
        Loading Web3, accounts, and contract... Reload page
      </div>
    );
  } else {
    return (
      <div>
        {/* <h1> stored value : {storageValue ? storageValue : "not set yet"}</h1> */}
        <h2>Lottery Contract</h2>
        <p className="text-3xl font-bold underline">
          This contract is managed by {manager}
        </p>
        <p>
          There are currently {players.length} people entered competing to win{" "}
          {web3.utils.fromWei(balance, "ether")}
        </p>
        <hr />
        <form onSubmit={onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />

        <h4>Ready to pick a winner?</h4>
        <button onClick={onClick}>Pick a winner</button>

        <hr />
        <h2>{message}</h2>
      </div>
    );
  }
}

export default App;
