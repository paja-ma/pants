import { task } from 'hardhat/config'
import { RANDOM_NUMBER_CONTRACT } from '../scripts/deploy.randomNumber'

interface DefaultTaskArgs {
  contract: string
}

interface RequestRandomWordsTaskArgs extends DefaultTaskArgs {
  enableNativePayment: boolean
}

interface GetRequestStatusTaskArgs extends DefaultTaskArgs {
  requestId: string
}

/**
 * @description Generation of random words takes time. Keep the request id to check the status of the request with `getRequestStatus`
 * @command npx hardhat requestRandomWords --contract {contract} --enable-native-payment true
 * @response requestId: string
 */
task('requestRandomWords', 'Register a single participant')
  .addParam('contract', 'The address of the Raffle contract')
  .addParam('enableNativePayment', 'The nickname of the participant')
  .setAction(async (taskArgs: RequestRandomWordsTaskArgs, hre) => {
    const raffle = await hre.ethers.getContractAt(
      RANDOM_NUMBER_CONTRACT,
      taskArgs.contract
    )
    const requestId = await raffle.requestRandomWords(
      taskArgs.enableNativePayment
    )
    console.log(`requestId: ${requestId}`)
    console.log(`Update TX: https://sepolia.etherscan.io/tx/${requestId?.hash}`)
  })

/**
 * @command npx hardhat lastRequestId --contract {contract}
 * @response lastRequestId: string
 */
task('lastRequestId', 'Register a single participant')
  .addParam('contract', 'The address of the Raffle contract')
  .setAction(async (taskArgs: DefaultTaskArgs, hre) => {
    const raffle = await hre.ethers.getContractAt(
      RANDOM_NUMBER_CONTRACT,
      taskArgs.contract
    )

    const lastRequestId = await raffle.lastRequestId()

    console.log(`lastRequestId: ${lastRequestId}`)
    console.log(
      `Update TX: https://sepolia.etherscan.io/tx/${lastRequestId?.hash}`
    )
  })

/**
 * @description Get the request id first, and then use it to check the status of the request
 * @command npx hardhat getRequestStatus --contract {contract} --request-id {requestId}
 * @response fulfilled: boolean
 * @response randomWords: string[]
 */
task('getRequestStatus', 'Register a single participant')
  .addParam('contract', 'The address of the Raffle contract')
  .addParam('requestId', 'The nickname of the participant')
  .setAction(async (taskArgs: GetRequestStatusTaskArgs, hre) => {
    const raffle = await hre.ethers.getContractAt(
      RANDOM_NUMBER_CONTRACT,
      taskArgs.contract
    )

    const [fulfilled, randomWords] = await raffle.getRequestStatus(
      taskArgs.requestId
    )

    console.log(`fulfilled: ${fulfilled}`)
    console.log(`randomWords: ${randomWords[0]}`)
    console.log(`Update TX: https://sepolia.etherscan.io/tx/${fulfilled?.hash}`)
  })
