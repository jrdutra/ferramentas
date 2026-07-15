export interface Ipv4RangeResult {
  cidr: string;
  ipAddress: string;
  prefix: number;
  subnetMask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableAddress: string;
  lastUsableAddress: string;
  totalAddresses: number;
  usableAddresses: number;
  hostBits: number;
  hostPolicy: string;
}

export interface Ipv4RangeCalculation {
  result: Ipv4RangeResult | null;
  error: string;
}

const IPV4_MAX = 2 ** 32;

export function calculateIpv4Range(value: string): Ipv4RangeCalculation {
  const cidr = value.trim();

  if (!cidr) {
    return { result: null, error: 'Enter an IPv4 address and CIDR prefix, for example 192.168.1.10/24.' };
  }

  const match = cidr.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);
  if (!match) {
    return { result: null, error: 'Use the format IPv4/prefix, for example 192.168.1.10/24.' };
  }

  const octetText = match.slice(1, 5);
  if (octetText.some((octet) => octet.length > 1 && octet.startsWith('0'))) {
    return { result: null, error: 'IPv4 octets must use decimal notation without leading zeroes.' };
  }

  const octets = octetText.map(Number);
  if (octets.some((octet) => octet < 0 || octet > 255)) {
    return { result: null, error: 'Each IPv4 octet must be between 0 and 255.' };
  }

  const prefix = Number(match[5]);
  if (prefix < 0 || prefix > 32) {
    return { result: null, error: 'The CIDR prefix must be between /0 and /32.' };
  }

  const ipNumber = octets.reduce((total, octet) => total * 256 + octet, 0);
  const hostBits = 32 - prefix;
  const totalAddresses = 2 ** hostBits;
  const networkNumber = Math.floor(ipNumber / totalAddresses) * totalAddresses;
  const broadcastNumber = networkNumber + totalAddresses - 1;
  const maskNumber = IPV4_MAX - totalAddresses;
  const wildcardNumber = totalAddresses - 1;

  let firstUsableNumber = networkNumber;
  let lastUsableNumber = broadcastNumber;
  let usableAddresses = totalAddresses;
  let hostPolicy = 'Single-host route: the address itself is the only usable endpoint.';

  if (prefix <= 30) {
    firstUsableNumber = networkNumber + 1;
    lastUsableNumber = broadcastNumber - 1;
    usableAddresses = totalAddresses - 2;
    hostPolicy = 'Traditional subnet: network and broadcast addresses are reserved.';
  } else if (prefix === 31) {
    hostPolicy = 'Point-to-point subnet: both addresses are usable according to RFC 3021.';
  }

  const ipAddress = octets.join('.');
  return {
    error: '',
    result: {
      cidr: `${ipAddress}/${prefix}`,
      ipAddress,
      prefix,
      subnetMask: numberToIpv4(maskNumber),
      wildcardMask: numberToIpv4(wildcardNumber),
      networkAddress: numberToIpv4(networkNumber),
      broadcastAddress: numberToIpv4(broadcastNumber),
      firstUsableAddress: numberToIpv4(firstUsableNumber),
      lastUsableAddress: numberToIpv4(lastUsableNumber),
      totalAddresses,
      usableAddresses,
      hostBits,
      hostPolicy
    }
  };
}

function numberToIpv4(value: number): string {
  return [
    Math.floor(value / 2 ** 24),
    Math.floor(value / 2 ** 16) % 256,
    Math.floor(value / 2 ** 8) % 256,
    value % 256
  ].join('.');
}
