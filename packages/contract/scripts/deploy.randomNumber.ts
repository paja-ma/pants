import { ethers } from 'hardhat'
import { RANDOM_NUMBER_CONTRACT } from '../consts'

async function main() {
  // https://vrf.chain.link/
  // Create subscription and add the subscription id here
  const chainlinkVRFsubscriptionId =
    '32431081291273253223657328841619585243894110472597196368134918547148952965698'

  const [deployer] = await ethers.getSigners()
  console.log('Deploying contract with the account:', deployer.address)

  const helloNodit = await ethers.deployContract(RANDOM_NUMBER_CONTRACT, [
    chainlinkVRFsubscriptionId,
  ])
  await helloNodit.waitForDeployment()

  const address = await helloNodit.getAddress()

  console.log(`Contract deployed to address: ${address}`)
  console.log(
    `Deployment TX: https://sepolia.etherscan.io/tx/${
      helloNodit.deploymentTransaction()?.hash
    }`
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
