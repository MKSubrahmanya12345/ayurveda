export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  code: string; // e.g., q001
  location: string; // placeholder to be updated later
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
    correctAnswer: 1,
    code: "q001",
    location: "Location 1"
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
    correctAnswer: 1,
    code: "q002",
    location: "Location 2"
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
    correctAnswer: 3,
    code: "q003",
    location: "Location 3"
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
    correctAnswer: 1,
    code: "q004",
    location: "Location 4"
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
    correctAnswer: 2,
    code: "q005",
    location: "Location 5"
  },
  {
    id: 6,
    question: "Which Indian textile, known for its intricate weaving, supports local economies and global fashion?",
    options: [
      "Banarasi Silk",
      "Khadi Cotton",
      "Pashmina Wool",
      "Chanderi Fabric"
    ],
    correctAnswer: 0,
    code: "q006",
    location: "Location 6"
  },
  {
    id: 7,
    question: "Which traditional Indian beverage has seen a global wellness trend for its anti-inflammatory properties?",
    options: [
      "Masala Chai",
      "Turmeric Latte (Haldi Doodh)",
      "Lassi",
      "Nimbu Pani"
    ],
    correctAnswer: 1,
    code: "q007",
    location: "Location 7"
  },
  {
    id: 8,
    question: "What traditional Indian system contributes to sustainable agriculture and biodiversity conservation?",
    options: [
      "Slash and Burn",
      "Hydroponics",
      "Vedic Farming",
      "Monoculture"
    ],
    correctAnswer: 2,
    code: "q008",
    location: "Location 8"
  },
  {
    id: 9,
    question: "Which Indian city is globally recognized for its handwoven carpets that drive exports?",
    options: [
      "Agra",
      "Bhadohi",
      "Surat",
      "Jodhpur"
    ],
    correctAnswer: 1,
    code: "q009",
    location: "Location 9"
  },
  {
    id: 10,
    question: "Which Indian classical medical text forms the foundation of Ayurveda?",
    options: [
      "Charaka Samhita",
      "Arthashastra",
      "Rigveda",
      "Sushruta Samhita"
    ],
    correctAnswer: 0,
    code: "q010",
    location: "Location 10"
  }
];