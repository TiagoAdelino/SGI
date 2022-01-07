var cena = new THREE.Scene()
let material = new THREE.MeshNormalMaterial();
cena.background = new THREE.Color(0xffffff);

var meuCanvas = document.getElementById( 'meuCanvas' )
var renderer = new THREE.WebGLRenderer( { canvas: meuCanvas } )

var relogio = new THREE.Clock()
var misturador = new THREE.AnimationMixer(cena)

var camara = new THREE.PerspectiveCamera( 70, 800 / 600, 0.1, 500)
camara.position.set( -10, 10, 12 )
camara.lookAt( 0, 0, 0 )

renderer.setSize( 800, 600 )
renderer.shadowMap.enabled = false
//document.body.appendChild( renderer.domElement )

var controlos = new THREE.OrbitControls( camara, renderer.domElement )
var gridHelper = new THREE.GridHelper()
//cena.add(gridHelper)

var carregador = new THREE.GLTFLoader()
carregador.load(
    'models/workBench2.gltf', 
    function ( gltf ) {
        cena.add( gltf.scene )
        cena.traverse( function(x) {
            if (x.isMesh) {
                x.castShadow = true
                x.receiveShadow = true
                
            }
        })

        clipe = THREE.AnimationClip.findByName( gltf.animations, 'benchExtendAction' )
        acaoMesa = misturador.clipAction( clipe )
        //acaoMesa.play()

        clipe = THREE.AnimationClip.findByName( gltf.animations, 'legExtend1Action' )
        acaoPerna = misturador.clipAction( clipe )
        //acaoPerna.play()

        clipe = THREE.AnimationClip.findByName( gltf.animations, 'doorAction' )
        acaoPortaD = misturador.clipAction( clipe )
        //acaoPortaD.play()

        clipe = THREE.AnimationClip.findByName( gltf.animations, 'door1Action' )
        acaoPortaE = misturador.clipAction( clipe )
        //acaoPortaE.play()
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

let botao_parar = document.getElementById("optionParar")
let botao_animacao = document.getElementById("optionAnimacao")

botao_parar.addEventListener("click", parar)
botao_animacao.addEventListener("click", comecar)

function parar(){
    acaoMesa.stop()
    acaoPerna.stop()
    acaoPortaD.stop()
    acaoPortaE.stop()
}

function comecar(){
    acaoMesa.play()
    acaoPerna.play()
    acaoPortaD.play()
    acaoPortaE.play()
}

animar()

function animar() {
    requestAnimationFrame(animar)
    misturador.update(relogio.getDelta())
    renderer.render( cena, camara )
}
