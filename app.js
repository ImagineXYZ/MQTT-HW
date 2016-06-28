var mqtt = require('mqtt'), url = require('url');
// Parse
var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
var auth = (mqtt_url.auth || ':').split(':');

// Create a client connection
var client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
  username: auth[0],
  password: auth[1]
});

client.on('connect', function() { // When connected

  // subscribe to a topic
  client.subscribe('hello/world', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });

  // publish a message to a topic
  client.publish('hello/world', 'my message', function() {
    console.log("Message is published");
    client.end(); // Close the connection when published
  });
});
/*
// garage.js
const mqtt = require('mqtt');  
const client = mqtt.connect('mqtt://broker.mqttdashboard.com');

//Módulos Necesitados
var express = require('express'), //Biblioteca para permitir servicios REST
    cookieParser = require('cookie-parser'), 
    bodyParser = require('body-parser'); 

var app = express(); //Instancia de express
app.use(express.logger('dev')); //Método de ver los mensajes en consola
app.use(bodyParser());


//app.use(express.static(__dirname + '/webpage')); //Página por defecto al ingresar al servidor


//Servicios REST permitidos
app.get('/imaginexyz', function(req, res) {  
  console.log('AK7')
  res.send(200, true);
})

var state = 'closed';

client.on('connect', function() {  
  client.subscribe('imagine/open')
  client.subscribe('imagine/close')

  // Inform controllers that garage is connected  
  client.publish('imagine/connected', 'true')
})

client.on('message', function(topic, message) {  
  console.log('received message %s %s', topic, message)
  switch (topic) {
    case 'imagine/open':
      console.log('abriendo');
      client.publish('imagine/connected', message);
      break;
      //client.publish('garage/open', message)
    case 'imagine/close':
      console.log('cerrando');
      client.publish('imagine/connected', message);
      break;
      //client.publish('garage/state', message)
  }
});

//Redirección por defecto
app.get('*', function (req, res) {
    res.redirect('../#home', 404);
});

//Habilitar puerto de escucha para el servidor
var port = Number(process.env.PORT || 3000);
app.listen(port);
console.log('Listening on port ' + port + '...');
*/