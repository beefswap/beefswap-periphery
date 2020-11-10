var Web3 = require("web3");
var BeefswapV2Router02 = require("../build/BeefswapV2Router02.json");
var TokenERC20 = require("../build/TokenERC20.json");
var MockProvider = require("ethereum-waffle");
var ethers = require('ethers');
var Wallet = ethers.Wallet;
var utils = ethers.utils;
var providers = ethers.providers;

var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/30bf4bface004c04b0ee6fa05753adca'));

var wallet = new Wallet('0x8cbbd8190746b7df88b5fd311d7fb73fe37c0267328fb4b23005dfe8e1d74be6',new providers.Web3Provider(web3.currentProvider));


async function main() {
    token = await MockProvider.deployContract(wallet, TokenERC20, [80000000, 'PAPAPA', 'PA'], {gasLimit: web3.utils.toHex(8000000)});
    // console.log(token.address);
    console.log(token);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });  


