import 'dotenv/config'
import type { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox-viem'
import '@nomicfoundation/hardhat-ethers'
import './tasks/raffle'
import './tasks/randomNumber'

const { RPC_ENDPOINT, DEPLOYER_PRIVATE_KEY } = process.env

export default {
  solidity: '0.8.19',
  networks: {
    sepolia: {
      url: RPC_ENDPOINT,
      accounts: [DEPLOYER_PRIVATE_KEY || ''],
    },
  },
  defaultNetwork: 'sepolia',
} satisfies HardhatUserConfig
