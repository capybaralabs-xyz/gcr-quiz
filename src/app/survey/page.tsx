"use client";
import Questions from "../../assets/JSON/Questions.json";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Check } from "lucide-react";
import getHighestScoringCharacter from '@/utils/getHighestScoringCharacter'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';


type QuestionType = {
  id: string;
  type: 'multiple' | 'image-grid' | 'text-only';
  question: string;
  options?: Array<{ id: string; text: string }>;
  image?: string;
  imagePosition?: 'left' | 'right';
  imageOptions?: Array<{ id: string; image: string; label: string }>;
}

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div className="w-full bg-gray-200 h-1 rounded-full sticky top-0 z-10">
    <div
      className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
      style={{ width: `${((current + 1) / total) * 100}%` }}
    />
  </div>
)

const NavigationButtons: React.FC<{
  onNavigate: (direction: 'up' | 'down') => void;
  currentQuestion: number;
  totalQuestions: number;
  canNavigateDown: boolean;
}> = ({ onNavigate, currentQuestion, totalQuestions, canNavigateDown }) => (
  <div className="flex justify-end items-center mt-4 sticky bottom-8 md:mr-16 mr-4">
    <div className="flex space-x-2">
      <button
        onClick={() => onNavigate('up')}
        disabled={currentQuestion === 0}
        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors disabled:opacity-50"
      >
        <ChevronUp className="w-6 h-6 text-blue-600" />
      </button>
      <button
        onClick={() => onNavigate('down')}
        disabled={currentQuestion === totalQuestions - 1 || !canNavigateDown}
        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors disabled:opacity-50"
      >
        <ChevronDown className="w-6 h-6 text-blue-600" />
      </button>
    </div>
  </div>
)

const QuestionTitle: React.FC<{ number: number; title: string }> = ({ number, title }) => (
  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-blue-600">
    <span className="mr-2  w-20">{number} →</span>
    {title}
  </h2>
)

const TextOption: React.FC<{
  option: string;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ option, index, isSelected, onSelect }) => (
  <button
    onClick={onSelect}
    className={`w-full min-w-52 p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 flex items-center justify-between ${
      isSelected ? 'bg-blue-200' : ''
    }`}
  >
    <span className="flex items-center">
      <span className="mr-4 text-blue-600 font-bold">{String.fromCharCode(65 + index)}</span>
      <span>{option}</span>
    </span>
    {isSelected && <Check className="text-blue-600 ml-4" />}
  </button>
)

const ImageOption: React.FC<{
  option: { image: string; label: string };
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ option, index, isSelected, onSelect }) => (
  <button
    onClick={onSelect}
    className={`p-2 rounded-lg transition-colors border border-blue-200 flex flex-col items-center relative overflow-hidden ${
      isSelected ? 'bg-blue-600' : 'bg-blue-50 hover:bg-blue-100'
    }`}
  >
    {isSelected && (
      <div className="absolute top-0 left-0 bg-blue-600 rounded-br-full p-1.5">
        <Check className="text-white w-4 h-4" />
      </div>
    )}
    <div className="h-40 mb-2 ">
      
      <Image 
        src={option.image}
        alt={option.label}
        width={160} 
        height={160}
        className="w-full h-full rounded object-contain"
      />
    </div>
    <div className="flex items-center justify-center w-full">
      <span className={`text-blue-600 font-bold mr-2 ${isSelected ? 'text-white' : ''}`}>
        {String.fromCharCode(65 + index)}
      </span>
      <span className={`text-center ${isSelected ? 'text-white' : ''}`}>
        {option.label}
      </span>
    </div>
  </button>
)

const MultipleChoiceQuestion: React.FC<{
  question: QuestionType;
  selectedAnswer: string | undefined;
  onAnswer: (answer: string) => void;
}> = ({ question, selectedAnswer, onAnswer }) => (
  <ul className="inline-grid grid-cols-[minmax(0,max-content)] auto-cols-fr gap-2">
    {question.options?.map((option, index) => (
    <TextOption
      key={option.id}
      option={option.text}
      index={index}
      isSelected={selectedAnswer === option.id}
      onSelect={() => onAnswer(option.id)}
    />
    ))}
  </ul>
)

const ImageGridQuestion: React.FC<{
  question: QuestionType;
  selectedAnswer: string | undefined;
  onAnswer: (answer: string) => void;
}> = ({ question, selectedAnswer, onAnswer }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
    {question.imageOptions?.map((option, index) => (
       <ImageOption
        key={option.id}
        option={option}
        index={index}
        isSelected={selectedAnswer === option.id}
        onSelect={() => onAnswer(option.id)}
      />
    ))}
  </div>
)

const Question: React.FC<{
  question: QuestionType;
  questionNumber: number;
  questionLength: number;
  selectedAnswer: string | undefined;
  onAnswer: (answer: string) => void;
  onSubmit: () => void;
}> = ({ question, questionNumber, questionLength, selectedAnswer, onAnswer, onSubmit }) => (
  <motion.div
    key={question.id}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className="flex flex-col md:flex-row items-center justify-center w-full  md:self-center"
  >
    {question.type === 'multiple' && question.image && (
      <div className={`w-full md:w-1/2  ${question.imagePosition === 'left' ? 'md:order-first' : 'md:order-last'}`}>
        <div className=" max-w-[720px] px-20 ">
        <img src={question.image} alt={`Question ${questionNumber}`} className="w-full h-auto object-contain" />
        </div>
      </div>
    )}
    <div className={`flex flex-col items-center  ${question.image ? 'md:w-1/2' : ''} p-4 ${question.type === 'text-only' ? 'max-w-2xl mx-auto' : ''}`}>
      <div className=" max-w-[720px] flex flex-col">
        <QuestionTitle number={questionNumber} title={question.question} />
        {question.type === 'multiple' && (
          <MultipleChoiceQuestion question={question} selectedAnswer={selectedAnswer} onAnswer={onAnswer} />
        )}
        {question.type === 'image-grid' && (
          <ImageGridQuestion question={question} selectedAnswer={selectedAnswer} onAnswer={onAnswer} />
        )}
        {question.type === 'text-only' && (
          <MultipleChoiceQuestion question={question} selectedAnswer={selectedAnswer} onAnswer={onAnswer} />
        )}
        {
          questionLength === questionNumber && selectedAnswer && (
        <button
          onClick={onSubmit}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors self-start"
        >
          Submit
        </button>
          )
        }
      </div>
    </div>
  </motion.div>
)

export default function FullScreenSurvey() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)

  const questions: QuestionType[] = Questions as QuestionType[];


  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return
      
      setIsScrolling(true)
      setTimeout(() => setIsScrolling(false), 1000) // Debounce scrolling

      if (e.deltaY > 0 && currentQuestion < questions.length - 1 && answers[questions[currentQuestion].id]) {
        setCurrentQuestion(prev => prev + 1)
      } else if (e.deltaY < 0 && currentQuestion > 0) {
        setCurrentQuestion(prev => prev - 1)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel)
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [currentQuestion, questions.length, answers, isScrolling, questions])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentQuestion]);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: answer }))
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handleNavigation = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    } else if (direction === 'down' && currentQuestion < questions.length - 1 && answers[questions[currentQuestion].id]) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handleSubmit = () => {
    const result = getHighestScoringCharacter(answers);
    router.push(`/result/${encodeURIComponent(result)}`);
  }
  return (
    <div ref={containerRef} className="min-h-screen w-full bg-white text-black">
      {/* <div className="min-h-screen flex flex-col justify-between p-4 md:p-8 "> */}
      <div className="min-h-screen flex flex-col justify-between ">
        <ProgressBar current={currentQuestion} total={questions.length} />
        <div className="md:fixed md:top-2 md:right-4 sticky top-1 flex justify-end z-[1000]">
           <ConnectButton/>
        </div>
       
        <AnimatePresence mode="wait">
          <Question
            key={questions[currentQuestion].id}
            question={questions[currentQuestion]}
            questionLength={questions.length}
            questionNumber={currentQuestion + 1}
            selectedAnswer={answers[questions[currentQuestion].id]}
            onAnswer={handleAnswer}
            onSubmit={handleSubmit}
          />
        </AnimatePresence>
        <NavigationButtons
          onNavigate={handleNavigation}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          canNavigateDown={!!answers[questions[currentQuestion].id]}
        />
      </div>
    </div>
  )
}