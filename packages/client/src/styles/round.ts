import { css } from '@emotion/react'

/**
 * Applies border radius
 */
export const round = (size: number) =>
  css`
    border-radius: ${size}px;
  `
