import Image from 'next/image'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'



export const DetailsModal = ({ className }: {  className?: string }) => {
    const test = () => {
        console.log('test')
    }
    return (
        <div className={cn("w-[253px] tablet:w-[421px]", className)}>
            <div className="overflow-hidden rounded-t-md border-2 border-gray-400 bg-gray-200 shadow-lg">
                <div className="flex items-center justify-between bg-[#A8A8A8] px-2 py-1 ">
                    <span className="text-base font-diatype-mono">DETAILS</span>
                    <button
                        onClick={test} // Ensure this is within a Client Component
                        className="rounded hover:scale-105 transition-transform duration-150"
                    > 
                        <X className="h-4 w-4" />
                    </button>
                </div>
                <div className="relative bg-white px-3 py-5 border-t-0 border-r-4 border-b-4 border-l-4 border-[#A8A8A8]">

                        <Image 
                                src="/images/details_bg.png" 
                                alt="details" 
                                className='w-[221px] h-[308px] object-cover tablet:w-[389px] tablet:h-[469px]' 
                                sizes="(max-width: 328px) 221px, (max-width: 768px) 389px" 
                                width={221}
                                height={308}
                                
                            />
              {/*       <Image src={image} alt="details" className='w-full h-full object-contain' width={221} height={308} 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw" /> */}
                </div>
            </div>
        </div>
    )
}

