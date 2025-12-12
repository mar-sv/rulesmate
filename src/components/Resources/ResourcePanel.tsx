import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, FileText, Video } from "lucide-react";
import { PDFViewer } from "./PDFViewer";
import { VideoCard } from "./VideoCard";

interface ResourcePanelProps {
  game: string;
}

export const ResourcePanel = ({ game }: ResourcePanelProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-20 md:hidden z-50 bg-bga-surface border border-border/50 rounded-full p-3 shadow-soft"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full bg-bga-surface overflow-y-auto"
          >
            <div className="sticky top-0 bg-bga-surface border-b border-border/50 p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Resources</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="md:hidden text-muted-foreground hover:text-foreground"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* PDF Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-foreground/80">
                  <FileText className="w-5 h-5" />
                  <h3 className="font-semibold">Rulebook</h3>
                </div>
                <PDFViewer game={game} />
              </div>

              {/* Video Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-foreground/80">
                  <Video className="w-5 h-5" />
                  <h3 className="font-semibold">How to Play</h3>
                </div>
                <VideoCard game={game} />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
