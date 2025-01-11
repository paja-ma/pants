import raffle from '@/_generated/Raffle.json'

export const deployArgs = {
  abi: raffle.abi,
  bytecode: raffle.bytecode,
  args: ['hello'],
} as const
