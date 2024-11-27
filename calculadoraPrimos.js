function checkEnter(event) {
    if (event.key === "Enter") {
        boton();
    }
}

function boton() {
    input = document.getElementById("numero").value
    const resultadoDiv = document.getElementById("resultado")
    if (input.trim() === "") {
        alert("Debe ingresar un número valido");
        resultadoDiv.textContent = "";
        return;
    }

    let n = Number(input)

    resultadoDiv.textContent = "";

    if (validarNumero(n)) {
        const raiz = raizEntera(n);
        const residuo = moduloRaiz(n);

        if (comprobarPrimo(n)) {
            resultadoDiv.innerHTML = `
                <span class="primo">${n} es un número primo.</span>
                <br>Raíz cuadrada (entera): ${raiz}
                <br>Residuo de la raíz cuadrada: ${residuo}
                <br>Factores primos menores o iguales a la raíz: ${primosAnteriores(raiz).join(', ') || "ninguno"}
            `;
        } else {
            const primerFactor = primerFactorPrimo(n);
            resultadoDiv.innerHTML = `
                <span class="no-primo">${n} no es un número primo.</span>
                <br>Raíz cuadrada (entera): ${raiz}
                <br>Residuo de la raíz cuadrada: ${residuo}
                <br>Primer factor primo que divide a ${n}: ${primerFactor}
            `;
        }
    }
    document.getElementById("numero").value = ""
}

function validarNumero(n) {
    if(n.toString().length > 15 || n > 1e16){
        alert("El numero es demasiado grande")
        return false
    }
    if (isNaN(n)) {
        alert("Debe ser un numero")
        return false
    }
    if (n < 0) {
        alert("No puede ser negativo")
        return false
    }
    if (n % 1 !== 0) {
        alert("No puede ser decimal")
        return false
    }
    return true
}

function raizEntera(n) {
    return Math.floor(Math.sqrt(n))
}

function moduloRaiz(n) {
    return n - Math.pow(raizEntera(n), 2)
}

/*Funcion comprobarPrimo retorna un true si el numero es primo, y un false si el numero es compuesto*/
function comprobarPrimo(n) {
    /*Si el numero es menor a 2 se regresa un false*/
    if (n < 2) {
        return false;
    }
    /*Este for divide todos los numeros menores o iguales a la raiz a partir del 2*/
    for (let i = 2; i <= raizEntera(n); i++) {
        /*Si el residuo da como resultado 0 significa que es compuesto se retorna un false*/
        if (n % i == 0) {
            return false;
        }
    }
    /*Si no se cumple nada de lo anterior el numero es primo y se retorna un true*/
    return true;
}

/*Funcion primerFactorPrimo determina cual es el primer factor primo que divide a un numero compuesto*/
function primerFactorPrimo(n) {
    /*Este for divide todos los numeros menores o iguales a la raiz a partir del 2*/
    for (let i = 2; i <= raizEntera(n); i++) {
        /*Se divide el numero compuesto entre la iteracion*/
        if (n % i == 0 && comprobarPrimo(i)) {
            /*Se retorna el primer numero primo que lo haya dividido*/
            return i;
        }
    }
    return "ninguno, es 0 o 1"
}

/*primosAnteriores determina todos los factores primos anteriores o iguales a un numero*/
function primosAnteriores(n) {
    /*En este arreglo se almacenaran todos los numeros primos aneteriores o iguales para despues ser mostrados*/
    let arregloPrimosAnt = [];

    /*En este for i recorre todos los numeros del 2 al numero primo ingresado*/
    for (let i = 2; i <= n; i++) {

        /*Se llama a la funcion comprobarPrimo que evaluara los numeros del 1 al numero ingresado*/
        if (comprobarPrimo(i) == true) {

            /*Si el numero evaluado es primo se guardara en el arreglo*/
            arregloPrimosAnt.push(i);
        }
    }

    /*Se retorna el arreglo con los numeros primos anteriores o iguales al numero ingresado*/
    return arregloPrimosAnt;
}