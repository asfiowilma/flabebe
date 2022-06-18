import React from 'react'
import Image from 'next/image'
import { useTrakteer } from './TrakteerProvider'

type Props = {
  className?: string
  size?: number
}

const TrakteerButton = ({ className, size = 100 }: Props) => {
  const { trakteerRef, setIsTrakteerOpen, isLoading, setIsLoading } = useTrakteer()

  const onButtonClick = () => {
    setIsLoading(true)
    setIsTrakteerOpen(true)
    trakteerRef.current.contentWindow.postMessage({ type: 'embed.openModal' }, '*')
  }

  return (
    <button
      className={`rounded-full font-['Quicksand'] flex items-center text-center hover:opacity-80 cursor-pointer overflow-visible transition ${className}`}
      onClick={() => onButtonClick()}
    >
      <span className="relative animate-[trbtn-wiggle_3s_infinite] overflow-visible grid place-items-center">
        <Image
          src="/images/choco-latte.png"
          alt="Traktiran"
          width={(21 * size) / 100}
          height={(26 * size) / 100}
        />
      </span>
      <span className="font-bold ml-1">{isLoading ? 'Loading...' : 'Buy me a Choco Latte'}</span>
    </button>
  )
}

export default TrakteerButton
