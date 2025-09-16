export type QuizChoice = {
    choiceId: number;
    choiceLabel: string
}

export type QuizQuestion = {
    questionId: number
    title: string
    data: QuizChoice[]
}