1: 安装VSCODE
2: VSCODE安装插件 solidity
3: 安装Nodejs  v16.20.2
4: 安装truffle   npm install -g truffle  
5: 新建一个空的文件夹 然后初始化 truffle   truffle init
6: 安装ganache v7.9.1
7: 配置 truffle-config.js 文件 
      host: "127.0.0.1",     // Ganache的本地地址
      port: 7545,            // Ganache的端口号
      network_id: "5777",    // Ganache的网络ID
      from: "0x1AA769c35E2A5f51c0B5993B0808954B82A53C17", // 这里指定部署合约的账户地址
      gas: 6721975,  // 增加 Gas 限制
      gasPrice: 20000000000
8:编写智能合约
9:进入truffle开发环境  truffle console --network development
10:编译合约 truffle compile
11:修改solc版本为 "0.8.19"
12:创建并编写部署文件 2_deploy_contracts.js
13:部署智能合约 truffle migrate
14:编写合约测试脚本 test/test.js
15:安装truffle-assertions框架  npm install truffle-assertions
16:运行测试合约 truffle test
17:编写HTML智能合约
18:安装live server插件
19:使用live server测试HTML智能合约
20:
Get Balance：输入0x123...abc（一个有效的以太坊地址）
Transfer Tokens：To address填0x456...def，Amount填1000
Approve：Spender address填0x789...ghi，Amount填500
