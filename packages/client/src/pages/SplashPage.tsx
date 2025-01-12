import { Logo } from '@/components/Logo'
import { colors, flex, w, h } from '@/styles'

export function SplashPage() {
  return (
    <div css={[flex.center(), w('fill'), h('fill')]}>
      <Logo w={200} h={60} color1={colors.primary} color2="#B9ACED" />
    </div>
  )
}
