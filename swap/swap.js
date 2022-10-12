const { ethers } = require('ethers');
require('dotenv').config();
const {
  abi: IUniswapV3PoolABI,
} = require('@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json');
const SwapRouterABI = require('../helper/SWAP_ROUTER_ABI.json');
const ERC20ABI = require('../helper/ERC20_ABI.json');

const MATIC_PROVIDER = new ethers.providers.WebSocketProvider(
  // 'wss://morning-special-sunset.matic-testnet.discover.quiknode.pro/3cba8f03afef9f9838e419a690406637b96b7586/'
  'wss://summer-light-wish.matic-testnet.discover.quiknode.pro/8f7e90fd4de6b8cfeab31b358f7f2ee6a9520c24/'
  //'https://morning-special-sunset.matic-testnet.discover.quiknode.pro/3cba8f03afef9f9838e419a690406637b96b7586/' //${process.env.API_KEY}`
);
const WALLET_SECRET = process.env.PRIVATE_KEY;
const poolAddress = '0xeA22649f86Ee72AFc14223e171f3374720418b9d';
const swapRouter = '0xE592427A0AEce92De3Edee1F18E0157C05861564';

const name1 = 'Coin1';
const symbol1 = 'C1';
const decimal1 = 18;
const address1 = '0xF829788A59e378E012ec6071ECF75AbB9f948c58';

const name2 = 'Coin2';
const symbol2 = 'C2';
const decimal2 = 18;
const address2 = '0xa1940e7308d1460C540A6588f7113C93706C668A';

async function main() {
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    MATIC_PROVIDER
  );

  const wallet = new ethers.Wallet(WALLET_SECRET);
  const connectWallet = wallet.connect(MATIC_PROVIDER);
  console.log(connectWallet.address);
  const address_wallet = connectWallet.address;

  const routerContract = new ethers.Contract(
    swapRouter,
    SwapRouterABI,
    MATIC_PROVIDER
  );

  const amountIn = 100;

  const approvalAmount = (amountIn * 1000000).toString();
  const tokenCoin1 = new ethers.Contract(address1, ERC20ABI, MATIC_PROVIDER);
  /*
  const approvalResponse = await tokenCoin1
    .connect(connectWallet.address)
    .approve(swapRouter, approvalAmount);
  console.log(approvalResponse);
  */

  const params = {
    tokenIn: address1,
    tokenOut: address2,
    fee: 100,
    recipient: '01e7ABbdDa39D639eDF9c7213C2f9fB262514Bfd1', //wallet address,
    deadline: Math.floor(Date.now() / 1000) + 30 * 60,
    amountIn: amountIn,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  };
  console.log(params);

  const trx = routerContract
    .connect(connectWallet)
    .exactInputSingle(params)
    .then((trx) => {
      console.log(trx);
    });
  console.log(trx);
}
main();

//{"tokenIn: 0xF829788A59e378E012ec6071ECF75AbB9f948c58","tokenOut: 0xa1940e7308d1460C540A6588f7113C93706C668A",fee: 100, "recipient: 01e7ABbdDa39D639eDF9c7213C2f9fB262514Bfd1, deadline: 1665482900,"amountIn: 100000000000000000000","amountOutMinimum: 0","sqrtPriceLimitX96: 0"}
