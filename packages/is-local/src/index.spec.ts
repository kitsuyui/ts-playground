import { describe, expect, it } from 'vitest'

import {
  isIPv4Local,
  isIPv6Local,
  isLocal,
  isLocalhost,
  isLocalRFC6761,
} from '.'

describe('isLocal', () => {
  it('should return true for localhost', () => {
    expect(isLocal('localhost')).toBe(true)
    expect(isLocal('LOCALHOST')).toBe(true)
  })

  it('should return true for IPv4 local addresses', () => {
    expect(isLocal('127.0.0.1')).toBe(true)
    expect(isLocal('127.255.255.255')).toBe(true)
  })

  it('should return true for IPv6 local address', () => {
    expect(isLocal('::1')).toBe(true)
  })

  it('should return true for RFC 6761 local addresses', () => {
    expect(isLocal('example.local')).toBe(true)
    expect(isLocal('example.localhost')).toBe(true)
  })

  it('should return false for non-local addresses', () => {
    expect(isLocal('example.com')).toBe(false)
    expect(isLocal('192.168.1.1')).toBe(false)
    expect(isLocal('::ffff:)')).toBe(false)
  })
})

describe('isLocalhost', () => {
  it('should return true for localhost', () => {
    expect(isLocalhost('localhost')).toBe(true)
    expect(isLocalhost('LOCALHOST')).toBe(true)
  })

  it('should return false for non-localhost', () => {
    expect(isLocalhost('example.com')).toBe(false)
  })
})

describe('isIPv4Local', () => {
  it('should return true for IPv4 local addresses', () => {
    expect(isIPv4Local('127.0.0.1')).toBe(true)
    expect(isIPv4Local('127.255.255.255')).toBe(true)
  })

  it('should return false for non-IPv4 local addresses', () => {
    expect(isIPv4Local('1.1.1.1')).toBe(false)
    expect(isIPv4Local('example.com')).toBe(false)
  })
})

describe('isIPv6Local', () => {
  it('should return true for IPv6 local address', () => {
    expect(isIPv6Local('::1')).toBe(true)
  })

  it('should return false for non-IPv6 local addresses', () => {
    expect(isIPv6Local('::ffff:')).toBe(false)
    expect(isIPv6Local('example.com')).toBe(false)
  })
})

describe('isLocalRFC6761', () => {
  it('should return true for RFC 6761 local addresses', () => {
    expect(isLocalRFC6761('example.local')).toBe(true)
    expect(isLocalRFC6761('example.localhost')).toBe(true)
  })

  it('should return false for non-RFC 6761 local addresses', () => {
    expect(isLocalRFC6761('example.com')).toBe(false)
  })
})
