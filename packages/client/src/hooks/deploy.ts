import raffle from '@/_generated/Raffle.json'

export const deployArgs = {
  abi: raffle.abi,
  bytecode: raffle.bytecode as `0x${string}`,
  args: ['hello'],
} as const
