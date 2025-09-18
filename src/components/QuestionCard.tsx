import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface QuestionCardProps {
  question: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
  };
  selectedAnswer: number | null;
  isAnswered: boolean;
  onAnswerSelect: (answerIndex: number) => void;
  currentQuestion: number;
  totalQuestions: number;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  isAnswered,
  onAnswerSelect,
  currentQuestion,
  totalQuestions,
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-slide-up">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <div className="h-2 bg-muted rounded-full w-32">
            <div
              className="h-2 bg-gradient-hero rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <Card className="bg-gradient-parchment border-2 border-secondary/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-foreground leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, index) => {
            let buttonVariant = "outline";
            let icon = null;
            
            if (isAnswered) {
              if (index === question.correctAnswer) {
                buttonVariant = "default";
                icon = <CheckCircle className="w-5 h-5 text-success" />;
              } else if (index === selectedAnswer && index !== question.correctAnswer) {
                buttonVariant = "destructive";
                icon = <XCircle className="w-5 h-5" />;
              }
            } else if (selectedAnswer === index) {
              buttonVariant = "secondary";
            }

            return (
              <Button
                key={index}
                variant={buttonVariant as any}
                className={`w-full justify-start text-left p-4 h-auto transition-all duration-200 ${
                  isAnswered && index === question.correctAnswer
                    ? "bg-success text-success-foreground border-success"
                    : isAnswered && index === selectedAnswer && index !== question.correctAnswer
                    ? "bg-destructive text-destructive-foreground"
                    : !isAnswered && selectedAnswer === index
                    ? "bg-secondary text-secondary-foreground"
                    : "hover:bg-secondary/50"
                }`}
                onClick={() => !isAnswered && onAnswerSelect(index)}
                disabled={isAnswered}
              >
                <div className="flex items-center gap-3 w-full">
                  <span className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {icon}
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}