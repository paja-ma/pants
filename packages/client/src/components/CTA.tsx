import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { Interpolation, Theme } from '@emotion/react'
import { pressable, bg, text, padding, w, round, flex } from '@/styles'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  description?: string
  css?: Interpolation<Theme>
}

export function CTA({
  description,
  children,
  css,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div
      css={[
        padding.x(20),
        padding.bottom('calc(env(safe-area-inset-bottom) + 16px)'),
        { position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10 },
        bg.white,
        flex.y({ align: 'center', gap: 12 }),
      ]}
    >
      <div
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 26,
          transform: 'translateY(-100%)',
          background: 'linear-gradient(#ffffff00, white)',
        }}
      />
      {description && (
        <p css={[{ textAlign: 'center' }, text.gray400, text.body]}>
          {description}
        </p>
      )}
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
