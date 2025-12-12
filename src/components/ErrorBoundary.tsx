import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
          {/* Fallen Chessboard SVG */}
          <svg
            viewBox="0 0 200 160"
            className="w-64 h-48 mb-8"
            style={{ transform: "rotate(-15deg)" }}
          >
            {/* Chessboard - tilted/fallen effect */}
            <g transform="translate(20, 30)">
              {/* Board shadow */}
              <rect
                x="15"
                y="85"
                width="140"
                height="10"
                rx="5"
                fill="hsl(var(--accent) / 0.2)"
              />
              
              {/* Board base */}
              <rect
                x="10"
                y="10"
                width="140"
                height="80"
                rx="4"
                fill="hsl(var(--accent) / 0.3)"
                stroke="hsl(var(--accent))"
                strokeWidth="2"
              />
              
              {/* Chess squares - 4x2 simplified grid */}
              {[0, 1, 2, 3].map((col) =>
                [0, 1].map((row) => (
                  <rect
                    key={`${col}-${row}`}
                    x={20 + col * 30}
                    y={20 + row * 30}
                    width="28"
                    height="28"
                    fill={
                      (col + row) % 2 === 0
                        ? "hsl(var(--accent))"
                        : "hsl(var(--accent) / 0.15)"
                    }
                    rx="2"
                  />
                ))
              )}
              
              {/* Fallen pieces - simple circles/shapes */}
              <circle cx="-5" cy="95" r="8" fill="hsl(var(--accent))" opacity="0.7" />
              <circle cx="165" cy="100" r="6" fill="hsl(var(--accent))" opacity="0.5" />
              <rect
                x="170"
                y="85"
                width="8"
                height="12"
                rx="2"
                fill="hsl(var(--accent))"
                opacity="0.6"
                transform="rotate(25, 174, 91)"
              />
              <circle cx="25" cy="105" r="5" fill="hsl(var(--accent))" opacity="0.4" />
            </g>
            
            {/* X marks - game over feel */}
            <g stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" opacity="0.6">
              <line x1="5" y1="20" x2="20" y2="35" />
              <line x1="20" y1="20" x2="5" y2="35" />
              
              <line x1="175" y1="130" x2="190" y2="145" />
              <line x1="190" y1="130" x2="175" y2="145" />
            </g>
          </svg>

          {/* Checkmate Text */}
          <h1 className="text-4xl md:text-5xl font-bold text-accent mb-3 tracking-tight">
            Checkmate!
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-2">
            Something went wrong.
          </p>
          <p className="text-muted-foreground/70 text-center text-sm mb-8 max-w-md">
            The game hit an unexpected move. Let's set up the board again.
          </p>

          {/* Reload Button */}
          <button
            onClick={this.handleReload}
            className="px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg 
                       transition-transform hover:scale-105 active:scale-95"
          >
            Play Again
          </button>

          {/* Error details (collapsed by default in production) */}
          {import.meta.env.DEV && this.state.error && (
            <details className="mt-8 max-w-lg w-full">
              <summary className="text-muted-foreground text-sm cursor-pointer hover:text-foreground">
                Technical details
              </summary>
              <pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-auto text-muted-foreground">
                {this.state.error.message}
                {"\n\n"}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
