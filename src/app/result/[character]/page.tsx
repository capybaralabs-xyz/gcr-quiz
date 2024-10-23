"use client"
// import { Facebook, Twitter, Linkedin } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { useAccount   } from 'wagmi'
import CharacterData from '@/assets/JSON/CharacterResult'
import { ConnectButton } from '@rainbow-me/rainbowkit'
interface Props {
  character: string
  intro: string
  // img?: string
  // imgPosition?: 'left' | 'right'
}

function ResultPage({
  character,
  intro,
}: Props) {
  const { address: walletAddress } = useAccount()

  const handleAction = useCallback(async () => {
    try {
      const response = await fetch('/api/character', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ character, walletAddress }),
      })
      if (!response.ok) {
        console.error('Failed to send data to /api/character')
      } else {
        // window.location.replace('https://ladder.top')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }, [character, walletAddress])

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleAction()
    }
  }, [handleAction])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
      <header className="sticky top-4 right-4 z-10 flex justify-end mb-4">
         <ConnectButton/>
      </header>
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center">
        <div className="bg-white rounded-lg justify-center shadow-lg overflow-hidden w-full max-w-6xl md:h-[80vh] flex flex-col md:flex-row">
    {/*       {imgPosition === 'left' && (
            <div className="w-full md:w-1/2 h-64 md:h-auto relative order-1">
              <img
                src={img}
                alt={`${character} portrait`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )} */}
          {/* <div className={`w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center ${imgPosition === 'left' ? 'order-2' : 'order-1 md:order-2'}`}> */}
          <div className={`w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center order-2`}>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{character}</h1>
            <p className="text-sm md:text-base text-gray-600 mb-6 whitespace-pre-wrap">{intro}</p>
{/*             <div className="flex space-x-4 mb-6">
              <a href={facebookUrl} className="text-blue-600 hover:text-blue-800" aria-label="Share on Facebook">
                <Facebook size={20} />
              </a>
              <a href={twitterUrl} className="text-blue-400 hover:text-blue-600" aria-label="Share on Twitter">
                <Twitter size={20} />
              </a>
              <a href={linkedinUrl} className="text-blue-700 hover:text-blue-900" aria-label="Share on LinkedIn">
                <Linkedin size={20} />
              </a>
            </div> */}
            <button className="bg-blue-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-blue-700 transition duration-300 mb-2 text-sm md:text-base"
             onClick={handleAction}>
              Say &apos;NO&apos; to Copycats!
            </button>
            <p className="text-xs md:text-sm text-gray-500">press Enter ↵</p>
          </div>
          {/* {imgPosition === 'right' && (
            <div className="w-full md:w-1/2 h-64 md:h-auto relative order-1 md:order-2">
              <img
                src={img}
                alt={`${character} portrait`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )} */}
        </div>
      </main>
    </div>
  )
}

export default function CharacterResult({params}: {params: {character: string}}) {
  const character = decodeURIComponent(params.character)
  console.log(character)
  const characterData = CharacterData[character as keyof typeof CharacterData]
  const resultData: Props = {
    character: character,
    intro: characterData.text,
    // img: "/placeholder.svg?height=600&width=400",
    // imgPosition: "left"
  }

  return <ResultPage {...resultData} />
}