import { ethers } from 'hardhat'

async function main() {
  const initialMessage = 'Hello Nodit'
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contract with the account:', deployer.address)

  const helloNodit = await ethers.deployContract('HelloNodit', [initialMessage])
  await helloNodit.waitForDeployment()

  const address = await helloNodit.getAddress()

  console.log(`Contract deployed to address: ${address}`)
  console.log(`Deployment TX: https://sepolia.etherscan.io/tx/${helloNodit.deploymentTransaction()?.hash}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
