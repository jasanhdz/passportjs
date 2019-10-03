const jwt = require('jsonwebtoken');
/**
 * Los primeros 2 párametros que no estamos definiendo aquí  son: 
 * el proceso de node y el archivo que estamos leyendo, por lo que
 * nosotros empezaremos a leer desde el 3ter argumento.
 */
const [, , option, secret, nameOrToken] = process.argv; 
// la opcion va a estar definida por verificar o por firmar.

// vamos a verificar si tenemos las opciones  o argumentos y si no los tenemos que nos saque un error
if (!option || !secret || !nameOrToken) {
  console.log('Missing arguments');
}

/**
 * Despues de que pase nuestra prueba de argumentos crearemos 2 funciones
 * 
 */

function signToken(payload, secret) {

  return jwt.sign(payload, secret);
}

function verifyToken(token, secret) {
  // retorna el token decodificado
  return jwt.verify(token, secret)
}

// vamos a hacer nuestro flujo de ejecución 
if (option == 'sign') {
  
  console.log(signToken({ sub: nameOrToken }, secret));
} else if (option == 'verify') {
  console.log(verifyToken(nameOrToken, secret));
} else {
  console.log('Options needs to be "sign" or "verify" ');
}

