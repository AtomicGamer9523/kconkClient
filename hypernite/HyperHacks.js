/**
 * # HyperNite Hacks for [KConk](https://satisfying-frequent-switch.glitch.me/)
 * @version v0.1.0
 * @description HyperNite Hacks for KConk
 * @author AtomicGamer9523
*/
const __HYPERNITE_INJECTED__ = (function(socket){let HYPERNITE;(function(HYPERNITE){let HACKS;(function(HACKS){HACKS.SOCKET={};
    HACKS.USERNAME=`<b style="color:rgb(18, 73, 97);">[HYPER]</b> <span>${window.HYPERNITE.CONFIG.username}</span>`;

    /** @type {THREE.MeshPhongMaterial} */
    const MIIMATERIAL = new THREE.MeshPhongMaterial({
        color: 0x9639c4,
        shininess: 30,
        map: (new THREE.TextureLoader()).load(HACKS.PLAYER_MODEL)
    });HACKS.MIIMATERIAL = MIIMATERIAL;

    /** @type {string} */
    const PLAYER_MODEL = "https://cdn.glitch.global/afa0ee46-ed1b-472a-a99e-312507295cd0/Untitled.png?v=1674528311795";
    HACKS.PLAYER_MODEL = PLAYER_MODEL;

    /** @type {object} */
    var KEYS = {
        forceField: false,
        airJump: false,
        freeCam: {
            up: false,
            down: false,
            left: false,
            right: false,
            forward: false,
            back: false,
            active: false
        },
    };HACKS.KEYS = KEYS;

    var TICKMANAGER = new window.HYPERNITE.UTILS.TickManager("HyperNite Hacks");
    var TICKRENDERER = new window.HYPERNITE.UTILS.TickManager("HyperNite Render");
    HACKS.TICKRENDERER = TICKRENDERER;
    HACKS.TICKMANAGER = TICKMANAGER;
    
    /**
     * @HYPERNITE HACK
     * @type {Function}
     * @description Jump Hack
    */
    function airJump(){
        const hackText = new window.HYPERNITE.UTILS.HackText("AIRJUMP", "Air Jump", "L", "lightsteelblue");
        hackText.appendTo(document.getElementById("__HYPERNITE__"));
        window.addEventListener("keydown",function(e){
            if(e.code=="KeyL"){
                HACKS.KEYS.airJump = !HACKS.KEYS.airJump;
                if(HACKS.KEYS.airJump) hackText.enable();
                else hackText.disable();
            }
            if(e.code=="Space" && HACKS.KEYS.airJump) socket.emit("miao");
        });
    }


    const tickRender = () => {
        window.HYPERNITE.CLIENT.HACKS.TICKRENDERER.tick();
    }
    HACKS.tickRender = tickRender;


    /**
     * @HYPERNITE HACK
     * @type {Function}
     * @description Free Cam
    */
    function freeCam() {
        const hackText = new window.HYPERNITE.UTILS.HackText("FREECAM", "Free Cam", "E", "darkviolet");
        hackText.appendTo(document.getElementById("__HYPERNITE__"));

        const event = new window.HYPERNITE.UTILS.TickEvent("FREECAM",_=>{
            let movement = new THREE.Vector3(0, 0, 0);
            if(!window.HYPERNITE.CLIENT.HACKS.KEYS.freeCam.active){
                camera.position.copy(playerMeshes[myIndex].position);
            }
            controls.rotate(rotationBuffer.x, rotationBuffer.y);
            rotationBuffer.x = 0;
            rotationBuffer.y = 0;
            playerMeshes[myIndex].quaternion.copy(camera.quaternion);
            if(window.HYPERNITE.CLIENT.HACKS.KEYS.freeCam.active){
                if(window.HYPERNITE.CLIENT.HACKS.KEYS.freeCam.up) movement.y+=0.25;
                if(window.HYPERNITE.CLIENT.HACKS.KEYS.freeCam.down) movement.y-=0.25;
                if(window.HYPERNITE.CLIENT.HACKS.KEYS.freeCam.forward) movement.z-=0.25;
                if(window.HYPERNITE.CLIENT.HACKS.KEYS.freeCam.left) movement.x-=0.25;
                if(window.HYPERNITE.CLIENT.HACKS.KEYS.freeCam.back) movement.z+=0.25;
                if(window.HYPERNITE.CLIENT.HACKS.KEYS.freeCam.right) movement.x+=0.25;
                angle.setFromQuaternion(playerMeshes[myIndex].quaternion);
                angle.x = 0;
                angle.z = 0;
                movement.applyEuler(angle);
                camera.position.add(movement);
                return;
            }
            if(thirdPersonView) camera.position.addScaledVector(controls.getDirection(new THREE.Vector3()), -7.5);
        });
        event.register(TICKRENDERER);

        window.addEventListener("keydown",function(e){
            switch(e.code) {
                case "ArrowUp":
                    HACKS.KEYS.freeCam.forward = true;
                    break;
                case "ArrowDown":
                    HACKS.KEYS.freeCam.back = true;
                    break;
                case "ArrowLeft":
                    HACKS.KEYS.freeCam.left = true;
                    break;
                case "ArrowRight":
                    HACKS.KEYS.freeCam.right = true;
                    break;
                case "Numpad1":
                    HACKS.KEYS.freeCam.up = true;
                    break;
                case "Numpad0":
                    HACKS.KEYS.freeCam.down = true;
                    break;
            }
        });

        window.addEventListener("keyup",function(e){
            switch(e.code) {
                case "ArrowUp":
                    HACKS.KEYS.freeCam.forward = false;
                    break;
                case "ArrowDown":
                    HACKS.KEYS.freeCam.back = false;
                    break;
                case "ArrowLeft":
                    HACKS.KEYS.freeCam.left = false;
                    break;
                case "ArrowRight":
                    HACKS.KEYS.freeCam.right = false;
                    break;
                case "Numpad1":
                    HACKS.KEYS.freeCam.up = false;
                    break;
                case "Numpad0":
                    HACKS.KEYS.freeCam.down = false;
                    break;
            }
        });

        window.addEventListener("keydown",function(e){
            if(e.code=="KeyE"){
                HACKS.KEYS.freeCam.active = !HACKS.KEYS.freeCam.active;
                if(HACKS.KEYS.freeCam.active) hackText.enable();
                else hackText.disable();
            }
        });

        event.start();
    }

    /**
     * @HYPERNITE HACK
     * @type {Function}
     * @description Force Field
    */
    function forceField() {
        const hackText = new window.HYPERNITE.UTILS.HackText("FORCEFIELD", "Force Field", "Q", "dodgerblue");
        hackText.appendTo(document.getElementById("__HYPERNITE__"));

        const event = new window.HYPERNITE.UTILS.TickEvent("FORCEFIELD",_=>{
            for(let i in playerMeshes) {
                if(i != playerMeshes[myIndex]) {
                    socket.emit("boop",i)
                }
            }
        });
        event.register(TICKMANAGER);
        window.addEventListener("keydown",function(e){
            if(e.code=="KeyQ"){
                HACKS.KEYS.forceField=!HACKS.KEYS.forceField;
                if(HACKS.KEYS.forceField){
                    event.start();
                    hackText.enable();
                } else {
                    event.stop();
                    hackText.disable();
                }
            }
        });
    }

    window.HYPERNITE.UTILS.MODULES.load("stats");
    const stats = new window.HYPERNITEMODULES.STATS();
    stats.domElement.style.position = 'absolute';
    document.body.appendChild(stats.domElement);
    HACKS.STATS = stats;

    function registerTickListener() {
        socket.on("update", function(_) {
            TICKMANAGER.tick();
        });
    }

    /** @function */
    const INIT=function(){
        forceField();
        freeCam();
        airJump();

        registerTickListener();
    }
    HACKS.INIT=INIT;

    //END OF HACKS
    })(HACKS||(HACKS={}));HYPERNITE.HACKS=HACKS;
    let DIV = document.createElement("div");
    DIV.style = "position: absolute; top: 0px; right: 0px";
    DIV.id = "__HYPERNITE__";
    HYPERNITE.DIV = DIV;
    let titleDiv = document.createElement("div");
    titleDiv.id = "__HYPERNITE_TITLE__";
    titleDiv.innerHTML = '<h1 align="center"><b style="font-size:100%;font-family:courier;align:center;top:0px;background:url(https://i.imgur.com/0pUNSp5.jpg) repeat center center;background-size:8vw;-webkit-text-fill-color:transparent;-webkit-background-clip:text;-moz-background-clip:text;background-clip:text;-webkit-text-stroke:0.5px rgb(37, 147, 194);">Hypernite Client</b></h1>';
    HYPERNITE.DIV.appendChild(titleDiv);
    document.body.insertBefore(DIV,document.getElementById('debug'));
    HYPERNITE.HACKS.INIT();
})(HYPERNITE||(HYPERNITE={}));return HYPERNITE;})(socket);window.HYPERNITE.CLIENT=__HYPERNITE_INJECTED__;