import { PropsWithChildren } from 'react'
import { Interpolation, Theme } from '@emotion/react'
import { pressable, bg, text, padding, w, round } from '@/styles'

interface Props {
  disabled?: boolean
  css?: Interpolation<Theme>
}

export function CTA({ children, css, ...props }: PropsWithChildren<Props>) {
  return (
    <div css={[padding.x(12), w('fill')]}>
      <button
        css={[
          pressable,
          bg.primary,
          text.white,
          text.subtitle,
          padding.y(24),
          round(18),
          css,
        ]}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}
