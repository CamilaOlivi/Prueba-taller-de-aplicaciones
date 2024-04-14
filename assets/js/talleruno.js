function iniciar() 
{
    cajadatos = document.getElementById('cajadatos'); 
    var boton = document.getElementById('boton');
    boton.addEventListener('click', crear, false);
    window.webkitRequestFileSystem(window.PERSISTENT, 5 * 1024 * 1024, creardd, errores);    
}

function creardd(sistema) 
{
    dd = sistema.root;
}
function crear()
{
        var nombre = document.getElementById('entrada').value; 
        if (nombre != '')
        {
            dd.getFile(nombre, { create: true, exclusive: false }, mostrar, errores);
        }
}
function mostrar(entrada) 
{
    document.getElementById('entrada').value = '';
    cajadatos.innerHTML = 'Entrada Creada!<br>'; cajadatos.innerHTML += 'Nombre: ' + entrada.name + '<br>'
    ; cajadatos.innerHTML += 'Ruta: ' + entrada.fullPath + '<br>'
    ; cajadatos.innerHTML += 'Sistema: ' + entrada.filesystem.name;
}

function errores(e) 
{
    alert('Error: ' + e.code);
}

window.addEventListener('load', iniciar, false);

window.addEventListener('load', function() 
{    
    var cvvInput = document.getElementById('cvv');   

    cvvInput.addEventListener('input', function() 
    {
        this.value = this.value.replace(/\D|\s/g, '');
        if (this.value.length > 3) 
        {
            this.value = this.value.slice(0, 3);
        }
    });
        
});

window.addEventListener('load', function() 
{
    var numeroTarjetaInput = document.getElementById('numeroTarjeta');
  
    numeroTarjetaInput.addEventListener('input', function() 
    {
        this.value = this.value.replace(/\D/g, '');

        if (this.value.length > 16) 
        {
            this.value = this.value.slice(0, 16);
        }
    });

    numeroTarjetaInput.addEventListener('input', function()
    {
        var cleanedValue = this.value.replace(/\D/g, '');

        var formattedValue = '';
        for (var i = 0; i < cleanedValue.length; i++) 
        {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += cleanedValue[i];
        }

        this.value = formattedValue;
    });
});

var fechaVencimientoInput = document.getElementById('fechaVencimiento');
fechaVencimientoInput.addEventListener('input', function() 
{
    this.value = this.value.replace(/\D|\s/g, '');

    if (this.value.length > 4) 
    {
        this.value = this.value.slice(0, 4);
    }
  
    if (this.value.length >= 2) 
    {
        this.value = this.value.replace(/^(\d{2})/, '$1/');
    }
});

fechaVencimientoInput.addEventListener('keydown', function(event) 
{
    if (event.key === 'Backspace' && this.selectionStart === 3 && this.value.charAt(2) === '/') 
    {        
        this.value = '';
        event.preventDefault();
    }
});

var nombreTitularInput = document.getElementById('nombreTitular');
nombreTitularInput.addEventListener('input', function() 
{
    this.value = this.value.replace(/[^a-zA-Z\sáéíóúÁÉÍÓÚ]/g, '').slice(0, 30);
});

document.getElementById('enviarBtn').addEventListener('click', function() {
    var numeroTarjeta = document.getElementById('numeroTarjeta').value;
    var nombreTitular = document.getElementById('nombreTitular').value;
    var fechaVencimiento = document.getElementById('fechaVencimiento').value;
    var cvv = document.getElementById('cvv').value;

    if (!numeroTarjeta.trim() || !nombreTitular.trim() || !fechaVencimiento.trim() || !cvv.trim()) {
        alert('Por favor, complete todos los campos.');
    } else {
        alert('Formulario enviado correctamente.');
    }
});