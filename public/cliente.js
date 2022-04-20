//Variables de control
const io = require('socket.io-client');
// const socket = io.connect('http://192.168.1.45:3000', {'forceNew': true });
const socket = io.connect('http://127.0.0.1:3000', { forceNew: true, timeout: 20000  });

//Variables de conteo
const max = process.argv[2];
var iteraciones = 0;
var contador_clientes = 0;
var MAX_GRUPO;

//Paquete provisional de datos.
var cliente = {
    x: 0,
    y: 0,
    z: 0,
    grupoID: "",
    socket_id : 0
};

//Empezamos la conexión lanzando un intento de conexión.
socket.emit('connection');

//Recibimos que se ha creado la conexión
socket.once('conexioncreada', function(max_grupo, IDgrupo){
    cliente.grupoID = IDgrupo;
    cliente.socket_id = socket.id;
    //guardamos el max de grupo.
    MAX_GRUPO = max_grupo;
    // console.log('Cliente nuevo ' + socket.id + ' Conexión aceptada recibido.');
    
    //Conexión a tres vías
    socket.emit('ConexionRecibida',cliente);
});


socket.on('PuedesEmpezar', function (msg) {
    cliente.x = Math.trunc(Math.random() * 10 + 1);
    cliente.y = Math.trunc(Math.random() * 10 + 1);
    cliente.z = Math.trunc(Math.random() * 10 + 1);
   
    if(iteraciones == max){
        socket.emit('disconnect', cliente);
        socket.close();
    }else{
        iteraciones ++;
        socket.emit('CambioPosicion',cliente); 
    }
});


//Recibo de mensajes
socket.on('Recibido', function(message){
    console.log('\x1b[33m%s\x1b[0m', message);
    socket.emit('MensajeClienteRecibido');
});


socket.on('MensajeTransmitido', function(msg) {
    if(contador_clientes == MAX_GRUPO-2){
        contador_clientes = 0;
        socket.emit('AcabaCiclo');
    }
    else
        contador_clientes++;
});

socket.on('Cierrate', function () {
    socket.close();
})

