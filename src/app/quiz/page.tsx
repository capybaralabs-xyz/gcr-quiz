'use client'
import CharacterData from '@/assets/JSON/CharacterResult'
import Questions from "../../assets/JSON/Questions.json";
import { QuestionType, ResultType } from '../../types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Question from './Question';
import Home from './Home';
import Result from './Result';
import { AnimatePresence } from 'framer-motion';
import getHighestScoringCharacter from '@/utils/getHighestScoringCharacter';



export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(-1);
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const questions: QuestionType[] = Questions as QuestionType[];
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<ResultType>({ character: '', text: '', img: '' });
    const totalQuestions = useMemo(() => questions.length, [questions]);


    const getCharacterResult = useCallback(() => {
      const result = getHighestScoringCharacter(answers);
      // const result = 'Milady GCR'
      const characterData = CharacterData[result as keyof typeof CharacterData];
      setResult({
          character: result,
          text: characterData.text,
          img: characterData.img
      });
  }, [answers]);
  
  // useEffect(() => {
  //   getCharacterResult();
  // }, []);

  const handleAnswer = useCallback((answer: string) => {
      setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: answer }));
      if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
      } else {
          getCharacterResult();
          setIsSubmitting(true);
      }
  }, [currentQuestion, questions, getCharacterResult]);



      const handleProgressBarCurrent = (index: number) => {
        if(questions[index].id in answers){
          setCurrentQuestion(index)
        }
      }
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [currentQuestion]);

      const renderContent = () => {
        if (currentQuestion === -1) {
            return <Home start={() => setCurrentQuestion(0)} />;
        }
        if (isSubmitting) {
            return <Result data={result} />;
        }
        return (
            <Question
                question={questions[currentQuestion]}
                questionNumber={currentQuestion}
                questionLength={totalQuestions}
                selectedAnswer={answers[questions[currentQuestion].id]}
                onAnswer={handleAnswer}
            />
        );
    };

    return (
        <div className="relative w-full min-h-[100vh] pb-12 overflow-auto  flex flex-col items-center bg-cover bg-center
         bg-[url('/images/bg1.png?height=1080&width=320')] tablet:bg-[url('/images/tablet_bg.png?height=1080&width=768')]
         laptop:bg-[url('/images/laptop_bg.png?height=1080&width=1280')]  desktop:bg-[url('/images/desktop_bg.png?height=1080&width=1920')] 
         ">
            
            <AnimatePresence mode="wait">
             {renderContent()}
            </AnimatePresence>
      
            <ProgressBar isSubmitting={isSubmitting} handleSetCurrentQuestion={handleProgressBarCurrent} currentQuestion={currentQuestion} totalQuestions={totalQuestions} />
        </div>
    )
}



interface ProgressBarProps {
    currentQuestion: number
    totalQuestions: number
    isSubmitting: boolean
    handleSetCurrentQuestion: (val: number) => void
  }
const ProgressBar: React.FC<ProgressBarProps> = ({ currentQuestion, totalQuestions, handleSetCurrentQuestion, isSubmitting }) => {
    const segments = Array.from({ length: totalQuestions }, (_, index) => {
    
      const isActive = index <= currentQuestion
      return (
        <div
        key={index}
        data-index={index}
        className={`h-full 
          ${ isActive ? 'bg-[#61FF2C]' : 'bg-[#61FF2C33]'}
          ${ isActive &&  index !== currentQuestion && !isSubmitting ? 'transition-all duration-300 ease-in-out hover:bg-[#61FF2C66]' : ''}
           `} // 添加了 hover 效果
        style={{
          width: `${100 / totalQuestions}%`,
          borderRight: index < totalQuestions - 1 ? '2px solid #000' : 'none',
          boxShadow: isActive
            ? 'inset -1px -1px 2px rgba(0,0,0,0.3), inset 1px 1px 2px rgba(255,255,255,0.3)'
            : 'none'
        }}

      />
      )
    })
    const handleSegmentClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      const index = target.getAttribute('data-index');
      if (index !== null && !isSubmitting) {
        handleSetCurrentQuestion(+index)
      }
    }
    return (
      <div
        className="border z-50 border-white fixed bottom-4 left-4 right-4   bg-black py-2 px-[3px] 
        tablet:left-[87] tablet:right-[87] laptop:left-[32px] laptop:right-[32px] desktop:left-[407px] desktop:right-[407px]
        "
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalQuestions}
        aria-valuenow={currentQuestion }
        onClick={handleSegmentClick} 

      >
          
          <div className="flex  w-full p-[1px] h-[10px]">{segments}</div>
      </div>
    )
  }
