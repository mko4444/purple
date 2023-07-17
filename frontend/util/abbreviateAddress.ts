export default function abbreviateAddress(address: string): string {
  return address.length > 10
    ? `${address.slice(0, 5) + "..." + address.slice(-5)}`
    : address;
}
