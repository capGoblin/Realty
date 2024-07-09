// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Owner {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function.");
        _;
    }
    
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

    Property[] public properties;

    event PropertyListed(uint256 indexed propertyId, string description, uint256 requiredFunds, uint256 tokenPrice, address tokenAddress);


    constructor(address _owner) {
        owner = _owner;
    }


    function listProperty(string memory uri, string memory description, uint256 requiredFunds, uint256 tokenPrice) public onlyOwner returns (uint256) {
        Property memory newProperty;
        newProperty.uri = uri;
        newProperty.description = description;
        newProperty.requiredFunds = requiredFunds;
        newProperty.tokenPrice = tokenPrice;

        string memory tokenName = string(abi.encodePacked("PropertyToken_", uint2str(properties.length - 1)));
        string memory tokenSymbol = string(abi.encodePacked("PT", uint2str(properties.length - 1)));
        PropertyToken newToken = new PropertyToken(tokenName, tokenSymbol, requiredFunds / tokenPrice);
        newProperty.tokenAddress = address(newToken);

        properties.push(newProperty);

        emit PropertyListed(properties.length - 1, description, requiredFunds, tokenPrice, address(newToken));

        return properties.length - 1;
    }

    function getPropertiesLength() public view returns (uint256) {
        return properties.length;
    }

    function getPropertyAtIndex(uint256 index) public view returns (Property memory) {
        return properties[index];
    }

    function hireCurator(uint256 propertyId, address curator, uint256 amount) public onlyOwner {
        require(properties[propertyId].totalFunds >= amount, "Insufficient funds");
        properties[propertyId].curators.push(curator);
        properties[propertyId].totalFunds -= amount;
        payable(curator).transfer(amount);
    }

    function completeMilestone(uint256 propertyId) public onlyOwner {
        require(properties[propertyId].isMilestonesCompleted == false, "Milestone already completed");
        properties[propertyId].isMilestonesCompleted = true;
    }

    function investInProperty(uint256 propertyId, uint256 amount, address investor) public returns (uint256) {
        require(propertyId < properties.length, "Invalid property ID");
        Property storage property = properties[propertyId];
        require(amount > 0, "Investment amount should be greater than 0");
        uint256 tokensToIssue = amount / property.tokenPrice;
        require(tokensToIssue > 0, "Investment amount is too low to issue tokens");

        property.totalFunds += amount;
        property.investors.push(investor);
        property.investments.push(amount);

        PropertyToken(property.tokenAddress).transfer(investor, tokensToIssue);
        return tokensToIssue;
    }

    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}

contract PropertyToken is ERC20 {
    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }
}