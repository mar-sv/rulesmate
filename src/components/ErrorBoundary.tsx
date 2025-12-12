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
          {/* Fallen King Chess Piece SVG */}
          <svg
            viewBox="0 0 200 140"
            className="w-64 h-44 mb-8"
          >
            {/* Shadow under fallen king */}
            <ellipse
              cx="100"
              cy="120"
              rx="70"
              ry="12"
              fill="hsl(var(--accent) / 0.15)"
            />
            
            {/* Fallen King piece - rotated to show it's toppled */}
            <g transform="translate(100, 70) rotate(-75)">
              {/* Base of king */}
              <ellipse
                cx="0"
                cy="45"
                rx="22"
                ry="8"
                fill="hsl(var(--accent))"
              />
              <rect
                x="-22"
                y="37"
                width="44"
                height="8"
                fill="hsl(var(--accent))"
              />
              
              {/* Body/stem */}
              <path
                d="M-16 37 Q-18 20 -12 10 L12 10 Q18 20 16 37 Z"
                fill="hsl(var(--accent))"
              />
              
              {/* Collar/neck detail */}
              <ellipse
                cx="0"
                cy="10"
                rx="14"
                ry="5"
                fill="hsl(var(--accent) / 0.8)"
              />
              
              {/* Head */}
              <circle
                cx="0"
                cy="-5"
                r="12"
                fill="hsl(var(--accent))"
              />
              
              {/* Crown cross */}
              <rect
                x="-3"
                y="-28"
                width="6"
                height="18"
                rx="2"
                fill="hsl(var(--accent))"
              />
              <rect
                x="-9"
                y="-22"
                width="18"
                height="6"
                rx="2"
                fill="hsl(var(--accent))"
              />
            </g>
            
            {/* Small decorative elements - scattered pieces feeling */}
            <circle cx="35" cy="115" r="4" fill="hsl(var(--accent) / 0.4)" />
            <circle cx="160" cy="110" r="3" fill="hsl(var(--accent) / 0.3)" />
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
