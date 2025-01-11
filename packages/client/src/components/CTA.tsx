import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { Interpolation, Theme } from '@emotion/react'
import { pressable, bg, text, padding, w, round } from '@/styles'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  css?: Interpolation<Theme>
}

export function CTA({ children, css, ...props }: PropsWithChildren<Props>) {
  return (
    <div
      css={[
        padding.x(20),
        padding.bottom('calc(env(safe-area-inset-bottom) + 16px)'),
        { position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10 },
        bg.white,
      ]}
    >
      <button
        css={[
          pressable,
          bg.primary,
          text.white,
          text.subtitle,
          padding.y(18),
          round(18),
          w('fill'),
          css,
        ]}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}
