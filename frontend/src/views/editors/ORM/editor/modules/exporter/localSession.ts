import EventBus from "diagram-js/lib/core/EventBus";
import VscodeMessageHandler from "../vscode/handler";
import system from "./defaultSystem";

export default class LocalSessionStorage {
    static $inject = ["eventBus" , "vscodeMessageHandler"];
    _bus:EventBus;
    _handler: VscodeMessageHandler;

    constructor(eventBus: EventBus, handler: VscodeMessageHandler) {
        this._bus = eventBus;
        this._handler = handler;

        this._bus.on("document.ready", (event:any) => {
            const document = event.doc;
            this.handleDocument(document);
        });

        this._bus.on("diagram.init", () => {
            const document = this.attemptToFindDocument();
            if (document) {
                this._handler.poolMessages("update", { 
                    text: document 
                });
            } else {
                //console.log("No document found in local storage, starting fresh.");
            }
        });
    }

    handleDocument(document: any): void {
        // Handle the document as needed, e.g., store it in local storage
        try {
            localStorage.setItem("ormDocument", document);
        } catch (error) {
            console.error("Failed to save document to local storage:", error);
        }
    }

    attemptToFindDocument(): any {
        // Attempt to retrieve the document from local storage
        try {
            const document = localStorage.getItem("ormDocument");
            if (document) {
                return document;
            } else {
                return system;
            }
        } catch (error) {
            console.error("Failed to retrieve document from local storage:", error);
        }
        return null; // Return null if no document is found
    }
}