var Web3 = require("web3");
var BigNumber = require("bignumber.js");
const EthereumTx = require('ethereumjs-tx').Transaction

//智能合约地址
const registryAddress = "0x5D90E7649525AE6c24A97Af22C6Ce9d27c1729be"

//连接到Ganache
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/30bf4bface004c04b0ee6fa05753adca'));

var fs = require("fs");
var data = fs.readFileSync("./artifacts/contracts/BeefswapV2Router02.sol/BeefswapV2Router02.json", "utf-8");

//私钥转换为Buffer
const privateKey =  Buffer.from('8cbbd8190746b7df88b5fd311d7fb73fe37c0267328fb4b23005dfe8e1d74be6',"hex")
//私钥转换为账号
const account = web3.eth.accounts.privateKeyToAccount("0x8cbbd8190746b7df88b5fd311d7fb73fe37c0267328fb4b23005dfe8e1d74be6");
//私钥对应的账号地地址
const address = account.address
console.log("address: ",address)

//创建合约对象
var contract = new web3.eth.Contract(JSON.parse(data).abi,registryAddress);

//获取nonce,使用本地私钥发送交易
web3.eth.getTransactionCount(address).then(
    nonce => {
        console.log("nonce: ",nonce)
        const txParams = {
            nonce: nonce,
            gasLimit: '0x271000',
            gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
            to: registryAddress,
            data: contract.methods.addLiquidityETH('0xDb52A451dbb800614F340cF8bfefE7A22aF41273',new BigNumber(1000), new BigNumber(1000), new BigNumber(1),'0xc778417E063141139Fce010982780140Aa0cD5Ab', new BigNumber(998123456789)).encodeABI(), //智能合约中set方法的abi
           
          }
          const tx = new EthereumTx(txParams, { chain: 'ropsten' })
        tx.sign(privateKey)
        const serializedTx = tx.serialize()
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
    },
    e => console.log(e)
)
//调用合约的方法
//contract.methods.addLiquidityETH('0xDb52A451dbb800614F340cF8bfefE7A22aF41273',1000,1000,0.1,0x25c0F405d71A189352575d1afcD18245c04D85Eb, 12345679).call().then(console.log);