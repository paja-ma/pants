import { task } from 'hardhat/config'

interface DefaultTaskArgs {
  contract: string
}

interface RegisterParticipantTaskArgs extends DefaultTaskArgs {
  nickname: string
}

const RAFFLE_CONTRACT = 'Raffle'

task('registerParticipant', 'Register a single participant')
  .addParam('contract', 'The address of the Raffle contract')
  .addParam('nickname', 'The nickname of the participant')
  .setAction(async (taskArgs: RegisterParticipantTaskArgs, hre) => {
    const raffle = await hre.ethers.getContractAt(
      RAFFLE_CONTRACT,
      taskArgs.contract
    )
    const tx = await raffle.register(taskArgs.nickname)
    const receipt = await tx.wait()

    console.log(`"${taskArgs.nickname}" is registered`)
    console.log(`Update TX: https://sepolia.etherscan.io/tx/${receipt?.hash}`)
  })

task('drawWinner', 'Draw a winner')
  .addParam('contract', 'The address of the Raffle contract')
  .setAction(async (taskArgs: DefaultTaskArgs, hre) => {
    const raffle = await hre.ethers.getContractAt(
      RAFFLE_CONTRACT,
      taskArgs.contract
    )
    const tx = await raffle.drawWinner()
    const receipt = await tx.wait()

    console.log(`Winner is drawn: ${tx.address}`)
    console.log(`Update TX: https://sepolia.etherscan.io/tx/${receipt?.hash}`)
  })

task('closeRaffle', 'Close a raffle')
  .addParam('contract', 'The address of the Raffle contract')
  .setAction(async (taskArgs: DefaultTaskArgs, hre) => {
    const raffle = await hre.ethers.getContractAt(
      RAFFLE_CONTRACT,
      taskArgs.contract
    )
    const tx = await raffle.closeRaffle()
    const receipt = await tx.wait()

    console.log(`Raffle closed.`)
    console.log(`Update TX: https://sepolia.etherscan.io/tx/${receipt?.hash}`)
  })
