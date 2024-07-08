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


    function getOwnerProperties(address owner) public view returns (Owner.Property[] memory) {
        Owner ownerContract = Owner(ownerToContract[owner]);

        Owner.Property[] memory propertiesArr = new Owner.Property[](ownerContract.getPropertiesLength());

        for (uint i = 0; i < ownerContract.getPropertiesLength(); i++) {
            propertiesArr[i] = ownerContract.getPropertyAtIndex(i);
        }

        return propertiesArr;
    }
}
