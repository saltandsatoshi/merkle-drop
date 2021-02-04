export const merkle = {
  //  contractAddress: "", // MAIN NET
  contractAddress: "0xd1666190bE4fC9842b12397047B9B8Ad3A5D48c4", // RINKEBY
  contractABI: [
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
      "inputs": [],
      "name": "CancelDrop",
      "type": "event"
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
      "anonymous": false,
      "inputs": [],
      "name": "NewDrop",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "cancelDrop",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cancelled",
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
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_merkleRoot",
          "type": "bytes32"
        }
      ],
      "name": "newDrop",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
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
  ],
  startTimestamp: 1611819800,
  merkleRoot: 0x17e213076642113ed6794491839a283f724b06c7e80484ce4711f4aed2707861,
  tokenTotal: 0xcdba34693a6f6c0000,
  claims: {
    "0x00000000005dbcB0d0513FcDa746382Fe8a53468": {
      "index": 0,
      "amount": "0x16c4abbebea0100000",
      "proof": [
        "0x84f4e49b07e10fab434bee9ed281e591fd48da625577720c3db2c7b684e0f73f",
        "0xaea7d59531b6fd634af044dd890e8a0072e60443981f8e0933b13d07c568e133",
        "0x8120c60fded05d9a20235a41d7f35ce0e51904ea9e4b752b77bc6b0b63dbf08e",
        "0x4b47ab6ae11e47a010b6a4b7357ccc0364c03714421f8f786969dd0584d26237"
      ]
    },
    "0x05fc93DeFFFe436822100E795F376228470FB514": {
      "index": 1,
      "amount": "0x0f3ba88b32bcc40000",
      "proof": [
        "0x61ccffa3335530d0c6f6a8f466d26246f73ca0915e61d6c0b46f580ff19639d9",
        "0xba3f0c30f21b2734b7e33a91e54faea973f2fb5f4b8453f6cd324563f55e215f",
        "0x8120c60fded05d9a20235a41d7f35ce0e51904ea9e4b752b77bc6b0b63dbf08e",
        "0x4b47ab6ae11e47a010b6a4b7357ccc0364c03714421f8f786969dd0584d26237"
      ]
    },
    "0x19FF17645bd4930745e632284422555466675e44": {
      "index": 2,
      "amount": "0x241a9b4f617a280000",
      "proof": [
        "0xbcde7acf686b29d0fdd17c8f5ba629f66c0e79f647dd453dcf06486b4b53b6a9",
        "0xfb007b3bfb96297ba2fa2af644dc4e58142277aae7fcc189fd8e2f7aaf796c9d",
        "0xd1853c497af77f9ad795fd08ff9055f66cd3e8b7d4bee53eabb6ee9f6aa93d50",
        "0x4b47ab6ae11e47a010b6a4b7357ccc0364c03714421f8f786969dd0584d26237"
      ]
    },
    "0x20eE60d761de96b1e7FA4EBDfeF5700e9844955A": {
      "index": 3,
      "amount": "0x241a9b4f617a280000",
      "proof": [
        "0x3591397ec3229fd5ee1d20bc5643f47854929f355dfec0cb5991610ec3a63386",
        "0x4961bcb939297bda0856f40d0e31881c97c79322d2d9c7f306f9014086ea0815",
        "0x2caef5ab30c2e8a3e30e56d88c7aa60e88e610c30a7ee040a3c3b1c5f82ad9c9",
        "0xe3426fb501d888270f06d836ce1dcf522df2c330525191641946d6d469d5acbf"
      ]
    },
    "0x57E7c6B647C004CFB7A38E08fDDef09Af5Ea55eD": {
      "index": 4,
      "amount": "0x01a055690d9db80000",
      "proof": [
        "0x2f97f90d6f106e519b86cc7737f24bb44ca8c63689ecf7198243428ae40a33de",
        "0x8eda6ee9d6d3d442de54b1fb8d374134e9cbf043246d5bc19fb6cd06ccdc08ec",
        "0xb0ed9d9d22fcf7bff39d9a8bdc886443cca35bf679e2f90bbfd2ce865b24ed8f",
        "0xe3426fb501d888270f06d836ce1dcf522df2c330525191641946d6d469d5acbf"
      ]
    },
    "0x6E9Ead46916950088E236A77bb7b6309170827CA": {
      "index": 5,
      "amount": "0x0929589c9981040000",
      "proof": [
        "0xb12ec67bbe9c3f3ad0d8b4033972b5d781fefa4ce7c43bb5be1a4f9fded960d2",
        "0xd1853c497af77f9ad795fd08ff9055f66cd3e8b7d4bee53eabb6ee9f6aa93d50",
        "0x4b47ab6ae11e47a010b6a4b7357ccc0364c03714421f8f786969dd0584d26237"
      ]
    },
    "0x6b6C7139B48156d7EC90eD4c55C56bDFCB1C19D2": {
      "index": 6,
      "amount": "0x02a802f8630a240000",
      "proof": [
        "0x68fe26fe9bf493714894a15dffacc5bb8e637eef0a763aaac0ec8b7934ae4b60",
        "0xba3f0c30f21b2734b7e33a91e54faea973f2fb5f4b8453f6cd324563f55e215f",
        "0x8120c60fded05d9a20235a41d7f35ce0e51904ea9e4b752b77bc6b0b63dbf08e",
        "0x4b47ab6ae11e47a010b6a4b7357ccc0364c03714421f8f786969dd0584d26237"
      ]
    },
    "0x705F24F33452D982313cff84f571de71C7D0ca68": {
      "index": 7,
      "amount": "0x08c8339dafed480000",
      "proof": [
        "0x44742b6bd1a4330b00192591ffe2a8d8ad342c6a0907b50b734be74fb6089071",
        "0x4a713c0a97f964f2c9e14e40f659da7364959bc313d5ec58ca7d15409521917c",
        "0x2caef5ab30c2e8a3e30e56d88c7aa60e88e610c30a7ee040a3c3b1c5f82ad9c9",
        "0xe3426fb501d888270f06d836ce1dcf522df2c330525191641946d6d469d5acbf"
      ]
    },
    "0x7C262baf13794f54e3514539c411f92716996C38": {
      "index": 8,
      "amount": "0x030927f74c9de00000",
      "proof": [
        "0x3b914c7654ccf28f8e5485c33a6070b91162410743ccfe01cdc77baaead2085e",
        "0x4961bcb939297bda0856f40d0e31881c97c79322d2d9c7f306f9014086ea0815",
        "0x2caef5ab30c2e8a3e30e56d88c7aa60e88e610c30a7ee040a3c3b1c5f82ad9c9",
        "0xe3426fb501d888270f06d836ce1dcf522df2c330525191641946d6d469d5acbf"
      ]
    },
    "0x7D13f07889F04a593a3E12f5d3f8Bf850d07465B": {
      "index": 9,
      "amount": "0x0b6255df5f50080000",
      "proof": [
        "0xb46bed3818d9e2f70ed771f89d2898f0e86044a877a85e893ebab3fdc82652de",
        "0xaea7d59531b6fd634af044dd890e8a0072e60443981f8e0933b13d07c568e133",
        "0x8120c60fded05d9a20235a41d7f35ce0e51904ea9e4b752b77bc6b0b63dbf08e",
        "0x4b47ab6ae11e47a010b6a4b7357ccc0364c03714421f8f786969dd0584d26237"
      ]
    },
    "0xC7AA922f0823DeE2eD721E61ebCCF2F9596017Fb": {
      "index": 10,
      "amount": "0x0735beeb55f6f40000",
      "proof": [
        "0x2a0f2257b71b717abe4ae8c7a87c017bd70ebbc0c89192dbd6c8f76fd05a4c95",
        "0x5e175dcb303f41c461157c550b2240c1fe748c306435f6102d2719bdc25b7bbc",
        "0xb0ed9d9d22fcf7bff39d9a8bdc886443cca35bf679e2f90bbfd2ce865b24ed8f",
        "0xe3426fb501d888270f06d836ce1dcf522df2c330525191641946d6d469d5acbf"
      ]
    },
    "0xE7fA80757FeAb870E0bF3b3dc8d4647f403A65ac": {
      "index": 11,
      "amount": "0x12f939c99edab80000",
      "proof": [
        "0x2d716d24b0350ef233087aebcea951ceee8c36b692c83568a975e25cf34f383a",
        "0x8eda6ee9d6d3d442de54b1fb8d374134e9cbf043246d5bc19fb6cd06ccdc08ec",
        "0xb0ed9d9d22fcf7bff39d9a8bdc886443cca35bf679e2f90bbfd2ce865b24ed8f",
        "0xe3426fb501d888270f06d836ce1dcf522df2c330525191641946d6d469d5acbf"
      ]
    },
    "0xFd63Bf84471Bc55DD9A83fdFA293CCBD27e1F4C8": {
      "index": 12,
      "amount": "0x16c4abbebea0100000",
      "proof": [
        "0x19440549909da6104d8c57bce78745d77670f6c159f14c7edd8cb12042326d30",
        "0x5e175dcb303f41c461157c550b2240c1fe748c306435f6102d2719bdc25b7bbc",
        "0xb0ed9d9d22fcf7bff39d9a8bdc886443cca35bf679e2f90bbfd2ce865b24ed8f",
        "0xe3426fb501d888270f06d836ce1dcf522df2c330525191641946d6d469d5acbf"
      ]
    },
    "0xb86739476a4820FcC39Ff1C413d9af0b96c1589F": {
      "index": 13,
      "amount": "0x0579a814e10a740000",
      "proof": [
        "0x3e749c48a3257576526297c47ff8793d8c6c7626dfd95f181804ca3c11947687",
        "0x4a713c0a97f964f2c9e14e40f659da7364959bc313d5ec58ca7d15409521917c",
        "0x2caef5ab30c2e8a3e30e56d88c7aa60e88e610c30a7ee040a3c3b1c5f82ad9c9",
        "0xe3426fb501d888270f06d836ce1dcf522df2c330525191641946d6d469d5acbf"
      ]
    },
    "0xf66705E0Ae4e5DfC02b2633356f5305662F00d3b": {
      "index": 14,
      "amount": "0x0471fa858b9e080000",
      "proof": [
        "0xd12bb44a1a7ce132a29b4c72793d0ea6adbd86a179cb8e48858c6f8ae1002505",
        "0xfb007b3bfb96297ba2fa2af644dc4e58142277aae7fcc189fd8e2f7aaf796c9d",
        "0xd1853c497af77f9ad795fd08ff9055f66cd3e8b7d4bee53eabb6ee9f6aa93d50",
        "0x4b47ab6ae11e47a010b6a4b7357ccc0364c03714421f8f786969dd0584d26237"
      ]
    }
  }
};
