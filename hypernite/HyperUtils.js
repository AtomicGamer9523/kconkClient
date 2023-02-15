/**
 * # HyperNite Utils
 * @version v0.1.0
 * @description HyperNite Utils
 * @author AtomicGamer9523
*/
const __HYPERNITE_UTILS__ = (function(){window.HYPERNITE={};window.HYPERNITEMODULES={};let HYPERNITE;(function(HYPERNITE){

    function deConst(obj) {
        Object.defineProperty(obj, "configurable", { value: true });
        Object.defineProperty(obj, "enumerable", { value: true });
        Object.defineProperty(obj, "writable", { value: true });
    }
    HYPERNITE.deConst = deConst;

    class TickManager {
        #events = []
        constructor(name) {
            this.name = name;
        }
        tick() {
            this.#events.forEach(e => {
                try {
                    e.callback()
                } catch(err) {
                    console.error(`TickManager ${this.name} Error, Event ID: ${e.id}`);
                    console.error(err);
                }
            });
        }
        start(event) {
            this.#events.push(event);
        }
        stop(id) {
            this.#events = this.#events.filter(e => e.id !== id);
        }
    }
    HYPERNITE.TickManager = TickManager;

    class TickEvent {
        #manager;
        constructor(id, callback) {
            this.id = id;
            this.callback = callback;
        }
        register(manager) { this.#manager = manager; }
        start() { this.#manager.start(this); }
        stop() { this.#manager.stop(this.id); }
    }
    HYPERNITE.TickEvent = TickEvent;

    class HackText {
        #keybind;
        #color;
        #name;
        #id;

        #div;

        constructor(id, name, keybind, color) {
            this.#id = `__HYPERNITE_HACKS_${id.toUpperCase()}__`;
            this.#keybind = keybind;
            this.#color = color;
            this.#name = name;

            let div = document.createElement("div");
            div.id = this.#id;
            div.innerHTML
            div.innerHTML = this.#_inactive_();
            this.#div = div;
        }
        #_active_ = function() {
            return`<p><b style="color:${this.#color}">${this.#name}</b> <b style="color:green">Active</b> <b style="color:gold">Press ${this.#keybind} to toggle</b></p>`;
        }
        #_inactive_ = function() {
            return`<p><b style="color:${this.#color}">${this.#name}</b> <b style="color:red">Inactive</b> <b style="color:gold">Press ${this.#keybind} to toggle</b></p>`;
        }
        appendTo(parent) {
            parent.appendChild(this.#div);
        }
        enable() {
            let elem = document.getElementById(this.#id)
            elem.innerHTML = this.#_active_();
        }
        disable() {
            let elem = document.getElementById(this.#id)
            elem.innerHTML = this.#_inactive_();
        }
    }

    HYPERNITE.HackText = HackText;


    const Modules = (function(){let MODULES;(function(MODULES){
        function load(module) {
            window.loadJSLIB(`./hypernite/modules/${module}.module.js`).inject();
        }
        MODULES.load = load;
    })(MODULES||(MODULES={}));return MODULES;})();HYPERNITE.MODULES=Modules;
})(HYPERNITE||(HYPERNITE={}));return HYPERNITE;})();window.HYPERNITE.UTILS=__HYPERNITE_UTILS__;