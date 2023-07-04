import Web3 from "web3";

export default async function getWeb3() {
  // Modern dapp browsers...
  if (window.ethereum) {
    try {
      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // Create a new Web3 instance
      const web3 = new Web3(window.ethereum);
      return web3;
    } catch (error) {
      throw new Error("Failed to connect to web3 provider");
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    const web3 = new Web3(window.web3.currentProvider);
    return web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);
    return web3;
  }
}
