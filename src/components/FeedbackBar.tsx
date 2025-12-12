import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, X, Send, Loader2 } from "lucide-react";
import { submitFeedback } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export const FeedbackBar = () => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!message.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await submitFeedback({
        message: message.trim(),
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      });
      
      toast({
        title: t("feedback.success"),
        description: t("feedback.successDescription"),
      });
      
      setMessage("");
      setIsExpanded(false);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      toast({
        title: t("feedback.error"),
        description: t("feedback.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-t border-border bg-background shrink-0">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            initial={{ height: 40 }}
            animate={{ height: "auto" }}
            exit={{ height: 40 }}
            className="p-2 sm:p-3"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-foreground">
                {t("feedback.prompt")}
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2 items-center w-full">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder={t("feedback.placeholder")}
                disabled={isSubmitting}
                className="min-w-0 flex-1 h-10 px-3 text-base bg-input border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
              />
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-none h-10 w-10 flex items-center justify-center rounded-md bg-[hsl(var(--feedback))] hover:brightness-110 text-background transition-all disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsExpanded(true)}
            className="w-full py-2.5 px-4 flex items-center justify-center gap-2 text-xs font-medium text-background bg-[hsl(var(--feedback))] hover:brightness-110 transition-all"
          >
            <ChevronUp className="w-3 h-3" />
            <span>{t("feedback.prompt")}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
