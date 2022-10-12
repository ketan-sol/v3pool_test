const { ethers } = require('ethers');
require('dotenv').config();

const UNISWAP_V3_FACTORY = '0x1f98431c8ad98523631ae4a59f267346ea31f984';

const abi = require('./helper/UNISWAP_V3_FACTORY_ABI.json');

const MATIC_PROVIDER = new ethers.providers.JsonRpcProvider(
  `https://polygon-mumbai.g.alchemy.com/v2/${process.env.API_KEY}`
);
const WALLET_SECRET = process.env.PRIVATE_KEY;
const COIN1_ADDRESS = '0xF829788A59e378E012ec6071ECF75AbB9f948c58';
const COIN2_ADDRESS = '0xa1940e7308d1460C540A6588f7113C93706C668A';

const connectWallet = new ethers.Wallet(WALLET_SECRET, MATIC_PROVIDER);

async function main() {
  const factory = new ethers.Contract(UNISWAP_V3_FACTORY, abi, MATIC_PROVIDER);

  /*
  const trx = await factory
    .connect(connectWallet)
    .createPool(COIN1_ADDRESS, COIN2_ADDRESS, 500);

  const receipt = await trx.wait();
  console.log('receipt', receipt);
  */
  // pool address = 0xeA22649f86Ee72AFc14223e171f3374720418b9d
  const newPoolAddress = await factory.getPool(
    COIN1_ADDRESS,
    COIN2_ADDRESS,
    500
  );
  console.log('Pool address', newPoolAddress);

}

main();
