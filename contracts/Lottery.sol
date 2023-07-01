// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

contract Lottery {
    address public manager;
    string public name;
    address payable[] public players;

    // msg is global valiable

    /*
        msg.sender -> sender address
        msg.value -> value that is send
        msg.gas   -> gas limit 
        msg.data  
    */

    constructor() {
        manager = msg.sender;
    }

    // payable do not accept any parameter i guess
    function enter() public payable {
        // used for validation
        require(msg.value > (.01 ether));

        players.push(payable(msg.sender));
    }

    function random() private view returns (uint256) {
        // shaw3 or keccak256 are same thing used to make hashed
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.difficulty, block.timestamp, players)
                )
            ); // uint(hash) : convert hexadecimal into int
    }

    function pickWinner() public payable restricted {
        // // only manager can pickup the winner
        // require(msg.sender == manager);

        uint256 index = random() % players.length;
        players[index].transfer(address(this).balance);
        // this refer to current instance .. this.balance is the sum of the values of all the player submitted

        // reset our lottery instance after winner declaired
        players = new address payable[](0);
    }

    // for do not repeat your self .. means same block of code
    modifier restricted() {
        // only manager can pickup the winner
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    // function returnEntries(){
    //     // cancel the lottery and return the price to respective players

    // }
}
