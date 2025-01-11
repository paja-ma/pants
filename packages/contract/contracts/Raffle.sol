// SPDX-License-Identifier: Unlicensed
pragma solidity >=0.7.0 <0.9.0;

contract Raffle {

    struct Participant {
        address id;
        string nickname;
    }

    Participant[] private participants;

    address private owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function getParticipantCount() public view returns (uint) {
        return participants.length;
    }

    function getParticipants() public view onlyOwner returns (Participant[] memory) {
        return participants;
    }

    function register(string memory _nickname) public returns (string memory) {
        // check if the participant is already registered
        if (participants.length > 0) {
            for (uint i = 0; i < participants.length; i++) {
                if (participants[i].id == msg.sender) {
                    return string(abi.encodePacked("Participant already registered!"));
                }
            }
        }
        participants.push(Participant(msg.sender, _nickname));
        return string(abi.encodePacked("Participant registered successfully!"));   
    }


    function pickWinner() public view onlyOwner returns (string memory) {
        require(participants.length > 0, "No participants registered!");

        uint winnerIndex = uint(keccak256(abi.encodePacked(block.timestamp))) % participants.length;

        Participant memory winner;
        for (uint i = 0; i < participants.length; i++) {
            if (i == winnerIndex) {
                winner = participants[i];
                break;
            }
        }
        return string(abi.encodePacked("Winner is: ", winner.nickname));
    }

    function initParticipants() public onlyOwner {
        delete participants;
    }
}