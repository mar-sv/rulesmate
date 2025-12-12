import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Video, FileText, ChevronUp, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileUXMockups = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"chat" | "resources">("chat");
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        Mobile UX Proposals for Resources Panel
      </h1>
      <p className="text-muted-foreground mb-8">
        Three options for accessing Rulebook & Video on mobile while keeping chat accessible
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Option 1: Bottom Tab Navigation */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold gradient-text">Option 1: Bottom Tabs</h2>
            <p className="text-sm text-muted-foreground">Switch between Chat and Resources</p>
          </div>
          <div className="border border-border rounded-2xl overflow-hidden bg-card aspect-[9/16] max-h-[500px] flex flex-col">
            {/* Header */}
            <div className="p-3 border-b border-border/50 bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-muted" />
                <div>
                  <div className="text-sm font-medium text-foreground">Carcassonne</div>
                  <div className="text-xs text-muted-foreground">Rules</div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4 overflow-auto">
              {activeTab === "chat" ? (
                <div className="space-y-3">
                  <div className="bg-muted/50 rounded-xl p-3 max-w-[80%]">
                    <p className="text-sm text-foreground">How do I score a city?</p>
                  </div>
                  <div className="bg-primary/20 rounded-xl p-3 max-w-[80%] ml-auto">
                    <p className="text-sm text-foreground">Cities score 2 points per tile...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-xl p-4 flex items-center gap-3">
                    <FileText className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Rulebook PDF</p>
                      <p className="text-xs text-muted-foreground">Tap to expand</p>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4 flex items-center gap-3">
                    <Video className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">How to Play</p>
                      <p className="text-xs text-muted-foreground">5 min video</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input - only visible in chat tab */}
            {activeTab === "chat" && (
              <div className="p-2 border-t border-border/50">
                <div className="bg-muted/30 rounded-full px-4 py-2 text-xs text-muted-foreground">
                  Ask about the rules...
                </div>
              </div>
            )}

            {/* Bottom Tab Bar */}
            <div className="border-t border-border bg-muted/30 flex">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-2 flex flex-col items-center gap-0.5 ${
                  activeTab === "chat" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-[10px]">Chat</span>
              </button>
              <button
                onClick={() => setActiveTab("resources")}
                className={`flex-1 py-2 flex flex-col items-center gap-0.5 ${
                  activeTab === "resources" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-[10px]">Resources</span>
              </button>
            </div>

            {/* Feedback Bar */}
            <div className="bg-[hsl(25,95%,53%)] py-1.5 text-center">
              <span className="text-[10px] text-background font-medium">Found a bug? Let us know!</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Pros:</strong> Clear separation, familiar pattern
            <br />
            <strong className="text-foreground">Cons:</strong> Cannot see both at once
          </div>
        </div>

        {/* Option 2: Collapsible Bottom Sheet */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold gradient-text">Option 2: Bottom Sheet</h2>
            <p className="text-sm text-muted-foreground">Swipe up to reveal resources</p>
          </div>
          <div className="border border-border rounded-2xl overflow-hidden bg-card aspect-[9/16] max-h-[500px] flex flex-col relative">
            {/* Header */}
            <div className="p-3 border-b border-border/50 bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-muted" />
                <div>
                  <div className="text-sm font-medium text-foreground">Carcassonne</div>
                  <div className="text-xs text-muted-foreground">Rules</div>
                </div>
              </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-4 overflow-auto pb-16">
              <div className="space-y-3">
                <div className="bg-muted/50 rounded-xl p-3 max-w-[80%]">
                  <p className="text-sm text-foreground">How do monasteries work?</p>
                </div>
                <div className="bg-primary/20 rounded-xl p-3 max-w-[80%] ml-auto">
                  <p className="text-sm text-foreground">A monastery scores 9 points when surrounded...</p>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-2 border-t border-border/50 bg-card">
              <div className="bg-muted/30 rounded-full px-4 py-2 text-xs text-muted-foreground">
                Ask about the rules...
              </div>
            </div>

            {/* Bottom Sheet */}
            <motion.div
              animate={{ height: sheetOpen ? "55%" : "40px" }}
              className="absolute bottom-8 left-0 right-0 bg-card border-t border-border rounded-t-2xl overflow-hidden"
            >
              <button
                onClick={() => setSheetOpen(!sheetOpen)}
                className="w-full p-2 flex items-center justify-center gap-2 text-xs font-medium text-foreground"
              >
                <motion.div animate={{ rotate: sheetOpen ? 180 : 0 }}>
                  <ChevronUp className="w-4 h-4" />
                </motion.div>
                <BookOpen className="w-3 h-3" />
                Resources
              </button>
              {sheetOpen && (
                <div className="p-3 space-y-2">
                  <div className="bg-muted/30 rounded-xl p-3 flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">Rulebook PDF</span>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-3 flex items-center gap-3">
                    <Video className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">How to Play Video</span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Feedback Bar */}
            <div className="bg-[hsl(25,95%,53%)] py-1.5 text-center absolute bottom-0 left-0 right-0">
              <span className="text-[10px] text-background font-medium">Found a bug? Let us know!</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Pros:</strong> Quick access, chat stays visible
            <br />
            <strong className="text-foreground">Cons:</strong> Overlay can feel cramped
          </div>
        </div>

        {/* Option 3: Inline Collapsible Header */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold gradient-text">Option 3: Header Accordion</h2>
            <p className="text-sm text-muted-foreground">Expand resources from header</p>
          </div>
          <div className="border border-border rounded-2xl overflow-hidden bg-card aspect-[9/16] max-h-[500px] flex flex-col">
            {/* Extended Header with Resources */}
            <div className="border-b border-border/50 bg-muted/30">
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-muted" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Carcassonne</div>
                    <div className="text-xs text-muted-foreground">Rules</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-primary/20 text-primary">
                    <FileText className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-primary/20 text-primary">
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Quick Access Strip */}
              <div className="px-3 pb-2 flex gap-2 overflow-x-auto">
                <div className="shrink-0 bg-muted/50 rounded-full px-3 py-1 text-xs text-foreground flex items-center gap-1">
                  <FileText className="w-3 h-3" /> Rulebook
                </div>
                <div className="shrink-0 bg-muted/50 rounded-full px-3 py-1 text-xs text-foreground flex items-center gap-1">
                  <Video className="w-3 h-3" /> Video
                </div>
              </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-4 overflow-auto">
              <div className="space-y-3">
                <div className="bg-muted/50 rounded-xl p-3 max-w-[80%]">
                  <p className="text-sm text-foreground">What about farmers?</p>
                </div>
                <div className="bg-primary/20 rounded-xl p-3 max-w-[80%] ml-auto">
                  <p className="text-sm text-foreground">Farmers are scored at game end...</p>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-2 border-t border-border/50">
              <div className="bg-muted/30 rounded-full px-4 py-2 text-xs text-muted-foreground">
                Ask about the rules...
              </div>
            </div>

            {/* Feedback Bar */}
            <div className="bg-[hsl(25,95%,53%)] py-1.5 text-center">
              <span className="text-[10px] text-background font-medium">Found a bug? Let us know!</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Pros:</strong> Always visible, no mode switching
            <br />
            <strong className="text-foreground">Cons:</strong> Takes header space
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileUXMockups;
