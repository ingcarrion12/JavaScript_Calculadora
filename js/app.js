var Calculadora = {
    operando1: '',
    operando2: '',
    operador: '',
    ultimaOperacion: '',
    display: '',
    init: function () {
        this.display = document.getElementById('display');
        this.aplicarEfectoTeclas();
    },
    aplicarEfectoTeclas: function () {
        var teclas = document.getElementsByClassName('tecla');

        for (var i = 0; i < teclas.length; ++i) {
            teclas[i].onclick = this.presionarTecla;
        }
    },
    sumar: function(a, b){
        return a + b;
    },
    restar: function(a, b){
        return a - b;
    },
    multiplicar: function(a, b){
        return a * b;
    },
    dividir: function(a, b){
        return a / b;
    },
    reset: function () {
        display.textContent = '0';
        Calculadora.operando1 = '';
        Calculadora.operando2 = '';
        Calculadora.operador = '';
        Calculadora.ultimaOperacion = '';
    }, calcular: function () {
        var resultado = 0;
        var error = false;

        switch (Calculadora.operador) {
            case 'mas':
                resultado = this.sumar(Calculadora.operando1, Number(display.textContent));
                Calculadora.ultimaOperacion = 'mas';
                Calculadora.operando2 = Number(display.textContent);
                break;
            case 'menos':
                resultado = this.restar(Calculadora.operando1, Number(display.textContent));
                Calculadora.ultimaOperacion = 'menos';
                Calculadora.operando2 = Number(display.textContent);
                break;
            case 'por':
                resultado = this.multiplicar(Calculadora.operando1, Number(display.textContent));
                Calculadora.ultimaOperacion = 'por';
                Calculadora.operando2 = Number(display.textContent);
                break;
            case 'dividido':
                if (Number(display.textContent) === 0) {
                    error = true;
                    display.textContent = 'ERROR';
                } else {
                    resultado = this.dividir(Calculadora.operando1, Number(display.textContent));
                    Calculadora.ultimaOperacion = 'dividido';
                    Calculadora.operando2 = Number(display.textContent);
                }
                break;
            default:
                var resultadoPrevio = Number(display.textContent);
                switch (Calculadora.ultimaOperacion) {
                    case 'mas':
                        resultado = resultadoPrevio + Calculadora.operando2;
                        break;
                    case 'menos':
                        resultado = resultadoPrevio - Calculadora.operando2;
                        break;
                    case 'por':
                        resultado = resultadoPrevio * Calculadora.operando2;
                        break;
                    case 'dividido':
                        resultado = resultadoPrevio / Calculadora.operando2;
                        break;
                }
        }

        if(resultado.toString().indexOf(".") !== -1){
            resultado = Number(resultado.toFixed(2));
        }

        if (resultado.toString().length >= 8) {
            display.textContent = 'ERROR';
            error = true;
        }

        if (!error) {

            if (resultado.toString().indexOf(".") !== -1) {
                display.textContent = resultado.toFixed(2);
            } else {
                display.textContent = resultado;
            }
            Calculadora.operador = '';
        }
    }, presionarTecla: function (event) {
        var tecla = event.target;
        tecla.style.transform = "scale(0.9)";

        setTimeout(function () {
            tecla.style.transform = "scale(1.0)";
        }, 200);

        switch (tecla.alt) {
            case 'On':
                Calculadora.reset();
                break;
            case 'signo':
                if (display.textContent.length > 0) {
                    if (display.textContent.substr(0, 1) === '-') {
                        display.textContent = display.textContent.substr(1);
                    } else {
                        display.textContent = '-' + display.textContent;
                    }
                }
                break;
            case '0':
                if (display.textContent.length > 0 && display.textContent.substr(0, 1) !== '0'
                    || display.textContent.length === 0
                    || display.textContent.indexOf('.') !== -1) {
                    if (Calculadora.comprobarLongitudDisplay()) {
                        display.textContent = display.textContent + tecla.alt;
                    }
                }

                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                if (Calculadora.comprobarLongitudDisplay()) {
                    Calculadora.removerCeroDisplay();

                    display.textContent = display.textContent + tecla.alt;
                }
                break;
            case 'punto':
                if (display.textContent.length > 0 && display.textContent.indexOf('.') === -1) {
                    display.textContent = display.textContent + '.';
                }
                break;

            case 'mas':
            case 'menos':
            case 'por':
            case 'dividido':
                if(display.textContent.length !== 0){
                    Calculadora.operando1 = Number(display.textContent);
                }
                Calculadora.operador = tecla.alt;
                display.textContent = '';

                break;

            case 'igual':
                Calculadora.calcular();
        }
    },
    comprobarLongitudDisplay: function () {
        if (this.display.textContent.indexOf('-') !== -1) {
            return this.display.textContent.length < 9;
        } else {
            return this.display.textContent.length < 8;
        }
    },
    removerCeroDisplay: function () {
        if (this.display.textContent.length === 1 && this.display.textContent === '0') {
            this.display.textContent = '';
        }
    }
};

Calculadora.init();
