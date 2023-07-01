const assert = require("assert");
const Lottery = artifacts.require("Lottery");

contract("Contract name : Lottery", (accounts) => {
  let instance;
  before(async function () {
    instance = await Lottery.new();
  });

  it("constructor", async () => {
    // console.log(instance.address);
    assert.ok(instance.address);
  });

  it("allow one account to enter", async () => {
    let one_eth = web3.utils.toWei("0.1", "ether");
    await instance.enter({
      from: accounts[0],
      value: one_eth,
    });

    const players = await instance.getPlayers();
    // console.log(players);

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });

  it("sends money to winner and reset the lottery instance", async () => {
    let two_eth = web3.utils.toWei("2", "ether");

    await instance.enter({
      from: accounts[0],
      value: two_eth,
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);

    await instance.pickWinner({
      from: accounts[0],
    });

    const finalBalance = await web3.eth.getBalance(accounts[0]);

    const diff = finalBalance - initialBalance;
    assert(diff > web3.utils.toWei("1.8", "ether"));
  });

  it("allow multiple account to enter", async () => {
    let one_eth = web3.utils.toWei("0.1", "ether");
    await instance.enter({
      from: accounts[0],
      value: one_eth,
    });

    await instance.enter({
      from: accounts[1],
      value: one_eth,
    });

    await instance.enter({
      from: accounts[2],
      value: one_eth,
    });

    const players = await instance.getPlayers();
    // console.log(players);
    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
  });

  it("requires a minimum amount of ether to enter", async () => {
    try {
      await instance.enter({
        from: accounts[0],
        value: 0,
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("only manger can call pickWinner", async () => {
    try {
      await instance.pickWinner({
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
});
