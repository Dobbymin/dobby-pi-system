type SocketEventHandler = (data: unknown) => void;

const SOCKET_URL = import.meta.env.VITE_WS_URL ?? "http://localhost:4000";

class SocketClient {
  private ws: WebSocket | null = null;
  private handlers = new Map<string, Set<SocketEventHandler>>();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectDelay = 3000;

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    const token = localStorage.getItem("access_token");
    const url = token ? `${SOCKET_URL}?token=${token}` : SOCKET_URL;

    this.ws = new WebSocket(url);

    this.ws.onmessage = (event: MessageEvent) => {
      try {
        const { type, data } = JSON.parse(event.data as string) as {
          type: string;
          data: unknown;
        };
        this.emit(type, data);
      } catch {
        // ignore malformed messages
      }
    };

    this.ws.onclose = () => {
      this.scheduleReconnect();
    };

    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.ws?.close();
    this.ws = null;
  }

  subscribe(event: string, handler: SocketEventHandler): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);

    return () => {
      this.handlers.get(event)?.delete(handler);
    };
  }

  send(type: string, data?: unknown): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, data }));
    }
  }

  private emit(event: string, data: unknown): void {
    this.handlers.get(event)?.forEach((handler) => handler(data));
  }

  private scheduleReconnect(): void {
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, this.reconnectDelay);
  }
}

export const socketClient = new SocketClient();
