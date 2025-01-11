import raffle from '@/_generated/Raffle.json'

interface Props {
  title: string
  description: string
  maxParticipants: number
  imageUrl: string
}

export const deployArgs = ({
  title,
  description,
  maxParticipants,
  imageUrl,
}: Props) =>
  ({
    abi: raffle.abi,
    bytecode: raffle.bytecode as `0x${string}`,
    args: [title, description, maxParticipants, imageUrl],
  } as const)
