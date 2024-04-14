document.getElementById("registroCliente").onsubmit = function (e) {
    e.preventDefault();

    var nombre = document.getElementById("nombre").value;
    var run = document.getElementById("run").value;
    var edad = parseInt(document.getElementById("edad").value, 10);

    if (!nombre.trim()) {
        alert("Por favor, ingrese su nombre.");
        return;
    }

    if (!validarRun(run)) {
        alert("El RUT ingresado no es válido. Debe seguir el formato 12345678-9 y ser un RUT real.");
        return;
    }

    if (isNaN(edad)||  edad < 0  || edad > 120) {
        alert("Por favor, ingrese una edad válida entre 0 y 120 años.");
        return;
    }

    guardarDatos({ nombre: nombre, run: run, edad: edad });
    alert("Cliente registrado con éxito.");
    document.getElementById("registroCliente").reset();
};

function validarRun(rutCompleto) {
    if (!/^\d{7,8}-[\dkK]$/.test(rutCompleto)) {
        return false;
    }

    var tmp = rutCompleto.split('-');
    var rut = tmp[0];
    var dv = tmp[1];
    return (calcularDV(rut) === dv.toLowerCase());
}

function calcularDV(T) {
    var M = 0, S = 1;
    for (; T; T = Math.floor(T / 10))
        S = (S + T % 10 * (9 - M++ % 6)) % 11;

    return S > 1 ? (S - 1).toString() : 'k';
}

function guardarDatos(data) {
    var currentTime = new Date().toISOString();
    localStorage.setItem("cliente_" + currentTime, JSON.stringify(data));
}