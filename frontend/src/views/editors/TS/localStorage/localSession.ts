import EventBus from "diagram-js/lib/core/EventBus";
import Importing from "../importer/importer";
import system from "./defaultSystem";

export const localStorageName = "transitionSystemDocument";

export type PREFIX = "local.storage."
export type SUFFIX = "set" | "get" | "clear" | "find"
export type EVENTS = `${PREFIX}${SUFFIX}`
export interface EventContext {
    content?: string,
    key?: "transitionSystemDocument"
}

export default class LocalSessionStorage {
    static $inject = ["eventBus", "importing" ];
    _bus:EventBus;
    _importing: Importing;

    constructor(eventBus: EventBus, importing: Importing) {
        this._bus = eventBus;
        this._importing = importing;

        this._bus.on("diagram.init", () => {
            setTimeout( () => {
            const document = this.find();
            if (document) {
                this._importing.fire("importing.load", { text: document });
            } else {
                console.log("No document found in local storage, starting fresh.");
            }
        }, 100);
        });

        this._bus.on("local.storage.set", this.set.bind(this));
        this._bus.on("local.storage.get", this.get.bind(this));
        this._bus.on("local.storage.clear", this.clear.bind(this));
        this._bus.on("local.storage.find", this.find.bind(this));
    }

    /**
     * Shortcut to fire events from this service.
     * @param {EVENTS} event 
     * @param {EventContext} context 
     */
    fire(event: EVENTS, context: EventContext) {
        this._bus.fire(event, context);
    }

    find(): any {
        // Attempt to retrieve the document from local storage
        try {
            const document = localStorage.getItem(localStorageName);
            if (document) {
                return document;
            } else {
                this.set({ content: system });
                return system;
            }
        } catch (error) {
            console.error("Failed to retrieve document from local storage:", error);
        }
        return null; // Return null if no document is found
    }

    get(): any {
        // Retrieve an item from local storage
        try {
            const item = localStorage.getItem(localStorageName);
            return item;
        } catch (error) {
            console.error(`Failed to get item from local storage with key ${localStorageName}:`, error);
            return null;
        }
    }

    clear(): void {
        localStorage.removeItem(localStorageName);
    }

    set(context: EventContext): void {
        if (context.content) {
            try {
            localStorage.setItem(localStorageName, context.content);
            } catch (error) {
                console.error("Failed to save document to local storage:", error);
            }
        } else {
            throw new Error("Invalid context for local storage set event");
        }
    }
}