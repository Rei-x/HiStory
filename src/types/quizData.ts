export type QuizData = {
  id: string;
  topicId: string;
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];
};
