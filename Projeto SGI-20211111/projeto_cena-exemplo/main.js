let botaoPlay = document.getElementById("btn_play")
let botaoPause = document.getElementById("btn_pause")
let botaoStop = document.getElementById("btn_stop")

var cena = new THREE.Scene()
let material = new THREE.MeshNormalMaterial();
cena.background = new THREE.Color(0xffffff);

var meuCanvas = document.getElementById( 'meuCanvas' )
var renderer = new THREE.WebGLRenderer( { canvas: meuCanvas } )

var relogio = new THREE.Clock()
var misturador = new THREE.AnimationMixer(cena)

var camara = new THREE.PerspectiveCamera( 70, 800 / 700, 0.1, 500)
camara.position.set( -10, 10, 12 )
camara.lookAt( 0, 0, 0 )

renderer.setSize( 800, 700 )
renderer.shadowMap.enabled = false
//document.body.appendChild( renderer.domElement )

var controlos = new THREE.OrbitControls( camara, renderer.domElement )
var gridHelper = new THREE.GridHelper()
//cena.add(gridHelper)

var carregador = new THREE.GLTFLoader()
carregador.load(
    'models/cena.gltf', 
    function ( gltf ) {
        cena.add( gltf.scene )

        cena.traverse( function(x) {
            if (x.isMesh) {
                x.castShadow = true
                x.receiveShadow = true
                
            }
        })
        clipe = THREE.AnimationClip.findByName( gltf.animations, 'KeyAction' )
        acao = misturador.clipAction( clipe )
        acao.play()
    }
    
)

var luz1 = new THREE.PointLight('white')
luz1.position.set( 5, 10, 20 )
luz1.castShadow = true
cena.add(luz1)

var luz2 = new THREE.PointLight('white')
luz2.position.set( -5, -5, 20 )
luz2.castShadow = true
cena.add(luz2)

var luz3 = new THREE.PointLight('white')
luz3.position.set( -10, 0, -10 )
luz3.castShadow = true
cena.add(luz3)

var ambiente = new THREE.AmbientLight('white')
cena.add(ambiente)

let botao_rodar = document.getElementById("optionRodar")
let botao_parar = document.getElementById("optionParar")
let botao_animacao = document.getElementById("optionAnimacao")

botao_rodar.addEventListener("click", rodar)
botao_parar.addEventListener("click", parar)
botao_animacao.addEventListener("click", comecar)

function rodar(){
    acaoY.play()
}

function parar(){
    acaoY.stop()
}

function comecar(){
    acaoY.play()
}

var raycaster = new THREE.Raycaster()
var rato = new THREE.Vector2()

window.onclick = function(evento) {
    rato.x = (evento.clientX / window.innerWidth) * 2 - 1
    rato.y = -(evento.clientY / window.innerHeight) * 2 + 1

    pegarPrimeiro()
}

function pegarPrimeiro() {
    raycaster.setFromCamera(rato, camara)
   
    var intersetados = raycaster.intersectObjects(botoes)
    if (intersetados.length > 0) {
        alvo.material = intersetados[0].object.material;
    }
}

animar()

function animar() {
    requestAnimationFrame(animar)
    renderer.render( cena, camara )
}
