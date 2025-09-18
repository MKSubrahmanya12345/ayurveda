import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, RotateCcw, Sparkles } from "lucide-react";

interface UnlockedReward {
  questionId: number;
  question: string;
  code: string;
  location: string;
}

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  unlockedRewards?: UnlockedReward[];
  onRestart: () => void;
}

export default function ResultScreen({ score, totalQuestions, unlockedRewards = [], onRestart }: ResultScreenProps) {
  const isAllCorrect = score === totalQuestions;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-8 animate-bounce-in">
      {/* Treasure Chest */}
      <div className="relative">
        <div className="w-32 h-32 mx-auto bg-gradient-treasure rounded-lg border-4 border-treasure-gold shadow-xl animate-treasure-glow relative overflow-hidden">
          {/* Treasure chest lid */}
          <div className="absolute top-0 left-0 w-full h-8 bg-map-brown rounded-t-lg border-b-2 border-treasure-gold"></div>
          {/* Chest body */}
          <div className="absolute top-8 left-0 w-full h-24 bg-gradient-treasure"></div>
          {/* Lock */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-treasure-gold rounded-full border-2 border-map-brown"></div>
          {/* Sparkles */}
          <Sparkles className="absolute top-2 right-2 w-4 h-4 text-treasure-glow animate-pulse" />
          <Sparkles className="absolute bottom-2 left-2 w-3 h-3 text-treasure-glow animate-pulse delay-300" />
          <Sparkles className="absolute top-8 left-6 w-2 h-2 text-treasure-glow animate-pulse delay-700" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-4">
        <Trophy className="w-16 h-16 mx-auto text-treasure-gold" />
        
        {isAllCorrect ? (
          <>
            <h1 className="text-3xl font-bold text-foreground">
              🎉 Congratulations! 🎉
            </h1>
            <h2 className="text-xl text-primary font-semibold">
              You've discovered the real treasure:
            </h2>
            <p className="text-lg text-foreground max-w-md mx-auto leading-relaxed">
              <span className="font-bold text-treasure-gold">Traditional Knowledge</span> is true wealth in the global economy!
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-foreground">
              Great Effort! 
            </h1>
            <p className="text-lg text-muted-foreground">
              You discovered {score} out of {totalQuestions} treasures ({percentage}%)
            </p>
            <p className="text-base text-foreground max-w-md mx-auto">
              Keep exploring to unlock the full value of <span className="font-bold text-primary">Traditional Knowledge</span>!
            </p>
          </>
        )}
      </div>

      {/* Score Card */}
      <Card className="bg-gradient-parchment border-2 border-secondary/30">
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-success">{score}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-destructive">{totalQuestions - score}</div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-treasure-gold">{percentage}%</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Message */}
      <div className="bg-muted/50 p-6 rounded-lg border border-border">
        <h3 className="font-semibold text-foreground mb-3">Did you know?</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          India's traditional knowledge contributes billions to the global economy through 
          Ayurveda, Yoga, handicrafts, and biodiversity innovations. This ancient wisdom 
          continues to create sustainable value in modern markets worldwide.
        </p>
      </div>

      {/* Unlocked Codes */}
      <Card className="bg-gradient-parchment border-2 border-secondary/30">
        <CardContent className="p-6 text-left">
          <h3 className="font-semibold text-foreground mb-3">Unlocked Codes</h3>
          {unlockedRewards.length === 0 ? (
            <p className="text-sm text-muted-foreground">No codes unlocked yet. Be among the top 3 correct answers to claim codes.</p>
          ) : (
            <ul className="space-y-2">
              {unlockedRewards
                .sort((a, b) => a.questionId - b.questionId)
                .map(reward => (
                  <li key={reward.questionId} className="flex items-start gap-3">
                    <span className="inline-flex items-center rounded-md bg-primary/10 text-primary px-2 py-1 text-xs font-medium">
                      {reward.code.toUpperCase()}
                    </span>
                    <div className="flex-1">
                      <div className="text-sm text-foreground font-medium">Question {reward.questionId}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{reward.question}</div>
                      <div className="text-xs text-secondary mt-1">Location: {reward.location}</div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Restart Button */}
      <Button
        onClick={onRestart}
        className="bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity px-8 py-3 text-lg font-semibold"
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        Explore Again
      </Button>
    </div>
  );
}