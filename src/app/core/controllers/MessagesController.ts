import WS, {WebSocketEvents, Message} from "../api/utils/WebSocket";
import store from "~/app/core/store/Store";
import {ErrorResponse} from "~/app/core/types";
import {submitHandler} from "~/app/core/SubmitHandler";

class MessagesController {
    private sockets: Map<number, WS> = new Map();

    async connect(id: number, token: string) {
        if (this.sockets.has(id)) {
            return;
        }

        try {
            const userId = store.getState().user!.id;
            const wsTransport = new WS(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);
            this.sockets.set(id, wsTransport);
            await wsTransport.connect();
            this.subscribe(wsTransport, id);
            this.fetchOldMessages(id);
        } catch (e: unknown) {
            store.set("error", `Chat #${id}: ${(e as ErrorResponse).reason}`);
        }
    }

    sendMessage(id: number, message: string) {
        const socket = this.sockets.get(id);

        if (!socket) {
            store.set("error", `{"message": "Chat #${id}: Chat is not connected"}`);
        } else {
            try {
                socket.send({
                    type: "message",
                    content: message
                });
            } catch (e: unknown) {
                store.set("error", `Chat #${id}: ${(e as ErrorResponse).reason}`);
            }
        }
    }

    fetchOldMessages(id: number) {
        const socket = this.sockets.get(id);

        if (!socket) {
            store.set("error", `Chat #${id}: Chat is not connected`);
        } else {
            try {
                socket.send({ type: "get old", content: "0" });
                submitHandler.publish('MessagesUpdate');
            } catch (e: unknown) {
                store.set("error", `Chat #${id}: ${(e as ErrorResponse).reason}`);
            }
        }
    }

    closeAll() {
        try {
            Array.from(this.sockets.values()).forEach((socket) => socket.close());
        } catch (e: unknown) {
            store.set("error", (e as ErrorResponse).reason);
        }
    }

    private onMessage(id: number, messages: Message | Message[]) {
        let messagesToAdd: Message[] = [];

        if (Array.isArray(messages)) {
            messagesToAdd = messages.reverse();
        } else {
            messagesToAdd.push(messages);
        }

        const currentMessages = (store.getState().selectedChatMessages || {})[id] || [];

        messagesToAdd = [...currentMessages, ...messagesToAdd];

        store.set(`selectedChatMessages.${id}`, messagesToAdd);
        submitHandler.publish('MessagesUpdate');
    }

    private onClose(id: number) {
        this.sockets.delete(id);
    }

    private subscribe(transport: WS, id: number) {
        //@ts-expect-error
        transport.on(WebSocketEvents.Message, (message) => this.onMessage(id, message));
        transport.on(WebSocketEvents.Close, () => this.onClose(id));
    }
}

export default new MessagesController();
