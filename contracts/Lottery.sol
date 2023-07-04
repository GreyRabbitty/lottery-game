// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

contract Lottery {
    address public manager;
    string public name;
    struct Player {
        uint number;
        address payable playerAddress;
    }
    Player[] public players;
    uint public luckyNumber;
    address payable public winner;

    event PlayerEntered(Player[] players);
    event WinnerPicked(uint256 luckyNumber, address winner);
    event NoWinnerFound(uint256 luckyNumber);

    constructor() {
        manager = msg.sender;
    }

    function enter(uint number) public payable {
        require(number >= 0 && number <= 9, "Number should be between 0 and 9");
        require(msg.value > 0, "Please send some ether to enter the lottery");

        players.push(Player(number, payable(msg.sender)));

        emit PlayerEntered(players);
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp))) % 2;
    }

    function pickWinner() public payable restricted {
        luckyNumber = random();

        for (uint256 i = 0; i < players.length; i++) {
            if (players[i].number == luckyNumber) {
                winner = players[i].playerAddress;
                break;
            }
        }

        if (winner == address(0)) {
            delete players;

            emit NoWinnerFound(luckyNumber);
        } else {
            uint256 prize = address(this).balance;
            winner.transfer(prize);

            delete players;

            emit WinnerPicked(luckyNumber, winner);
        }
    }

    modifier restricted() {
        require(msg.sender == manager, "Only the manager can pick the winner");
        _;
    }

    function getPlayers() public view returns (Player[] memory) {
        return players;
    }

    function getWinnerData() public view returns (address payable, uint) {
        require(winner != address(0), "No winner found");
        return (winner, luckyNumber);
    }
}
