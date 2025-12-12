import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ChatThread, Message } from "@/components/Chat/ChatThread";
import { ChatInput } from "@/components/Chat/ChatInput";
import { ResourcePanel } from "@/components/Resources/ResourcePanel";
import { FeedbackBar } from "@/components/FeedbackBar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { intent, game } = (location.state as { intent?: string; game?: string }) || {};

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize with welcome message
  useEffect(() => {
    if (intent && game) {
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: `Great! I'll help you with the ${intent} for ${game}. What would you like to know?`,
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

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `This is a simulated response. In production, this would connect to your LLM backend trained on ${game} rulebook. Your question was: "${content}"`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen w-full overflow-hidden"
    >
      {/* Header - visible on all screens */}
      <div className="border-b border-border/50 p-4 flex items-center gap-4 bg-bga-surface/50 backdrop-blur shrink-0">
        <button
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-foreground">{game || "Board Game"}</h1>
          <p className="text-sm text-muted-foreground capitalize">{intent || "Assistant"}</p>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex-1 flex flex-col md:hidden overflow-hidden">
        <ChatThread messages={messages} isTyping={isTyping} />
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>

      {/* Desktop Layout with Resizable Panels */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={60} minSize={40}>
            <div className="flex flex-col h-full">
              <ChatThread messages={messages} isTyping={isTyping} />
              <ChatInput onSend={handleSendMessage} disabled={isTyping} />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={40} minSize={25}>
            <ResourcePanel game={game || "Board Game"} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <FeedbackBar />
    </motion.div>
  );
};

export default Chat;
