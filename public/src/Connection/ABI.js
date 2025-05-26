const ABI=[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "currentadst",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "origin",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "division",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "temp1",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "s",
				"type": "string"
			}
		],
		"name": "adstaccept",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "origin",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "currentadst",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "division",
				"type": "string"
			}
		],
		"name": "adstdecline",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "adsts",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "div",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "adst",
				"type": "string"
			}
		],
		"name": "adstsadd",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "origin",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "div",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "p",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "q",
				"type": "uint256[]"
			},
			{
				"internalType": "string",
				"name": "endtime",
				"type": "string"
			}
		],
		"name": "adstsend",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "division",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "check",
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
				"internalType": "string",
				"name": "origin",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "div",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "p",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "q",
				"type": "uint256[]"
			},
			{
				"internalType": "string",
				"name": "endtime",
				"type": "string"
			}
		],
		"name": "ddstsendtodgst",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "origin",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "p",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "q",
				"type": "uint256[]"
			},
			{
				"internalType": "string",
				"name": "endtime",
				"type": "string"
			}
		],
		"name": "ddstsent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "from",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "div",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "origin",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "p",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "q",
				"type": "uint256[]"
			},
			{
				"internalType": "string",
				"name": "endtime",
				"type": "string"
			}
		],
		"name": "ddstsenttoadsts",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "origin",
				"type": "string"
			}
		],
		"name": "dgstaccept",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "from",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "origin",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "p",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "q",
				"type": "uint256[]"
			},
			{
				"internalType": "string",
				"name": "endtime",
				"type": "string"
			}
		],
		"name": "dgstsentodivisions",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "divisions",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "div",
				"type": "string"
			}
		],
		"name": "divisionsadd",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "adst",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "getalladstsrole",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "hash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "origin",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "from",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "products",
						"type": "string[]"
					},
					{
						"internalType": "uint256[]",
						"name": "quantities",
						"type": "uint256[]"
					},
					{
						"internalType": "string",
						"name": "endtime",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct MyContract.ADST",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "role",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "c",
				"type": "uint256"
			}
		],
		"name": "getallhashes",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "adst",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "getallreceivedrole",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "hash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "origin",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "from",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "products",
						"type": "string[]"
					},
					{
						"internalType": "uint256[]",
						"name": "quantities",
						"type": "uint256[]"
					},
					{
						"internalType": "string",
						"name": "endtime",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct MyContract.ADST",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "origin",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "gettrackorder",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "requestreceived",
		"outputs": [
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "origin",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "from",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "endtime",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "requestsent",
		"outputs": [
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "origin",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "from",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "endtime",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "trackorder",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
export default ABI;