/**
 * @packageDocumentation
 * @module @kitsuyui/is-local
 *
 * This package provides a utility function to determine if a given host is local.
 * It is designed with the browser's location.hostname in mind, but implemented as a function that can handle strings independent of the browser environment.
 */

/**
 * Determine if the given host is local.
 * @param host
 * @returns true if the host is local, false otherwise
 */
export const isLocal = (host: string): boolean => {
  if (isLocalhost(host)) return true
  if (isIPv4Local(host)) return true
  if (isIPv6Local(host)) return true
  if (isLocalRFC6761(host)) return true
  return false
}

/**
 * Check if the host is 'localhost'.
 * @param host
 * @returns true if the host is 'localhost', false otherwise
 */
export const isLocalhost = (host: string): boolean => {
  return host.toLowerCase() === 'localhost'
}

/**
 * Check if the host is an IPv4 local address such as 127.0.0.1 and other 127.x.x.x addresses.
 * @param host
 * @returns true if the host is an IPv4 local address, false otherwise
 */
export const isIPv4Local = (host: string): boolean => {
  const ipv4LocalPattern = /^(127)\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/
  const lower = host.toLowerCase()
  const match = lower.match(ipv4LocalPattern)
  if (!match) return false
  const octets = match.slice(1).map(Number)
  return octets.slice(1).every((octet) => octet >= 0 && octet <= 255)
}

/**
 * Check if the host is the IPv6 loopback address '::1'.
 * @param host
 * @returns true if the host is IPv6 loopback address, false otherwise
 */
export const isIPv6Local = (host: string): boolean => {
  return host === '::1'
}

/**
 * Check if the host ends with '.local' as per RFC 6761.
 * @param host
 * @returns
 * @see https://datatracker.ietf.org/doc/html/rfc6761
 */
export const isLocalRFC6761 = (host: string): boolean => {
  const lower = host.toLowerCase()
  return lower.endsWith('.local') || lower.endsWith('.localhost')
}

export default isLocal
