import { calculateIpv4Range } from './ipv4-range.util';

describe('calculateIpv4Range', () => {
  it('calculates a /24 subnet', () => {
    const calculation = calculateIpv4Range('192.168.1.10/24');

    expect(calculation.error).toBe('');
    expect(calculation.result).toEqual(jasmine.objectContaining({
      networkAddress: '192.168.1.0',
      broadcastAddress: '192.168.1.255',
      firstUsableAddress: '192.168.1.1',
      lastUsableAddress: '192.168.1.254',
      subnetMask: '255.255.255.0',
      wildcardMask: '0.0.0.255',
      totalAddresses: 256,
      usableAddresses: 254
    }));
  });

  it('calculates the correct boundaries for a /22 subnet', () => {
    const result = calculateIpv4Range('10.0.5.20/22').result;

    expect(result?.networkAddress).toBe('10.0.4.0');
    expect(result?.broadcastAddress).toBe('10.0.7.255');
    expect(result?.subnetMask).toBe('255.255.252.0');
    expect(result?.totalAddresses).toBe(1024);
  });

  it('supports /31 point-to-point ranges and /32 host routes', () => {
    const pointToPoint = calculateIpv4Range('198.51.100.10/31').result;
    const host = calculateIpv4Range('203.0.113.7/32').result;

    expect(pointToPoint?.firstUsableAddress).toBe('198.51.100.10');
    expect(pointToPoint?.lastUsableAddress).toBe('198.51.100.11');
    expect(pointToPoint?.usableAddresses).toBe(2);
    expect(host?.networkAddress).toBe('203.0.113.7');
    expect(host?.broadcastAddress).toBe('203.0.113.7');
    expect(host?.usableAddresses).toBe(1);
  });

  it('rejects invalid IPv4 addresses and prefixes', () => {
    expect(calculateIpv4Range('192.168.1.999/24').result).toBeNull();
    expect(calculateIpv4Range('192.168.1.1/33').result).toBeNull();
    expect(calculateIpv4Range('192.168.01.1/24').result).toBeNull();
  });
});
