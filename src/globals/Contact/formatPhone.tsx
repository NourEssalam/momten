export default function formatPhoneNumber(phoneNumber: number): string {
  // Ensure the input is 8 digits long
  const phone = phoneNumber.toString()
  if (phone.length !== 8) {
    throw new Error('Phone number must be 8 digits.')
  }

  const countryCode = '+216'
  const part1 = phone.slice(0, 2) // First two digits
  const part2 = phone.slice(2, 5) // Next three digits
  const part3 = phone.slice(5) // Last three digits

  return `${countryCode} ${part1}.${part2}.${part3}`
}
