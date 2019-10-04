## Stack de Seguridad Moderno

Anteriormente las compañias se comunicaban mediante un [intranet](https://es.wikipedia.org/wiki/Intranet), un [intranet](https://es.wikipedia.org/wiki/Intranet) a diferencia del [internet](https://es.wikipedia.org/wiki/Internet) es una red privada que funciona dentro de las compañias, en está red había protocolos como [SOAP](https://es.wikipedia.org/wiki/Simple_Object_Access_Protocol), [SAML](https://es.wikipedia.org/wiki/Security_Assertion_Markup_Language), [WS-Federation](https://en.wikipedia.org/wiki/WS-Federation), pero esos protocolos se quedarón muy cortos cuando llegó la **revolución mobile**, además tecnologías como [HTML5](https://es.wikipedia.org/wiki/HTML5), empezarón a necesitar otra serie de cosas y conceptos como la autheticación y la autorización también necesitaban una evolución, además el auge de los [microservicios](https://docs.microsoft.com/es-es/azure/architecture/guide/architecture-styles/microservices) [o](https://es.wikipedia.org/wiki/Arquitectura_de_microservicios) y la necesidad de tener multiples clientes, hicieron la creación de un nuevo STACK, esté stack se compone generalmente de 3 protocolos: [JSON Web Tokens](https://es.wikipedia.org/wiki/JSON_Web_Token), [OAuth 2.0](https://es.wikipedia.org/wiki/OAuth#OAuth_2.0) [o](https://www.digitalocean.com/community/tutorials/una-introduccion-a-oauth-2-es) , y [OpenID Connect](https://es.wikipedia.org/wiki/OpenID_Connect).

- **JSON Web Tokens**: Son un estandar de la industria abierto que nos permite comunicarnos entre 2 clientes de un lado a otro de una manera más segura.

- **OAuth 2.0**: Es un standart de la industria que permite implementar autorización, hay que tener mucho cuidado en **No confudir autorización con autenticación**. Precisamente una de las diferencias de open authorization 1.0(OAuth 1.0) y su versión 2 fue la necesidad de adaptarse a estas nuevas tecnologias mobile.

- **OpenID Connect**: Es una capa de autenticación que funciona por encima de **OAuth 2.0** 

## ¿Qué es la autenticación y la autorización?

La autenticación: es la acción de verificar la identidad de un usuario, es decir verificar si el usuario existe y en efecto es él. En nuestra aplicación nosotros vamos a implementar autenticación usando usuario y contraseña para posteriormente generar un Token de autorización.

La autorización es la acción de otorgar permisos de manera limitada a nuestros recursos.

analogía:

_"Los carros modernos suelen tener 2 llaves, una llave que sirve para conducir y 1 llave que sirve para el pallet parking. El pallet parking es un servicio que tienen algunos restaurantes donde llegas con tu carro, donde te recibe alguien y lo estaciona por ti, **estas llaves tienen permisos limitados**, solo permiten encender el carro a cierta velocidad, no alejarse de cierta área."_

En los sistemas pasa algó muy similar, nosotros aveces otorgamos permisos de solo lectura y escritura, es nuestra aplicación nosotros vamos a otorgar una serie de permisos, unos permisos que son del usuario final que son de lectura y escritura sobre ciertas colecciones, pero también vamos a otorgar otros permisos administrativos, y esto lo vamos a hacer manejando unos tokens que vamos a otorgarle a nuestro servidor.

## Introducción a las sesiones

Cuando tu visitas un sitio web se crea una petición http. [Http]() es un protocolo que no tienen estado esto quiere decir que diferentes direcciones http nunca comparten información entre si, así que la manera de poder compartir está información en peticiones http es mediante el uso de una sesión. Cuando visitas un sitio web por primera vez se crea una sesión, no es necesario que estés autenticado para que está sesión sea creada.

Supon que vas a un sitio a buscar vuelos, cuando tu entras al sitio se te crea una sesión y a menudo que vas haciendo busquedad a esos vuelos, se van guardando tus preferencias de búsquedad en está sesión, luego está sesión generó un ID que se almaceno en una [cookie](), la cookie es un archivo que se almacena en tu navegador, para que cuando tu cierres el navegador la cookie permanesca con el id de la sesión, así la próxima vez que vuelvas esté ID de la sesión que permance en la cookie se relaciona con la sesión que estaba previamente abierta y así puede cargar tus preferencias en los vuelos que estabas buscando.

Es por eso que muchas veces aunque nosotros no iniciemos sesión podemos ver que nuestras preferencias está ahí, también cuando hay un proceso de autenticación, la sesión se almacena directamente y se relaciona con tu usuario, por seguridad la sesión debería terminar ciertos minutos despues de que hay un inactividad, sin embargo dependiendo el mecanismo que estés usando podrías tener sesiones por dias o incluso por meses [cookiesSession] y [expressSession] son librerías que nos permiten implementar todo el tema de sesiones en express, la diferencia más grande es que cookiesSession nos permite almacenar la sesión en la cookie, mientras que express sesión nos permite almacenar la sesión en la memoría en el lado del servidor.

A la hora de escalar la sesión es muy importante utilizar bases de datos en memoria como Redis, eso es una ventaja que tiene JWT, pues JWT no tiene estado y por lo tanto no necesita memoria, pero más adelante vamos a ver cuales son las diferentes ventajas y desventajas sobre JWT y Sesiones.

## Anatomía de un JWT

Un JWT es un estandart de la industria que nos permite generar demandas entre 2 clientes de manera segura.

``Un JWT luce más o menos así``.

<div align="center">
  <img src="./assets/jwt.png" alt="json web token">
</div>

En la columna de izquierda puedes ver como es un JWT mientras que en la columna de la derecha puedes ver un JWT decodificado.

Un JWT consta de 3 partes: **Header, Payload y Signature**, generalmente divididas por un punto.

- **Header**: tiene 2 atributos, el tipo que en esté caso siempre debería ser JWT y el algoritmo de encriptación de la firma, el algoritmo de encriptación de la firma **puede ser sincrono o asincrono**. Recordemos que los algoritmos asincronos **usan 2 llaves** de encriptación; una llave **privada** y una llave **pública**, donde la llave pública se usa para encriptar y la llave privada se usa para desencriptar y el los algoritmos de encriptación sincronos se usa la misma llave para desencriptar e incriptar, ambos son seguros de usar pero depende donde los uses.

Los algoritmos asincronos deben usarse donde hay partes públicas que puedan tener acceso a está llave, mientras que los algoritmos sincronos solo deben usarse en sistemas como el [backend](https://platzi.com/blog/que-es-frontend-y-backend/).

- **Payload**: Es donde guardamos toda la información de nuestro usuario, incluso todos los scopes de autorización, esté payload se compone de algó llamado los **claims**, los claims son generalmente representados por 3 letras para mantener el JWT muy pequeño, hay diferentes tipos de claims.

Nosotros en la página donde está el estandart podemos ver en la sección 4.1 lo que se llama los ``Registered Claim Name``s. Estos son ``clains`` especificos que tienen una definición propia y debe respetarse.

También podemos usar los ``Public Claim Names``, estos pueden usarse entre diferentes aplicaciones y ya estan también definidos, mientras que los **Private Claim Names**, son los que tu defines para tu aplicación.


- **Signature**: La tercera parte del JWT que es la firma y es lo que hace muy poderoso el JWT está compuesto por el **header códificado** más el **payload códificado**, ha esto se le aplica el algoritmo de encriptación por su puesto usando un ``secret``. En el caso del algoritmo H256 debemos usar un string de 256 bits de longitud.


## Autenticación tradicional vs JWT

En la autenticación tradicional cuando sucede un proceso de autenticación se crea una sesión, el id de está sesión se almacena en una cookie que es enviada al navegador. Recordemos que las cookies no se llaman cookies por las galletas de chocolate, sino que se llamán cookies **por las galletas de la fortuna que tienen mensajes**, apartir de ahí todos los request tienen la cookie que tiene almacena el id de la sesión y está es usada para verificar la sesión previamente activa, uno de los problemas que tiene es esté browser es por ejemplo: clientes como las Single Pages Apps, no pueden refrescar o no pueden refrescar todas las veces entonces no pudieron saber si hubo cambios en la sesión. Otro problema es que por definición las Rest API no deberían tener estado, al usar sesiones estamos generando estado y esto contradice esté principio, otro problema es que en arquitecturas modernas que usan por ejemplo microservicios, la sesión que solo existe en una máquina no fluye durante los otros clientes, entonces es un poco dificil de escalar, y otro problema es que por ejemplo el control de acceso siempre requiere que vallamos a base de datos, finalmente controlar el uso de memoria también puede ser un problema, ya que cada cliente que se conecta genera una sesión generando más consumo de memoria.

En la autenticación con JWT al suceder el proceso de autenticación se firma un token, apartir de ahí el token es enviado al cliente y esté deber ser almacenado en memoria o en una cookie, todos los request de aquí en adelante llevan esté token, una de las ventajas es que una aplicación como una Single Pages App ya no requiere del backend para saber si el usuario está autenticado, lo otro es que el backend puede recibir múltiples request de múltiples clientes y lo único que le interesa es saber si el token está bien firmado, finalmente es el cliente quien sabe que permisos tienen y no tiene que ir hasta base de datos para saber si tiene estos permisos.

## Firmando y verificando un JWT

Para firmar un JWT lo primero que debemos hacer es hacer uso de una librería llamada ``nodejsonwebtoken`` está librería tiene un método llamado ``sign``, el primer sign recibe como primer argumento el ``payload`` de JWT, recordemos que esté payload esta construido con los diferentes **claims** que definamos, como segundo atributo debe recibir el ``secret`` con el que va ha ser firmado la firma del JWT, y finalmente hay un tercer argumento que pueden ser ``options`` extras para nuestro firmado del JWT.

Para la verificación de nuestro JWT usando la misma librería vamos a hacer uso de la misma librería, vamos a hacer uso del método ``verify``, en el primer argumento vamos a recibir el ``token`` que queremos verificar, como segundo argumento vamos a recibir el ``secret`` y como tercer argumento de manera opcional vamos a recibir un callback que nos va a regresar el JWT decodificado, también podemos omitir esté tercer argumento y simplemente recibirlo de manaera sincrona. 

Vamos ver en el código como puedes lograr estó: _Para esté ejemplo_

1. Creamos una carpeta llamada ``jwt-utilities``
2. Ahi vamos a crear nuestro ejemplo usando ``npm init -y``
3. Creamos un archivo index.js.
4. Instalamos nuestra dependencia de JWT ``npm i jsonwebtoken``
5. En nuestro archivo index vamos a requerir la librería
```const jwt = require('jsonwebtoken');``

En el vamos a hacer varias cosas, lo primero es que sus argumentos los vamos a sacar de la terminal, para ello vamos a hacer uso de process argument. El process argument lo que hace es que lee los comando de la terminal.
```js
const [, , option] 
// la opcion va a estar definida por verificar o por firmar.
```
Los primeros 2 párametros que no estamos definiendo aquí  son: 
el proceso de node y el archivo que estamos leyendo, por lo que nosotros empezaremos a leer desde el 3ter argumento.

Luego vamos a pedir el ``secret`` y finalmente vamos a pedir un nombre o un token en nuestro ejemplo, todo esto lo sacamos del process.argv;
```js
const [, , option, secret, nameOrToken] = process.argv; 
```

La implementación de JWT quedaría de la siguiente manera:

```js
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
```

Ahora vamos a hacer una prueba:

``node index.js sign secret jasan``

Una vez generado el JWT vamos a ir [jwt.io](htttps://jwt.io) que es una página donde podemos hacer debuggin del token. Y podemos verificar que está página nos hace una decodificación tál y como lo vimos en el modulo de la anatomía de un JWT.

Ahora vamos usar esté mismo JWT y vamos a usar la utilidad para verificarlo, para eso lo único que debemos hacer es usar la palabra verify y como tercer cuarto parametro le vamos a pasar el secret y por ultimo el token.

``node index.js verify secret eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYXNhbiIsImlhdCI6MTU3MDE0NTQ5MH0.1OXIA17Rl2Oy4b8aq68vZL_srFuVsYwPbHWAXurkkoI``

Hay que tener mucho cuidado cuando estamos manipulando la consola, porque sule partirnos el JWT y lo que debemos hacer es ubicarlo en una sola linea.

## Server-side vs Client-side sessions

**Sesiones del lado del servidor vs sesiones del lado del cliente**

### ¿Qué es una sesión?

En terminos generales una sesion es una manera de preservar un estado deseado.

### ¿Qué es una sesion del lado del servidor?

La sesión en el lado del servidor suele ser una pieza de información que se guarda en memoria o en una base de datos y esta permite hacerle seguimiento a la información de autenticación, con el fin de identificar al usuario y determinar cuál es el estado de autenticación. Mantener la sesión de esta manera en el lado del servidor es lo que se considera “statefuful”, es decir que maneja un estado.

### ¿Qué es una sesión del lado del cliente?

Las SPA (Single-page apps) requieren una manera de saber si el usuario esta autenticado o no. Pero esto no se puede hacer de una manera tradicional porque suelen ser muy desacopladas con el backend y no suelen refrescar la página como lo hacen las aplicaciones renderizadas en el servidor.

JWT (JSON Web Token) es un mecanismo de autenticación sin estado, lo que conocemos como “stateless”. Lo que significa que no hay una sesión que exista del lado del servidor.

La manera como se comporta la sesión del lado del cliente es:

1. Cuando el usuario hace “login” agregamos una bandera para indicar que lo esta.
2. En cualquier punto de la aplicación verificamos la expiración del token.
3. Si el token expira, cambiamos la bandera para indicar que el usuario no está logueado.
4. Se suele chequear cuando la ruta cambia.
5. Si el token expiró lo redireccionamos a la ruta de “login” y actualizamos el estado como “logout”.
6. Se actualiza la UI para mostrar que el usuario ha cerrado la sesión.

## Buenas Prácticas con JWT

### Buenas practicas con JSON Web token

En los últimos años se ha criticado fuertemente el uso de JSON Web Tokens como buena práctica de seguridad. La realidad es que muchas compañías hoy en día los usan sin ningún problema siguiendo unas buenas practicas de seguridad, que aseguran su uso sin ningún inconveniente.

A continuación listaremos unos consejos que se deben tener en cuenta:

### Evitar almacenar información sensible

Debido a que los JSON Web tokens son decodificables es posible visualizar la información del payload, por lo que ningún tipo de información sensible debe ser expuesto como contraseñas, keys, etc. Tampoco debería agregarse información confidencial del usuario como su numero de identificación o información medica, ya que como hablamos anteriormente, los hackers pueden usar esta información para hacer ingeniería social.

### Mantener su peso lo más liviano posible

Suele tenerse la tentación de guardar toda la información del perfil en el payload del JWT, pero esto no debería hacerse ya que necesitamos que el JWT sea lo más pequeño posible debido a que al enviarse con todos los request estamos consumiendo parte del bando de ancha.

### Establecer un tiempo de expiración corto

Debido a que los tokens pueden ser robados si no se toman las medidas correctas de almacenamiento seguro, es muy importante que estos tengan unas expiración corta, el tiempo recomendado es desde 15 minutos hasta un maximo de 2 horas.

### Tratar los JWT como tokens opacos

Aunque los tokens se pueden decodificar, deben tratarse como tokens opacos, es decir como si no tuviesen ningún valor legible. Esto es porque desde el lado del cliente no tenemos manera de verificar si la firma es correcta, así que si confiamos en la información decodificada del token, alguien podría introducir un token invalido con otra información a propósito. Lo mejor, es siempre enviar el token del lado del servidor y hacer las verificaciones allí.

### ¿Donde guardar los tokens?

Cuando estamos trabajando con SPA (Single Page apps) debemos evitar almacenar los tokens en Local Storage o Session Storage. Estos deben ser almacenados en memoria o en una Cookie, pero solo de manera segura y con el flag httpOnly, esto quiere decir que la cookie debe venir del lado del servidor con el token almacenado. Más información:
https://auth0.com/docs/security/store-tokens#single-page-apps

### Silent authenticacion vs Refresh tokens

Debido a que es riesgoso almacenar tokens del lado del cliente, no se deberian usar Refresh Tokens cuando se trabaja solo con una SPA. Lo que se debe implementar es Silent Authentication, para ello se debe seguir el siguiente flujo:

1. La SPA obtiene un access token al hacer login o mediante cualquier flujo de OAuth.
2. Cuando el token expira el API retornara un error 401.
3. En este momento se debe detectar el error y hacer un request para obtener de nuevo un access token.
4. Si nuestro backend server tiene una sesión valida (Se puede usar una cookie) entonces respondemos con un nuevo access token.

Más información:

- https://auth0.com/docs/api-auth/tutorials/silent-authentication
- https://auth0.com/docs/tokens/refresh-token/current

Hay que tener en cuenta que para implementar Silent authentication y Refresh tokens, se require tener un tipo de sesión valida del lado del servidor por lo que en una SPA es posible que sea necesario una especie de backend-proxy, ya que la sesión no debería convivir en el lado del API server.

En el paso 2, si se esta usando alguna librería para manejo de estado como redux, se puede implementar un middleware que detecte este error y proceda con el paso 3.

## ¿Qué son las cookies y cómo implementar el manejo de sesión?

### ¿Qué es un cookie?

Una cookie es un archivo creado por un sitio web que tiene pequeños pedazos de datos almacenados en él, su proposito principal es identificar al usuario mediante el almacenamiento de su historial. 

Las _cookies de sesión_ o **cookiesSession** tienen un corto tiempo de vida, ya que estas son removidas cuando se cierra el tab o el navegador. 

Las **persistent cookies** ó cookies percisitentes se usan generalmente para restaurar al usuario guardando información de su interes.

Las secure cookies almacenan datos de manera cifrada para que terceros mal intencionados no puedan robar la información en el, suelen usarse en conexiones https es decir en conexiones seguras.

Hay leyes de cookies que debes seguir al pie de la letra:

- Avisarle al usuario que estás haciendo uso de cookies en tu sitio para guardar información.

- Es necesario que el usuario de su consentimiento para manejar cookies en tu sitio.

Si las cookies son necesarias para la autentiación del usuario o para algún problema de seguridad esas leyes no aplican en esté caso.

En esté curso vamos a hacer uso de cookies para almacenar el id de la sessión. 

### Implementación de cookies 

A continuación lo haremos en el código:

1. vamos a crear una carpeta llamada handle-session
2. Ingresamos a la carpeta y creamos nuestro ``packages.json`` con ``npm init -y``
3. Vamos a instalar las siguientes dependencias: ``express express-session``, **express-session:** <span style="color:red;font-weight:bold;">que nos permite hacer el manejo de sesión con cookies</span>
4. También vamos a instalar una dependencia de desarrollo llamada ``nodemon`` 
5. Vamos a crear un nuevo archivo llamado ``index.js``.
6. En nuestro archivo index vamos a crear nuestro servidor:

```js
const express = require("express");
// nos permite el manejo de session
const session = require("express-session");

// creamos nuestra nueva aplicación
const app = express();

// voy a definir el manejo de la session mediante el app.use
// dentro de él le paso las siguientes sessiones
app.use(
  session({
    resave: false, // no guardar la cookies cada vez que hay un cambió
    saveUninitialized: false, // si la cookies no se inicializado no la guarde por defecto.
    // se define un secret: debe ser de por lo menos 256 bits,
    // esto es lo que definie de cuando lo cookie es segura va a cifrarla haciendo uso de esté secret.
    secret: "keyboard cat"
  })
);

// creamos una ruta que hace que en el home vamos a hacer el request
// y hacer uso de nuestra session
app.use("/", (req, res) => {
  // verificamos
  req.session.count = req.session.count ? req.session.count + 1 : 1;
  res.status(200).json({ hello: "world", counter: req.session.count });

  // Fijense que por el hecho de haber usado la session con el app.use,
  // nosotros podemos acceder a nuestro req.session y ahí es donde podemos almacenar
  // todos los atributos de la session
});

// finalmente para que nuestro servidor suba, tenemos que hacer un listener
app.listen(3000, () => {
  console.log("Listening htttp://localhost:3000");
});
```

Con esto ya tenemos una pequeña implementación de nuestra session, ahora lo que podemos hacer es generar 2 scripts en nuestro packages.json, uno para desarrollo y uno de start:

```json
{
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  }
}
```

Fijense que si hacemos refresh al servidor el empieza a contar, y es porque precisamente está almacenando esté contador en la session. Si abrimos nuestro developer tools y refrescamos de nuevo, nos damos cuenta que en el request siempre se está enviando la cookie. Si nos vamos a **aplication** y eliminamos la cookie de nuestra sesión en esté caso es ``connect.sid``, al eliminarla y refrescar vuelve y empieza el contador de session, y la petición esta vez nos muestra que en el response se esta estableciendo la cookie.

Con estó tenemos un ejemplo muy claro de como podemos hacer manejo de la session haciendo uso de cookies.






