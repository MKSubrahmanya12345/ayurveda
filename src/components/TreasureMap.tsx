import treasureMapImage from "@/assets/treasure-map.jpg";
import { X } from "lucide-react";

interface TreasureMapProps {
  revealedMarkers: boolean[];
}

export default function TreasureMap({ revealedMarkers }: TreasureMapProps) {
  // Positions for the X markers on the map (percentage-based for responsiveness)
  const markerPositions = [
    { top: "18%", left: "15%" },
    { top: "28%", left: "40%" },
    { top: "22%", left: "70%" },
    { top: "40%", left: "20%" },
    { top: "48%", left: "55%" },
    { top: "42%", left: "80%" },
    { top: "65%", left: "30%" },
    { top: "70%", left: "65%" },
    { top: "82%", left: "45%" },
    { top: "88%", left: "75%" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative bg-gradient-parchment p-6 rounded-lg border-2 border-secondary/30 shadow-xl">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Treasure Map of Traditional Knowledge
        </h3>
        
        <div className="relative overflow-hidden rounded-lg border border-map-brown/30">
          <img
            src={treasureMapImage}
            alt="Ancient treasure map showing various locations"
            className="w-full h-auto object-cover"
          />
          
          {/* X Markers */}
          {markerPositions.map((position, index) => (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                top: position.top,
                left: position.left,
              }}
            >
              {revealedMarkers[index] && (
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-treasure-gold rounded-full blur-md animate-treasure-glow" />
                  
                  {/* X marker */}
                  <X
                    className="relative w-8 h-8 text-primary stroke-[4] animate-x-marker-reveal"
                    style={{
                      filter: "drop-shadow(0 0 8px hsl(var(--treasure-gold)))",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-background/90 p-3 rounded-lg border border-secondary/50">
            <div className="text-sm text-foreground font-medium mb-2">Progress</div>
            <div className="flex gap-2">
              {revealedMarkers.map((revealed, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    revealed
                      ? "bg-treasure-gold border-treasure-gold shadow-sm"
                      : "bg-muted border-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground text-center mt-4">
          Answer questions correctly to reveal the locations of traditional knowledge treasures!
        </p>
      </div>
    </div>
  );
}