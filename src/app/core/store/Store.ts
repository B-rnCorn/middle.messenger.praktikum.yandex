import {UserData} from "~/app/core/api/AuthAPI";
import { set as setToObject } from "~/shared/helpers/utils-helpers";
import EventBus from "~/app/core/EventBus";
import {ChatData, ChatUserInfo} from "~/app/core/api/ChatAPI";
import {Message} from "~/app/core/api/utils/WebSocket";

interface State {
    user?: UserData | undefined;
    chats?: ChatData[];
    selectedChatId?: number;
    selectedChatUsers?: ChatUserInfo[];
    searchedUsers?: UserData[];
    searchedUsersForAdd?: UserData[];
    selectedChatMessages?: Record<number, Message[]>;
    error?: string;
}

enum StoreEvents {
    Updated= 'updated',
}
class Store extends EventBus{
    private state: State = {};

    set(path: string, value: unknown) {
        setToObject(this.state, path, value);
        this.on(StoreEvents.Updated, ()=> {});

        this.emit(StoreEvents.Updated, this.state);
    }

    getState(): State {
        return this.state;
    }
}

const store = new Store();

export default store;
