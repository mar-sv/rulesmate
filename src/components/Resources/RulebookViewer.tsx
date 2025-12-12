import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, FileText, X, BookOpen } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface RulebookViewerProps {
  game: string;
  highlightedSection?: string | null;
  onClearHighlight?: () => void;
}

// Parsed Terraforming Mars rulebook sections
const RULEBOOK_SECTIONS = [
  {
    id: "p1",
    page: 1,
    title: "Game Overview",
    content: "In Terraforming Mars, you control a corporation, and you buy and play cards describing different projects. The projects often directly or indirectly contribute to the terraforming process. In order to win, you have to accumulate a good terraform rating (TR) and many victory points (VPs). Your TR is increased each time you raise a global parameter (temperature, oxygen or ocean). Your TR determines your basic income, as well as your basic score."
  },
  {
    id: "p2",
    page: 2,
    title: "Global Parameters",
    content: "Temperature, oxygen, and ocean are called global parameters. Whenever you raise one of them, your terraform rating also increases by that much, giving you a higher income and score. When a global parameter has reached its goal, it can't be raised any further. When all three global parameters have reached their goal, the game ends after that generation."
  },
  {
    id: "p3",
    page: 3,
    title: "Generations & Phases",
    content: "Time is measured in generations. Each generation starts with a Turn Order phase, followed by a Research phase (draw 4 cards, buy 0-4 for 3 M€ each). In the Action phase, players take turns doing 1 or 2 actions until everyone has passed. Then, in the Production phase, all players produce resources according to their production parameters."
  },
  {
    id: "p4",
    page: 4,
    title: "Actions",
    content: "Players may do 1 or 2 actions: A) Play a card from hand. B) Use a standard project. C) Claim a milestone (pay 8 M€, worth 5 VP). D) Fund an award (8/14/20 M€). E) Use action on blue card. F) Convert 8 plants into greenery tile. G) Convert 8 heat into temperature increase."
  },
  {
    id: "p5",
    page: 5,
    title: "Tiles",
    content: "Ocean tiles may only be placed on reserved areas and increase your TR 1 step. Greenery tiles must be placed next to your tiles if possible, increase oxygen and TR, and are worth 1 VP. City tiles may not be placed next to another city and are worth 1 VP per adjacent greenery at game end."
  },
  {
    id: "p6",
    page: 6,
    title: "Resources",
    content: "MegaCredits (M€) are used to pay for cards. Steel is worth 2 M€ for building tags. Titanium is worth 3 M€ for space tags. Plants can be converted to greenery tiles (8 plants). Energy powers many cards and converts to heat. Heat can raise temperature (8 heat = 1 step)."
  },
  {
    id: "p7",
    page: 7,
    title: "Milestones",
    content: "Only 3 of 5 milestones may be claimed. Each costs 8 M€ and is worth 5 VP. Terraformer: TR of 35+. Mayor: 3+ city tiles. Gardener: 3+ greenery tiles. Builder: 8+ building tags. Planner: 16+ cards in hand."
  },
  {
    id: "p8",
    page: 8,
    title: "Awards",
    content: "Only 3 awards may be funded (8/14/20 M€). At game end, 1st place gets 5 VP, 2nd gets 2 VP. Ties are friendly. Landlord: most tiles. Banker: highest M€ production. Scientist: most science tags. Thermalist: most heat cubes. Miner: most steel + titanium cubes."
  },
  {
    id: "p9",
    page: 9,
    title: "Game End & Scoring",
    content: "When all global parameters reach their goals, the game ends after that generation. Final scoring: 1) TR is your basic score. 2) Awards: 5 VP for 1st, 2 VP for 2nd. 3) Milestones: 5 VP each. 4) Board: 1 VP per greenery, cities score adjacent greenery. 5) Card VPs. Highest total wins!"
  }
];

export const RulebookViewer = ({ game, highlightedSection, onClearHighlight }: RulebookViewerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const highlightedRef = useRef<HTMLDivElement>(null);

  // Auto-expand and scroll when a section is highlighted
  useEffect(() => {
    if (highlightedSection) {
      setIsExpanded(true);
      // Scroll to highlighted section after a short delay for animation
      setTimeout(() => {
        highlightedRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [highlightedSection]);

  const handleClose = () => {
    setIsFullscreen(false);
    onClearHighlight?.();
  };

  const ParsedContent = ({ compact = false }: { compact?: boolean }) => (
    <div className={`space-y-3 ${compact ? "max-h-[300px]" : "max-h-[60vh]"} overflow-y-auto pr-2 scrollbar-thin`}>
      {RULEBOOK_SECTIONS.map((section) => {
        const isHighlighted = highlightedSection === section.id;
        return (
          <motion.div
            key={section.id}
            ref={isHighlighted ? highlightedRef : null}
            initial={isHighlighted ? { scale: 1.02 } : {}}
            animate={isHighlighted ? { 
              scale: 1, 
              backgroundColor: "hsl(var(--primary) / 0.15)",
              transition: { duration: 0.3 }
            } : {}}
            className={`p-3 rounded-lg border transition-all duration-300 ${
              isHighlighted
                ? "border-primary bg-primary/10 ring-2 ring-primary/30 shadow-lg"
                : "border-border/30 bg-background/30 hover:bg-background/50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                isHighlighted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                Page {section.page}
              </span>
              <span className="text-xs font-medium text-foreground/70">{section.title}</span>
            </div>
            <p className={`text-sm text-foreground/80 leading-relaxed ${compact && !isHighlighted ? "line-clamp-2" : ""}`}>
              {section.content}
            </p>
          </motion.div>
        );
      })}
    </div>
  );

  const PDFMockup = ({ large = false }: { large?: boolean }) => (
    <div className={`bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200/50 dark:border-amber-800/30 ${large ? "p-6" : "p-4"} flex flex-col`}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-amber-200/50 dark:border-amber-800/30">
        <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        <span className="font-semibold text-amber-900 dark:text-amber-100">Terraforming Mars - Official Rulebook</span>
      </div>
      
      {/* PDF Page mockup */}
      <div className={`bg-white dark:bg-gray-900 rounded shadow-inner p-4 ${large ? "min-h-[400px]" : "min-h-[120px]"} flex flex-col`}>
        <div className="text-center mb-4">
          <h1 className="text-lg font-bold text-red-700 dark:text-red-400">TERRAFORMING MARS</h1>
          <p className="text-xs text-gray-500">by Jacob Fryxelius</p>
        </div>
        
        <div className="flex-1 text-xs text-gray-600 dark:text-gray-400 space-y-2">
          <p className="font-medium text-gray-800 dark:text-gray-200">Game Overview</p>
          <p className="line-clamp-3">In Terraforming Mars, you control a corporation, and you buy and play cards describing different projects. The projects often directly or indirectly contribute to the terraforming process...</p>
        </div>
      </div>

      {/* Page navigation */}
      <div className="mt-4 flex items-center justify-center gap-1">
        {RULEBOOK_SECTIONS.map((section) => (
          <button
            key={section.id}
            className={`w-7 h-7 rounded text-xs font-medium transition-all ${
              highlightedSection === section.id
                ? "bg-primary text-primary-foreground ring-2 ring-primary/50 scale-110"
                : "bg-amber-100 dark:bg-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-800/50 text-amber-700 dark:text-amber-300"
            }`}
          >
            {section.page}
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
              title={isExpanded ? "Collapse" : "Expand"}
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
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4 text-primary" />
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={isExpanded ? "expanded" : "collapsed"}
              initial={{ height: 180 }}
              animate={{ height: isExpanded ? "auto" : 180 }}
              className="overflow-hidden"
            >
              <div className="p-3">
                <PDFMockup />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Parsed Text Sections */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground/70 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Parsed Sections
            </h4>
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
        <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0 gap-0">
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/30">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Terraforming Mars - Complete Rulebook
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-muted rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex overflow-hidden">
            {/* PDF Side */}
            <div className="flex-1 p-4 border-r border-border/50 overflow-auto bg-muted/20">
              <PDFMockup large />
            </div>
            {/* Parsed Text Side */}
            <div className="w-[420px] p-4 overflow-auto bg-background">
              <h3 className="text-sm font-semibold mb-3 text-foreground/70 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Parsed Content
              </h3>
              <ParsedContent />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
