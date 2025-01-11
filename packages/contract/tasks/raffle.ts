import { task } from 'hardhat/config'

interface GetParticipantCountTaskArgs {
  contract: string
}

interface RegisterTaskArgs {
  contract: string
  nickname: string
}

task('getParticipantCount', 'Get the number of participants')
  .addParam('contract', 'The address of the Raffle contract')
  .setAction(async (taskArgs: GetParticipantCountTaskArgs, hre) => {
    const raffle = await hre.ethers.getContractAt('Raffle', taskArgs.contract)
    const participantCount = await raffle.getParticipantCount()

    console.log(`Participant count: ${participantCount}`)
  })

task('register', 'Register a single participant')
  .addParam('contract', 'The address of the Raffle contract')
  .addParam('nickname', 'The nickname of the participant')
  .setAction(async (taskArgs: RegisterTaskArgs, hre) => {
    const raffle = await hre.ethers.getContractAt('Raffle', taskArgs.contract)
    const tx = await raffle.register(taskArgs.nickname)
    const receipt = await tx.wait()

    console.log(`"${taskArgs.nickname}" is registered`)
    console.log(`Update TX: https://sepolia.etherscan.io/tx/${receipt?.hash}`)
  })
