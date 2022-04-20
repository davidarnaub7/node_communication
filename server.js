var engine = require('engine.io');
var express = require('express');
var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

var clientes_counter = 0;
var clientes_counter_total = 0;
const MAX_CLIENTES_GRUPO = process.argv[3];
const NUMERO_CONEXIONES = process.argv[2];
var grupo_id = 0;
var conexiones = 0;
var tiempoCiclo;
var tiempos = new Array();
var mensajesGrupos = {};
var creado = false;

//Establecemos la conexión
io.sockets.on('connection', function (socket) {
    // console.log('Añadimos nuevo cliente');

    if (clientes_counter == MAX_CLIENTES_GRUPO) {
        grupo_id++;
        clientes_counter = 1;
        creado = false;
    }
    else {
        clientes_counter++;
    }

    clientes_counter_total++;

    //Asignamos el grupo (room)
    socket.join('grupo ' + grupo_id);

    if (!creado) {
        mensajesGrupos[grupo_id] = 0;
        creado = true;
    }
    //Podríamos guardar un mensajes mandados de grupo para cerrarlo.
    // mensajesmandados[socket.id] = 0;

    //respondemos. Hemos aceptado la conexión y enviamos el tamño máximo de grupo.
    socket.emit('conexioncreada', MAX_CLIENTES_GRUPO, grupo_id);

    //Conexión a tres vías
    socket.on('ConexionRecibida', function (client) {
        // console.log('Cliente\t'+ client.socket_id+ ' ACK recieve');
        conexiones++;

        if (conexiones == NUMERO_CONEXIONES)
            io.sockets.emit('PuedesEmpezar', 'Puedes Empezar a mandar datos');
    });

    socket.on('CambioPosicion', function (cliente) {
        tiempoCiclo = Date.now();
        socket.in(Object.keys(socket.rooms)[1]).broadcast.emit('Recibido', 'El cliente' + cliente.socket_id + ' ha cambiado mi posición al punto (' + cliente.x + ', ' + cliente.y + ', ' + cliente.z + ')');
    });

    socket.on('MensajeClienteRecibido', function () {
        socket.emit('MensajeTransmitido', 'El mensaje se ha transmitido correctamente');
    });

    socket.on('AcabaCiclo', function () {
        //Meter en función asíncrona.
        tiempoAux = Date.now() - tiempoCiclo;
        tiempos.push(tiempoAux);
        //indicamos que puede mandar otra petición
        socket.emit('PuedesEmpezar', 'Sigue mandando');
    });

    socket.on('disconnect', function (clienteErase) {
        //Quitamos el cliente de la sala. Automaticamente se borra del grupo.
        //socket.leave(Object.keys(socket.rooms)[1]);

        clientes_counter_total--;
        // mensajesGrupos[clienteErase.grupoID] ++;

        // if(mensajesGrupos[clienteErase.grupoID] == 30){
        //     console.log('entro');
        //     mensajesGrupos[clienteErase.grupoID] = 0;
        //     io.in(Object.keys(socket.rooms)[1]).emit('Cierrate'); 

        //     //mando que se cierre el socket 
        //     // socket.emit('Cierrate');
        // }


        if (clientes_counter_total == 0) {
            console.log('Cerramos conexion del servidor');
            console.log('*************FRENCUENCIA*************');
            console.log('Frecuencia en s\t' + calculateFrequent());
            console.log('**************************************');
            io.close();
        }


    });

});

// server.listen(3000, '192.168.1.45', function(response, request){
server.listen(3000, '127.0.0.1', function (response, request) {
    // console.log ("Servidor escuchando en el puerto 8080");
});

function calculateFrequent() {
    let periodo = 0;
    tiempos.forEach(tiempo => {
        periodo += tiempo;
    });

    periodo = periodo / tiempos.length;

    console.log('Periodo\t' + periodo);
    //Multiplicamos por 1x10^3 para pasar de ms a s.
    return 1 / (periodo / 1000);
}
