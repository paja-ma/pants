// SPDX-License-Identifier: Unlicensed
pragma solidity >=0.7.0 <0.9.0;

contract Raffle {
    address private owner;

    string public title;
    string public description;
    string public imageURL;

    Participant[] public participants;

    uint public numberOfWinners;
    Participant public winner;

    bool public isClosed;
    
    struct Participant {
        address id;
        string nickname;
    }

    constructor(
        string memory initTitle,
        string memory initDescription,
        uint initNumberOfWinners,
        string memory initImageURL
    ) {
        title = initTitle;
        description = initDescription;
        numberOfWinners = initNumberOfWinners;
        imageURL = initImageURL;
        isClosed = false;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner.");
        _;
    }

    modifier exceptOwner() {
        require(msg.sender != owner, "Owner cannot participate in the raffle.");
        _;
    }

    function initParticipants() public onlyOwner {
        delete participants;
    }

    function getParticipantNumber() public view returns (uint) {
        return participants.length;
    }

    function getRaffleDetail() public view returns (string memory, string memory, uint, string memory, bool) {
        return (title, description, numberOfWinners, imageURL, isClosed);
    }

    function registerParticipant(string memory nickname) public exceptOwner returns (string memory) {
        require(!isClosed, "Raffle is closed.");
        
        if (participants.length > 0) {
            for (uint i = 0; i < participants.length; i++) {
                if (participants[i].id == msg.sender) {
                    return string(abi.encodePacked("Participant already registered."));
                }
            }
        }
        participants.push(Participant(msg.sender, nickname));
        return string(abi.encodePacked("Participant registered successfully."));   
    }


    function drawWinner() public onlyOwner returns (address, string memory) {
        require(participants.length > 0, "No participants registered.");
        require(isClosed, "Raffle is still open.");

        uint winnerIndex = uint(keccak256(abi.encodePacked(block.timestamp))) % participants.length;

        for (uint i = 0; i < participants.length; i++) {
            if (i == winnerIndex) {
                winner = participants[i];
                break;
            }
        }
        return (winner.id, winner.nickname);
    }

    function closeRaffle() public onlyOwner {
        isClosed = true;
    }
}