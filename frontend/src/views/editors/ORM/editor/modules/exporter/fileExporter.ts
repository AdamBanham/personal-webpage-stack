import EventBus from "diagram-js/lib/core/EventBus";


export default class FileExporter {
    static $inject = ["eventBus"];
    _bus: EventBus;
    _doc?: string;

    constructor(eventBus: EventBus) {
        this._bus = eventBus;

        this._bus.on("document.ready", (event: any) => {
            const document = event.doc;
            this._doc = document;
        });

        this._bus.on("document.download", () => {  
            this.triggerDownload();
        });
    }

    triggerDownload() {
        if (!this._doc) {
            console.error("No document available to download.");
            return;
        }

        const blob = new Blob([this._doc], { type: "application/orm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "orm_document.orm";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}