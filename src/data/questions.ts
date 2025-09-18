export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Which ancient Indian practice is now a multi-billion dollar global industry, promoting physical and mental wellness worldwide?",
    options: [
      "Classical Indian Dance",
      "Yoga and Meditation",
      "Ayurvedic Cooking",
      "Sanskrit Literature"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "What is the estimated global market value of Ayurveda, India's traditional system of medicine?",
    options: [
      "$2-3 billion",
      "$8-9 billion", 
      "$15-16 billion",
      "$25-30 billion"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Geographical Indication (GI) tags help protect traditional products. Which of these Indian products has a GI tag that contributes significantly to exports?",
    options: [
      "Basmati Rice",
      "Darjeeling Tea", 
      "Mysore Silk",
      "All of the above"
    ],
    correctAnswer: 3
  },
  {
    id: 4,
    question: "India's traditional handicrafts industry employs millions and generates substantial export revenue. What percentage of India's total exports do handicrafts represent?",
    options: [
      "1-2%",
      "3-4%",
      "6-7%", 
      "10-12%"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Traditional knowledge of biodiversity has led to discoveries in modern pharmaceuticals. Approximately what percentage of modern drugs are derived from natural compounds, many from traditional knowledge systems?",
    options: [
      "15-20%",
      "25-30%",
      "40-50%",
      "60-70%"
    ],
    correctAnswer: 2
  }
];