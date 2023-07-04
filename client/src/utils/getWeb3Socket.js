import Web3 from "web3";

export default function getWeb3Socket() {
  const web3socket = new Web3(
    new Web3.providers.WebsocketProvider("ws://localhost:7545")
  );

  return web3socket;
}
