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
 *     ...
 */

const API_BASE_URL = "https://your-api.com"; // TODO: Replace with your FastAPI base URL

// ============================================
// GAME SEARCH API
// ============================================
export interface Game {
  id: string;
  name: string;
}

/**
 * Search for games matching the query
 * Endpoint: GET /games/search?q={query}
 */
export async function searchGames(query: string): Promise<Game[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/games/search?q=${encodeURIComponent(query)}`);
  // if (!response.ok) throw new Error("Failed to search games");
  // return response.json();

  // Mock implementation - remove when connecting to real API
  const mockGames = [
    "Catan", "Catan: Seafarers", "Catan: Cities & Knights",
    "Ticket to Ride", "Ticket to Ride: Europe",
    "Monopoly", "Monopoly Deal",
    "Scrabble", "Chess", "Pandemic", "Pandemic Legacy",
    "Azul", "Azul: Summer Pavilion",
    "Wingspan", "Codenames", "7 Wonders"
  ];
  
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
  
  const filtered = mockGames
    .filter(g => g.toLowerCase().includes(query.toLowerCase()))
    .map(name => ({ id: name.toLowerCase().replace(/\s+/g, "-"), name }));
  
  return filtered;
}

// ============================================
// CHAT API
// ============================================
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  game: string;
  intent: string;
  messages: ChatMessage[];
}

export interface ChatResponse {
  message: string;
}

/**
 * Send a chat message and get AI response
 * Endpoint: POST /chat
 */
export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/chat`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(request),
  // });
  // if (!response.ok) throw new Error("Failed to send message");
  // return response.json();

  // Mock implementation - remove when connecting to real API
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
  
  const lastUserMessage = request.messages[request.messages.length - 1]?.content || "";
  return {
    message: `This is a simulated response. In production, this would connect to your LLM backend trained on ${request.game} rulebook. Your question was: "${lastUserMessage}"`,
  };
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
