// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

/// @dev Allows anyone to claim a token if they exist in a merkle root.
interface I_MerkleDistributor {

    /// @dev Returns the address of the token distributed by this contract.
    function token() external view returns (address);

    /// @dev Returns the merkle root of the merkle tree containing account balances available to claim.
    function merkleRoot() external view returns (bytes32);

    /// @dev Returns true if the index has been marked claimed.
    function isClaimed(uint256 index) external view returns (bool);

    /// @dev Claim the given amount of the token to the given address. Reverts if the inputs are invalid.
    function claim(uint256 index, address account, uint256 amount, bytes32[] calldata merkleProof) external;

    /// @dev This event is triggered whenever a call to #claim succeeds.
    event Claimed(uint256 index, address account, uint256 amount);
}