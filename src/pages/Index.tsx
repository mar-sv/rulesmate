import { useNavigate } from "react-router-dom";
import { LandingLayout } from "@/components/Landing/LandingLayout";
import { GreetingText } from "@/components/Landing/GreetingText";
import { InteractiveSentence } from "@/components/Landing/InteractiveSentence";
import { ShortcutChips } from "@/components/Landing/ShortcutChips";

const Index = () => {
  const navigate = useNavigate();

  const handleSubmit = (intent: string, game: string) => {
    navigate("/chat", { state: { intent, game } });
  };

  const handleShortcut = (intent: string) => {
    navigate("/chat", { state: { intent, game: "Catan" } });
  };

  return (
    <LandingLayout>
      <GreetingText />
      <InteractiveSentence onSubmit={handleSubmit} />
      <ShortcutChips onSelect={handleShortcut} />
    </LandingLayout>
  );
};

export default Index;
