var Web3 = require("web3");

var BigNumber = require("bignumber.js");
const EthereumTx = require('ethereumjs-tx').Transaction

//智能合约地址
const routerAddress = "0x0967251ee4202874E9C5f69190f8A5aE20fCed94";

const erc20Address = "0xa7ba860fa5dd109dcd444f1e6d34c90ff12f9729";

//连接到Ganache
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/30bf4bface004c04b0ee6fa05753adca'));

var fs = require("fs");
var data = fs.readFileSync("./build/BeefswapV2Router02.json", "utf-8");
var erc20 = fs.readFileSync("./build/TokenERC20.json", "utf-8");

//私钥转换为Buffer
const privateKey =  Buffer.from('8cbbd8190746b7df88b5fd311d7fb73fe37c0267328fb4b23005dfe8e1d74be6',"hex")
//私钥转换为账号
const account = web3.eth.accounts.privateKeyToAccount("0x8cbbd8190746b7df88b5fd311d7fb73fe37c0267328fb4b23005dfe8e1d74be6");
//私钥对应的账号地地址
const address = account.address
console.log("address: ",address)

//创建合约对象
var contract = new web3.eth.Contract(JSON.parse(data).abi,routerAddress);

var erc20contract = new web3.eth.Contract(JSON.parse(erc20).abi,erc20Address);

//获取nonce,使用本地私钥发送交易
web3.eth.getTransactionCount(address).then(
    nonce => {
        // console.log("approve nonce: ",nonce)

        // const txParams = {
        //     nonce: nonce,
        //     gasLimit: web3.utils.toHex(8000000),
        //     gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        //     to: erc20Address,
        //     data: erc20contract.methods.approve(routerAddress ,new BigNumber(1000000000000000000000), ).encodeABI(), //智能合约中方法的abi
           
        //   }
        //   const tx = new EthereumTx(txParams, { chain: 'ropsten' })
        // tx.sign(privateKey)
        // const serializedTx = tx.serialize()
        // web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);

        console.log("addLiquidityETH nonce: ",nonce)
        const txParams = {
            nonce: nonce,
            gasLimit: web3.utils.toHex(8000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            value: web3.utils.toHex(new BigNumber(1000000000000000000)),
            to: routerAddress,
            data: contract.methods.addLiquidityETH(erc20Address,new BigNumber(100000000000000000000), new BigNumber(100000000000000000000), new BigNumber(1000000000000000000),'0x25c0F405d71A189352575d1afcD18245c04D85Eb', new BigNumber(998123456789)).encodeABI(), //智能合约中set方法的abi
           
          }
          const tx = new EthereumTx(txParams, { chain: 'ropsten' })
        tx.sign(privateKey)
        const serializedTx = tx.serialize()
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
    },
    e => console.log(e)
)
//调用合约的方法

// erc20contract.methods.allowance('0x25c0f405d71a189352575d1afcd18245c04d85eb', '0x8de7be9FBAF5d8A8eE1680D8Ba82669b7c0C5daf').call().then(console.log);
