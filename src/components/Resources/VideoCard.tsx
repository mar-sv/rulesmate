import { Play } from "lucide-react";

interface VideoCardProps {
  game: string;
}

export const VideoCard = ({ game }: VideoCardProps) => {
  // Mock video display - in production, this would use react-player or YouTube embed
  return (
    <div className="relative bg-background/50 border border-border/50 rounded-xl overflow-hidden group cursor-pointer aspect-video">
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-start/20 to-accent-end/20">
        <div className="bg-bga-surface/90 rounded-full p-4 group-hover:scale-110 transition-transform">
          <Play className="w-8 h-8 text-foreground" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/90 to-transparent">
        <p className="text-sm font-medium text-foreground">{game} Tutorial</p>
        <p className="text-xs text-muted-foreground">Click to play</p>
      </div>
    </div>
  );
};
