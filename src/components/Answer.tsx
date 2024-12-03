import { QuestionType } from "@/types"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import Image from "next/image"


interface QuestionDialogProps {
    questionOptions: QuestionType
    currentQuestion: number
    totalQuestions: number
    className?: string
    selectedAnswer: string | undefined
    onSelect: (option: string) => void
    onClose?: () => void
}

export default function Answer({
    currentQuestion = 0,
    totalQuestions = 0,
    questionOptions,    
    selectedAnswer = "",
    onSelect = () => {},
    onClose = () => {},
    className
}: QuestionDialogProps) {
    return (
        <div className={cn(`z-10 w-[288px] rounded-t-md border-2  border-gray-400 bg-[#989898] shadow-[4px_4px_10px_rgba(0,0,0,0.3)]
        tablet:w-[475px] laptop:w-[591px] `, className)}>
            {/* Title Bar */}
            <div className="flex items-center justify-between px-2 py-[10px]">
                <span className="text-sm font-semibold text-black tablet:text-[10px] laptop:text-[16px] desktop:text-[20px]">
                    <span className="font-diatype-mono-bold">
                        Q{currentQuestion + 1}
                    </span>
                    <span className="font-diatype-mono"> OF {totalQuestions}</span>
                </span>
                <button
                    onClick={onClose}
                    className="text-white hover:bg-[#D4D0C8]/20 rounded p-0.5"
                >
                    <X className="h-4 w-4 text-lg text-black " />
                </button>
            </div>
            
            {/* Options */}
            {
                ['multiple', 'text-only'].includes(questionOptions.type) && <div className="space-y-[10px] p-4 bg-[#E1E1E1] border-t-0 border-r-4 border-b-4 border-l-4 border-solid border-[#989898] tablet:py-5">
                {questionOptions.options?.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(option.id)}
                        className={`w-full rounded border leading-6 border-t-white border-l-white border-b-[#C0C0C0] border-r-[#C0C0C0] bg-[#C0C0C0] px-2 py-[6px] text-left font-diatype-mono text-lg shadow-custom-inset
                            tablet:text-[19px] tablet:leading-[25px] tablet:px-4 laptop:text-[25px] laptop:leading-[33px] desktop:text-[29px] desktop:leading-[38px] transition-all 
                            ${selectedAnswer === option.id ? 'bg-[#E8E8E8] border-none shadow-custom-inset-selected' : 'hover:bg-[#E8E8E8]  '}
                            `}
                    >
                        {option.text}
                    </button>
                ))}
            </div>
            }
            {
                questionOptions.type === 'image-grid' && questionOptions.imageOptions && <div className=" p-3 bg-[#E1E1E1] border-t-0 border-r-4 border-b-4 border-l-4 border-solid border-[#989898] 
                grid grid-cols-2 gap-[10px]   tablet:grid-cols-4  ">
                {questionOptions.imageOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => onSelect(option.id)}

                    className={`group w-[123px] relative flex flex-col items-center justify-center rounded-sm shadow-custom-inset border border-t-white border-l-white border-b-[#C0C0C0] border-r-[#C0C0C0] bg-[#C0C0C0] px-2 py-4  transition-colors 
                        tablet:w-[162px]  laptop:w-[261px]
                     ${selectedAnswer === option.id ? 'bg-[#E8E8E8] border-none shadow-img-grid-inset-selected' : 'hover:bg-[#E8E8E8] '}`}
                  >
                    <div className="relative mb-4 aspect-square w-16 h-16 flex items-center justify-center
                    tablet:w-[130px] tablet:h-[130px] laptop:w-[229px] laptop:h-[229px]">
                      <Image
                        src={option.image}
                        alt={option.label}
                        fill
                        style={{ objectFit: questionOptions.objectFit || 'contain' }}
                      />
                    </div>
                    <span className="font-diatype-mono text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            }
        </div>
    )
}
