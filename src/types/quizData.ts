export type Answers = {
  [key in "a" | "b" | "c" | "d"]: string;
};

export type QuizData = {
  question: string,
  answers: Answers,
  correctAnswer: "a" | "b" | "c" | "d"
};
