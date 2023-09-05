import EventBus from "~/app/core/EventBus";

export interface Message {
    chat_id: number;
    time: string;
    type: 'message' | 'file';
    user_id: number;
    content: string;
    file?: {
        id: number;
        user_id: number;
        path: string;
        filename: string;
        content_type: string;
        content_size: number;
        upload_date: string;
    }
}

export enum WebSocketEvents {
    Connected = "connected",
    Error = "error",
    Message = "message",
    Close = "close"
}

export default class WS extends EventBus {
    private socket: WebSocket | null = null;

    private pingInterval: number = 0;

    constructor(private url: string) {
        super();
    }

    public send(data: unknown) {
        if (!this.socket) {
            throw new Error("Socket is not connected");
        }

        this.socket.send(JSON.stringify(data));
    }

    public connect(): Promise<void> {
        this.socket = new WebSocket(this.url);

        this.subscribe(this.socket);

        this.setupPing();

        return new Promise((resolve) => {
            this.on(WebSocketEvents.Connected, () => {
                resolve();
            });
        });
    }

    public close() {
        this.socket?.close();
    }

    private setupPing() {
        this.pingInterval = window.setInterval(() => {
            this.send({type: "ping" });
        }, 5000);

        this.on(WebSocketEvents.Close, () => {
            clearInterval(this.pingInterval);

            this.pingInterval = 0;
        });
    }

    private subscribe(socket: WebSocket) {
        socket.addEventListener("open", () => {
            this.emit(WebSocketEvents.Connected);
        });
        socket.addEventListener("close", () => {
            this.emit(WebSocketEvents.Close);
        });

        socket.addEventListener("error", (e) => {
            this.emit(WebSocketEvents.Error, e);
        });

        socket.addEventListener("message", (message) => {
            const data = JSON.parse(message.data);

            if (data.type && data.type === "pong") {
                return;
            }

            this.emit(WebSocketEvents.Message, data);
        });
    }
}
