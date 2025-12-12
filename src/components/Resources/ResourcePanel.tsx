import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Video, X, BookOpen } from "lucide-react";
import { PDFViewer } from "./PDFViewer";
import { VideoCard } from "./VideoCard";

interface ResourcePanelProps {
  game: string;
}

export const ResourcePanel = ({ game }: ResourcePanelProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed bottom-20 right-4 z-40 bg-primary text-background p-3 rounded-full shadow-lg"
      >
        <BookOpen className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Slide-up Panel */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="md:hidden fixed bottom-0 left-0 right-0 h-[70vh] bg-bga-surface border-t border-border/50 rounded-t-2xl z-50 overflow-hidden"
          >
            <div className="sticky top-0 bg-bga-surface border-b border-border/50 p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Resources</h2>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-6 overflow-y-auto h-[calc(70vh-60px)]">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-foreground/80">
                  <FileText className="w-5 h-5" />
                  <h3 className="font-semibold">Rulebook</h3>
                </div>
                <PDFViewer game={game} />
              </div>
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

      {/* Desktop Panel */}
      <aside className="hidden md:block h-full w-full bg-bga-surface overflow-y-auto">
        <div className="sticky top-0 bg-bga-surface border-b border-border/50 p-4">
          <h2 className="text-lg font-semibold text-foreground">Resources</h2>
        </div>
        <div className="p-4 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground/80">
              <FileText className="w-5 h-5" />
              <h3 className="font-semibold">Rulebook</h3>
            </div>
            <PDFViewer game={game} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground/80">
              <Video className="w-5 h-5" />
              <h3 className="font-semibold">How to Play</h3>
            </div>
            <VideoCard game={game} />
          </div>
        </div>
      </aside>
    </>
  );
};
