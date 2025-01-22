import Image from 'next/image'

export function Logo() {
  return (
    <Image src="/logo.png" alt="login/signup logo" width={100} height={100} />
  )
}
