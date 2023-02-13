/**
 * # `loadJSLIB`
 * ## Load a JSLIB from a path
 * ### Example:
 * ```js
 * const myLib = loadJSLIB("myLib.js");
 * myLib.inject();
 * ```
 * ### Or even easier:
 * ```js
 * loadJSLIB("myLib.js").inject();
 * ```
 * ### Async ?
 * #### Yes, you can load a JSLIB async, just set the second parameter to `false`
 * #### **NOTE: This will return an empty JSLIB unless you specifically spawn a blocking task**
 * @param {string} path path to load from, can be relative or absolute
 * @param {boolean | undefined} blocking if the code should wait for the file to load before continuing, defaults to 'true'
 * @returns {JSLib}
 * @function
*/
const loadJSLIB = (()=>{

    /**
     * # `JSLib`
     * ## A JS Library that can be injected
     * ### Exmaple:
     * ```js
     * const myLib = loadJSLIB("myLib.js");
     * myLib.inject();
     * ```
     * @class
    */
    class JSLib {
        /**@type {string}*/#code;

        /**
         * @param {string} code code
         * @constructor
         * @returns {JSLib}
         * @memberof JSLib
         * @instance
         * @public
         * @function
         * @name constructor
         * @type {Function}
        */
        constructor(code) {
            this.#code = code;
        }

        /**
         * # `getCode`
         * ## Gets the code of the JSLIB
         * @returns {string}
         * @memberof JSLib
         * @instance
         * @public
         * @function
         * @name getCode
         * @type {Function}
        */
        getCode() {
            return this.#code;
        }

        /**
         * # `inject`
         * ## Injects the JSLIB into the current scope
         * @returns {void}
         * @memberof JSLib
         * @instance
         * @public
         * @function
         * @name inject
         * @type {Function}
         * @description Injects the JSLIB into the current scope
        */
        inject() {
            try {
                eval(this.#code);
            } catch(e){
                console.error("Error injecting JSLIB");
                console.error(e);
            }
        }
    }

    /**
     * @param {string} path path
     * @param {boolean | undefined} blocking blocking
     * @returns {JSLib} JSLib
    */
    const external_function = (path, blocking = true) => {
        console.trace(`Loading JSLIB: '${path}'`);
        var e="";
        try{
            var r=new XMLHttpRequest();
            r.onreadystatechange=function(){
                if(r.readyState==4){
                    if(r.status==200){
                        e=r.responseText
                    }else{
                        console.error(`Error Loading Library '${path}', Server returned status code ${r.status}`);
                        e="";
                    }
                }
            };
            r.open("GET",p,!blocking);
            r.send();
        }catch(f){
            console.error("Error loading "+p);
            console.error(f);
        }finally{
            return new JSLib(e);
        }
    };
    return external_function;
})();window.loadJSLIB=loadJSLIB;