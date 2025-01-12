import { ethers } from 'hardhat'
import { RANDOM_NUMBER_CONTRACT } from '../consts'

async function main() {
  // https://vrf.chain.link/
  // Create subscription and add the subscription id here

  const [deployer] = await ethers.getSigners()
  console.log('Deploying contract with the account:', deployer.address)

  const raffleSystem = await ethers.deployContract('RaffleSystem')
  await raffleSystem.waitForDeployment()

  const address = await raffleSystem.getAddress()

  console.log(`Contract deployed to address: ${address}`)
  console.log(
    `Deployment TX: https://sepolia.etherscan.io/tx/${
      raffleSystem.deploymentTransaction()?.hash
    }`
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
