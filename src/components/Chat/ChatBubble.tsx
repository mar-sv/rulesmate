import { Message } from "./ChatThread";
import { User, Bot } from "lucide-react";

interface ChatBubbleProps {
  message: Message;
  onSourceClick?: (sourceId: string) => void;
}

// Parse content to find source references like (source p.1)
const parseContentWithSources = (
  content: string,
  onSourceClick?: (sourceId: string) => void
) => {
  const sourcePattern = /\(source p\.(\d+)\)/g;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = sourcePattern.exec(content)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }
    
    // Add clickable source link
    const pageNum = match[1];
    parts.push(
      <button
        key={match.index}
        onClick={() => onSourceClick?.(`p${pageNum}`)}
        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 underline underline-offset-2 font-medium transition-colors"
      >
        (source p.{pageNum})
      </button>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : content;
};

export const ChatBubble = ({ message, onSourceClick }: ChatBubbleProps) => {
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
          {parseContentWithSources(message.content, onSourceClick)}
        </p>
      </div>
    </div>
  );
};
