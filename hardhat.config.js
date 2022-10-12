require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    matic: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/NBBo_nDjxFwJDbwMdWXiPFMWKwhGScFu', //${process.env.API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 80001,
    },
  },
};
