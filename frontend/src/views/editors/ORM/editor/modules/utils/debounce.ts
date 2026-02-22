
class Debouncer {
    _action: Function
    _period: number
    _timers: Map<any, ReturnType<typeof setTimeout>>

    constructor(action: Function, period: number) {
        this._action = action;
        this._period = period;
        this._timers = new Map();
    }

    trigger(element: any, ...params: any[]) {
        // Clear any existing timer for this element
        if (this._timers.has(element)) {
            clearTimeout(this._timers.get(element)!);
        }
        
        // Set a new timer for this element
        const timer = setTimeout(() => {
            this._action(...params);
            this._timers.delete(element);
        }, this._period);
        
        this._timers.set(element, timer);
    }
}

export default Debouncer;