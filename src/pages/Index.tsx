import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Compass, Sparkles, Play } from "lucide-react";
import QuestionCard from "@/components/QuestionCard";
import TreasureMap from "@/components/TreasureMap";
import ResultScreen from "@/components/ResultScreen";
import { questions } from "@/data/questions";
import { useToast } from "@/hooks/use-toast";
import { claimsService } from "@/lib/claimsService";

type GameState = 'landing' | 'quiz' | 'result';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [revealedMarkers, setRevealedMarkers] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const { toast } = useToast();
  const [teamName, setTeamName] = useState<string>(() => {
    const key = "tw_team_name";
    const existing = localStorage.getItem(key);
    return existing ?? "";
  });

  const currentQuestion = questions[currentQuestionIndex];
  const score = selectedAnswers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;

  const startQuiz = () => {
    if (!teamName.trim()) {
      toast({ title: "Enter team name", description: "Please enter your team name to start." });
      return;
    }
    try { localStorage.setItem("tw_team_name", teamName.trim()); } catch {}
    setGameState('quiz');
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setRevealedMarkers(new Array(questions.length).fill(false));
    setShowAnswer(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowAnswer(true);

    // Check if answer is correct and reveal marker
    if (answerIndex === currentQuestion.correctAnswer) {
      const newMarkers = [...revealedMarkers];
      newMarkers[currentQuestionIndex] = true;
      setRevealedMarkers(newMarkers);

      // Try to claim via service (API if configured, else local)
      claimsService
        .claim(currentQuestion.id, teamName)
        .then((res) => {
          if (res.awarded) {
            toast({
              title: `Correct! Code: ${(res.code ?? currentQuestion.code).toUpperCase()}`,
              description: `You're in the top 3 for this question. Location: ${res.location ?? currentQuestion.location}`,
            });
          } else {
            toast({
              title: "Correct!",
              description: "Good job! You answered correctly. (Top 3 already claimed)",
            });
          }
        })
        .catch(() => {
          // On unexpected error, still show generic success
          toast({
            title: "Correct!",
            description: "Good job!",
          });
        });
    } else {
      toast({
        title: "Not quite right",
        description: "But you're learning valuable knowledge!",
        variant: "destructive",
      });
    }

    // Auto advance to next question or results
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowAnswer(false);
      } else {
        setGameState('result');
      }
    }, 2000);
  };

  const restartQuiz = () => {
    startQuiz();
  };

  if (gameState === 'landing') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="space-y-4 animate-fade-slide-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Compass className="w-12 h-12 text-treasure-gold" />
              <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Mystery Treasure Hunt:
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-hero bg-clip-text text-transparent">
              The Wealth of Traditional Knowledge
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Embark on an educational adventure to discover how India's ancient wisdom 
              creates immense value in today's global economy. Each correct answer reveals 
              a treasure location on your map!
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 my-12">
            <Card className="bg-gradient-parchment border-secondary/30">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧘</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Ancient Wisdom</h3>
                <p className="text-sm text-muted-foreground">
                  Explore Ayurveda, Yoga, and traditional practices
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-parchment border-secondary/30">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏺</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Cultural Heritage</h3>
                <p className="text-sm text-muted-foreground">
                  Discover handicrafts and traditional arts
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-parchment border-secondary/30">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-treasure-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Global Economy</h3>
                <p className="text-sm text-muted-foreground">
                  Learn about economic impact and value creation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Start Button */}
          <div className="mx-auto max-w-md space-y-3 animate-fade-slide-up">
            <Input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter your team name"
            />
            <Button
              onClick={startQuiz}
              className="bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity px-8 py-4 text-xl font-semibold w-full"
              size="lg"
              disabled={!teamName.trim()}
            >
              <Play className="w-6 h-6 mr-2" />
              Start Your Treasure Hunt
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">10 questions • Interactive map • Educational journey</p>
        </div>
      </div>
    );
  }

  if (gameState === 'quiz') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-6xl mx-auto space-y-8 pt-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Traditional Knowledge Treasure Hunt
            </h1>
            <p className="text-muted-foreground">
              Answer correctly to reveal treasure locations on the map!
            </p>
          </div>

          {/* Quiz Layout */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Question Card */}
            <div className="order-2 lg:order-1">
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={selectedAnswers[currentQuestionIndex]}
                isAnswered={showAnswer}
                onAnswerSelect={handleAnswerSelect}
                currentQuestion={currentQuestionIndex}
                totalQuestions={questions.length}
              />
            </div>

            {/* Treasure Map */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-8">
              <TreasureMap revealedMarkers={revealedMarkers} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'result') {
    // Pull from service to reflect authoritative claims
    // Note: this is a render path; for simplicity in this SPA, we compute synchronously from local fallback as a baseline.
    // The ResultScreen doesn't need live fetch since this is end-of-quiz, but we can precompute from local or rely on API in future enhancement.
    const unlockedRewards = questions
      .filter(q => {
        // local check remains for immediate feedback; service is used at claim time
        try {
          const raw = localStorage.getItem("tw_top3_claims");
          const map = raw ? JSON.parse(raw) as Record<number, string[]> : {};
          return (map[q.id] ?? []).includes(teamName);
        } catch { return false; }
      })
      .map(q => ({
        questionId: q.id,
        question: q.question,
        code: q.code,
        location: q.location,
      }));
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <ResultScreen
          score={score}
          totalQuestions={questions.length}
          unlockedRewards={unlockedRewards}
          onRestart={restartQuiz}
        />
      </div>
    );
  }

  return null;
};

export default Index;
