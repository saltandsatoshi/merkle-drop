export const SALTY_ADDRESS = '0xf157b7ba35089c9b0f02c24bbe1e03855dbe5c1f';
export const SALTY_ABI = [{
	"inputs": [],
	"stateMutability": "nonpayable",
	"type": "constructor"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "address",
		"name": "previousAdmin",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "address",
		"name": "newAdmin",
		"type": "address"
	}],
	"name": "AdminChanged",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "owner",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "spender",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}],
	"name": "Approval",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [],
	"name": "ExitedToCommunity",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "Paused",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "from",
		"type": "address"
	}, {
		"indexed": true,
		"internalType": "address",
		"name": "to",
		"type": "address"
	}, {
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}],
	"name": "Transfer",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "Unpaused",
	"type": "event"
}, {
	"inputs": [],
	"name": "admin",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "owner",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "spender",
		"type": "address"
	}],
	"name": "allowance",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "spender",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
	}],
	"name": "approve",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "balanceOf",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "decimals",
	"outputs": [{
		"internalType": "uint8",
		"name": "",
		"type": "uint8"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "spender",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "subtractedValue",
		"type": "uint256"
	}],
	"name": "decreaseAllowance",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [],
	"name": "exitToCommunity",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "spender",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "addedValue",
		"type": "uint256"
	}],
	"name": "increaseAllowance",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address[]",
		"name": "_payees",
		"type": "address[]"
	}, {
		"internalType": "uint256[]",
		"name": "_amounts",
		"type": "uint256[]"
	}],
	"name": "multiSend",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [],
	"name": "name",
	"outputs": [{
		"internalType": "string",
		"name": "",
		"type": "string"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "pause",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [],
	"name": "paused",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "symbol",
	"outputs": [{
		"internalType": "string",
		"name": "",
		"type": "string"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "totalSupply",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "recipient",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
	}],
	"name": "transfer",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{
		"internalType": "address",
		"name": "sender",
		"type": "address"
	}, {
		"internalType": "address",
		"name": "recipient",
		"type": "address"
	}, {
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
	}],
	"name": "transferFrom",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [],
	"name": "unpause",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
}]

export const MERKLE_ADDRESS = '0x7dafeb1cee5a14ab5666729044acb5f46506dca1';
export const MERKLE_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes32[]",
				"name": "merkleProof",
				"type": "bytes32[]"
			}
		],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "_merkleRoot",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Claimed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "isClaimed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "merkleRoot",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];