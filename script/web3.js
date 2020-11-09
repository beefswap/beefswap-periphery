var Web3 = require("web3");
//连接到Ganache
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/30bf4bface004c04b0ee6fa05753adca'));

var fs = require("fs");
var data = fs.readFileSync("./artifacts/contracts/BeefswapV2Router02.sol/BeefswapV2Router02.json", "utf-8");

//console.log(JSON.parse(data).abi);
//创建合约对象
var contract = new web3.eth.Contract(JSON.parse(data).abi,'0x93FC50f8ECB0A43d1DAB91fe912Df7B4a0199e42');

//调用合约的方法
contract.methods.INIT_CODE_PAIR_HASH().call().then(console.log);