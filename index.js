document.addEventListener("DOMContentLoaded", () => {
    const contractAddress = "0x9e043404E3ffD146137FA408d716D2C65283A143";
    const contractABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "success",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "success",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "success",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    let selectedAccount;

    function setupEventListeners() {
        document.getElementById('transferBtn').addEventListener('click', transfer);
        document.getElementById('approveBtn').addEventListener('click', approve);
        document.getElementById('checkBalanceBtn').addEventListener('click', checkTokenBalance);
        document.getElementById('delegatedTransferBtn').addEventListener('click', delegatedTransfer);
        document.getElementById('accountSelect').addEventListener('change', selectAccount);
    }

    web3.eth.getAccounts().then((accounts) => {
        const accountSelect = document.getElementById("accountSelect");
        accounts.forEach((account, index) => {
            let option = new Option(account, account);
            accountSelect.options.add(option);
            if (index === 0) {
                selectedAccount = account;
                updateBalance(selectedAccount);
            }
        });
        setupEventListeners();
    });

    function selectAccount() {
        selectedAccount = document.getElementById('accountSelect').value;
        updateBalance(selectedAccount);
    }

    function updateBalance(account) {
        web3.eth.getBalance(account).then((balance) => {
            document.getElementById("ethBalance").innerText =
                web3.utils.fromWei(balance, "ether") + " ETH";
        }).catch((error) => {
            console.error("Error fetching ETH balance: ", error);
        });

        const contract = new web3.eth.Contract(contractABI, contractAddress);
        contract.methods.balanceOf(account).call().then((tokenBalance) => {
            document.getElementById("tokenBalance").innerText = web3.utils.fromWei(tokenBalance, "ether") + " GoldDogB";
        }).catch((error) => {
            console.error("Error fetching token balance: ", error);
        });
    }

    async function transfer() {
        const recipientAddress = document.getElementById("recipientAddress").value;
        const transferAmount = document.getElementById("transferAmount").value;
        if (!recipientAddress || !transferAmount) {
            alert("Please enter a valid recipient address and amount.");
            return;
        }
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        try {
            await contract.methods.transfer(recipientAddress, web3.utils.toWei(transferAmount, "ether")).send({ from: selectedAccount });
            alert("Transfer successful!");
            updateBalance(selectedAccount);
        } catch (error) {
            console.error("Transfer failed: ", error);
            alert("Transfer failed: " + error.message);
        }
    }

    async function approve() {
        const spenderAddress = document.getElementById("spenderAddress").value;
        const approvalAmount = document.getElementById("approvalAmount").value;
        if (!spenderAddress || !approvalAmount) {
            alert("Please enter a valid spender address and amount.");
            return;
        }
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        try {
            await contract.methods.approve(spenderAddress, web3.utils.toWei(approvalAmount, "ether")).send({ from: selectedAccount });
            alert("Approval successful!");
            // Optionally update allowance display after approval
            const allowed = await contract.methods.allowance(selectedAccount, spenderAddress).call()
            console.log(`Allowance: ${allowed}`);
        } catch (error) {
            console.error("Approval failed: ", error);
            alert("Approval failed: " + error.message);
        }
    }

    document.getElementById('queryAllowanceBtn').addEventListener('click', queryAllowance);

    function queryAllowance() {
        const ownerAddress = document.getElementById("ownerAddress").value;
        const spenderAddress = document.getElementById("spenderQueryAddress").value;
        if (!web3.utils.isAddress(ownerAddress) || !web3.utils.isAddress(spenderAddress)) {
            alert("请输入有效的以太坊地址。");
            return;
        }
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        contract.methods.allowance(ownerAddress, spenderAddress).call().then((allowance) => {
            document.getElementById("allowanceResult").innerText = web3.utils.fromWei(allowance, 'ether') + " GoldDogB";
        }).catch((error) => {
            console.error("Error fetching allowance: ", error);
            alert("查询授权额度失败: " + error.message);
        });
    }

    function checkTokenBalance() {
        const checkAddress = document.getElementById("checkAddress").value;
        if (!checkAddress || !web3.utils.isAddress(checkAddress)) {
            alert("Please enter a valid Ethereum address.");
            return;
        }
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        contract.methods.balanceOf(checkAddress).call().then((tokenBalance) => {
            document.getElementById("checkResult").innerText = web3.utils.fromWei(tokenBalance, 'ether') + " GoldDogB";
        }).catch((error) => {
            console.error("Error fetching token balance: ", error);
        });
    }

    async function delegatedTransfer() {
        const fromAddress = document.getElementById("fromAddress").value;
        const toAddress = document.getElementById("toAddress").value;
        const delegatedTransferAmount = document.getElementById("delegatedTransferAmount").value;
        if (!fromAddress || !toAddress || !delegatedTransferAmount) {
            alert("Please enter valid addresses and amount for delegated transfer.");
            return;
        }
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        try {
            await contract.methods.transferFrom(fromAddress, toAddress, web3.utils.toWei(delegatedTransferAmount, "ether")).send({ from: selectedAccount });
            alert("Delegated transfer successful!");
            updateBalance(fromAddress);  // Update token balance for delegator
            updateBalance(toAddress);    // Update token balance for receiver
        } catch (error) {
            console.error("Delegated transfer failed: ", error);
            alert("Delegated transfer failed: " + error.message);
        }
    }
});
