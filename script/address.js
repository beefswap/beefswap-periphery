var Web3 = require("web3");
var BeefswapV2Router02 = require("../build/BeefswapV2Router02.json");
var BeefERC20 = require("../build/BeefERC20.json");
var MockProvider = require("ethereum-waffle");
var ethers = require('ethers');
const rlp = require('rlp');
const keccak = require('keccak');

var Wallet = ethers.Wallet;
var utils = ethers.utils;
var providers = ethers.providers;

var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/30bf4bface004c04b0ee6fa05753adca'));

var wallet = new Wallet('0x8cbbd8190746b7df88b5fd311d7fb73fe37c0267328fb4b23005dfe8e1d74be6',new providers.Web3Provider(web3.currentProvider));

var sender = '0x25c0F405d71A189352575d1afcD18245c04D85Eb';
web3.eth.getTransactionCount(sender).then(
  nonce => {
    console.log(" nonce: ",nonce);

    var input_arr = [ sender, nonce ];
    var rlp_encoded = rlp.encode(input_arr);

    var contract_address_long = keccak('keccak256').update(rlp_encoded).digest('hex');

    var contract_address = contract_address_long.substring(24); //Trim the first 24 characters.
    console.log("contract_address: " + contract_address);

      
  },
  e => console.log(e)
)

async function main() {

    token = await MockProvider.deployContract(wallet, BeefERC20, [], {gasLimit: web3.utils.toHex(8000000)});
    // console.log(token.address);
    console.log(token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });  


