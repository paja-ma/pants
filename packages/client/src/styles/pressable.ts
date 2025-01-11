import { css } from '@emotion/react'

export const pressable = css({
  ':active': {
    transform: 'scale(0.96)',
    opacity: 0.9,
  },
  transition: 'transform .2s ease, opacity .2s ease',
})
