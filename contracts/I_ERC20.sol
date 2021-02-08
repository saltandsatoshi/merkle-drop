pragma solidity >= 0.6.0 <0.8.0;

/// @dev Interface of the ERC20 standard with only the funcions we need
interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
}