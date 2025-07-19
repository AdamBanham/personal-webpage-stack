import ElementRegistry from "diagram-js/lib/core/ElementRegistry";
import EventBus from "diagram-js/lib/core/EventBus";
import VscodeMessageHandler from "../vscode/handler";


export default class SchemaImporter {

    static $inject = ['eventBus', 'elementRegistry', 
        'vscodeMessageHandler', 'modeling'];
    _bus: EventBus;
    _elementRegistry: ElementRegistry;
    _handler: VscodeMessageHandler;
    _modeling: any;

    constructor(eventBus: EventBus, elementRegistry: ElementRegistry, 
        handler: VscodeMessageHandler, modeling: any) {
        this._bus = eventBus;
        this._elementRegistry = elementRegistry;
        this._handler = handler;
        this._modeling = modeling;

        this._bus.on("document.import.start", () => {
            this.triggerSelector();
        });

    }

    triggerSelector(): void {
        // Create a file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.orm'; // Filter for .orm files
        fileInput.multiple = false; // Only allow single file selection
        fileInput.style.display = 'none'; // Hide the input element
        
        // Add event listener for file selection
        fileInput.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                const file = target.files[0];
                this.handleFileSelection(file);
            }
        });
        
        // Add to DOM temporarily and trigger click
        document.body.appendChild(fileInput);
        fileInput.click();
        
        // Clean up - remove the input element after use
        document.body.removeChild(fileInput);
    }

    handleFileSelection(file: File): void {
        // Read the file content
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            if (content) {
                this.attemptToLoadDocument(content);
            }
        };
        reader.readAsText(file);
    }

    attemptToLoadDocument(content: string): any {
        
        // clear the system, except for root
        var els = this._elementRegistry.getAll().filter(
            (v) => {
                return !v.id.includes("implicitroot");
            }
        );
        if (els.length > 0){
            this._modeling.removeElements(
                els
            );
        }

        this._handler.poolMessages(
            "update", 
            { text: content }
        )
    }

}