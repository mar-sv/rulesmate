import { useState } from "react";
import { FileText, Maximize2, Minimize2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PDFViewerProps {
  game: string;
}

export const PDFViewer = ({ game }: PDFViewerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOpenInNewWindow = () => {
    // In production, this would open the actual PDF URL
    window.open(`/rulebook/${encodeURIComponent(game)}`, "_blank", "width=900,height=700");
  };

  return (
    <motion.div
      layout
      className={`bg-background/50 border border-border/50 rounded-xl overflow-hidden ${
        isExpanded ? "min-h-[500px]" : "min-h-[200px]"
      }`}
    >
      {/* Header with controls */}
      <div className="flex items-center justify-between p-3 border-b border-border/30 bg-background/30">
        <span className="text-sm font-medium text-foreground">{game} Rulebook</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleOpenInNewWindow}
            className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            title="Open in new window"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PDF Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isExpanded ? "expanded" : "collapsed"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`flex flex-col items-center justify-center gap-3 text-center ${
            isExpanded ? "p-6 min-h-[450px]" : "p-6 min-h-[150px]"
          }`}
        >
          <FileText className={`text-muted-foreground ${isExpanded ? "w-16 h-16" : "w-12 h-12"}`} />
          <div>
            <p className="text-xs text-muted-foreground">
              {isExpanded 
                ? "Full PDF viewer will be integrated here" 
                : "PDF preview - click expand to view more"}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
