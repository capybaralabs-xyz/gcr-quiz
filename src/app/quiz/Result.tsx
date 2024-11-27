'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { NotificationState, ResultType } from '../../types'
import { MessageNotification } from '@/components/MessageNotification'
import { Dispatch, SetStateAction, useState } from 'react'



const IndexDetailsModal = ({data}: {data: ResultType}) => {
    const test = () => {
        console.log('test')
    }
    const shareOnX = () => {
        const text = encodeURIComponent(data.text)
        const url = encodeURIComponent('https://x.com/peopleswapfun') // 
        const hashtags = encodeURIComponent('PeopleSwap')
    
        const xShareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`
    
        window.open(xShareUrl, '_blank')
      }
    return (
        <div className={cn("w-[288px] mt-[91px] tablet:w-[385px] laptop:w-[698px] desktop:w-[1009px]")}>
            <div className="overflow-hidden rounded-t-md border-2 border-gray-400 bg-[#A8A8A8] shadow-lg">
                <div className="flex items-center justify-between bg-[#989898] px-2 py-[10px] ">
                <span className="text-[10px] font-diatype-mono-bold tablet:text-[20px] tablet:leading-[20px] tablet:font-diatype-mono">{'Results'.toUpperCase()}</span>
                <button
                        onClick={test}
                        className="rounded hover:scale-105  transition-transform duration-150"
                    > 
                        <Image src="/images/icon-close.png"  alt="details" width={16} height={16} />
                    </button>
                </div>
                <div className="relative px-3 py-5 border-t-0 border-r-4 border-b-4 border-l-4 border-[#989898] b flex flex-col items-center bg-[#E1E1E1]">
                    <Image src={data.img} alt="details" className='border w-[133px] h-[133px] object-cover tablet:w-[283px] tablet:h-[283px]' width={133} height={133} />
                    <p className='mt-[10px] text-lg font-diatype-mono-bold tablet:text-[31px] tablet:leading-[41px] whitespace-pre-wrap'>{ data.character }</p>
                    <div className='mt-[10px] text-[17px] font-diatype-mono font-normal	text-center tablet:text-[23px] tablet:leading-[30px] desktop:text-[30px] desktop:px-14'>
                         { data.text}
                    </div>
                    <button 
                        onClick={shareOnX} 
                        className='mt-[10px] w-full h-[105px] rounded-[20px] bg-black font-old-english text-white text-[35px] font-medium tablet:h-[121px] tablet:text-[50px] tablet:leading-[65px]
                        laptop:h-[285px] laptop:text-[112px] laptop:leading-[195px] desktop:text-[155px] desktop:leading-[195px]
                        active:translate-y-0.5 active:bg-gray-900 transition-transform duration-75  hover:opacity-75'>
                        repost on X
                    </button>
                </div>
            </div>
        </div>
    )
}


const  PeopleSwap = ({ setNotification }: { setNotification: Dispatch<SetStateAction<NotificationState>> }) => {
    const handleAction = () => {
        window.location.replace('https://peopleswap.fun/')
    }
    return (
        <div className='w-[288px] mt-[91px] tablet:mt-[275px] tablet:w-[312px] laptop:w-[421px]'>
            <div className="overflow-hidden rounded-t-md border-2 border-gray-400 bg-[#E1E1E1] shadow-lg">
                <div className="flex items-center justify-between bg-[#A8A8A8] px-2 py-[10px] ">
                <span className="text-[20px] leading-[20px] font-diatype-mono">{'the people swap'.toUpperCase()}</span>
                <button
                        className="rounded hover:scale-105  transition-transform duration-150"
                        > 
                        <Image src="/images/icon-close.png" alt="details" width={16} height={16} />
                    </button>
                </div>
                <div className="relative px-3 py-5 border-t-0 border-r-4 border-b-4 border-l-4 border-[#A8A8A8] b flex flex-col items-center  ">
                    <div className='bg-black   flex flex-col items-center px-10 pb-8'>
                  
                    <picture>
                        <source media="(max-width: 768px)" srcSet="/images/people_swap.png" />
                        <source media="(max-width: 1280px)" srcSet="/images/tablet_people_swap.png" />
                        <Image 
                            src="/images/people_swap.png" 
                            className='tablet:w-[195px] tablet:h-[197px]' alt="details"
                            width={128} 
                            height={129} 
                        />
                    </picture>

                        {/* <Image src="/images/people_swap.png" className='tablet:w-[195px] tablet:h-[197px]' alt="details" width={128} height={128} /> */}
                        <p className='text-white text-[12px] leading-16 font-diatype-mono font-normal	text-center mt-4 tablet:py-8 laptop:text-[20px] laptop:leading-[26.52px]
                        laptop:py-3'>
                            We know life is tough in trenches, here is your Peopleswap whitelist. Finally you are indeed early, congrats!
                        </p>
                    </div>
                    <button 
                        className='mt-[10px] w-full h-[79px] rounded-[20px] font-diatype-mono text-white text-[19px] font-medium flex items-center justify-between px-5 bg-[#5A5A5A]  active:translate-y-0.5 transition-transform duration-75 hover:opacity-75'
                         onClick={() => setNotification({visible: true, type: 'copy' , 'message': 'Copied to clipboard'})} 
                    >
                        <span className='ml-[20px] tracking-[0.55em] font-diatype-mono-bold tablet:text-[36px] tablet:leading-[34px] tablet:tracking-[.11em]
                        laptop:text-[34px] laptop:leading-[45px] laptop:tracking-[24px]'>1TJ9AB</span> 
                    <Image src="/images/icon-copy.png" alt="copy" className='ml-[20px]' width={41} height={41}/>

                    </button>
                    
                    <button onClick={handleAction} className='mt-[10px] w-full  h-[79px] rounded-[20px] font-diatype-mono text-black text-[19px] font-medium flex items-center justify-center px-5 bg-[#FFFFFF] border-[3px]
                    border-[#000000] tablet:text-[26px] tablet:leading-[34px]
                    active:translate-y-0.5 active:bg-gray-50 transition-transform duration-75 hover:opacity-75'>
                        Enter Website
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function Result({data}: {data: ResultType}) {
    
    const [notification, setNotification] = useState<NotificationState>({
        visible: false
    });
    return (
        <>
            <div className='tablet:flex gap-[20px] laptop:gap-[55px] desktop:gap-[91px]'>
                <IndexDetailsModal data={data}/>
                <PeopleSwap  setNotification={setNotification}/>
            </div>
            <MessageNotification
                {...notification}
                onClose={() => setNotification({visible: false})}
            />
        </>
    )
}