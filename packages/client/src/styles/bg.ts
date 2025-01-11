import { css } from '@emotion/react'
import { mapColors } from './color'

/**
 * Applies background-color
 * @example
 * bg.gray100  // Apply gray100 background-color
 */
export const bg = mapColors(
  (color) => css`
    background-color: ${color};
  `
)
