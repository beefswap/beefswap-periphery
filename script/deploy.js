// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("BeefswapV2Router02");
  const greeter = await Greeter.deploy('0xCb215e589136b246D54B7135C03FCA94338aE418','0xc778417E063141139Fce010982780140Aa0cD5Ab');

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}


//npx hardhat verify --network ropsten   "0xD6645FA7512Ff7030D66574A7F8df279b72c8733" "0xc778417E063141139Fce010982780140Aa0cD5Ab"

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });  