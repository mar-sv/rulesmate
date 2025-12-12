import { motion } from "framer-motion";
import { BookOpen, MessageCircleQuestion, Play, Settings } from "lucide-react";

const shortcuts = [
  { label: "Rules", icon: BookOpen },
  { label: "Clarifications", icon: MessageCircleQuestion },
  { label: "Walkthrough", icon: Play },
  { label: "Setup", icon: Settings },
];

interface ShortcutChipsProps {
  onSelect: (intent: string) => void;
}

export const ShortcutChips = ({ onSelect }: ShortcutChipsProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex flex-wrap gap-2 sm:gap-3 justify-center"
    >
      {shortcuts.map((shortcut, index) => {
        const Icon = shortcut.icon;
        return (
          <motion.button
            key={shortcut.label}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(shortcut.label.toLowerCase())}
            className="group relative rounded-full border border-accent-start/40 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-foreground font-medium transition-all hover:border-accent-end/60 overflow-hidden"
          >
            <div className="absolute inset-0 gradient-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span>{shortcut.label}</span>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
};
