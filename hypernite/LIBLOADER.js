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
        blocking = blocking === undefined ? true : blocking;
        var __e__="";
        try{
            var __r__=new XMLHttpRequest();
            __r__.onreadystatechange=function(){
                if(__r__.readyState==4){
                    if(__r__.status==200){
                        __e__=__r__.responseText
                    }else{
                        console.error(`Error Loading Library '${path}', Server returned status code ${__r__.status}`);
                        __e__="";
                    }
                }
            };
            __r__.open("GET",path,!blocking);
            __r__.send();
        }catch(__f__){
            console.error("Error loading "+path);
            console.error(__f__);
        }finally{
            return new JSLib(__e__);
        }
    };
    return external_function;
})();window.loadJSLIB=loadJSLIB;