// Based on the viridis colormap from the colormap package (CC0).
export const COLORS = ['#440154', '#30678d', '#35b778', '#fde724'] as const

/**
 * Convert a two-bit value to a display color.
 */
export const valueToColor = (value: number): string => {
  return COLORS[value]
}
