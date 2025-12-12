import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, FileText, X, BookOpen, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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

const PDF_URL = "/rulebooks/Terraforming_Mars.pdf";

export const RulebookViewer = ({ game, highlightedSection, onClearHighlight }: RulebookViewerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const highlightedRef = useRef<HTMLDivElement>(null);

  // Get the page number from highlighted section
  const getPageFromSection = (sectionId: string | null): number => {
    if (!sectionId) return pageNumber;
    const section = RULEBOOK_SECTIONS.find(s => s.id === sectionId);
    return section ? section.page : pageNumber;
  };

  // Auto-expand and navigate to page when a section is highlighted
  useEffect(() => {
    if (highlightedSection) {
      setIsExpanded(true);
      const targetPage = getPageFromSection(highlightedSection);
      setPageNumber(targetPage);
      setTimeout(() => {
        highlightedRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [highlightedSection]);

  const handleClose = () => {
    setIsFullscreen(false);
    onClearHighlight?.();
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("PDF load error:", error);
    setPdfError("Failed to load PDF");
  };

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages || prev));

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
            onClick={() => setPageNumber(section.page)}
            className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
              isHighlighted
                ? "border-primary bg-primary/10 ring-2 ring-primary/30 shadow-lg"
                : "border-border/30 bg-background/30 hover:bg-background/50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                isHighlighted || pageNumber === section.page 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
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

  const PDFContent = ({ width = 300 }: { width?: number }) => (
    <div className="flex flex-col items-center">
      <Document
        file={PDF_URL}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        }
        error={
          <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
            <FileText className="w-12 h-12 mb-2" />
            <p className="text-sm">{pdfError || "Failed to load PDF"}</p>
          </div>
        }
      >
        <Page 
          pageNumber={pageNumber} 
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          loading={
            <div className="flex items-center justify-center" style={{ width, height: width * 1.4 }}>
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          }
        />
      </Document>
      
      {/* Page Navigation */}
      {numPages && (
        <div className="flex items-center gap-3 mt-3 p-2 bg-muted/50 rounded-lg">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-1.5 rounded-md hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium min-w-[80px] text-center">
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="p-1.5 rounded-md hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
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
              initial={{ height: 220 }}
              animate={{ height: isExpanded ? "auto" : 220 }}
              className="overflow-hidden"
            >
              <div className="p-3 flex justify-center">
                <PDFContent width={isExpanded ? 380 : 280} />
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
            <div className="flex-1 p-4 border-r border-border/50 overflow-auto bg-muted/20 flex justify-center">
              <PDFContent width={500} />
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
