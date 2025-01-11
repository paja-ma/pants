import './theme.css'

export const colors = {
  white: 'var(--white)',
  black: 'var(--black)',
  white100: 'var(--white100)',
  gray100: 'var(--gray100)',
  gray200: 'var(--gray200)',
  gray300: 'var(--gray300)',
  gray400: 'var(--gray400)',
  gray500: 'var(--gray500)',
  gray600: 'var(--gray600)',
  grayTrans: 'var(--grayTrans)',
  primary: 'var(--primary)',
} as const

type ColorKeys = keyof typeof colors
export type Color = (typeof colors)[ColorKeys]
export const mapColors = <T>(cb: (color: Color) => T) =>
  Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [key, cb(value)] as const)
  ) as Record<ColorKeys, T>
