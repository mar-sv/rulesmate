import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ChatThread, Message } from "@/components/Chat/ChatThread";
import { ChatInput } from "@/components/Chat/ChatInput";
import { ResourcePanel } from "@/components/Resources/ResourcePanel";
import { FeedbackBar } from "@/components/FeedbackBar";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { intent, game } = (location.state as { intent?: string; game?: string }) || {};

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);

  // Initialize with welcome message that includes source references for Terraforming Mars
  useEffect(() => {
    if (intent && game) {
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: `Great! I'll help you with the ${intent} for ${game}. 

Here's a quick overview: In Terraforming Mars, you control a corporation and play project cards to terraform the planet. Your goal is to accumulate the highest Terraform Rating (TR) and Victory Points (source p.1).

The game ends when all three global parameters - temperature, oxygen, and ocean - reach their goals (source p.2). Each generation has 4 phases: Turn Order, Research, Action, and Production (source p.3).

What would you like to know more about?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [intent, game]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response with Terraforming Mars content
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Great question! On your turn, you can take 1 or 2 actions (source p.4). These include:

• Playing cards from your hand
• Using standard projects (like placing ocean tiles for 18 M€)
• Claiming milestones (8 M€, worth 5 VP each) - only 3 can be claimed! (source p.7)
• Funding awards (8/14/20 M€) - winner gets 5 VP at game end (source p.8)
• Converting 8 plants into a greenery tile
• Converting 8 heat into a temperature increase

For resources: Steel is worth 2 M€ for building cards, Titanium is worth 3 M€ for space cards (source p.6).`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSourceClick = (sourceId: string) => {
    setHighlightedSection(sourceId);
  };

  const handleClearHighlight = () => {
    setHighlightedSection(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen w-full overflow-hidden"
    >
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Column */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b border-border/50 p-4 flex items-center gap-4 bg-bga-surface/50 backdrop-blur">
            <button
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{game || "Board Game"}</h1>
              <p className="text-sm text-muted-foreground capitalize">{intent || "Assistant"}</p>
            </div>
          </div>

          {/* Chat Thread */}
          <ChatThread 
            messages={messages} 
            isTyping={isTyping} 
            onSourceClick={handleSourceClick}
          />

          {/* Chat Input */}
          <ChatInput onSend={handleSendMessage} disabled={isTyping} />
        </div>

        {/* Resource Panel */}
        <ResourcePanel 
          game={game || "Board Game"} 
          highlightedSection={highlightedSection}
          onClearHighlight={handleClearHighlight}
        />
      </div>
      
      <FeedbackBar />
    </motion.div>
  );
};

export default Chat;
