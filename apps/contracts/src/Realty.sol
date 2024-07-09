// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Owner.sol";

contract Realty {
    mapping(address => address) public ownerToContract;

    struct Property {
        string uri;
        string description;
        uint256 requiredFunds;
        uint256 totalFunds;
        uint256 tokenPrice;
        address tokenAddress;
        address[] curators;
        address[] investors;
        uint256[] investments;
        bool isMilestonesCompleted;
    }

    // event OwnerContractCreated(address indexed owner, address ownerContract);
    event PropertyListed(address indexed owner, address propertyAddress, uint256 propertyId);
    event InvestmentMade(address indexed investor, address ownerContract, uint256 propertyId, uint256 amount, uint256 tokensIssued);
    event CuratorHired(address indexed ownerContractAddress, uint256 propertyId, uint256 amount, address curator);
    event MilestoneComplete(address indexed ownerContractAddress, uint256 propertyId);

    function createOwnerContract() public returns (address) {
        if(ownerToContract[msg.sender] == address(0)) {
            Owner newOwnerContract = new Owner(msg.sender);
            ownerToContract[msg.sender] = address(newOwnerContract);
            // emit OwnerContractCreated(msg.sender, address(newOwnerContract));
            return address(newOwnerContract);
        } else {
            return ownerToContract[msg.sender];
        }
    }

    function listProperty(string memory uri, string memory description, uint256 requiredFunds, uint256 tokenPrice) public {
        address ownerAddress = createOwnerContract();
        Owner ownerContract = Owner(ownerAddress);
        require(ownerContract.owner() == msg.sender, "Not the owner of this contract");
        uint256 propertyId = ownerContract.listProperty(uri, description, requiredFunds, tokenPrice);
        emit PropertyListed(msg.sender, ownerAddress, propertyId);
    }


    function invest(address ownerContractAddress, uint256 propertyId, uint256 amount) public {
        require(ownerContractAddress != address(0), "ownerContractAddress should not be 0");
        require(amount > 0, "Investment amount should be greater than 0");
        Owner ownerContract = Owner(ownerContractAddress);
        uint256 tokensIssued = ownerContract.investInProperty(propertyId, amount, msg.sender);
        emit InvestmentMade(msg.sender, ownerContractAddress, propertyId, amount, tokensIssued);
    }

    function hireCurator(address ownerContractAddress, uint256 propertyId, address curator, uint256 amount) public {
        require(ownerContractAddress != address(0), "ownerContractAddress should not be 0");
        require(amount > 0, "Amount should be greater than 0");
        Owner ownerContract = Owner(ownerContractAddress);
        ownerContract.hireCurator(propertyId, curator, amount);
        emit CuratorHired(ownerContractAddress, propertyId, amount, curator);
    }

    function completeMilestone(address ownerContractAddress, uint256 propertyId) public {
        require(ownerContractAddress != address(0), "ownerContractAddress should not be 0");
        Owner ownerContract = Owner(ownerContractAddress);
        ownerContract.completeMilestone(propertyId);
        emit MilestoneComplete(ownerContractAddress, propertyId);
    }

    function getOwnerProperties(address owner) public view returns (Owner.Property[] memory) {
        Owner ownerContract = Owner(ownerToContract[owner]);

        Owner.Property[] memory propertiesArr = new Owner.Property[](ownerContract.getPropertiesLength());

        for (uint i = 0; i < ownerContract.getPropertiesLength(); i++) {
            propertiesArr[i] = ownerContract.getPropertyAtIndex(i);
        }

        return propertiesArr;
    }
}
