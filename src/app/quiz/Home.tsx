'use client'

import { DetailsModal } from "@/components/Details"

export default function Home({ start }: { start: () => void }) {
    return (
      <>
            <div className="flex flex-col items-center laptop:flex-row laptop:justify-between laptop:mt-[136px]">
                <div className="text-3xl font-bold mt-9 w-[251px] text-center leading-[42px] font-diatype-mono
                tablet:w-[373px] tablet:text-[32px] tablet:leading-[42px]
                laptop:text-[50px] laptop:leading-[66px]">
                    Which GCR is hiding inside you?
                </div>
                <DetailsModal className="mt-6" />
                <div className="hidden laptop:block  text-3xl font-bold mt-9 w-[251px] text-center leading-[42px] font-diatype-mono
                tablet:w-[373px] tablet:text-[32px] tablet:leading-[42px]
                laptop:text-[50px] laptop:leading-[66px]">
                    Which GCR is hiding inside you?
                </div>
            </div>

            <button className="w-[258px] h-[217px] bg-white font-old-english mt-8 text-[50px] border border-black
        tablet:w-[423px] tablet:h-[217px] active:scale-95 transition-transform duration-150" onClick={start}>Start</button>
        </>
    )
}

