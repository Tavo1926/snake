const mapa = document.getElementById('mapa')

let puntaje = 0
let choque = ''
let lienzo = mapa.getContext("2d")
let intervalo
let mapaFondo = new Image()
mapaFondo.src = './fondo/fondo2r.png.jpg'
let nuevaAltura
let anchoDelmapa = window.innerWidth - 20
const anchoMáximo = 750



if(anchoDelmapa > anchoMáximo){
    anchoDelmapa = anchoMáximo
}

nuevaAltura = anchoDelmapa * 600 / 800

mapa.width = anchoDelmapa
mapa.height = nuevaAltura

class Objetos {
    constructor(ancho, alto, fotoMapa){
        this.ancho = ancho
        this.alto = alto
        this.x = aleatorio(0,mapa.width - this.ancho)
        this.y = aleatorio(0,mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintar(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let serpiente = new Objetos (40, 40,'./fondo/culebra-removebg-preview.png')
let manzana = new Objetos (40, 40, './fondo/manzana-removebg-preview.png')

function iniciarMapa(){
    mensaje.style.display = "none"
    //guerreroJugadorObjeto = objetoGuerrero(guerreroJugador)
    intervalo = setInterval(canvas, 50)

    window.addEventListener('keydown', teclaAbajo)

    //window.addEventListener('keyup', detener)
    
}


function canvas(){
    //intervalo = setInterval(fruits, 5000)
    serpiente.x = serpiente.x + serpiente.velocidadX
    serpiente.y = serpiente.y + serpiente.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaFondo,
        0,
        0,
        mapa.width,
        mapa.height
    )
    //fruits()
    serpiente.pintar()
    fruits()
    gameOver(serpiente)
    colision()
}

function aleatorio(min, max){
    {
        return Math.floor( Math.random() * (max - min + 1) + min)
          }
}

function moverDerecha(){
    serpiente.velocidadX = 10
    serpiente.velocidadY = 0
}

function moverIzquierda(){
    serpiente.velocidadX = -10
    serpiente.velocidadY = 0
}

function moverArriba(){
    serpiente.velocidadY = -10
    serpiente.velocidadX = 0
}

function moverAbajo(){
    serpiente.velocidadY = 10
    serpiente.velocidadX = 0
}

function detener(){
    serpiente.velocidadX = 0
    serpiente.velocidadY = 0
}


function teclaAbajo(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break  
        case 'ArrowRight':
            moverDerecha()
            break   
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'w':
            moverArriba()
            break
        case 's':
            moverAbajo()
            break  
        case 'd':
            moverDerecha()
            break    
        case 'a':
            moverIzquierda()
            break   
        default:
            break
    }
}

function gameOver(){
    const abajoSerpiente = serpiente.y + serpiente.alto
    const derechaSerpiente = serpiente.x + serpiente.ancho
    const izquierdaSerpiente = serpiente.x
    const arribaSerpiente = serpiente.y
    
    
    if (
        abajoSerpiente >= mapa.height||
        derechaSerpiente >= mapa.width||
        izquierdaSerpiente <= 0||
        arribaSerpiente <= 0
    ) {
        detener()
        serpiente.ancho = 40
        serpiente.alto = 40
        serpiente.x = 5
        serpiente.y = 5
       
    }
}

function fruits(){
 manzana.pintar()
} 

//while (puntos >= 9999) {
    function colision(){
        const arribaManzana = manzana.y
        const abajoManzana = manzana.y + manzana.alto
        const derechaManzana = manzana.x + manzana.ancho
        const izquierdaManzana = manzana.x
    
        const abajoSerpiente = serpiente.y + serpiente.alto
        const derechaSerpiente = serpiente.x + serpiente.ancho
        const izquierdaSerpiente = serpiente.x
        const arribaSerpiente = serpiente.y
    
        if(
           abajoSerpiente < arribaManzana ||
           arribaSerpiente > abajoManzana ||
           derechaSerpiente < izquierdaManzana ||
           izquierdaSerpiente > derechaManzana 
        ) {
            choque = 'true'
           return 
        }

        if(choque === 'true'){
            puntaje = puntaje + 5
            manzana.x = aleatorio(0,mapa.width - manzana.ancho),
            manzana.y = aleatorio(0,mapa.height - manzana.ancho)
            serpiente.ancho = serpiente.ancho + 5
            serpiente.alto = serpiente.alto + 5
        }
    }
//}


window.addEventListener('load', iniciarMapa)