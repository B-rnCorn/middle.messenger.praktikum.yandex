import {v4 as generateUUID} from 'uuid';
import EventBus from "~/app/core/EventBus";
import {BlockChildren, BlockEvents, BlockProps, BlockPropsAndChildren, Props} from "~/app/core/types";

export class Block {
    static EVENTS = {
        COMPONENT_DID_INIT: "component-did-init",
        COMPONENT_DID_MOUNT: "component-did-mount",
        COMPONENT_DID_RENDER: "component-did-render",
        COMPONENT_DID_UPDATE: "component-did-update",
    };

    private _id: string | null = null;
    private _element: HTMLElement | null = null;
    private _isNeedInternalId: boolean = false;
    private _blockEvents: BlockEvents = {};
    private _tagName: string = 'div';

    protected _blockProps: BlockProps;
    protected _children: BlockChildren;
    //private _props: Props;
    private _eventBus: () => EventBus;

    constructor({tagName = "div", blockPropsAndChildren = {}, isNeedInternalId = false, blockEvents = {}}: Props) {

        const eventBus = new EventBus();

        const {children, props } = this._getChildren(blockPropsAndChildren);

        this._children = children;
        this._isNeedInternalId = isNeedInternalId;
        this._blockEvents = blockEvents;
        this._tagName = tagName;


        if (isNeedInternalId) {
            this._id = generateUUID();
        }

        this._blockProps = this._makePropsProxy(isNeedInternalId ? {...props, _id: this._id} : {...props});

        this._eventBus = () => eventBus;

        this._registerLifecycleEvents(eventBus);
        eventBus.emit(Block.EVENTS.COMPONENT_DID_INIT);
    }

    private _getChildren(blockPropsAndChildren: BlockPropsAndChildren) {
        const children: BlockChildren = {};
        const props: BlockProps = {};

        Object.entries(blockPropsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return {children, props};
    }

    private _registerLifecycleEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.COMPONENT_DID_INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.COMPONENT_DID_MOUNT, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.COMPONENT_DID_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.COMPONENT_DID_UPDATE, this._componentDidUpdate.bind(this));
    }

    private _addBlockEvents(): void {
        Object.keys(this._blockEvents).forEach((eventName: string) => {
            this._element!.addEventListener(eventName, this._blockEvents[eventName]);
        });
    }

    private _removeBlockEvents(): void {
        Object.keys(this._blockEvents).forEach((eventName: string) => {
            this._element!.removeEventListener(eventName, this._blockEvents[eventName]);
        });
    }

    private _createResources() {
        this._element = this._createDocumentElement(this._tagName);
    }

    protected init() {
        this._createResources();
        this._eventBus().emit(Block.EVENTS.COMPONENT_DID_RENDER);
    }

    private _componentDidMount() {
        this.componentDidMount({});

        Object.values(this._children).forEach(child => {
            Array.isArray(child) ? child.forEach(item => item.dispatchComponentDidMount()) : child.dispatchComponentDidMount();
        });
    }

// Может переопределять пользователь, необязательно трогать
    protected componentDidMount(oldProps: BlockProps) {
    }

    public dispatchComponentDidMount() {
        this._eventBus().emit(Block.EVENTS.COMPONENT_DID_MOUNT);
    }

    private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) this._render();
    }

// Может переопределять пользователь, необязательно трогать
    protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
        return true;
    }

    setProps(nextProps: BlockProps) {
        if (!nextProps) {
            return;
        }

        Object.assign(this._blockProps, nextProps);

        this._eventBus().emit(Block.EVENTS.COMPONENT_DID_UPDATE, this._blockProps, this);
    }

    get element() {
        return this._element;
    }

    private _render() {
        const block = this.render();

        this._removeBlockEvents();

        this._element!.innerHTML = '';

        this._element!.append(block);

        this._addBlockEvents();
    }

// Может переопределять пользователь, необязательно трогать
    protected render(): DocumentFragment {
        //@ts-ignore
        return;
    }

    public getContent() {
        return this.element;
    }

    private _makePropsProxy(props: BlockProps) {
        const self = this;

        console.log(props);

        return new Proxy(props, {
            get(target, prop: string) {
                if (prop.startsWith('_')) {
                    throw new Error("Отказано в доступе");
                } else {
                    let value = target[prop];
                    return (typeof value === 'function') ? value.bind(target) : value;
                }
            },
            set(target, prop: string, val) {
                if (prop.startsWith('_')) {
                    throw new Error("Отказано в доступе");
                } else {
                    target[prop] = val;
                    self._eventBus().emit(Block.EVENTS.COMPONENT_DID_UPDATE, target, this);
                    return true;
                }
            },
            // @ts-ignore
            deleteProperty(target, prop) {
                throw new Error("Нет прав");
            },
        });
    }

    private _replacePlug(fragment: HTMLTemplateElement, child: Block) {
        const plug: HTMLElement | null = fragment.content.querySelector(`[data-id="${child._id}"]`);

        if (plug) {
            child.getContent()?.append(...Array.from(plug.childNodes));
            // @ts-ignore
            stub.replaceWith(child.getContent());
        }
    }

    protected compile(template: (props: BlockProps) => string, props: BlockProps) {
        const propsAndPlugs: BlockProps = {...props};

        Object.entries(this._children).forEach(([name, child]: [string, Block | Block[]]) => {
            if (Array.isArray(child)) {
                propsAndPlugs[name] = child.map((item: Block) => `<div data-id="${item._id}"></div>`);
            } else {
                propsAndPlugs[name] = `<div data-id="${child._id}"></div>`;
            }
        });

        const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
        fragment.innerHTML = template(propsAndPlugs);

        Object.values(this._children).forEach((child: Block | Block[]) => {
            if (Array.isArray(child)) {
                child.forEach((item) => {
                    this._replacePlug(fragment, item);
                });
            } else {
                this._replacePlug(fragment, child);
            }
        });

        return fragment.content;
    }

    private _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName);
        if (this._isNeedInternalId && this._id) {
            element.setAttribute("data-id", this._id);
        }
        return element;
    }

    public show() {
        if (this._element !== null) this._element.style.display = 'block';
    }

    public hide() {
        if (this._element !== null) this._element.style.display = 'none';
    }
}
