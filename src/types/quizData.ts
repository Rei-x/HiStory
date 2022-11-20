export type QuizData = {
  id: string;
  topicId: string;
  title: string;
  level: "easy" | "medium" | "hard";
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];
};
