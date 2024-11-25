import { motion } from "framer-motion";
import { QuestionType } from "../../types";
import Image from 'next/image'
import { cn } from "@/lib/utils";
import Answer from "@/components/Answer";
import { ImageBox } from "@/components/ImageBox";

const QuestionDescription = ({
    questionText,
    className
}: {
    questionText: string;
    className?: string;
}) => {
    return (
        <div className='mt-4 flex flex-col items-center tablet:self-end tablet:mr-[45px] tablet:flex-row z-[1000]
         laptop:mr-[183px] desktop:mr-[411px]'>
            <Image className="tablet:order-last tablet:w-[167px] tablet:h-[220px] laptop:w-[232px] laptop:h-[306px]" src="/images/question.png" alt="question" width={132} height={175} />
            <div className={cn(`mt-[-48px] w-[165px] break-words px-4 py-3 font-offBit-trial relative text-[21px] font-bold leading-[23.1px] text-left rounded-[20px] border border-black bg-[#FFFFCC] tablet:order-first
                tablet:w-[289px] laptop:w-[401px] laptop:text-[40px] laptop:leading-[40px] laptop:px-[42px] laptop:py-[35px]
                  laptop:self-start laptop:mt-[66px]`, className)}>
                <picture className=''>
                    <source media="(min-width: 768px)" srcSet="/images/tablet_triangle.png" />
                        <Image 
                                src="/images/triangle.png" 
                                alt="details" 
                                className='absolute right-[24px] top-0 translate-y-[-100%]
                                tablet:right-0  tablet:translate-x-[100%] tablet:top-[100%] tablet:-translate-y-10 tablet:w-[41px] tablet:h-[24px] 
                                laptop:w-[57px] laptop:h-[34px] laptop:translate-y-0 laptop:top-[20%]' 
                                width={24} 
                                height={23}
                            />
                </picture>
                {questionText.toUpperCase()}
            </div>
        </div>
    )
}


export default function Question({
    question,
    questionNumber,
    questionLength,
    selectedAnswer,
    onAnswer,
}: {
    question: QuestionType;
    questionNumber: number;
    questionLength: number;
    selectedAnswer: string | undefined;
    onAnswer: (answer: string) => void;
}) {
    return (
        <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex flex-col relative items-center justify-center w-full md:self-center"
        >
            <QuestionDescription questionText={question.question}  className={question.questionTextClassName} />
            <Answer
                currentQuestion={questionNumber}
                totalQuestions={questionLength}
                questionOptions={question}
                selectedAnswer={selectedAnswer}
                onSelect={onAnswer}
                className={question.answerClassName}
            />
            {
                question.type === 'multiple' && (
                    // <ImageBox image={question.image} className="-mt-8 w-[212px] h-[218px] mb-10"  />
                    <ImageBox image={question.image} className={cn(`w-full h-full
                        tablet:absolute tablet:w-[257px] tablet:h-[352px] tablet:top-[64px] tablet:left-[58px] 
                        laptop:w-[360px] laptop:h-[475px] laptop:top-[460px] laptop:left-[36px] desktop:w-[532px] desktop:h-[643px] desktop:top-[142px] desktop:left-[80px]
                        `, question.imageBoxClassName)}  />
                )
            }
        </motion.div>
    );
}