import { css } from '@emotion/react'
import { mapColors } from './color'

const style = (size: number, weight: number) => css`
  font-size: ${size}px;
  font-weight: ${weight};
`

/**
 * Applies typography styles and text color
 * @example
 * text.title1   // Apply title1 typography
 * text.gray300  // Apply gray300 text color
 */
export const text = {
  ...mapColors(
    (color) => css`
      color: ${color};
    `
  ),
  title1: style(20, 700),
  title2: style(18, 500),
  subtitle: style(16, 500),
  body: style(14, 500),
} as const
