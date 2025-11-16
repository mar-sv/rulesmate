import { FileText } from "lucide-react";

interface PDFViewerProps {
  game: string;
}

export const PDFViewer = ({ game }: PDFViewerProps) => {
  // Mock PDF display - in production, this would use react-pdf
  return (
    <div className="bg-background/50 border border-border/50 rounded-xl p-6 min-h-[200px] flex flex-col items-center justify-center gap-3 text-center">
      <FileText className="w-12 h-12 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium text-foreground">{game} Rulebook</p>
        <p className="text-xs text-muted-foreground mt-1">
          PDF viewer will be integrated here
        </p>
      </div>
      <button className="mt-2 text-sm gradient-text font-medium hover:underline">
        Open Full Rulebook
      </button>
    </div>
  );
};
