import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, FileText, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface RulebookViewerProps {
  game: string;
  highlightedSection?: string | null;
  onClearHighlight?: () => void;
}

// Mock parsed rulebook sections
const MOCK_RULEBOOK_SECTIONS = [
  {
    id: "p1",
    page: 1,
    title: "Objective & Winning",
    content: "The objective of the game is to be the first player to accumulate 10 victory points. Victory points can be earned through building settlements (1 point each), cities (2 points each), having the longest road (2 points), having the largest army (2 points), and certain development cards (1 point each)."
  },
  {
    id: "p2",
    page: 2,
    title: "Setup",
    content: "Place the hexagonal tiles randomly to form the island. Each player starts with 2 settlements and 2 roads. Settlements must be placed at intersections where at least one of the adjacent hexes produces resources. Initial placement follows reverse turn order for the second settlement."
  },
  {
    id: "p3",
    page: 3,
    title: "Turn Structure",
    content: "On your turn: 1) Roll the dice - all players collect resources from hexes matching the number rolled. 2) Trade - you may trade with other players or use maritime trade. 3) Build - spend resources to build roads, settlements, cities, or buy development cards."
  },
  {
    id: "p4",
    page: 4,
    title: "The Robber",
    content: "When a 7 is rolled, no one collects resources. Any player with more than 7 cards must discard half. The active player must move the robber to a new hex, blocking that hex from producing. The player may also steal one random card from an adjacent player."
  },
  {
    id: "p5",
    page: 5,
    title: "Building Costs",
    content: "Road: 1 Brick + 1 Lumber. Settlement: 1 Brick + 1 Lumber + 1 Wool + 1 Grain. City: 2 Grain + 3 Ore. Development Card: 1 Wool + 1 Grain + 1 Ore. You must have available pieces to build."
  }
];

export const RulebookViewer = ({ game, highlightedSection, onClearHighlight }: RulebookViewerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-expand when a section is highlighted
  useEffect(() => {
    if (highlightedSection) {
      setIsExpanded(true);
    }
  }, [highlightedSection]);

  const handleClose = () => {
    setIsFullscreen(false);
    onClearHighlight?.();
  };

  const ParsedContent = ({ compact = false }: { compact?: boolean }) => (
    <div className={`space-y-3 ${compact ? "max-h-[300px]" : "max-h-[60vh]"} overflow-y-auto pr-2`}>
      {MOCK_RULEBOOK_SECTIONS.map((section) => {
        const isHighlighted = highlightedSection === section.id;
        return (
          <motion.div
            key={section.id}
            initial={isHighlighted ? { scale: 1.02 } : {}}
            animate={isHighlighted ? { scale: 1, backgroundColor: "hsl(var(--primary) / 0.15)" } : {}}
            className={`p-3 rounded-lg border transition-all duration-300 ${
              isHighlighted
                ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                : "border-border/30 bg-background/30 hover:bg-background/50"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-primary">Page {section.page}</span>
              <span className="text-xs text-muted-foreground">{section.title}</span>
            </div>
            <p className={`text-sm text-foreground/80 leading-relaxed ${compact ? "line-clamp-3" : ""}`}>
              {section.content}
            </p>
          </motion.div>
        );
      })}
    </div>
  );

  const PDFMockup = () => (
    <div className="bg-white rounded-lg p-4 min-h-[200px] flex flex-col items-center justify-center text-gray-500">
      <FileText className="w-16 h-16 mb-3 text-gray-300" />
      <p className="text-sm font-medium">{game} Rulebook PDF</p>
      <p className="text-xs mt-1">PDF viewer would render here</p>
      <div className="mt-4 flex gap-2">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
              highlightedSection === `p${page}`
                ? "bg-primary text-primary-foreground"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-3">
        {/* PDF Preview */}
        <div className="relative bg-background/50 border border-border/50 rounded-xl overflow-hidden">
          <div className="absolute top-2 right-2 z-10 flex gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-md bg-background/80 hover:bg-background border border-border/50 transition-colors"
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Maximize2 className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-1.5 rounded-md bg-background/80 hover:bg-background border border-border/50 transition-colors"
            >
              <Maximize2 className="w-4 h-4 text-primary" />
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={isExpanded ? "expanded" : "collapsed"}
              initial={{ height: 120 }}
              animate={{ height: isExpanded ? "auto" : 120 }}
              className="overflow-hidden"
            >
              <div className="p-4">
                <PDFMockup />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Parsed Text Sections */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground/70">Parsed Sections</h4>
            {highlightedSection && (
              <button
                onClick={onClearHighlight}
                className="text-xs text-primary hover:underline"
              >
                Clear highlight
              </button>
            )}
          </div>
          <ParsedContent compact={!isExpanded} />
        </div>
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 gap-0">
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <h2 className="text-lg font-semibold">{game} - Complete Rulebook</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-muted rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex overflow-hidden">
            {/* PDF Side */}
            <div className="flex-1 p-4 border-r border-border/50 overflow-auto bg-muted/30">
              <PDFMockup />
            </div>
            {/* Parsed Text Side */}
            <div className="w-[400px] p-4 overflow-auto">
              <h3 className="text-sm font-semibold mb-3 text-foreground/70">Parsed Content</h3>
              <ParsedContent />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
