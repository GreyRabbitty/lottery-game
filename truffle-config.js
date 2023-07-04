const path = require("path");
module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      network_id: "*",
      host: "127.0.0.1",
      port: 7545,
      websockets: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.10",
    },
  },
};
