import styled from '@emotion/styled'

interface LogoProps {
  size?: number
}

export function Logo({ size = 32 }: LogoProps) {
  return (
    <LogoWrapper size={size}>
      <div>logo</div>
    </LogoWrapper>
  )
}

const LogoWrapper = styled.div<LogoProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`
