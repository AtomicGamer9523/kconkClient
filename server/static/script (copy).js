/*const uris = {
    _x: "textures/-x.jpg",
    x: "textures/x.jpg",
    y: "textures/y.jpg",
    _y: "textures/-y.jpg",
    _z: "textures/-z.jpg",
    z: "textures/z.jpg",
    player: "textures/Untitled.png",
    grass: "textures/giphy.gif"
};*/
const uris = {
    _x: "https://cdn.glitch.global/afa0ee46-ed1b-472a-a99e-312507295cd0/-x.jpg?v=1674528304111",
    x: "https://cdn.glitch.global/afa0ee46-ed1b-472a-a99e-312507295cd0/x.jpg?v=1674528293122",
    y: "https://cdn.glitch.global/afa0ee46-ed1b-472a-a99e-312507295cd0/y.jpg?v=1674528289211",
    _y: "https://cdn.glitch.global/afa0ee46-ed1b-472a-a99e-312507295cd0/-y.jpg?v=1674528301039",
    _z: "https://cdn.glitch.global/afa0ee46-ed1b-472a-a99e-312507295cd0/-z.jpg?v=1674528296225",
    z: "https://cdn.glitch.global/afa0ee46-ed1b-472a-a99e-312507295cd0/z.jpg?v=1674528240380",
    player: "https://cdn.glitch.global/afa0ee46-ed1b-472a-a99e-312507295cd0/Untitled.png?v=1674528311795",
    grass: "https://cdn.glitch.global/afa0ee46-ed1b-472a-a99e-312507295cd0/giphy.gif?v=1674528309117"
};
const scene = new THREE.Scene();

//
// Set camera to 1600/900 aspect ratio
// then do the black bars thing
//
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa, 1);
document.body.appendChild(renderer.domElement);
const controls = new PointerLockControls(camera, renderer.domElement);
renderer.domElement.addEventListener("click", function() {
    controls.lock();
});
controls.addEventListener("lock", function() {
    document.getElementsByTagName("audio")[0].play();
});
controls.addEventListener("unlock", function() {
    document.getElementsByTagName("audio")[0].pause();
});

const tl = new THREE.TextureLoader();
const skybox = new THREE.Mesh(
    new THREE.BoxGeometry(10000, 10000, 10000),
    [
        new THREE.MeshBasicMaterial({ map: tl.load(uris._x), side: 1 }),
        new THREE.MeshBasicMaterial({ map: tl.load(uris.x), side: 1 }),
        new THREE.MeshBasicMaterial({ map: tl.load(uris.y), side: 1 }),
        new THREE.MeshBasicMaterial({ map: tl.load(uris._y), side: 1 }),
        new THREE.MeshBasicMaterial({ map: tl.load(uris._z), side: 1 }),
        new THREE.MeshBasicMaterial({ map: tl.load(uris.z), side: 1 })
    ]
);
scene.add(skybox);


const mii = {
    geometry: new THREE.SphereGeometry(1, 10, 10),
    material: new THREE.MeshPhongMaterial({ color: 0x9639c4, shininess: 30, map: tl.load(uris.player)})
};
const materialToTouch = new THREE.MeshStandardMaterial({ map: tl.load(uris.grass) });
function platformify(x1, z1, y1, x2, z2, y2, material=materialToTouch, rx=0, ry=0, rz=0) {
    const width = 0.3 * Math.abs(x2 - x1);
    const height = 0.3 * Math.abs(y2 - y1);
    const length = 0.3 * Math.abs(z2 - z1);

    const centerPos = {
        x: 0.15 * (x1 + x2),
        y: 0.15 * (y1 + y2),
        z: 0.15 * (z1 + z2)
    };

    const geometry = new THREE.BoxGeometry(width, height, length);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = centerPos.x;
    mesh.position.y = centerPos.y;
    mesh.position.z = centerPos.z;
    mesh.rotation.x = rx;
    mesh.rotation.y = ry;
    mesh.rotation.z = rz;
    scene.add(mesh);

    return mesh;
}

const map = [
    [ // misc
        platformify(0, 0, 0, 50, 100, 2),
        platformify(-30, -40, 0, 5, -36, 20, new THREE.MeshNormalMaterial(), 0, 0.25 * Math.PI, 0),
        platformify(-5, -40, 0, 30, -36, 20, new THREE.MeshNormalMaterial(), 0, -0.25 * Math.PI, 0),
        platformify(-20, -20, -5, 20, -50, 0, new THREE.MeshStandardMaterial({ color: 0xffea00, roughness: 1, metalness: 0 }))
    ],
    [ // path 1
        platformify(38, 114.4, 0, 61, 131.8, 2),
        platformify(26.2, 160.8, 0, 53.2, 180.2, 2),
        platformify(84.2, 138.6, 0, 102, 175.2, 2),
        platformify(57.4, 200, -2, 70.5, 209.2, 0),
        platformify(60.4, 280.9, 0, 81.9, 295.69, 2),
        platformify(11.7, 236.3, -2, 81.9, 266.1, 0, new THREE.MeshToonMaterial({ color: 0xff8000 })),
        platformify(11.7, 266.1, -2, 41.5, 295.7, 0, new THREE.MeshToonMaterial({ color: 0xff0080 })),
        platformify(73, 312.6, 0, 114.2, 326.7, 3),
        platformify(79.6, 339.5, 0, 94.9, 354.8, 3),
        platformify(111.4, 337.7, 0, 135.43, 350.3, 4),
        platformify(89, 370.6, 0, 100.5, 394.5, 5),
        platformify(115.3, 371.9, 0, 151.4, 384.9, 4),
        platformify(91.7, 429.1, 0, 103.4, 436.3, 6),
        platformify(142.1, 414.7, 0, 154.3, 428, 10),
        platformify(108.6, 447.3, 0, 125.5, 456.2, 10),
        platformify(118.3, 398.1, 0, 132.8, 436.9, 20)
    ]
]

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);
const deadlyLazer = new THREE.DirectionalLight(0xeeffee, 1);
scene.add(deadlyLazer);


camera.rotation.x = 1.7 * Math.PI;

window.keys = {
    forward: false,
    left: false,
    back: false,
    right: false,
    jump: false,
    camUp: false,
    camDown: false,
    camLeft: false,
    camRight: false,
    lookBack: false,
    thirdPerson: false,
    chat: false
};
let thirdPersonView = false;

//
// IMPORTANT!!!
// only enable movement and looking around (and other controls) when screen is focused (not necessarily locked)
//

let socket;
window.addEventListener("keydown", function(e) {
    switch (e.code) {
        case "KeyW":
            keys.forward = true;
            break;
        case "KeyA":
            keys.left = true;
            break;
        case "KeyS":
            keys.back = true;
            break;
        case "KeyD":
            keys.right = true;
            break;
        case "Space":
            keys.jump = true;
            break;
        case "ArrowUp":
            keys.camUp = true;
            break;
        case "ArrowDown":
            keys.camDown = true;
            break;
        case "ArrowLeft":
            keys.camLeft = true;
            break;
        case "ArrowRight":
            keys.camRight = true;
            break;
        case "KeyR":
            keys.lookBack = true;
            break;
        case "KeyV":
            if (!keys.thirdPerson) thirdPersonView = !thirdPersonView;
            keys.thirdPerson = true;
            break;
        case "KeyT":
            if (!keys.chat) {
              const newName = prompt("Enter message to send, or /name <new name> to change name");
              if (newName[0] === "/" && newName[1] === "n" && newName[2] === "a" && newName[3] === "m" && newName[4] === "e" && newName[5] === " ") {
                socket.emit("name", newName.slice(6));
              }
              else {
                socket.emit("chat", newName);
              }
            }
            keys.chat = true;
            break;
      case "KeyL":
          socket.emit("miao");
          break;
    }
});
window.addEventListener("keyup", function(e) {
    switch (e.code) {
        case "KeyW":
            keys.forward = false;
            break;
        case "KeyA":
            keys.left = false;
            break;
        case "KeyS":
            keys.back = false;
            break;
        case "KeyD":
            keys.right = false;
            break;
        case "Space":
            keys.jump = false;
            break;
        case "ArrowUp":
            keys.camUp = false;
            break;
        case "ArrowDown":
            keys.camDown = false;
            break;
        case "ArrowLeft":
            keys.camLeft = false;
            break;
        case "ArrowRight":
            keys.camRight = false;
            break;
        case "KeyR":
            keys.lookBack = false;
            break;
        case "KeyV":
            keys.thirdPerson = false;
            break;
        case "KeyT":
            keys.chat = false;
            break;
    }
});

window.rotationBuffer = {x: 0, y: 0};

let playerMeshes = [];
let myIndex;

socket = io();
const raycaster = new THREE.Raycaster();
raycaster.far = 6;
let point;

function render() {
    camera.position.copy(playerMeshes[myIndex].position);
    if (keys.camUp) rotationBuffer.y -= 10;
    if (keys.camDown) rotationBuffer.y += 10;
    if (keys.camLeft) rotationBuffer.x -= 10;
    if (keys.camRight) rotationBuffer.x += 10;
    controls.rotate(rotationBuffer.x, rotationBuffer.y);
    rotationBuffer.x = 0;
    rotationBuffer.y = 0;
    playerMeshes[myIndex].quaternion.copy(camera.quaternion);

    if (keys.lookBack) camera.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    if (thirdPersonView) camera.position.addScaledVector(controls.getDirection(new THREE.Vector3()), -5);

    renderer.render(scene, camera); // try making it vr one day with new renderer
    camera.quaternion.copy(playerMeshes[myIndex].quaternion);
    requestAnimationFrame(render);
}

let firstUpdate = true;
let angle = new THREE.Euler(0, 0, 0, "YXZ");

socket.on("index", function(index) {
    myIndex = index;
    socket.emit("name", window.miao);
});

const f3Field = document.getElementById("debug");
let playerList;
socket.on("update", function(playerData) {
    playerList = "";
    for (let i = 0; i < Math.max(playerData.length, playerData.length); i++) {
        if (!playerData[i]) {
            if (playerMeshes[i]) {
                scene.remove(playerMeshes[i]);
                playerMeshes[i] = null;
            }
            continue;
        }
        const position = playerData[i].position;
        if (!playerMeshes[i]) {
            playerMeshes[i] = new THREE.Mesh(mii.geometry, mii.material);
            scene.add(playerMeshes[i]);
        }
        playerMeshes[i].position.copy(position);
        playerList += `<span class="player-name"${i === myIndex ? ' style="color:green">' : ">"}${playerData[i].name}</span><br>`;
    }
    f3Field.innerHTML = playerList;
    if (firstUpdate) {
        render();
        firstUpdate = false;
    }
    let movement = new THREE.Vector3(0, 0, 0);
    if (keys.forward) movement.z--;
    if (keys.left) movement.x--;
    if (keys.back) movement.z++;
    if (keys.right) movement.x++;
    angle.setFromQuaternion(playerMeshes[myIndex].quaternion);
    angle.x = 0;
    angle.z = 0;
    movement.applyEuler(angle);
    socket.emit("update", {x: movement.x, z: movement.z}, keys.jump);
});

renderer.domElement.addEventListener("click", function() {
    if (controls.isLocked) {
        raycaster.set(playerMeshes[myIndex].position, new THREE.Vector3(0, 0, -1).applyQuaternion(playerMeshes[myIndex].quaternion));
        point = raycaster.intersectObjects(playerMeshes.filter(_=>_))[0]; // .filter(_=>_) eliminates all falsy values
        if (point) {
            let attackedPlayer = null;
            for (let i = 0; i < playerMeshes.length; i++) {
                if (playerMeshes[i] === point.object) {
                    attackedPlayer = i;
                    break;
                }
            }
            if (attackedPlayer !== null) {
                socket.emit("boop", attackedPlayer);
            }
        }
    }
});