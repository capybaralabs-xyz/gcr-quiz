
export type QuestionType = {
  id: string;
  type: 'multiple' | 'image-grid' | 'text-only';
  question: string;
  image: string;
  options?: Array<{ id: string; text: string }>;
  imageOptions?: Array<{ id: string; image: string; label: string }>;
  questionTextClassName?: string;
  answerContextClassName?: string;
  answerClassName?: string;
  imageBoxClassName?: string;
  objectFit?: 'contain' | 'cover';
}


export interface ResultType {
  character: string;
  text: string;
  img: string;
}


export interface NotificationState {
  visible: boolean;
  message?: string;
  type?: NotificationType;
}

export type NotificationType = 'copy'
