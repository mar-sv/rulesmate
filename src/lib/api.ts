/**
 * API Service for Rules Mate
 * Backend: FastAPI
 * 
 * FastAPI endpoint examples:
 * 
 * @app.get("/games/search")
 * async def search_games(q: str) -> list[GameResponse]:
 *     ...
 * 
 * @app.post("/games/selection")
 * async def submit_selected_game(request: SelectedGameRequest) -> None:
 *     ...
 * 
 * @app.post("/chat")
 * async def chat(request: ChatRequest) -> ChatResponse:
 *     ...
 * 
 * @app.post("/feedback")
 * async def submit_feedback(request: FeedbackRequest) -> None:
 *     ...
 * 
 * @app.get("/games/{game_id}/resources")
 * async def get_resources(game_id: str) -> ResourcesResponse:
 */

// API Base URL - uses environment variable if available, otherwise falls back to placeholder
// For production: set VITE_API_BASE_URL in your environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/boardgame_rag";

// ============================================
// CONVERSATION SESSION
// ============================================
const CONVERSATION_KEY = "rulesmate_conversation_id";

/**
 * Get or create a conversation ID (stored in localStorage)
 * This persists across page refreshes but clears when browser data is cleared
 */
export function getConversationId(): string {
  let conversationId = localStorage.getItem(CONVERSATION_KEY);
  if (!conversationId) {
    conversationId = crypto.randomUUID();
    localStorage.setItem(CONVERSATION_KEY, conversationId);
  }
  return conversationId;
}

/**
 * Start a new conversation (generates new ID)
 */
export function startNewConversation(): string {
  const conversationId = crypto.randomUUID();
  localStorage.setItem(CONVERSATION_KEY, conversationId);
  return conversationId;
}

// ============================================
// GAME SEARCH API
// ============================================
export interface Game {
  id: string;
  name: string;
}

const searchCache = new Map<string, Game[]>();
let activeSearchController: AbortController | null = null;

/**
 * Search for games matching the query
 * Endpoint: GET /games/search?q={query}
 */
export async function searchGames(query: string): Promise<Game[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  const cached = searchCache.get(q);
  if (cached) return cached;

  activeSearchController?.abort();
  const controller = new AbortController();
  activeSearchController = controller;

  const response = await fetch(
    `${API_BASE_URL}/games/search?q=${encodeURIComponent(q)}`,
    { signal: controller.signal }
  );

  if (!response.ok) throw new Error("Failed to search games");

  const data = await response.json();
  const rawGames: Array<{ title: string }> = data.games ?? data;
  const games: Game[] = rawGames.map((game) => ({
    id: game.title.toLowerCase().replace(/\s+/g, "-"),
    name: game.title,
  }));
  searchCache.set(q, games);
  return games;
}

// ============================================
// GAME SELECTION API
// ============================================
export interface SelectedGameRequest {
  game_id: string;
  game_name: string;
}

/**
 * Send selected game to backend
 * Endpoint: POST /games/selection
 */
export async function submitSelectedGame(game: Game): Promise<void> {
  const conversationId = getConversationId();
  const response = await fetch(`${API_BASE_URL}/add_game_to_context`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      game_name: game.name,
      session_id: conversationId,
    }),
  });

  if (!response.ok) throw new Error("Failed to submit selected game");
}

// ============================================
// CHAT API
// ============================================
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  conversation_id: string;
  game: string;
  intent: string;
  language: string; // "English", "Swedish", or "French"
  messages: ChatMessage[];
}

export interface ChatResponse {
  message: string;
}

/**
 * Send a chat message and get AI response
 * Endpoint: POST /chat
 * 
 * FastAPI model:
 * class ChatRequest(BaseModel):
 *     conversation_id: str
 *     game: str
 *     intent: str
 *     messages: list[ChatMessage]
 */
// export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
//   // TODO: Replace with actual API call
//   // const response = await fetch(`${API_BASE_URL}/chat`, {
//   //   method: "POST",
//   //   headers: { "Content-Type": "application/json" },
//   //   body: JSON.stringify(request),
//   // });
//   // if (!response.ok) throw new Error("Failed to send message");
//   // return response.json();

//   // Mock implementation - remove when connecting to real API
//   console.log("Chat request:", { conversation_id: request.conversation_id, language: request.language });
//   await new Promise(resolve => setTimeout(resolve, 1500));
  
//   const lastUserMessage = request.messages[request.messages.length - 1]?.content || "";
//   return {
//     message: `[${request.language}] This is a simulated response. In production, this would connect to your LLM backend trained on ${request.game} rulebook. Your question was: "${lastUserMessage}"`,
//   };
// }

export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  const lastUserMessage =
    request.messages[request.messages.length - 1]?.content ?? "";

  const conversationId = getConversationId();
  const params = new URLSearchParams({
    user_input: lastUserMessage,
    session_id: conversationId,
  });

  const response = await fetch(`${API_BASE_URL}/chat?${params}`, {
    method: "GET",
  });

  if (!response.ok) throw new Error("Failed to send message");

  const data = await response.json();
  return { message: data['answer'] };
}

// ============================================
// FEEDBACK API
// ============================================
export interface FeedbackRequest {
  message: string;
  page?: string;
  timestamp?: string;
}

/**
 * Submit user feedback
 * Endpoint: POST /feedback
 */
export async function submitFeedback(request: FeedbackRequest): Promise<void> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/feedback`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(request),
  // });
  // if (!response.ok) throw new Error("Failed to submit feedback");

  // Mock implementation - remove when connecting to real API
  console.log("Feedback submitted:", request);
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
}

// ============================================
// RESOURCES API
// ============================================
export interface GameResources {
  pdfUrl?: string;
  videoUrl?: string;
  videoTitle?: string;
}

/**
 * Get resources (PDF rulebook, videos) for a game
 * Endpoint: GET /games/{gameId}/resources
 */
export async function getGameResources(gameId: string): Promise<GameResources> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/games/${encodeURIComponent(gameId)}/resources`);
  // if (!response.ok) throw new Error("Failed to fetch resources");
  // return response.json();

  // Mock implementation - remove when connecting to real API
  await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
  
  return {
    pdfUrl: undefined, // Return actual PDF URL from your API
    videoUrl: undefined, // Return actual video URL from your API
    videoTitle: `How to Play ${gameId}`,
  };
}









