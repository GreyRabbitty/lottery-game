import { useEffect, useState } from "react";
import Lottery from "./contracts/Lottery.json";
import getWeb3 from "./getWeb3";
import Players from "./components/Players";

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

  const handleEnter = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on transaction success...");
    await contract.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });
    setMessage("You have been entered!");

    window.location.reload();
  };

  const handlePickWinner = async () => {
    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on  transaction success...");
    await contract.methods.pickWinner().send({
      from: accounts[0],
    });
    setMessage("You result has been declared");
  };

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
                This contract is managed by
                <br />
                <span className="fst-italic fw-semibold">{manager}</span>
              </p>
              <hr />
              <form onSubmit={handleEnter}>
                <h4>Want to try your luck?</h4>
                <div>
                  <div>
                    <label>Amount of ether to enter</label>
                    <input
                      className="form-control"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Enter
                  </button>
                </div>
              </form>

              {accounts[0] === "0x603b987db398830576B661aeDfB9E8EDdd119C6b" && (
                <div>
                  <h4>Ready to pick a winner?</h4>
                  <button onClick={handlePickWinner}>Pick a winner</button>
                </div>
              )}
              <h2>{message}</h2>
            </div>
            <Players players={players} balance={balance} web3={web3} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
