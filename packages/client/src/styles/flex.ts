import { css } from '@emotion/react'
import { Property } from 'csstype'

interface FlexProps {
  direction?: 'x' | 'y'
  align?: Property.AlignItems
  justify?: Property.JustifyContent
  gap?: number
}

const flexDir = (props: FlexProps = {}) =>
  css({
    display: 'flex',
    flexDirection:
      props.direction && ({ x: 'row', y: 'column' } as const)[props.direction],
    justifyContent: props.justify,
    alignItems: props.align,
    gap: props.gap,
  })

export const flex = Object.assign(flexDir, {
  x: (props: Omit<FlexProps, 'direction'> = {}) =>
    flexDir({ direction: 'x', ...props }),
  y: (props: Omit<FlexProps, 'direction'> = {}) =>
    flexDir({ direction: 'y', ...props }),
  center: (props: Omit<FlexProps, 'justify' | 'align'> = {}) =>
    flexDir({ justify: 'center', align: 'center', ...props }),
})
