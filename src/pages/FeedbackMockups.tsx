import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bug, ChevronUp, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const FeedbackMockups = () => {
  const [expandedOption, setExpandedOption] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-12 gap-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Feedback Widget Mockups</h1>
        <p className="text-muted-foreground">Visible but non-intrusive ways to report issues or contact developers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        
        {/* Option 1: Floating Action Button with Expandable Form */}
        <div className="border border-border rounded-lg p-8 space-y-4 bg-card relative min-h-[400px]">
          <h2 className="text-xl font-semibold text-foreground">Option 1: Floating Button</h2>
          <p className="text-sm text-muted-foreground">Fixed bottom-right FAB that expands into a form</p>
          
          <div className="relative h-64 bg-muted/30 rounded-lg overflow-hidden">
            {/* Mock landing page content */}
            <div className="p-6 space-y-4 opacity-40">
              <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
              <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
              <div className="h-12 bg-muted rounded w-2/3 mx-auto mt-8" />
            </div>
            
            {/* Floating button */}
            <div className="absolute bottom-4 right-4">
              <AnimatePresence mode="wait">
                {expandedOption === 1 ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-card border border-border rounded-xl shadow-lg p-4 w-64"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-foreground">Report an Issue</span>
                      <button 
                        onClick={() => setExpandedOption(null)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <Textarea 
                      placeholder="Describe the issue..." 
                      className="text-xs h-20 mb-2 resize-none"
                    />
                    <Button size="sm" className="w-full text-xs">
                      <Send className="w-3 h-3 mr-1" /> Send
                    </Button>
                  </motion.div>
                ) : (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setExpandedOption(1)}
                    className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
                  >
                    <Bug className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">✓ Always accessible ✓ Non-intrusive ✓ Works on all pages</p>
        </div>

        {/* Option 2: Collapsed Bottom Bar */}
        <div className="border border-border rounded-lg p-8 space-y-4 bg-card relative min-h-[400px]">
          <h2 className="text-xl font-semibold text-foreground">Option 2: Bottom Bar</h2>
          <p className="text-sm text-muted-foreground">Subtle bar at bottom that expands on click</p>
          
          <div className="relative h-64 bg-muted/30 rounded-lg overflow-hidden flex flex-col">
            {/* Mock landing page content */}
            <div className="flex-1 p-6 space-y-4 opacity-40">
              <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
              <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
              <div className="h-12 bg-muted rounded w-2/3 mx-auto mt-8" />
            </div>
            
            {/* Bottom bar */}
            <AnimatePresence mode="wait">
              {expandedOption === 2 ? (
                <motion.div
                  initial={{ height: 40 }}
                  animate={{ height: 140 }}
                  exit={{ height: 40 }}
                  className="bg-card border-t border-border p-3"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-foreground">Found a bug? Let us know!</span>
                    <button 
                      onClick={() => setExpandedOption(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="Describe the issue..." 
                      className="text-xs h-16 resize-none flex-1"
                    />
                    <Button size="sm" className="h-16 px-3">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setExpandedOption(2)}
                  className="bg-muted/50 hover:bg-muted border-t border-border py-2 px-4 flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronUp className="w-3 h-3" />
                  <span>Report an issue</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          <p className="text-xs text-muted-foreground">✓ Very subtle ✓ Always visible ✓ Doesn't overlay content</p>
        </div>

        {/* Option 3: Inline Collapsible Section */}
        <div className="border border-border rounded-lg p-8 space-y-4 bg-card relative min-h-[400px]">
          <h2 className="text-xl font-semibold text-foreground">Option 3: Inline Section</h2>
          <p className="text-sm text-muted-foreground">Collapsible section integrated into the page layout</p>
          
          <div className="relative h-64 bg-muted/30 rounded-lg overflow-hidden p-4">
            {/* Mock landing page content */}
            <div className="space-y-4 opacity-40">
              <div className="h-6 bg-muted rounded w-3/4 mx-auto" />
              <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
              <div className="h-10 bg-muted rounded w-2/3 mx-auto mt-4" />
            </div>
            
            {/* Inline feedback section */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <button
                onClick={() => setExpandedOption(expandedOption === 3 ? null : 3)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mx-auto transition-colors"
              >
                <MessageCircle className="w-3 h-3" />
                <span>Having trouble? Contact us</span>
              </button>
              
              <AnimatePresence>
                {expandedOption === 3 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 space-y-2">
                      <Input 
                        placeholder="Your email" 
                        className="text-xs h-8"
                      />
                      <Textarea 
                        placeholder="What's wrong?" 
                        className="text-xs h-12 resize-none"
                      />
                      <Button size="sm" className="w-full text-xs h-7">
                        Send Feedback
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">✓ Part of page flow ✓ Very discrete ✓ Natural placement</p>
        </div>

        {/* Option 4: Corner Tab */}
        <div className="border border-border rounded-lg p-8 space-y-4 bg-card relative min-h-[400px]">
          <h2 className="text-xl font-semibold text-foreground">Option 4: Corner Tab</h2>
          <p className="text-sm text-muted-foreground">Rotated tab on the side that slides out on hover/click</p>
          
          <div className="relative h-64 bg-muted/30 rounded-lg overflow-hidden">
            {/* Mock landing page content */}
            <div className="p-6 space-y-4 opacity-40">
              <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
              <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
              <div className="h-12 bg-muted rounded w-2/3 mx-auto mt-8" />
            </div>
            
            {/* Side tab */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <AnimatePresence mode="wait">
                {expandedOption === 4 ? (
                  <motion.div
                    initial={{ x: 200 }}
                    animate={{ x: 0 }}
                    exit={{ x: 200 }}
                    className="bg-card border border-border rounded-l-xl shadow-lg p-4 w-56"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Feedback</span>
                      </div>
                      <button 
                        onClick={() => setExpandedOption(null)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <Input 
                        placeholder="Email (optional)" 
                        className="text-xs h-7"
                      />
                      <Textarea 
                        placeholder="Your feedback..." 
                        className="text-xs h-16 resize-none"
                      />
                      <Button size="sm" className="w-full text-xs">
                        <Mail className="w-3 h-3 mr-1" /> Submit
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ x: -4 }}
                    onClick={() => setExpandedOption(4)}
                    className="bg-primary text-primary-foreground py-4 px-2 rounded-l-lg shadow-md flex items-center"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                  >
                    <span className="text-xs font-medium flex items-center gap-1">
                      <Bug className="w-3 h-3 rotate-90" /> Feedback
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">✓ Unique look ✓ Persistent visibility ✓ Low footprint</p>
        </div>
      </div>

      <div className="text-center space-y-2 max-w-2xl">
        <p className="text-sm text-muted-foreground">
          All options can work on both the landing page and chat page. The floating button (Option 1) and corner tab (Option 4) are most portable across different layouts.
        </p>
      </div>
    </div>
  );
};

export default FeedbackMockups;
