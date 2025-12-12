import { Message } from "./ChatThread";
import { User, Bot } from "lucide-react";

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-foreground/10" : "gradient-accent"
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-foreground" />
        ) : (
          <Bot className="w-5 h-5 text-foreground" />
        )}
      </div>
      <div
        className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-3 shadow-soft ${
          isUser
            ? "bg-foreground text-background"
            : "bg-bga-surface text-foreground"
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </div>
  );
};
