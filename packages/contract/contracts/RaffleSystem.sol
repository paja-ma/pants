// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RaffleSystem {
    struct Raffle {
        address owner;
        string title;
        string description;
        string imageURL;
        uint numberOfWinners;
        bool isClosed;
        address[] participants;
        address winner;
    }

    struct User {
        address id;
        address[] participatedRaffles;
    }

    mapping(address => Raffle) public raffles; // Raffle ID => Raffle
    mapping(address => User) public users; // User Address => User

    // Create a new raffle
    function createRaffle(
        string memory title,
        string memory description,
        uint numberOfWinners,
        string memory imageURL
    ) public returns (address) {
        address raffleId = address(
            uint160(
                uint(keccak256(abi.encodePacked(msg.sender, block.timestamp)))
            )
        );
        raffles[raffleId] = Raffle({
            owner: msg.sender,
            title: title,
            description: description,
            imageURL: imageURL,
            numberOfWinners: numberOfWinners,
            isClosed: false,
            participants: new address[](0),
            winner: address(0)
        });
        return (raffleId);
    }

    // Join a raffle
    function joinRaffle(address raffleId) public {
        require(
            raffles[raffleId].owner != address(0),
            'Raffle does not exist.'
        );
        require(!raffles[raffleId].isClosed, 'Raffle is closed.');
        require(
            msg.sender != raffles[raffleId].owner,
            'Owner cannot join their own raffle.'
        );

        // Check if user is already a participant
        for (uint i = 0; i < raffles[raffleId].participants.length; i++) {
            require(
                raffles[raffleId].participants[i] != msg.sender,
                'Already joined this raffle.'
            );
        }

        // Add participant to the raffle
        raffles[raffleId].participants.push(msg.sender);

        // Add raffle to user's participated list
        if (users[msg.sender].id == address(0)) {
            users[msg.sender];
        }
        users[msg.sender].participatedRaffles.push(raffleId);
    }

    // Close the raffle (only owner can call)
    function closeRaffle(address raffleId) public {
        require(
            raffles[raffleId].owner == msg.sender,
            'Only owner can close the raffle.'
        );
        require(!raffles[raffleId].isClosed, 'Raffle is already closed.');
        raffles[raffleId].isClosed = true;
    }

    // Draw a winner (only owner can call)
    function drawWinner(address raffleId) public {
        require(
            raffles[raffleId].owner == msg.sender,
            'Only owner can draw a winner.'
        );
        require(
            raffles[raffleId].isClosed,
            'Raffle must be closed to draw a winner.'
        );
        require(
            raffles[raffleId].participants.length > 0,
            'No participants in this raffle.'
        );

        // Select a random winner
        uint winnerIndex = uint(
            keccak256(abi.encodePacked(block.timestamp, block.difficulty))
        ) % raffles[raffleId].participants.length;
        raffles[raffleId].winner = raffles[raffleId].participants[winnerIndex];
    }

    function drawRandomWinner(address raffleId) public {
        require(
            raffles[raffleId].owner == msg.sender,
            'Only owner can draw a winner.'
        );
        require(
            raffles[raffleId].isClosed,
            'Raffle must be closed to draw a winner.'
        );
        require(
            raffles[raffleId].participants.length > 0,
            'No participants in this raffle.'
        );

        // Select a random winner
        uint winnerIndex = uint(
            keccak256(abi.encodePacked(block.timestamp, block.difficulty))
        ) % raffles[raffleId].participants.length;
        raffles[raffleId].winner = raffles[raffleId].participants[winnerIndex];
    }

    // Get details of a raffle
    function getRaffleDetail(
        address raffleId
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint,
            bool,
            address[] memory,
            address
        )
    {
        Raffle storage raffle = raffles[raffleId];
        return (
            raffle.title,
            raffle.description,
            raffle.imageURL,
            raffle.numberOfWinners,
            raffle.isClosed,
            raffle.participants,
            raffle.winner
        );
    }

    // Get raffles a user has participated in
    function getUserParticipatedRaffles(
        address userId
    ) public view returns (address[] memory) {
        return users[userId].participatedRaffles;
    }
}