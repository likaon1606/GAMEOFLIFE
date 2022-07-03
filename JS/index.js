//-----------------GENERATE DASHBOARD--------------------------------------
let filas = 80
let columnas = 80
let lado = 20

let reproducir = false

let fotografia = []

document.addEventListener("keydown", (e) => {//keyboard control
    e.preventDefault()//prevent scroll movement
    switch ( e.keyCode ) {
        case 39:
            siguienteEstado()
            break;
        case 32:
            intercambiarReproduccion()
        default:
            break;
    }
});

setInterval(() => {
    if (reproducir) {
        siguienteEstado()
    }
}, 200);

function intercambiarReproduccion() {
    reproducir = !reproducir
}

generarTablero()

function generarTablero() {
    let html = "<table cellpadding = 0 cellspacing = 0 id='tablero' >"
    for ( y = 0; y < filas; y++ ) {
        html += "<tr>"
        html += "</tr>"
        for ( x = 0; x < columnas; x++ ) {
            html += `<td id="celula-${x + "-" + y}" onmouseup="cambiarEstado (${x}, ${y})">` // paint state push mouse
        }
        html += "</td>"
    }
    html += "</table>"
    let contenedor = document.getElementById("contenedor-tablero")
    contenedor.innerHTML = html
    let tablero = document.getElementById("tablero")
    tablero.style.width = lado * columnas + "px"
    tablero.style.height = lado * filas + "px"
}

//-------------------------------------CHANGE STATE------------------------------

function cambiarEstado(x, y) {
    let celula = document.getElementById(`celula-${x + "-" + y}`)

    if ( celula.style.background != "black" ) {
        celula.style.background = "black"
    } else {
        celula.style.background = ""
    }
}

//----------CLONE DASHBOARD/ACTUAL STATE------------------

function fotografiar() {
    
    fotografia = []

    for ( x = 0; x < columnas; x++ ) {
        fotografia.push([])
        for ( y = 0; y < columnas; y++ ) {
            let celula = document.getElementById(`celula-${x + "-" + y}`)
            fotografia[x][y] = celula.style.background == "black"
        }
    }
}

//--------COUNT CELLS------------------------------

function contarVivas(x, y) {
    let vivas = 0
    for ( i = -1; i <= 1; i++ ) {
        for ( j = -1; j <= 1; j++ ) {
            if ( i == 0 && j == 0 )
            continue
            try {
                if ( fotografia[x + i] [y + j] )
                vivas++
            } catch (e) { }
            if ( vivas > 3 ) {
                return vivas
            }
        }
    } return vivas
}

//-----------DEAD-------------------

function siguienteEstado() {
    fotografiar()
    for ( x = 0; x < columnas; x++ ) {
        for ( y = 0; y < columnas; y++ ) {
            let vivas = contarVivas(x, y)
            let celula = document.getElementById(`celula-${x + "-" + y}`)
            if ( fotografia[x][y] ) { //cell is life
                if ( vivas < 2 || vivas > 3 )
                celula.style.background = ""                 //dies of overpopulation or they are not enough    
            }else{//cell is dead
                if ( vivas == 3 )
                    celula.style.background = "black"
            }
        }
    }
}