import { chatMock } from '../pages/chat/api/mock'

import chat from '../pages/chat/ui/chat.hbs'
import profile from '../pages/profile/profile.hbs'
import chatList from '../widgets/chat-list/ui/chat-list.hbs'
import chatListItem from  '../entities/chat-list-item/ui/chat-list-item.hbs'
import chatContent from '../widgets/chat-content/ui/chat-content.hbs'

import * as Handlebars from "handlebars/dist/handlebars.runtime";

const ROUTES = {
    Chat: chat,
    Profile: profile,
}
function render(html) {
    const app = document.querySelector('#app');

    app.innerHTML = html;
}

window.navigateByRoutes = function (routeName) {
    const page = ROUTES[routeName];

    render(page());
}

window.addEventListener('DOMContentLoaded',() => {

    Handlebars.registerPartial('chat-list', chatList);
    Handlebars.registerPartial('chat-item', chatListItem);
    Handlebars.registerPartial('chat-content', chatContent);

    render(ROUTES.Chat(chatMock));
})
