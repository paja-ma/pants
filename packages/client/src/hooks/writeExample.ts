import { writeContract } from 'wagmi/actions'

import { wagmiConfig } from '../configs/wagmi'

const abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'initMessage',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'message',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'newMessage',
        type: 'string',
      },
    ],
    name: 'updateMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const writeExample = async (message: string) => {
  return await writeContract(wagmiConfig, {
    address: '0x25b4554070b7BC1823Fe0612405fbb8f3f7C02Dd',
    abi,
    functionName: 'updateMessage',
    args: [message],
  })
}
