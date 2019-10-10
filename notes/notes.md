<div align="center">
  <h1>Passport.js</h1>
  <img src="./assets/passport-logo.png" alt="passport logo" height="300px">
  <h5 style="font-weight:bold;" >Simple, unobtrusive authentication for Node.js</h5>
</div>

## Tabla de Contenido

- [Stack de Seguridad Moderno](#stack-de-seguridad-moderno)
- [¿Qué es la autenticación y la autorización?](#qué-es-la-autenticación-y-la-autorización)
- [Introducción a las sesiones](#introducción-a-las-sesiones)
- [Anatomía de un JWT](#anatomía-de-un-jwt)
- [Autenticación tradicional vs JWT](#autenticación-tradicional-vs-jwt)
- [Firmando y verificando un JWT](#firmando-y-verificando-un-jwt)
- [Server-side vs Client-side sessions](#server-side-vs-client-side-sessions)
  - [¿Qué es una sesión?](#qué-es-una-sesión)
  - [¿Qué es una sesion del lado del servidor?](#qué-es-una-sesion-del-lado-del-servidor)
  - [¿Qué es una sesión del lado del cliente?](#qué-es-una-sesión-del-lado-del-cliente)
- [Buenas Prácticas con JWT](#buenas-prácticas-con-jwt)
  - [Evitar almacenar información sensible](#evitar-almacenar-información-sensible)
  - [Mantener su peso lo más liviano posible](#mantener-su-peso-lo-más-liviano-posible)
  - [Establecer un tiempo de expiración corto](#establecer-un-tiempo-de-expiración-corto)
  - [Tratar los JWT como tokens opacos](#tratar-los-jwt-como-tokens-opacos)
  - [¿Donde guardar los tokens?](#donde-guardar-los-tokens)
- [Silent authenticacion vs Refresh tokens](#silent-authenticacion-vs-refresh-tokens)
- [¿Qué son las cookies y cómo implementar el manejo de sesión?](#qué-son-las-cookies-y-cómo-implementar-el-manejo-de-sesión)
  - [¿Qué es un cookie?](#qué-es-un-cookie)
  - [Implementación de cookies](#implementación-de-cookies)
  - [Cookies vs Session Storage vs Local Storage](#cookies-vs-session-storage-vs-local-storage)
- [Arquitectura del Proyecto VideoCine](#arquitectura-del-proyecto-videocine)
- [Agregando coleción de usuarios](#agregando-coleción-de-usuarios)
- [Agregando colección de películas de usuario](#agregando-colección-de-películas-de-usuario)
- [Implementando el POST y DELETE de las peliculas de usuario](#implementando-el-post-y-delete-de-las-peliculas-de-usuario)
- [Como conectarnos a una base de datos](#como-conectarnos-a-una-base-de-datos)
  - [Conexión usando MongoDB Compass](#conexión-usando-mongodb-compass)
  - [Configuración de Passport.js](#configuración-de-passportjs)
- [Implementación de BasicStrategy con Passport.js](#implementación-de-basicstrategy-con-passportjs)
- [Implementación de Strategy y ExtractJwt con Passport.js](#implementación-de-strategy-y-extractjwt-con-passportjs
)
- [Implementación de nuestro Sign-in](#implementación-de-nuestro-sign-in)
- [Implementación de nuestro Sign Up](#implementación-de-nuestro-sign-up)
- [Protegiendo nuestras rutas con Passport.js](#protegiendo-nuestras-rutas-con-passportjs)
- [Implementando recordar sesión](#implementando-recordar-sesión)
- [Middleware para el manejo de scopes](#middleware-para-el-manejo-de-scopes)
- [Configuración del Server Render](#configuración-del-server-render)
- [Comunicación máquina a máquina](#comunicación-máquina-a-máquina)
- [Implementación de las peliculas de usuario](#implementación-de-las-peliculas-de-usuario)
- [¿Qué es OAuth 2.0?](#qué-es-oauth-20)
- [¿Qué es OpenID Connect?](#qué-es-openid-connect)
- [Cómo crear un proyecto en Google API para hacer autenticación con 0Auth 2.0](#cómo-crear-un-proyecto-en-google-api-para-hacer-autenticación-con-0auth-20)
- [Implementando 0Auth2.0 con Google](#implementando-0auth20-con-google)
- [Implementando Sign Provider en nuestra API](#implementando-sign-provider-en-nuestra-api)
- [Autenticación con Google usando OpenID Connect](#autenticación-con-google-usando-openid-connect)
- [Cómo crear una cuenta de desarrollador con Twitter](#cómo-crear-una-cuenta-de-desarrollador-con-twitter)
- [Autenticación con Twitter](#autenticación-con-twitter)
- [Autenticación con Facebook](#autenticación-con-facebook)
- [Seguridad con Helmet](#seguridad-con-helmet)
- [Detectando vulnearabilidades con npm audit](#detectando-vulnearabilidades-con-npm-audit)
- [Automatizar el chequeo de vulnerabilidades con Snyk](#automatizar-el-chequeo-de-vulnerabilidades-con-snyk)
- [Qué es OWASP y buenas prácticas de seguridad](#qué-es-owasp-y-buenas-prácticas-de-seguridad)
- [Buenas prácticas de seguridad](#buenas-prácticas-de-seguridad)

## Stack de Seguridad Moderno

Anteriormente las compañias se comunicaban mediante un [intranet](https://es.wikipedia.org/wiki/Intranet), un [intranet](https://es.wikipedia.org/wiki/Intranet) a diferencia del [internet](https://es.wikipedia.org/wiki/Internet) es una red privada que funciona dentro de las compañias, en está red había protocolos como [SOAP](https://es.wikipedia.org/wiki/Simple_Object_Access_Protocol), [SAML](https://es.wikipedia.org/wiki/Security_Assertion_Markup_Language), [WS-Federation](https://en.wikipedia.org/wiki/WS-Federation), pero esos protocolos se quedarón muy cortos cuando llegó la **revolución mobile**, además tecnologías como [HTML5](https://es.wikipedia.org/wiki/HTML5), empezarón a necesitar otra serie de cosas y conceptos como la autheticación y la autorización, también necesitaban una evolución, además el auge de los [microservicios](https://docs.microsoft.com/es-es/azure/architecture/guide/architecture-styles/microservices) [o](https://es.wikipedia.org/wiki/Arquitectura_de_microservicios) y la necesidad de tener multiples clientes, hicieron la creación de un nuevo STACK, esté stack se compone generalmente de 3 protocolos: [JSON Web Tokens](https://es.wikipedia.org/wiki/JSON_Web_Token), [OAuth 2.0](https://es.wikipedia.org/wiki/OAuth#OAuth_2.0) [o](https://www.digitalocean.com/community/tutorials/una-introduccion-a-oauth-2-es) , y [OpenID Connect](https://es.wikipedia.org/wiki/OpenID_Connect).

- **JSON Web Tokens**: Son un estandar de la industria abierto que nos permite comunicarnos entre 2 clientes de un lado a otro de una manera más segura.

- **OAuth 2.0**: Es un standar de la industria que permite implementar autorización, hay que tener mucho cuidado en **No confudir autorización con autenticación**. Precisamente una de las diferencias de open authorization 1.0(OAuth 1.0) y su versión 2 fue la necesidad de adaptarse a estas nuevas tecnologias mobile.

- **OpenID Connect**: Es una capa de autenticación que funciona por encima de **OAuth 2.0** 

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## ¿Qué es la autenticación y la autorización?

La autenticación: es la acción de verificar la identidad de un usuario, es decir verificar si el usuario existe y en efecto es él. En nuestra aplicación nosotros vamos a implementar autenticación usando usuario y contraseña para posteriormente generar un Token de autorización.

La autorización es la acción de otorgar permisos de manera limitada a nuestros recursos.

analogía:

_"Los carros modernos suelen tener 2 llaves, una llave que sirve para conducir y 1 llave que sirve para el pallet parking. El pallet parking es un servicio que tienen algunos restaurantes donde llegas con tu carro, donde te recibe alguien y lo estaciona por ti, **estas llaves tienen permisos limitados**, solo permiten encender el carro a cierta velocidad, no alejarse de cierta área."_

En los sistemas pasa algó muy similar, nosotros aveces otorgamos permisos de solo lectura y escritura, es nuestra aplicación nosotros vamos a otorgar una serie de permisos, unos permisos que son del usuario final que son de lectura y escritura sobre ciertas colecciones, pero también vamos a otorgar otros permisos administrativos, y esto lo vamos a hacer manejando unos tokens que vamos a otorgarle a nuestro servidor.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Introducción a las sesiones

Cuando tu visitas un sitio web se crea una petición http. [Http](https://es.wikipedia.org/wiki/Protocolo_de_transferencia_de_hipertexto) es un protocolo que no tienen estado esto quiere decir que diferentes direcciones http nunca comparten información entre si, así que la manera de poder compartir está información en peticiones http es mediante el uso de una sesión. Cuando visitas un sitio web por primera vez se crea una sesión, no es necesario que estés autenticado para que está sesión sea creada.

Supon que vas a un sitio a buscar vuelos, cuando tu entras al sitio se te crea una sesión y a menudo que vas haciendo busquedad a esos vuelos, se van guardando tus preferencias de búsquedad en está sesión, luego está sesión genera un ID que se almaceno en una [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)). La [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) es un archivo que se almacena en tu navegador, para que cuando tu cierres el navegador la [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) permanesca con el id de la sesión, así la próxima vez que vuelvas esté ID de la sesión que permance en la [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) se relaciona con la sesión que estaba previamente abierta y así puede cargar tus preferencias en los vuelos que estabas buscando.

Es por eso que muchas veces aunque nosotros no iniciemos sesión podemos ver que nuestras preferencias está ahí, también cuando hay un proceso de autenticación, la sesión se almacena directamente y se relaciona con tu usuario, por seguridad la sesión debería terminar ciertos minutos despues de que hay un inactividad, sin embargo dependiendo el mecanismo que estés usando podrías tener sesiones por dias o incluso por meses **cookiesSession** y [express-session](https://www.npmjs.com/package/express-session) son librerías que nos permiten implementar todo el tema de sesiones en express, la diferencia más grande es que **cookiesSession** nos permite almacenar la sesión en la [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)), mientras que **express-session** nos permite almacenar la sesión en la memoría en el lado del servidor.

A la hora de escalar la sesión es muy importante utilizar bases de datos en memoria como Redis, eso es una ventaja que tiene JWT, pues JWT no tiene estado y por lo tanto no necesita memoria, pero más adelante vamos a ver cuales son las diferentes ventajas y desventajas sobre JWT y Sesiones.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Anatomía de un JWT

Un JWT es un estandar de la industria que nos permite generar demandas entre 2 clientes de manera segura.

``Un JWT luce más o menos así``.

<div align="center">
  <img src="./assets/jwt.png" alt="json web token">
</div>

En la columna de izquierda puedes ver como es un JWT mientras que en la columna de la derecha puedes ver un JWT decodificado.

Un JWT consta de 3 partes: **Header, Payload y Signature**, generalmente divididas por un punto.

- **Header**: tiene 2 atributos, el tipo que en esté caso siempre debería ser JWT y el algoritmo de encriptación de la firma, el algoritmo de encriptación de la firma **puede ser sincrono o asincrono**. Recordemos que los algoritmos asincronos **usan 2 llaves** de encriptación; una llave **privada** y una llave **pública**, donde la llave pública se usa para encriptar y la llave privada se usa para desencriptar y el los algoritmos de encriptación sincronos se usa la misma llave para desencriptar e incriptar, ambos son seguros de usar pero depende donde los uses.

Los algoritmos asincronos deben usarse donde hay partes públicas que puedan tener acceso a está llave, mientras que los algoritmos sincronos solo deben usarse en sistemas como el [backend](https://platzi.com/blog/que-es-frontend-y-backend/).

- **Payload**: Es donde guardamos toda la información de nuestro usuario, incluso todos los scopes de autorización, esté payload se compone de algó llamado los **claims**, los claims son generalmente representados por 3 letras para mantener el JWT muy pequeño, hay diferentes tipos de claims.

Nosotros en la página donde está el estandar podemos ver en la sección 4.1 lo que se llama los ``Registered Claim Names``. Estos son ``clains`` especificos que tienen una definición propia y debe respetarse.

También podemos usar los ``Public Claim Names``, estos pueden usarse entre diferentes aplicaciones y ya estan también definidos, mientras que los **Private Claim Names**, son los que tu defines para tu aplicación.


- **Signature**: La tercera parte del JWT que es la firma y es lo que hace muy poderoso el JWT está compuesto por el **header códificado** más el **payload códificado**, ha esto se le aplica el algoritmo de encriptación por su puesto usando un ``secret``. En el caso del algoritmo H256 debemos usar un string de 256 bits de longitud.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Autenticación tradicional vs JWT

En la autenticación tradicional cuando sucede un proceso de autenticación se crea una sesión, el id de está sesión se almacena en una [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) que es enviada al navegador. Recordemos que las [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))s no se llaman [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))s por las galletas de chocolate, sino que se llamán [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))s **por las galletas de la fortuna que tienen mensajes**, apartir de ahí todos los request tienen la [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) que tiene almacena el id de la sesión y está es usada para verificar la sesión previamente activa, uno de los problemas que tiene es esté browser es por ejemplo: clientes como las **Single Pages Apps**, no pueden refrescar o no pueden refrescar todas las veces entonces no pudieron saber si hubo cambios en la sesión. Otro problema es que por definición las Rest API no deberían tener estado, al usar sesiones estamos generando estado y esto contradice esté principio, otro problema es que en arquitecturas modernas que usan por ejemplo microservicios, la sesión que solo existe en una máquina no fluye durante los otros clientes, entonces es un poco dificil de escalar, y otro problema es que por ejemplo el control de acceso siempre requiere que vallamos a base de datos, finalmente controlar el uso de memoria también puede ser un problema, ya que cada cliente que se conecta genera una sesión generando más consumo de memoria.

En la autenticación con JWT al suceder el proceso de autenticación se firma un token, apartir de ahí el token es enviado al cliente y esté deber ser almacenado en memoria o en una [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)), todos los request de aquí en adelante llevan esté token, una de las ventajas es que una aplicación como una **Single Pages App** ya no requiere del backend para saber si el usuario está autenticado, lo otro es que el backend puede recibir múltiples request de múltiples clientes y lo único que le interesa es saber si el token está bien firmado, finalmente es el cliente quien sabe que permisos tienen y no tiene que ir hasta base de datos para saber si tiene estos permisos.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Firmando y verificando un JWT

Para firmar un JWT lo primero que debemos hacer es hacer uso de una librería llamada ``nodejsonwebtoken`` está librería tiene un método llamado ``sign``, el primer sign recibe como primer argumento el ``payload`` de JWT, recordemos que esté payload esta construido con los diferentes **claims** que definamos, como segundo atributo debe recibir el ``secret`` con el que va ha ser firmado la firma del JWT, y finalmente hay un tercer argumento que pueden ser ``options`` extras para nuestro firmado del JWT.

Para la verificación de nuestro JWT usando la misma librería vamos a hacer uso de la misma librería, vamos a hacer uso del método ``verify``, en el primer argumento vamos a recibir el ``token`` que queremos verificar, como segundo argumento vamos a recibir el ``secret`` y como tercer argumento de manera opcional vamos a recibir un ``callback`` que nos va a regresar el JWT decodificado, también podemos omitir esté tercer argumento y simplemente recibirlo de manaera sincrona. 

Vamos ver en el código como puedes lograr estó: _Para esté ejemplo_

1. Creamos una carpeta llamada ``jwt-utilities``
2. Ahi vamos a crear nuestro ejemplo usando ``npm init -y``
3. Creamos un archivo ``index.js``.
4. Instalamos nuestra dependencia de JWT ``npm i jsonwebtoken``
5. En nuestro archivo index vamos a requerir la librería
``const jwt = require('jsonwebtoken');``

En el vamos a hacer varias cosas, lo primero es que sus argumentos los vamos a sacar de la terminal, para ello vamos a hacer uso de process argument. El process argument lo que hace es que lee los comandos de la terminal.
```js
const [, , option] 
// la opcion va a estar definida por verificar o por firmar.
```
Los primeros 2 párametros que no estamos definiendo aquí  son: 
el proceso de node y el archivo que estamos leyendo, por lo que nosotros empezaremos a leer desde el tercer argumento.

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

Ahora vamos usar esté mismo JWT y vamos a usar la utilidad para verificarlo, para eso lo único que debemos hacer es usar la palabra ``verify``como tercer parametro y como cuarto párametro le vamos a pasar el secret y por ultimo el token.

``node index.js verify secret eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYXNhbiIsImlhdCI6MTU3MDE0NTQ5MH0.1OXIA17Rl2Oy4b8aq68vZL_srFuVsYwPbHWAXurkkoI``

Hay que tener mucho cuidado cuando estamos manipulando la consola, porque sule partirnos el JWT y lo que debemos hacer es ubicarlo en una sola linea.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Server-side vs Client-side sessions

**Sesiones del lado del servidor vs sesiones del lado del cliente**

### ¿Qué es una sesión?

En terminos generales una sesion es una manera de preservar un estado deseado.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

### ¿Qué es una sesion del lado del servidor?

La sesión en el lado del servidor suele ser una pieza de información que se guarda en memoria o en una base de datos y esta permite hacerle seguimiento a la información de autenticación, con el fin de identificar al usuario y determinar cuál es el estado de autenticación. Mantener la sesión de esta manera en el lado del servidor es lo que se considera “statefuful”, es decir que maneja un estado.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

### ¿Qué es una sesión del lado del cliente?

Las [SPA (Single-page apps)](https://es.wikipedia.org/wiki/Single-page_application) requieren una manera de saber si el usuario esta autenticado o no. Pero esto no se puede hacer de una manera tradicional porque suelen ser muy desacopladas con el backend y no suelen refrescar la página como lo hacen las aplicaciones renderizadas en el servidor.

[JWT (JSON Web Token)](https://es.wikipedia.org/wiki/JSON_Web_Token) es un mecanismo de autenticación sin estado, lo que conocemos como “stateless”. Lo que significa que no hay una sesión que exista del lado del servidor.

La manera como se comporta la sesión del lado del cliente es:

1. Cuando el usuario hace “login” agregamos una bandera para indicar que lo esta.
2. En cualquier punto de la aplicación verificamos la expiración del token.
3. Si el token expira, cambiamos la bandera para indicar que el usuario no está logueado.
4. Se suele chequear cuando la ruta cambia.
5. Si el token expiró lo redireccionamos a la ruta de “login” y actualizamos el estado como “logout”.
6. Se actualiza la UI para mostrar que el usuario ha cerrado la sesión.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Buenas Prácticas con JWT

### Buenas prácticas con JSON Web token

En los últimos años se ha criticado fuertemente el uso de JSON Web Tokens como buena práctica de seguridad. La realidad es que muchas compañías hoy en día los usan sin ningún problema siguiendo unas buenas practicas de seguridad, que aseguran su uso sin ningún inconveniente.

A continuación listaremos unos consejos que se deben tener en cuenta:

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

### Evitar almacenar información sensible

Debido a que los JSON Web tokens son decodificables es posible visualizar la información del payload, por lo que ningún tipo de información sensible debe ser expuesta como contraseñas, keys, etc. Tampoco debería agregarse información confidencial del usuario como su número de identificación o información médica, ya que como hablamos anteriormente, los hackers pueden usar esta información para hacer ingeniería social.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

### Mantener su peso lo más liviano posible

Suele tenerse la tentación de guardar toda la información del perfil en el payload del JWT, pero esto no debería hacerse ya que necesitamos que el JWT sea lo más pequeño posible debido a que al enviarse con todos los request estamos consumiendo parte del bando de ancha.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

### Establecer un tiempo de expiración corto

Debido a que los tokens pueden ser robados si no se toman las medidas correctas de almacenamiento seguro, es muy importante que estos tengan unas expiración corta, el tiempo recomendado es desde 15 minutos hasta un máximo de 2 horas.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

### Tratar los JWT como tokens opacos

Aunque los tokens se pueden decodificar, deben tratarse como tokens opacos, es decir como si no tuviesen ningún valor legible. Esto es porque desde el lado del cliente no tenemos manera de verificar si la firma es correcta, así que si confiamos en la información decodificada del token, alguien podría introducir un token invalido con otra información a propósito. Lo mejor, es siempre enviar el token del lado del servidor y hacer las verificaciones allí.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

### ¿Donde guardar los tokens?

Cuando estamos trabajando con [SPA (Single Page apps](https://es.wikipedia.org/wiki/Single-page_application)] debemos evitar almacenar los tokens en [Local Storage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage) o [Session Storage](https://developer.mozilla.org/es/docs/Web/API/Window/sessionStorage). Estos deben ser almacenados en memoria o en una [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)), pero solo de manera segura y con el flag ``httpOnly``, esto quiere decir que la [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) debe venir del lado del servidor con el token almacenado. Más información:
https://auth0.com/docs/security/store-tokens#single-page-apps

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Silent authenticacion vs Refresh tokens

Debido a que es riesgoso almacenar tokens del lado del cliente, **no se deberian usar Refresh Tokens cuando se trabaja solo con una SPA**. Lo que **se debe implementar es Silent Authentication**, para ello se debe seguir el siguiente flujo:

1. La SPA obtiene un access token al hacer login o mediante cualquier flujo de OAuth.
2. Cuando el token expira el API retornara un error 401.
3. En este momento se debe detectar el error y hacer un request para obtener de nuevo un access token.
4. Si nuestro backend server tiene una sesión valida (Se puede usar una [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))) entonces respondemos con un nuevo access token.

Más información:

- https://auth0.com/docs/api-auth/tutorials/silent-authentication
- https://auth0.com/docs/tokens/refresh-token/current

Hay que tener en cuenta que para implementar **Silent authentication** y **Refresh tokens**, se require tener un tipo de sesión valida del lado del servidor por lo que en una SPA es posible que sea necesario una especie de **backend-proxy**, ya que **la sesión no debería convivir en el lado del API server**.

En el paso 2, si se esta usando alguna librería para manejo de estado como redux, se puede implementar un middleware que detecte este error y proceda con el paso 3.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## ¿Qué son las cookies y cómo implementar el manejo de sesión?

### ¿Qué es un cookie?

Una [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) es un archivo creado por un sitio web que tiene pequeños pedazos de datos almacenados en él, su proposito principal es identificar al usuario mediante el almacenamiento de su historial. 

Las **_cookies de sesión_ o cookiesSession** tienen un corto tiempo de vida, ya que estas son removidas cuando se cierra el tab o el navegador. 

Las **persistent cookies ó cookies percisitentes** se usan generalmente para restaurar al usuario guardando información de su interes.

Las **secure cookies** almacenan datos de manera cifrada para que terceros mal intencionados no puedan robar la información en el, suelen usarse en conexiones https es decir en conexiones seguras.

**Hay leyes de cookies que debes seguir al pie de la letra**:

- Avisarle al usuario que estás haciendo uso de cookies en tu sitio para guardar información.

- Es necesario que el usuario de su consentimiento para manejar cookies en tu sitio.

Si las cookies son necesarias para la autentiación del usuario o para algún problema de seguridad esas leyes no aplican en esté caso.

En esté curso vamos a hacer uso de cookies para almacenar el id de la sessión. 

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

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
    resave: false, // no guardar la [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))s cada vez que hay un cambió
    saveUninitialized: false, // si la [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))s no se inicializado no la guarde por defecto.
    // se define un secret: debe ser de por lo menos 256 bits,
    // esto es lo que definie de cuando lo [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) es segura va a cifrarla haciendo uso de esté secret.
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

Fijense que si hacemos refresh al servidor el empieza a contar, y es porque precisamente está almacenando esté contador en la session. Si abrimos nuestro developer tools y refrescamos de nuevo, nos damos cuenta que en el request siempre se está enviando la [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)). Si nos vamos a **aplication** y eliminamos la [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) de nuestra sesión en esté caso es ``connect.sid``, al eliminarla y refrescar vuelve y empieza el contador de session, y la petición esta vez nos muestra que en el response se esta estableciendo la [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)).

Con estó tenemos un ejemplo muy claro de como podemos hacer manejo de la session haciendo uso de cookies.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Cookies vs Session Storage vs Local Storage

El **Local Storage**: tiene un almacenamiento de máximo 5 MB, la información almacenada aquí no se va con cada request que hacemos al servidor, estó nos ayuda a reducir la información entre cliente y servidor, la información que esta almacenada en el local storage persiste aunque cerremos la ventana de nuestro navegador, estó quiere decir que cuando volvemos a nuestro navegador la información la vamos a encontrar ahí.

El **Session Storage**: es similar al _Local Storage_ solo que **la información está disponible por tab o por window**, esto quiere decir que **apenas cerremos un tab o un window la información deja de persistir** al igual solo la información que almacenamos en cada tab está disponible en ese mismo tab. 

Las **cookies** solo tienen un almacenamiento de 4KB, lo interesante de las cookies es que si se les puede establecer un tiempo de expiración.

Para el _Local Storage_ o _Session Storage_ esto lo tendríamos que hacer programaticamente con Javascript. 

Una de las desventajas que tienen las cookies es que por cada petición que se haga al servidor sea de imagenes, html, etc. 

**Las cookies van adjuntas a la petición esto ocaciona un gran consumo de datos cada vez que se hacen las peticiones**.

Finalmente una de sus ventajas es que las cookies se pueden hacer seguras mediante un flag llamado ``htppOnly`` eso permite que la información de la [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) solo sea accedida y modificada en el servidor. 

Finalmente te preguntaras: _¿Cuando debemos usar el uno o el otro?_

- Si la información no es sensible podemos almacenarla en _Local Storage_ o en _Session Storage_.
- Si la información es medianamente sensible como por ejemplo: nombres de usuario o algunos terminos que puedan identificar al usuario, lo más recomendado es usar el _Session Storage_.
- Finalmente si la información es muy sensible como contraseñas o JSON Web Tokens, lo más recomendado es almacenarlo en una [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) pero siempre teniendo en cuenta el flag ``httpOnly``.

Vamos a ver unos ejemplo de como se comporta Local Storage y Session Storage en el navegador.

La menera en como podemos acceder a la API de WebStorage y SessionStorage es mediante la palabra ``sessionStorage`` está tienen 2 métodos, uno que es ``setItem`` donde podemos especificar con que **key** queremos almacenar nuestra información, en esté ejemplo vamos a almacenar en el key 'hello' otro string.

```js
sessionStorage.setItem('hello', 'temporary world');
```

Muy similar al _Local Storage_ mediante la palabra ``localStorage``

```js
localStorage.setItem('hello', 'world');
```

Si nos fijamos en la aplicación en el ``Local Storage`` podemos ver que está aquí la palabra ``hello world``, mientras que en el ``sessionStorage`` está la palabra  ``'hello', 'temporary world'``. Si nosotros quisieramos acceder a está información lo podemos hacer mediante ``sessionStorage.getItem('hello');`` es parecido con el _Local Storage_ ``localStorages.getItem('hello');``.

Fijense que estó lo hicimos desde un ``tab`` abierto en el navegador, y debido que lo hemos almacenado todo en el _Session Storage_, solo va ha ser almacenado en esté tab, esto quiere decir que si lo cierro y en otro tab me voy a Aplication veremos que en el _Session Storage_ ya no hay nada, pero si me voy al _Local Storage_ todavía está percisitiendo el key ``'hello': 'world'``.

Está es la manera en como podemos usar ``Session Storage`` y ``Local Storage`` en el navegador.

**Challenge**: Discutir si fueramos a implementar autenticación que opción entre cookies y Web Storage sería ideal.

_Usaría cookies para guardar la información sensible, y Web Storage para almacenar otra información no sensible. Además la web storage se crea desde el lado del cliente y no del lado de servidor. cookies definitivamente._

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Arquitectura del Proyecto VideoCine

En esté modulo aprenderas a como crear una capa de autenticación con express haciendo uso de la librería **passportjs**. 

Lo primero que vamos a hacer es hablar de la arquitectura del proyecto.

La arquitectura del proyecto depende de una **API server** que fue construido en backendnodejs de la escuela de Javascript. El API Server tiene un **CRUD** de peliculas es decir podemos **crear, leer, actualizar y eliminar** peliculas. Pero en esté repositorio vamos a agregar unos endpoints para hacer ``sigIn`` es decir autenticar un usuario, y un endpoint para hacer ``signUp`` es decir para crear nuevos usuarios.

Para poder consumir esté endpoint de ``signIn`` los clientes en esté caso **Admin Client** es el que esté debajo de nuestro **API Server** y el **Render Server** es el que está en la izquierda, necesitan una API Token, **está API Token es muy diferente a un Access Token** y ya vamos a hablar de sus diferencias.

Esté **API Token** lo que nos permite es definir los permisos que van a definir estos clientes, para el caso del Admin Client el API Token le va a conceder unos permisos administrativos es decir unos permisos que va a permitir: leer, crear, actualizar y eliminar peliculas.

Mientras que el **Render Server** va ha utilizar una API Token con permisos públicos de solo lectura. Cuando el Render Server o el Admin Client haciendo uso de estos diferentes API Tokens hagan la autenticación, toda nuestra estrategia de autenticación va a generar un **Access Token** esté Acess va ha ser un **JSON Web Token** que va ha tener la información del usuario que hace autenticación y los permisos determinados por el **API Token**. 

De está manera en las peticiónes siguientes nuestro **Render Server o Admin Client** con el Access Token que fue generado va a poder consumir los recursos del API Token. Las Single Pages App que va ha estar construida con: React, Vue o Angular, pero en el caso de la escuela de Javascript va ha estar construida con React. **La manera en como se va ha comunicar con nuestro API Server va ha ser atravez del Render Server** que va ha ser de **Proxy**, para está arquitectura es muy importante que la SPA tenga un servidor porque toda la comunicación que sucede de los Access Token mediante el API Server, debe ocurrir en el Servidor. 

Si tu no tienes un **Render-Server** es necesario que crees un **Server que haga de Proxy entre la SPA y el API Server**. La manera en como la SPA se va ha comunicar con el API Server es mediante una [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) que va ha tener el Access Token del Render Server. Vamos a explorar en el código como está construido el API Server que fue hecho en el repositorio del [backendnodejs](https://github.com/JasanHdz/backendnodejs) y también vamos a integrarlo.

**El API Server**: es un proyecto en express que tiene implementado una ruta de peliculas, la ruta de peliculas tiene **implentado** los diferentes **endpoints** para poder listar las peliculas: ``getAll, getId, createMovie, y deleteMovie``, además de que el proyecto tiene implementado toda una capa de validación para asegurarnos que los datos que enviemos sean correctos.

La responsabilidad de las rutas, en las rutas en esté caso es recibir los datos y devolver los datos de las peliculas, pero **donde realmente ocurre la lógica de negocio es en nuestra capa de Servicios** que tiene implementado muy similar todo el sistema **CRUD**.

La capa de servicios lo que llamá es la capa de Mongo donde hemos implementado una pequeña librería que atravez de la collection implementa los diferentes métodos de está librería de Mongo.

Por ahora vamos a levantar el proyecto de ``movies-api`` y hacer unos llamados con postman a los diferentes métodos CRUD para verificar sus respuestas.

desarrollo ``npm run dev``
production ``npm run start``

Es muy probable que tengas que eliminar la carpeta node_modules y volver a correr el comando ``npm install``

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Agregando coleción de usuarios

En está clase vamos a agregar el esquema de los usuarios y el servicio de los usuarios y vamos ver como lo podemos hacer en el código.

1. Vamos a crear un nuevo schema en nuestra carpeta``/utils/schemas/users.js``, aquí lo que vamos a hacer es requerir una librería que se llama **joi**, está librería lo que nos permite es definir el schema que va ha ser usado en la collection de usuarios.

```js
const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserSchema = {
  name: joi.string().max(100).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  isAdmin: joi.boolean()
};

module.exports = {
  userIdSchema,
  createUserSchema
};
```

2. Ahora nos disponemos a crear el servicio, para ello nos vamos a ir a nuestra carpeta de ``services/users.js``;

```js
// librería de mongo, se encarga de llamar los diferentes métodos de mongo
const MongoLib = require('../lib/mongo');
// se encarga de crear password en modo Hash
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  // recibe un email y apartir de aquí buscamos a ese usuario en la DB
  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  // creamos el usuario
  async createUser({ user }) {
    const { name, email, password } = user;
    // nos crea un password en modo hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword
    });

    return createUserId;
  }
}

module.exports = UsersService;
```

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Agregando colección de películas de usuario

En la clase anterior agregamos el servicio de los usuarios, esto nos va ha permitir obtener usuarios de la base de datos. Ahora vamos a agregar el schema, la ruta y el servicio de las peliculas del usuario.

Esta configuración nos servirá más adelante cuando un usuario autentique y agregue una pelicula a su lista, lo pueda ver reflejado en la aplicación. 

Procedemos a realizarlo en el código:

1. Vamos a ``utils/schemas/`` y vamos a crear el schema que se va a llamar _userMovies_, esté eschema lo que nos permite es que cuando hagamos llamado a nuestros endpoints podamos tener el formato correcto de estos endpoints.

```js
const joi = require('@hapi/joi');

const { movieIdSchema } = require('./movies');
const { userIdSchema } = require('./users');

// schema de las peliculas de usuario

const userMovieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

// creamos el schema de una pelicula de usuario

const createUserMovieShema = {
  userId: userIdSchema,
  movieId: movieIdSchema
}

module.exports = {
  userMovieIdSchema,
  createUserMovieShema
};
```

2. Ahora vamos a crear un servicio, para eso vamos a la carpeta de ``services`` y vamos a crear un servicio que se va ha llamar ``userMovies.js``

```js
const Mongo = require('../lib/mongo');

class UserMoviesService {
  constructor() {
    this.collection = 'user-movies';
    this.mongoDB = new Mongo();
  }
}
```
Como los usuarios de las peliculas van a ser manipulados de diferentes maneras, vamos a crear unos métodos que serán para obtener las peliculas del usuario, apartir de un ``userId``, también vamos a tener el método que nos va ha permitir crear una pelicula del usuario, esto quiere decir cuando el usuario quiera agregar una pelicula a su lista de favoritos, y finalmente el usuario también va ha poder eliminar una pelicula de su lista de favoritos.

```js
const Mongo = require('../lib/mongo');

class UserMoviesService {
  constructor() {
    this.collection = 'user-movies';
    this.mongoDB = new Mongo();
  }

  async getUserMovies({ userId }) {
    const query = userId && { userId };
    const userMovies = await this.mongoDB.getAll(this.collection, query);

    return userMovies || [];
  }

  async createUserMovie({ userMovie }) {
    const createdUserMovieId = await this.mongoDB.create(this.collection, userMovie);
    return createdUserMovieId;
  }

  async deleteUserMovie({ userMovieId }) {
    const deleteUserMovieId = await this.mongoDB.delete(this.collection, userMovieId);
    return deleteUserMovieId;
  }

}

module.exports = UserMoviesService;
```

Con nuestro servicio ya implementado vamos a implementar la ruta que le da manejo ha esté servicio, vamos a implemenar la ruta que le da manejo ha esté servicio.

3. En la carpeta de ``routes`` vamos a crear una nueva ruta que se va ha llamar ``userMovies.js``

Despues de crear nuestro archivo ``userMovies.js`` en nuestra carpeta de ``routes`` pasamos a implementarlo haciendo uso de los schemas y servicios que creamos.

```js
const express = require('express');

const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');

// importamos los schemas para generar la validation
const { movieIdSchema } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserMovieShema } = require('../utils/schemas/userMovies');

function userMoviesApi(app) {
  const router = express.Router();
  app.use('/api/user-movies/', router);

  const userMoviesService = new UserMoviesService();

  router.get(
    '/',
    validationHandler({ userId: userIdSchema }, 'query'),
    async (req, res, next) => {
      const { userId } = req.query;

      try {
        const userMovies = await userMoviesService.getUserMovies({ userId });

        res.status(200).json({
          data: userMovies,
          message: 'use movies listed'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}
```

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Implementando el POST y DELETE de las peliculas de usuario

En está clase vamos a continuar con la implementación de las rutas del usuario, en esta ocación vamos a hacer la implementación de la creación de las peliculas de usuario y la implementación de la eliminación de las peliculas del usuario.


```js
const express = require('express');

const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');

// importamos los schemas para generar la validation
const { movieIdSchema } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserMovieShema } = require('../utils/schemas/userMovies');

function userMoviesApi(app) {
  const router = express.Router();
  app.use('/api/user-movies/', router);

  const userMoviesService = new UserMoviesService();

  router.get(
    '/',
    validationHandler({ userId: userIdSchema }, 'query'),
    async (req, res, next) => {
      const { userId } = req.query;

      try {
        const userMovies = await userMoviesService.getUserMovies({ userId });

        res.status(200).json({
          data: userMovies,
          message: 'use movies listed'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createUserMovieShema),
    async (req, res, next) => {
      const { body: userMovie } = req;

      try {
        // vamos a recibir
        const createUserMovieId = await userMoviesService.createUserMovie({
          userMovie
        });

        res.status(201).json({
          data: createUserMovieId,
          message: 'user movie created'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:userMovieId',
    validationHandler({ userMovieId: movieIdSchema }, 'params'),
    async (req, res, next) => {
      const { userMovieId } = req.params;

      try {
        const deleteUserMovieId = await userMoviesService.deleteUserMovie({
          userMovieId
        });

        res.status(200).json({
          data: deleteUserMovieId,
          message: 'user movie deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = userMoviesApi;
```

Ahora para poder usar nuestra ruta, debemos ir a nuestro archivo ``index.js`` de nuestro proyecto y aquí vamos a hacer uso de nuestra ruta.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Como conectarnos a una base de datos

**MongoDB Compass** es un cliente con interfaz gráfica que nos permiten conectarnos a nuestras instancias de Mongo DB y manipularlas de una manera más fácil. Con este cliente nos podemos conectar a una instancia de cualquier servidor incluso una instancia de MongoDB Atlas.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

### Conexión usando MongoDB Compass

Si nosotros copiamos el Mongo URI desde Mongo Atlas podemos conectarnos facilmente con MongoDB Compass:

1. Iniciamos sesion en MongoDB Atlas https://www.mongodb.com/cloud/atlas
2. Nos vamos a la sección de Clusters en el menu lateral izquierdo.
3. Seleccionamos connect en nuestro cluster sandbox.
4. Seleccionamos la opción Connect with MongoDB Compass.
5. Si no tenemos MongoDB Compass instalado, podemos descargarlo desde alli. Si ya lo tienes instalado continua con el paso 5.
6. Le damos click en el boton copy para copiar el Mongo URI.
7. Abrimos MongoDB Compass e inmediatamente va a reconocer nuestra URI que tenemos en el portapapeles.
8. Hacemos click en yes para que nos cree una nueva conexión, pero es necesario introduccir el password del usuario de la base de datos.
9. Podemos ponerle un nombre favorito y darle en Create favorite y luego en Connect.

<div align="center">
  <img src="./assets/mongodb-compass.jpg" alt="mongo compass">
</div>
<br>
<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Configuración de Passport.js

En está clase vamos a explorar la configuración inicial de passport.js. **PassportJS es un middleware para express que nos permite implementar distitas estrategias de autenticación de una manera muy fácil y simple**.

1. Primero vamos a instalar nuestras dependencias 
``npm i passport jsonwebtoken passport-http passport-jwt``

**passport-http:** para implementar la estrategia basic de passport
**passport-jwt:** para implementar la estrategia de JWT

Otra librería que necesitamos instalar pero esta vez en modo desarrollo es una librería que se llamá chalk que lo que permite es pintar colores en la terminal.
``npm i -D chalk``

Lo otro que necesitamos para nuestros scripts que vamos  ejecutar más adelante y es donde precisamente vamos a utilizar nuestra librería chalk, es agregar en nuestro archivo ``.env`` y ``.env.example`` las siguientes variables de entorno:

Por defecto vamos a agregar los siguientes valores, igual ustedes pueden agregar algún otro.


```
# USERS
DEFAULT_ADMIN_PASSWORD=root
DEFAULT_USER_PASSWORD=secret
```

Estás variables de entorno van ha ser necesarias para cuando estemos incertando nuestros usuarios iniciales, no estemos definiendo un password por defecto en el código, si no que sea un password diferente para cada aplicación que estemos creado, en esté caso vamos a generar un password por defecto para el administrador y un password por defecto para estos usuarios iniciales.

Lo otro que vamos a necesitar es definir el **secret** que vamos a necesitar para firmar nuestros JWT, **esté secret se debería sacar de una página que se llama**: [keygen.io](https://keygen.io/). Está página lo que nos permite es definir un key de base 264 bits, nosotros vamos a buscar nuestro string de ``256 bits``, lo copiamos y en nuestro código lo agregamos. 

```
# AUTH
AUTH_JWT_SECRET=FC6xnhTSEKlt0mNHjw4fucpzqg2e5M9B
```

Otra cosa que vamos a definir es cuales van a ser sus ``API_KEYS``, recuerden que nuestros ``API_KEY`` es lo que nos va ha permitir definir que cuando haya un login con alguno de nuestro clientes, es decir el **Render-Server o nuestro cliente Administrativo**, le otorge los permisos. En esté caso esos ``API_KEYS`` van ha ser generados aleatoriamente apartir de nuestros scripts, teniendo en cuenta estas variables de entorno nos aseguramos de tenerlas en nuestro archivo ``.env``.

```
# API KEY
PUBLIC_API_KEY_TOKEN=
ADMIN_API_KEY_TOKEN=
```

Nos aseguramos que nuestro archivo ``.env.example`` no tenga ningun valor porque esto es la referencia que va ha usar el desarrollador para llenar su archivo ``.env``, procedemos a copiar está misma configuración en nuestro archivo de configuración de variables de entorno.

```js
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
  defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
  adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN
```
La estrategia que ocupe en VS code es agregar el cursos al final de la linea, copie y pegue y use una librería para convertir los strings a camel Case.

Teniendo en cuenta estos archivo de configuración lo que voy a hacer es copiar unos scipts que yo cree previamente, los voy a pegar en mi API Server

Script para agregar peliculas usando nuestros mocks

```js
// DEBUG=app:* node scripts/mongo/seedMovies.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:movies');
const MongoLib = require('../../lib/mongo');
const { moviesMock } = require('../../utils/mocks/movies');

async function seedMovies() {
  try {
    const mongoDB = new MongoLib();

    const promises = moviesMock.map(async movie => {
      await mongoDB.create('movies', movie);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} movies have been created succesfully`));
    return process.exit(0);
  } catch (err) {
    debug(chalk.red(err));
    process.exit(1);
  }
}

seedMovies();
```

Scripts para crear Usuarios

```js
// DEBUG=app:* node scripts/mongo/seedUsers.js

const bcrypt = require('bcrypt');
const chalk = require('chalk');
const debug = require('debug')('app:scripts:users');
const MongoLib = require('../../lib/mongo');
const { config } = require('../../config/index');

const users = [
  {
    email: 'root@undefined.sh',
    name: 'ROOT',
    password: config.defaultAdminPassword,
    isAdmin: true
  },
  {
    email: 'jose@undefined.sh',
    name: 'Jose María',
    password: config.defaultUserPassword
  },
  {
    email: 'maria@undefined.sh',
    name: 'María Jose',
    password: config.defaultAdminPassword
  }
];

async function createUser(mongoDB, user) {
  const { name, email, password, isAdmin } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await mongoDB.create('users', {
    name,
    email,
    password: hashedPassword,
    isAdmin: Boolean(isAdmin)
  });

  return userId;
}

async function seedUsers() {
  try {
    const mongoDB = new MongoLib();

    const promises = users.map(async user => {
      const userId = await createUser(mongoDB, user);
      debug(chalk.green('User created with id: ', userId));
    });

    await Promise.all(promises);
    return process.exit(0);
  } catch (err) {
    debug(chalk.red(err));
    return process.exit(1);
  }
}

seedUsers();
```

Script para crear los API KEYS

```js
// DEBUG=app:* node scripts/mongo/seedApiKeys.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:api-keys');
const crypto = require('crypto');
const MongoLib = require('../../lib/mongo');

const adminScopes = [
  'signin:auth',
  'signup:auth',
  'read:movies',
  'create:movies',
  'update:movies',
  'delete:movies',
  'read:user-movies',
  'create:user-movies',
  'delete:user-movies'
];  

const publicScopes = [
  'signin:auth',
  'signup:auth',
  'read:movies',
  'read:user-movies',
  'create:user-movies',
  'delete:user-movies'
];

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes
  }
];

function generateRandomToken() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
}

async function seedApiKeys() {
  try {
    const mongoDB = new MongoLib();

    const promises = apiKeys.map(async apiKey => {
      await mongoDB.create('api-keys', apiKey)
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} api-keys have been generated succesfully`));
    return process.exit(0);
  } catch (err) {
    debug(chalk.red(err));
    process.exit(1);
  }
}

seedApiKeys();
```

Los ``API_KEYS`` los necesitamos en nuestras variables de entorno, por lo que una vez creados nuestros api keys en la base de datos de mongo, procedemos a copiarlos y incluirlos en nuestro archivo ``.env``

De está manera ya hemos creado una serie de peliculas, unos usuarios y los **API TOKENS** necesarios donde vamos a hacer uso de nuestra estrategia de autenticación con ``passport.js`` 

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Implementación de BasicStrategy con Passport.js

En esta clase aprenderás como implementar estrategias de autenticación haciendo uso de ``Passport.js``. Las estrategias de autenticación nos sirven para determinar como nos vamos a autenticar, haciendo uso de estas estrategias en las diferentes rutas y así definir de donde saldra el usuario que vamos a usar de ahí en adelante, vamos a verlo como se hace en el código.

1. Vamos a crear una nueva carpeta dentro de ``utils`` llamada ``auth/strategies/basic.js``, aquí es donde vamos a implementar nuestra estrategia de tipo Basic.

```js
const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UsersService = require('../../../services/users');

// para implementar la estrategia hacemos uso de Passport.use
passport.use(
  new BasicStrategy(async (email, password, cb) => {
    const userService = new UsersService();

    // vamos a verificar si el usurio existe o no
    try {
      const user = await userService.getUser({ email });

      if (!user) {
        return cb(boom.unauthorized(), false);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      // antes de la validación, eliminamos el password del objeto user
      // así nos aseguramos que ahí en adelante en el uso de la aplicación no sea visible
      // el password del usuario
      delete user.password;

      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  })
);
```

Con esto ya tenemos implementada nuestra estrategia Basic, esto quiere decir que cuando se la agreguemos como middleware a una ruta, si hacen una petición de una autenticación basic, va ha pode extraer a traves de email y password, el usuario y apartir de ahi definir quien está autenticado en nuestra aplicación.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Implementación de Strategy y ExtractJwt con Passport.js

Vamos a implementar ahora la estrategia de JWT donde recibiremos un JWT y apartir del token decodificado buscaremos al usuario.

1. Creamos un nuevo archivo llamado ``jwt.js`` dentro de nuestra carpeta de ``strategies``

```js
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

/**
 * apartir de nuestro UserServices vamos usar el método para buscar al usuario
 * apartir de email que extraigamos del JWT
 */
const UserSerivice = require('../../../services/users');
// con nuestro config haremos saber a la estrategia con que secret fue firmado nuestro JWT
// y para que verifique que es complemente valido.
const { config } = require('../../../config/index');

// definimos nuestra nueva Strategia
passport.use(
  /* recibe la firma con el que fue firmado el token 
  y la especificación de donde sacamos el JWT
  */ 
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      // especificamos que lo sacamos del Header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    // recibe el payload del token ya decodificado y el cb 
    // por si encotramos un usuario o debemos de devolver un error.
    async function (tokenPayload, cb) {
      const userSerivice = new UserSerivice();

      try {
        // buscamos al usuario en la Collection USERS con su atributo EMAIL
        const user = await userSerivice.getUser({ email: tokenPayload.email });

        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        delete user.password;
        // si lo encontramos devolvemos la información del usuario 
        // junto con los scopes o permisos que esté tiene.
        cb(null, { ...user, scopes: tokenPayload.scopes });


      } catch (err) {
        cb(err);
      }
    }
  )
);
```

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Implementación de nuestro Sign-in

Ya que hemos implementado nuestras estrategias, ahora vamos a implementar la ruta de Sign In.

1. Antes de implementar nuestra ruta debemos crear un nuevo servicio, llamado ``apiKeys.js``, esté servicio nos va ha permitir que apartir de un ``API-Key-Token`` podamos obtener los scopes que es requerido a la hora de hacer Sign In a la hora de firmar un JWT con los scopes correspondientes deacuerdo al API Token que nosotros enviemos.

```js
const MongoLib = require('../lib/mongo');

class ApiKeysService {
  constructor() {
    this.collection = "api-keys";
    this.mongoDB = new MongoLib();
  }

  async getApiKey({ token }) {
    const [apikey] = await this.mongoDB.getAll(this.collection, { token });
    return apikey;
  }

}

module.exports = ApiKeysService; 
```

2. Ahora creamos una nueva ruta que se va ha llamar ``auth.js``

```js
const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');

const { config } = require('../config/index');

// Debemos hacer uso de nuestra Strategy Basic
require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();

  router.post('/sign-in', async (req, res, next) => {
    /** verificamos que del cuerpo venga un atributo que se llame apiKeyToken
     * este es el token que le vamos a pasar el Sign In para determinar que clase de permiso
     * vamos a firmar en el JWT que vamos a devolver
     */
    const { apiKeyToken } = req.body;
    
    // verificamos si no existe el token
    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'), false);
    }

    // cuando ya tengamos el token, podemos implementar un custom Callback
    // se va ha encargar de ubicar a nuestro usuario en nuestro request.user,
    // en esté caso no nos interesa que úbique al usuario que encuentra en la ubicación basic
    // nosotros lo que queremos es que nos devuelva un JWT Firmado.
    passport.authenticate('basic', (err, user) => {
      try {
        if (err || !user) {
          next(boom.unauthorized(), false);
        }

        // si exite el usuario, procedemos a implementar el req.login
        // vamos definir que no vamos a implementar una session 
        // recibimos un error en caso de que exista
        req.login(user, { session: false }, async function (error) {
          if (error) {
            next(error);
          }

          // si no hay error procedemos a buscar nuestro API Key

          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

          if (!apiKey) {
            next(boom.unauthorized());
          }

          // teniendo en cuenta el API Key procedemos a construir nuestro JWT 

          const {
            _id: id,
            name,
            email
          } = user;


          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes
          }

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m'
          });

          return res.status(200).json({token, user: {id, name, email}})
        });

      } catch (err) {
        next(err)
      }
      // como es un custom Callback, debemos hace un Clousure con la firma de la ruta.
    })(req, res, next);


  })
}

module.exports = authApi;
```

3. Ahora nos vamos a nuestro archivo ``index.js`` y agregamos la nueva ruta que acabamos de crear.

4. Levantamos el servidor y toca ir a probar nuestra ruta de ``signIn`` usando Postman.

Vamos a hacer un request de tipo POST a la ruta 
``localhost:300/api/auth/sign-in/`` en el vamos a hacer una ``Authorization`` de tipo ``Basic Auth``. Y en el body tenemos que enviar el ``API_TOKEN`` el cual copiamos de nuestro archivo ``.env``.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Implementación de nuestro Sign Up

En el modulo pasado implementamos la ruta de ``sign-in``, al autenticar estamos devolviendo los scopes de api-token en el JWT, en esté modulo vamos a implementar la ruta de ``sign-up``.

1. En nuestro archivo ``routes/auth.js`` vamos a importar el ``UsersService.js`` porque con esté vamos a usar el método para crear usuarios el cual está úbicado en la carpeta de ``services``, también como necesitamos validar que los datos del usuario son correctos vamos a importar el ``validationHandler.js`` que está en la ruta de ``../movies-api/utils/middleware/validationHandler`` y finalmente necesitamos el schema de crear usuario para lo cuál igual tenemos que importar el ``{createUserSchema} = require('../movies-api/utils/schemas/users')``.

```js
// vamos a implementar la creación de usuarios
  router.post(
    '/sign-up',
    validationHandler(joi.object(createUserSchema)),
    async (req, res, next) => {
      // sacamos del body el user:
      const { body: user } = req;

      try {
        // llamamos nuestro servicio de creación de usuario
        const createUserId = await usersServices.createUser({ user });

        res.status(201).json({
          data: createUserId,
          message: 'user created'
        });
      } catch (err) {
        next(err);
      }
    }
  );
```

2. Ahora vamos a Postman y creamos el usuario enviandolo por el body como un JSON.

Cuando el usuario halla sido creado incluso podemos hacer un ``sign in`` para verificar que se hallá creado correctamente y nos devolverá el token con la información del usuario.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Protegiendo nuestras rutas con Passport.js 

En esté modulo vamos a aprender como podemos proteger nuestras rutas de la API, haciendo uso de Passport.js.

Lo que vamos a hacer es que vamos a proteger nuestras rutas de ``movies`` y ``userMovies``. Para eso vamos a importar nuestra estrategia de JWT, es bastante fácil poder proteger nuestras rutas, lo único que tenemos que hacer es hacer uso de passport y hacemos ``passport.autenticate`` en el vamos a definir que la estrategia que vamos a ocupar es ``jwt`` y definimos que la sessión va ha ser ``false``

nuestra ruta movies quedaría de la siguiente manera:

```js
  router.get('/', passport.authenticate('jwt', { session: false }) ,async function (req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query;
    try {
      const movies = await moviesService.getMovies({ tags });
      // throw new Error("Error getting movies");
      res.status(200).json({
        data: movies,
        message: 'movies listed'
      });
    } catch (error) {
      next(error);
    }
  });
```

Cuando importamos nuestra Strategy de JWT 
```js
require('../utils/auth/strategies/jwt');
```
Es donde estamos recibiendo un JWT que viene del authorization header, vamos a obtener el email del usuario y apartir de el vamos a buscarlo y devolverlo, en esta ocación no hay necesidad de implementar un Custom Callback, entonces lo único que hay que hacer es llamar a ``passport.authenticate`` definir la estrategia y esto funciona como un middleware. Apartir de ahí lo que vamos a hacer es agregar está misma linea a los otros EndPoits. 

Con esto ya tenemos protegidas todas nuestras rutas, esto quiere decir que la única manera de acceder a ellas, es si tenemos un JWT valido.

Vamos a hacer lo mismo para nuestras rutas de ``userMovies``
```js
// JWT Strategy
require('../utils/auth/strategies/jwt');
```

Despues copiamos la misma linea de:

```js
passport.authenticate('jwt', {session: false}),
```

Que nos permite proteger las otras rutas.

Ahora levantamos nuestro servidor en modo desarrollo y vamos a postman. Si ahora hacemos un GET movies desde postman ahora nos dice que no estamos autorizados, ahora tenemos que hacer ``sign-in`` para que nos devuelva un token y lo que debemos de hacer es que cada vez que queramos llamar nuestras rutas que ya estan protegidas, **debemos de ir al tab de autorización**, definir que vamos a autorizarnos con **Bearer Token** y agregar nuestro **Access Token** en el campo Token, de está manera si ahora llamo las rutas de las peliculas ahora si nos devuelve datos, y lo mismo pasa con las demás rutas a las que autenticamos usando ``passport.js`` 

Con esto hemos cerrado prácticamente todo el ciclo de autenticación, ya tenemos todo el flujo de hacer ``sign-in`` y tenemos todo el flujo de hacer ``sign-up`` y finalmente tenemos protegidas nuestras rutas de la API.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Implementando recordar sesión

Generalmente cuando queremos implementar la opción de recordar sesión para Express mediante passport, lo que hacemos es extender la expiración de la [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)).

En nuestra ruta de sign-in de nuestro render server hacemos las siguientes modificaciones:

```js
// Agregamos las variables de timpo en segundos
const THIRTY_DAYS_IN_SEC = 2592000;
const TWO_HOURS_IN_SEC = 7200;

app.post("/auth/sign-in", async function(req, res, next) {
  // Obtenemos el atributo rememberMe desde el cuerpo del request
  const { rememberMe } = req.body;

  passport.authenticate("basic", function(error, data) {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }

      req.login(data, { session: false }, async function(error) {
        if (error) {
          next(error);
        }

        const { token, ...user } = data;

        // Si el atributo rememberMe es verdadero la expiración será en 30 dias
        // de lo contrario la expiración será en 2 horas
        res.[cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))("token", token, {
          httpOnly: !config.dev,
          secure: !config.dev,
          maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC
        });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});
```
<br>
<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Middleware para el manejo de scopes

En está clase crearemos un middleware que nos permitirá validar los scopes de las rutas.

```js
const boom = require('@hapi/boom');

// esta funcion recibira los scopes permitidos para las rutas
// pero lo que va ha devolver la función es un middleware
function scopesValidationHandler(allowedScopes) {
  return function (req, res, next) {
    if (!req.user || (req.user && !req.user.scopes)) {
      next(boom.unauthorized('Missing scopes'));
    }

    // si existe el usuario y tiene scopes, vamos a verificar si tienen acceso
    const hasAccess = allowedScopes
      .map(allowedScope => req.user.scopes.includes(allowedScope))
      .find(allowed => Boolean(allowed));
    
    if (hasAccess) {
      next();
    } else {
      next(boom.unauthorized('Insufficient scopes'));
    }
  }
}

module.exports = scopesValidationHandler;
```

Ahora nos dirigimos a nuestras rutas, y todas nuestras rutas deben ser validadas.

```js
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');
```

Ahora debo definir los scopes de las diferentes rutas, despues de que verifico con el **middleware** de que está autenticado, entonces indico cuál es el scope necesario, para el de ``getMovies`` el scopes necesario es ``[read:movies]``, es decir si el usuario tiene el scope de ``[read:movies]`` podrá leer las peliculas, para el ``getMovieId`` necesita el mismo scope, para el ``createMovie`` necesita el scope de ``['create:movies']``, entonces fijense que si tenemos unos scopes públicos no vamos a poder consumir nuestra ruta de crear peliculas, luego del ``put o updateMovies`` necesitaríamos el scope de ``['update:movies']`` y para el endpoint de ``deleteMovies`` necesitaríamos el scope de ``['deleted:movies']``.

Tanto ``passport.authenticate``, ``scopesValidationHandler`` y ``validationHandler`` son middlewares. 

**El proposito de los middlewares es filtrar e intervenir el código** ``request`` que viene **desde la ruta o endpoint hasta que ya hacemos su funcionalidad** y tratamos los suficientes datos, entonces esto nos permite en esté caso: validar la autenticación, despues validar que tenga los permisos necesarios, y por último validar que los datos esté correctos.

Haremos lo mismo para nuestros datos de ``userMovies``.

ejemplos de la implementación:

```js
scopesValidationHandler(['read:movies']),
scopesValidationHandler(['create:movies']),
scopesValidationHandler(['update:movies']),
scopesValidationHandler(['delete:movies']),
```

Ahora levantamos el servidor en modo desarrollo y nos dirigiremos a postman a verificar que estó este funcionando correctamente. Antes de hacer request a nuestras diferentes rutas y verificar que nuestras variables de entorno para verficar que estemos ocupado la variable de entorno correcta.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Configuración del Server Render

En está clase vamos a explorar la configuración del render server. Recuerda que en clase de arquitectura del proyecto teníamos un diagrama donde teníamos que **el API Server era consumido por 2 clientes**, uno de esos clientes era el Admin Client que es el que usa los Scopes Administrativos y el otro cliente es el Render Server que usa los scopes públicos, en está clase vamos ver cual es la estructura base de esté Render Server.

En el repositorio del curso hemos agregado una nueva carpeta llamada ``ssr-server`` eso significa ``server side render``. Está carpeta tiene unas nuevas variables de entorno que son: ``el puerto``, ``la url`` del ``api-server`` y el 
``PUBLIC_API_KEY_TOKEN``, **esté API-Token debe ser exactamente igual al api-key token que tenemos en nuestra API**. 

Lo otro que hemos agregado a la configuración son estás mismas variables de entorno.

```js
require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8000,
  apiUrl: process.env.API_URL,
  ApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN
}

module.exports = { config: config };
```

Apartir de ahí lo único que tenemos es un archivo ``index.js`` que levanta un servidor de express.

```js
const express = require('express');

const { config } = require('./config/index');

const app = express();

// body parser
app.use(express.json());

app.post("/auth/sign-in", async function (req, res, next) {
  
});

app.post("/auth/sign-up", async function (req, res, next) {
  
});

app.get('/movies', async function (req, res, next) {
  
});

app.post('/user-movies', async function (req, res, next) {
  
});

app.delete("/user-movies/:userMovieId", async function (req, res, next) {
  
});

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
```

Lo que vamos a hacer en esté proyecto es levantar las rutas de ``sign-in``, ``sign-up``, creación de las peliculas de usuario y eliminación de las peliculas de usuario, está 2 rutas van ha hacer la acción cuando el usuario en la interfaz gráfica agregue o elimine peliculas de su lista, lo que quedará pendiente será la opción de listar las peliculas, esto lo vamos a ver en el curso de **backend for fronted** de la escuela de JS. 

Lo que podemos intuir acá es que **nosotros vamos a ocupar esté nuevo servidor como una especie de proxy, y todas estás llamadas van a ser llamadas a la API-Server** y lo que vamos a hacer con el ``sign-in`` es que el token que nos regrese lo vamos a inyectar en una [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) y apartir de ahí las otras rutas van ha leer el valor de esa [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)), de está manera vamos a tener una forma muy segura en nuestra **Single Pages App** el **JWT** protegido.

Con estó hemos explorado las bases de nuestro Render Server, recuerda que si quieres ver toda la implementación completa debes de ver el curso de ``Server Side Render con express`` de la escuela de Javascript, y que despues veas el el curso de ``Backend for frontend`` de la escuela de JS, donde verás la implementación de la ruta de peliculas.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Comunicación máquina a máquina 

En esta clase vamos a implementar la estrategia de autenticación del ``sign-in`` y ``sign-up`` de nuestro Render Server.

1. En nuestro proyecto del render server lo primero que vamos a hacer es crear un nuevo archivo para implementar nuestra estrategia _Basic_ lo crearemos en: ``utils/auth/strategies/basic.js``.

```js
const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const axios = require('axios');
const { config } = require('../../../config/index');

// definimos nuestra nueva estrategia
passport.use(
  new BasicStrategy(async function (email, password, cb) {
    try {
      const { data, status } = await axios({
        url: `${config.apiUrl}/api/auth/sign-in`,
        method: "post",
        auth: {
          password,
          username: email
        },
        data: {
          apiKeyToken: config.apiKeyToken
        }
      });

      if (!data || status !== 200) {
        return cb(boom.unauthorized("Fallo aquí chavos", false));
      }

      // la es respuesta es el token y la info del usuario
      return cb(null, data);

    } catch (error) {
      cb(error);
    }
  })
);
```

También vamos a necesitar una nueva librería que se va ha llamar ``cookiesParser``, recuerden que en la configuración de nuestro proyecto, definimos una estructura básica en el ``packages.json`` aquí solo los estamos incluyendola.

```js
const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))Parser = require('[cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))-parser');
const axios = require('axios');

const { config } = require('./config/index');

const app = express();

// middlewares
app.use(express.json()); // body parser 
app.use([cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))Parser()); // [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))-parser

// Basic Strategy
require('./utils/auth/strategies/basic');

app.post("/auth/sign-in", async function (req, res, next) {
  passport.authenticate("basic", async function (error, data) {
    try {
      if (error || !data) {
        next(boom.unauthorized("Error la data viene vacía :("));
      }

      req.login(data, { session: false }, async function (error) {
        if (error) {
          next(error);
        }

        const { token , ...user } = data;

      
        res.[cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))("token", token, {
          httpOnly: !config.dev,
          secure: !config.dev
        });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post("/auth/sign-up", async function (req, res, next) {
  const { body: user } = req;
  try {
    await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: 'post',
      data: user
    });

    res.status(201).json({
      message: "User Created"
    });

  } catch (error) {
    next(error);
  }
});
```

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Implementación de las peliculas de usuario

En está clase vamos a hacer la implementación de las rutas de las peliculas de usuario.

Para ello nos dirigimos a nuestras rutas de movies de usuario.

```JS
app.post('/user-movies', async function (req, res, next) {
  try {
    const { body: userMovie } = req;
    const { token } = req.[cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))s;

    // cuando hacemos sign-in generamos un JWT que lo guardamos en una [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)),
    // apartir de ahí los req que hagamos en las peliculas de usuarios, entonces
    // van ha tener la [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) en el req. Es por eso que podemos sacar de las [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))s el token
    // para llamar a nuestra API

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies/`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'post',
      data: userMovie
    });

    if (status !== 201) {
      return next(boom.badImplementation());
    }

    res.status(201).json(data);
    
    
  } catch (error) {
    next(error);
  }
});

app.delete("/user-movies/:userMovieId", async function (req, res, next) {
  try {
    const { userMovieId } = req.params;
    const { token } = req.[cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))s;

    // cuando hacemos sign-in generamos un JWT que lo guardamos en una [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)),
    // apartir de ahí los req que hagamos en las peliculas de usuarios, entonces
    // van ha tener la [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) en el req. Es por eso que podemos sacar de las [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))s el token
    // para llamar a nuestra API

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'DELETE'
    });

    if (status !== 200) {
      return next(boom.badImplementation());
    }

    res.status(200).json(data);
    
    
  } catch (error) {
    next(error);
  }
});
```

Ahora pasamos a revizar nuestros endpoints en postman, lo primero que debemos de hacer es levantar nuestros 2 servers. 

**¿Por qué los 2 servers?** 

porque ahora no solo tenemos que levantar el ``render server``, si no que también debemos levantar el ``Api Server``.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## ¿Qué es OAuth 2.0?

Estos estandares nos permiten implementar cosas como autenticación con redes sociales. 

- [OAuth 2.0](): Es un estandar de la industria que nos permite implementar autorización. 


<div align="center">
  <img src="./assets/oauth.png" alt="oauth2.0">
</div>
<br>

Lo más importante para aprender a implementar OAuth es entender cuales son los roles envueltos en los flujos, en esté caso el **primer rol** sería el usuario **Resource Owner**, en esté caso podrías ser tú, luego tenemos el **Resource Server** que sería una API donde están tus recursos o tus datos, luego tenemos el aplication o el **Client** quien es que intentar acceder a estos recursos en nombre del usuario y finalmente tenemos el **Authorization Server** qué es quien se encarga de verificar la identidad del usuario. 

<div align="center">
  <img src="./assets/appclient-oauth.png" alt="oauth2.0">
</div>
<br>

El flujo empieza cuando la aplicación quiere hacer una **Authorization Request**, entonces tu como usuario tienes que permitirle a la aplicación acceder a tus recursos, esto lo hace mediante una **Authorization Grant**. La aplicación con esté Authorization Grant va ha la **Autorization Server**, el verifica que los datos son correctos y te crea un Access Token, el **Access Token** puede ser un **token** como cualquiera o podría ser un JWT, apartir de ahí la aplicación con ese Access Token puede hacer cualquier petición y obtener recursos en tu nombre, entonces el **Resource Server** que sería la **API**, lo que haría sería devolver los recursos protegidos, gracias a que tu le enviaste un Access Token.

Aquí tenemos un ejemplo del mundo real:

<div align="center">
  <img src="./assets/oauth-exmaple.png" alt="Ejemplo de como funciona Oauth2.0">
</div>
<br>

_"supongamos que el cliente es tu hermano, tu hermano quiere acceder a la pelota que está en el closet, el closet sería el **Resource Server**, pero tú no te encuentras en casa, sin embargo tus padres se encuentran en casa, entonces el hermano lo que haría sería pedirte una autorización, tú lo que podrías enviar como **Autorization Grant** sería una carta donde tu hermano está permitido en obtener la pelota, tu hermano con esa carta lo que aría sería ir con el **Autorization Server** que serían tus padres, tus padres verifican que sea una carta con tu letra, y les darían las llaves en esté caso sería el **Access Token** ahora tu hermano con las llaves puede acceder al closet y obtener la pelota"_.


<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## ¿Qué es OpenID Connect?

<span style="color:blue;font-weight:bold">Open ID Connect</span>: **es una capa de autenticación que funciona sobre la capa de Oauth**. Lo que sucedio es que las compañias que estaban implementando Oauth para autenticar, estaban teniendo problemas de seguridad. **Facebook** hace tiempo tuvo problemas donde podía suplantar la identidad porque estaban usando Access Token para hacer todo el proceso de Autenticación, entonces **facebook tuvo que hacer unas soluciones sobre esa capa de Oauth** y lo que pasó es que las otras empresas entonces también tuvieron que empezar a implementar esos fixes.

OpenID Connect se trata de generar uno estandar así no todas las personas no tienen que hacer su propia versión de autenticación sobre Oauth.

Las diferencias que tiene sobre Oauth es que **los access token se usan exclusivamente para los llamados a la API es decir para obtener los recursos**, y entra un concepto llamado **IdToken**, es un nuevo token que nos permite verificar si el usuario está autenticado y nos permite también obtener la información del usuario, básicamente Open Id Connect también define unos ``cleams`` y unos ``scopes`` definidos para esté **IdToken** y debemos también implementar un endpoint llamado **userInfo** donde enviamos el ``idToken`` y podemos obtener la información del usuario. 

**Open Id Connect** también define como debemos hacer uso del manejo de sesión es decir como se debe hacer ``logout`` como se implementan cosas como ``single signInOut``, etc.

El flujo es mas o menos el siguiente: se hace un request a ``/authorizate`` y esté nos genera un IdToken, este IdToken debe tener definidos los scopes de ``openId`` y ``profile``, con esté IdToken entonces ya sabemos que el usuario está autenticado y finalmente podemos hacer un request a ``/user-info`` y obtener la información del usuario.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Cómo crear un proyecto en Google API para hacer autenticación con 0Auth 2.0

Con el fin de poder usar Google como método de autenticación es necesario crear un nuevo proyecto dentro de la consola de desarrolladores de Google.

1. Nos dirigimos a https://console.developers.google.com y nos autenticamos con nuestra cuenta de Google.
2. En la parte superior izquierda seleccionamos la organización que queremos usar (Debe haber una por defecto) y hacemos click en Create Project.
3. Luego nos vamos al sidebar izquierdo y seleccionamos Credentials > Create credentials > OAuth client ID
4. Nos aseguramos de elegir ``Web Application`` como el tipo de aplicación.
5. Luego establecemos el nombre del cliente que en nuestro caso será ``SSR Server``, el Authorized JavaScript origins: ``http://localhost:8000`` y el Authorized redirect URIs ``http://localhost:8000/auth/google-oauth/callback``. Cuando hagamos despliegue de nuestra aplicación lo ideal es crear otro cliente y remplazar las URLs por las URLs correspondientes de producción.
6. El Application Name del Consent Screen será ``Platzi Videos``.
7. Al finalizar la creación copiamos el Client ID y Client secret que seran usados como GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET respectivamente.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Implementando 0Auth2.0 con Google

Recuerda que de la lectura anterior debemos obtener el ``GOOGLE_CLIENT_ID`` y ``GOOGLE_CLIENT_SECRET``. 

Estós valores los vamos a poner en nuestro documento de variables de entorno, aparte de ahi también tenemos que agregarlos en nuestro archivo de configuración.

Lo otro que necesitamos hacer es instalar nuestra librería: ``passport-oauth``, luego en nuestro Render Server, vamos a crear una nueva estrategia dentro de nuestro directorio ``ssr-server/utils/auth/statregies`` llamado ``oauth.js``, aquí vamos a determinar nuestra estrategia de Oauth2.0.

En el archivo vamos a copiar unas URLS que hacen parte del OAuth de google, estás url son las siguientes:

```js
const GOOGLE_AUTHORIZATION_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";
```

¿Como hacer las configuraciones de OpenIDConnect y OAuth2 para Google?

- https://developers.google.com/identity/protocols/OpenIDConnect
- https://developers.google.com/identity/protocols/OAuth2
- https://developers.google.com/identity/protocols/OAuth2WebServer


Estas urls de nuestro ducumento las sacamos de los enlaces de arriba.

Ahora lo que vamos a hacer es generar nuestra estrategia de Oauth.

```js
const passport = require('passport');
const axios = require('axios');
const { OAuth2Strategy } = require('passport-oauth');
const { config } = require('../../../config/index');
const boom = require('@hapi/boom');
const GOOGLE_AUTHORIZATION_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

const oAuth2Strategy = new OAuth2Strategy({
  authorizationURL: GOOGLE_AUTHORIZATION_URL,
  tokenURL: GOOGLE_TOKEN_URL,
  clientID: config.googleClientId,
  clientSecret: config.googleClientSecret,
  callbackURL: "auth/google-oauth/callback"
}, async function (accessToken, refreshToken, profile, cb) {
  const { data, status } = await axios({
    url: `${config.apiUrl}/api/auth/sign-provider`,
    method: 'post',
    data: {
      name: profile.name,
      email: profile.email,
      password: profile.id,
      apiKeyToken: config.apiKeyToken
    }
  });

  if (!data || status !== 200) {
    return cb(boom.unauthorized(), false);
  }

  return cb(null, data);
});

oAuth2Strategy.userProfile = function (accessToken, done) {
  this._oauth2.get(GOOGLE_USERINFO_URL, accessToken, (err, body) => {
    if (err) {
      return done(err);
    }

    try {
      const { sub, name, email } = JSON.parse(body);

      const profile = {
        id: sub,
        name,
        email
      }

      done(null, profile);

    } catch (parseError) {
      done(parseError);
    }
  });
};

passport.use("google-oauth", oAuth2Strategy);
```

Ahora debemos ir a nuestro archivo index y debemos de agregar la estrategia que acabamos de crear.

```js
// OAuth2 Strategy
require('./utils/auth/strategies/oauth');
```

Y ahora vamos a implementar otros 2 endpoints

```js
app.get(
  "/auth/google-oauth",
  passport.authenticate("google-oauth", {
    scope: ["email", "profile", "openid"]
  })
);

app.get(
  "/auth/google-oauth/callback",
  passport.authenticate("google-oauth", { session: false }),
  function(req, res, next) {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.[cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.status(200).json(user);
  }
);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
```

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Implementando Sign Provider en nuestra API

En esté modulo vamos a implementar nuestra ruta para que cualquier provedor tercero como por ejemplo la autenticación con google puede hacer uso de nuestra API.

Lo que vamos a hacer es que en nuestros servicios de usuarios, esto es en: ``movies-api/services/`` vamos a crear un nuevo método que se va ha llamar ``getOrCreateUser``. Esté método recibe un usuario y apartir de esté método vamos a determinar que si no existe lo cree y si existe lo traiga.

Para poder tener nuestra ruta debemos hacer una modificación en nuestro schema de ``users.js``.

```js
const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const userSchema = {
  name: joi
    .string()
    .max(100)
    .required(),
  email: joi
    .string()
    .email()
    .required(),
  password: joi.string().required()
};

const createUserSchema = {
  ...userSchema,
  isAdmin: joi.boolean()
};

const createProviderUserSchema = {
  ...userSchema,
  apiKeyToken: joi.string().required()
};

module.exports = {
  userIdSchema,
  createUserSchema,
  createProviderUserSchema
};
```

Porque ahora el ``userSchema`` lo necesitamos solo para hacer un nuevo schema que se va ha llamar ``createProviderUserSchema``

Con esto ya podemos implementar nuestr ruta, y vamos a la ruta de autenticación. Necesitamos agregar nuestro nuevo ``createProviderUserSchema`` y al final vamos a agregar una nueva ruta post.

```js
  // la vamos a ocupar con todos nuestro provedores terceros
    router.post(
      '/sign-provider',
      validationHandler(joi.object(createProviderUserSchema)),
      async function(req, res, next) {
        const { body } = req;
  
        const { apiKeyToken, ...user } = body;
  
        if (!apiKeyToken) {
          next(boom.unauthorized('apiKeyToken is required'));
        }
  
        try {
          const queriedUser = await usersServices.getOrCreateUser({ user });
          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });
  
          if (!apiKey) {
            next(boom.unauthorized());
          }
  
          const { _id: id, name, email } = queriedUser;
  
          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes
          };
  
          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m'
          });
  
          return res.status(200).json({ token, user: { id, name, email } });
        } catch (error) {
          next(error);
        }
      }
    );
```

Con esto ya tenemos implementando toda nuestra ruta de ``Sign Provider``, ahora vamos a revizar que todo esté funcionando correctamente, primero levantamos nuestros 2 Servidores, el de API y el del SSR y dirigirnos a la URL ``http://localhost:8000/auth/google-oauth``, hacemos la prueba, despues nos pide acceder a una cuenta de google, si todo sale bien se va ha ir el callback y me va ha devolver el usuario, no solo eso si no que en nuestras cookies de la aplicación vamos a tener la [cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)) con el token.

Exploremos si el JWT es el token que esperamos, nos vamos a [jwt.io](jwt.io), copiamos el token para que sea decodificado y efectivamente acá tenemos nuestro usuario, email y los scopes que le definimos a nuestro usuario. Con esto hemos terminado la implementación haciendo la autenticación con google en nuestro render server.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Autenticación con Google usando OpenID Connect

En el curso vimos como se podia implementar Google Authentication usando la estrategia de OAuth directamente. En esta lectura vamos a explorar como hacer la autenticación usando la estrategia directa de Google.

Lo primero es instalar nuestras dependencias

``npm install passport-google-oauth``

Luego creamos una nueva estrategia llamada ``google`` dentro de
``utils/auth/strategies/google.js:``

```js
const passport = require('passport');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const axios = require('axios');
const boom = require('@hapi/boom');

const { config } = require('../../../config');

passport.use( new GoogleStrategy({
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: "/auth/google/callback",  
},
async (accessToken, refreshToken, { _json: profile }, done) => {
    try{
        const { data, status } = await axios({
            url: `${config.apiUrl}/api/auth/sign-provider`,
            method: "post",
            data: {
                name: profile.name,
                email: profile.email,
                password: profile.sub,
                apiKeyToken: config.apiKeyToken
            }
        });

        if(!data || status !== 200){
            done(boom.unauthorized(), false)
        }

        done(null, data)
    }catch(err){
        done(err)
    }
}
) );
```

Teniendo nuestra estrategia de Google ya podemos agregar las dos nuevas rutas de autenticación.

```js
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile", "openid"]
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  function(req, res, next) {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.[cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.status(200).json(user);
  }
);
```

Con esto tenemos nuestra implementación de autenticación con Google pero mucho más sencilla.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Cómo crear una cuenta de desarrollador con Twitter

Con el fin de poder usar Twitter como método de autenticación es necesario crear una cuenta de desarrollador de Twitter. Es necesario postularse para que la cuenta de desarrollador pueda ser utilizada y suele tomar hasta 24 horas de aprobación. Para aplicar a la cuenta es necesario hacer dirigirse a https://developer.twitter.com/en/apply-for-access.html y hacer click en el botón`` Apply for a developer account``.

Cuando la cuenta ha sido aprobada, entonces procederemos a crear una aplicación para usarla en nuestro método de autenticación, para ellos debemos:

1. Nos dirigimos a la lista de nuestras aplicaciones en https://developer.twitter.com/en/apps
2. Allí creamos una nueva app haciendo click en el botón Create an app.
3. Llenamos los correspondientes campos como App Name y Website URL.
4. Las URLs de Terms of Service URL y Privacy policy URL son necesarias para poder solicitar el email del usuario.
5. Como callback URL podemos usar http://localhost:8000/auth/twitter/callback. Lo ideal es que cuando salimos a producción creamos una aplicación diferente y esta vez usaremos la URL de producción.
6. Marcamos como Enabled que nuestra app va a ser usada para Sign in with Twitter.
7. Hacemos click en Create, accedemos a los detalles de la app creada y en el tab de Permissions, y luego en Additional permissions marcamos Request email address from users y guardamos.
8. Nos vamos al tab de Keys and tokens y copiamos los Consumer API Keys que son los que usaremos como TWITTER_CONSUMER_KEY y TWITTER_CONSUMER_SECRET respectivamente.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Autenticación con Twitter

De la lectura anterior debemos copiar el ``consumer_key`` y el ``consumer_secret`` de twitter, es importante copiarlos en nuestro archivo ``.env`` y además también debemos crear un string de session, ya que esté middleware de passport con twitter necesita tener una session activa, a mi me gusta usar una página que se llama [keygen.io](keygen.io) donde podemos copiar un SHA KEY de 256 bits, lo copiamos y lo incluimos en nuestro secret de session también es importante leerlos desde nuestro archivo de configuración para despues poder consumirlos de nuestra estrategia.

Ahora vamos a crear una nueva estrategia que se va ha llamar twitter, creamos la estrategia ``twitter.js``.

```js
const passport = require('passport');
const axios = require('axios');
// para obtener un valor sin problemas de un objeto
const { get } = require('lodash');
const boom = require('@hapi/boom');
const { Strategy: TwitterStrategy } = require('passport-twitter');

const { config } = require('../../../config');

passport.use(
  new TwitterStrategy({
    consumerKey: config.twitterConsumerKey,
    consumerSecret: config.twitterConsumerSecret,
    callbackURL: "auth/twitter/callback",
    includeEmail: true
  },
    async (token, tokenSecret, profile, cb) => {
      const { data, status } = await axios({
        url: `${config.url}/api/auth/sign-provider`,
        method: 'post',
        data: {
          name: profile.displayName,
          email: get(profile, 'emails.0.value', `${profile.username}@twitter.com`),
        },
        password: profile.id,
        apiKeyToken: config.apiKeyToken
      });

      if (!data || status !== 200) {
        return cb(boom.unauthorized());
      }

      return cb(null, data);
    }
  )
)
```

Con nuestra estrategia implementada ahora podemos ir a nuestro servidor y lo primero que debemos incluir es unas librerías que necesitamos ``express-session``, luego entonces haríamos en el ``app.use`` una implementación de la session y en esté caso el secret que nos va ha codificar la session sería el ``config.sessionSecret``.

Lo otro que tenemos que hacer, es hacer uso de ``passport.initialize()`` para que inicialice la session y luego de ``passport-session``, debemos tener todo estó requerido porque está librería de twitter requiere que tengamos una session activa. Ahora lo que tenemos que hacer es incluir nuestra estrategia de twitter y como hicimos la autenticación con google es siemplemente implementar las rutas de autenticación.

```js
app.get("/auth/twitter", passport.authenticate("twitter"));

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { session: false }),
  async (req, res, next) => {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.[cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.status(200).json(user);
  }
);
```

Ahora lo que tenemos que hacer es levantar nuestros 2 servidores y hacer las pruebas necesarias, si aún no estamos autorizados por twitter tenemos que esperar a que nos autorize para que funcione correctamente.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Autenticación con Facebook

A continuación veremos cómo podemos implementar la autenticación haciendo uso de la estrategia para Facebook. Es importante primero tener una cuenta de Facebook para desarrolladores: https://developers.facebook.com/ y crear una app/project como lo hemos hecho anteriormente para Google y Twitter. Podemos seguir las instrucciones aquí: https://developers.facebook.com/docs/apps, para obtener nuestros FACEBOOK_CLIENT_ID y FACEBOOK_CLIENT_SECRET respectivamente.

Lo primero es instalar nuestras dependencias

``npm install passport-facebook``

Luego creamos una nueva estrategia llamada ``facebook`` dentro de
``utils/auth/strategies/facebook.js``

```js
// strategy
const passport = require('passport');
const axios = require('axios');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const boom = require('@hapi/boom');

const { config } = require('../../../config');

passport.use(
  new FacebookStrategy({
    clientID: config.facebookClientId,
    clientSecret: config.facebookClientSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields: ["id", "email", "displayName"]
  }, async (accessToken, refreshToken, profile, done) => {
    const { data, status } = await axios({
      url: `${config.apiUrl}/api/auth/sign-provider`,
      method: 'post',
      data: {
        name: profile.displayName,
        email: profile.email || `${profile.id}@facebook.com`,
        password: profile.id,
        apiKeyToken: config.apiKeyToken
      }
    });

    if (!data || status !== 200) {
      return done(boom.unauthorized(), false);
    }

    return done(null, data);
  })
);
```

Teniendo nuestra estrategia de Facebook ya podemos agregar las dos nuevas rutas de autenticación.

```js
// routes
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  async (req, res, next) => {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.[cookie](https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica))("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.status(200).json(user);
  }
);
```

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Seguridad con Helmet

En esté modulo vamos a implementar varias estrategias para asegurar nuestra aplicación en express, lo primero que vamos a implementar es un middleware llamado [Helmet.js](https://helmetjs.github.io/).

Helmet en su página nos muestra lo fácil que es usarlo, es cuestion de requerir helmet y simplemente usarlo como un **middleware** general en la aplicación de express, lo importante que tiene helmet es que **implementa 13 funciones** **middleware** que establecen códigos ``htpp`` que ayudan a la seguridad de nuestra aplicación, el por defecto activa algunos, pero aún tenemos la posibilidad de activar todos los 13. 

Lo que me parece muy interesante de su página, es que no solo explica que es el módulo sino también cúal es el ataque que se le hace a ese modulo. Por ejemplo uno de mis preferidos se llamá ``Don't Sniff Mimetype``, lo que sucede es que el navegador trata de establecer cuál es el tipo de contenido que tiene cualquier recurso, entonces lo que podría hacer el atacante es decir que la URL hace parte de una imagen, pero en realidad esa imagen es un archivo ``html`` que puede ejecutar javascript malisioso, lo que hace helmet por debajo es simplemente establecer un ``header`` que se llama ``X-Content-Type-Options`` ``nosniff`` así sucesivamente **tiene otros diferentes headers que permiten establecer mejores prácticas de seguridad**.

Para implementar helmet lo primero que necesitamos hacer es instalar nuestra dependencia de helmet ``npm i helmet``, luego nos dirigimos a nuestro archivo index y requerimos el paquete ``helmet``.

```js
const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(helmet())
```

Esto por defecto esta estableciendo los valores por defecto que tiene helmet, si quisieramos establecer parametros extra, lo único que deberíamos hacer es pasar un archivo de configuración, así de sencillo es implementar helmet en nuestra aplicación.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Detectando vulnearabilidades con npm audit

Lo único que debemos hacer es correr: ``npm audit``. npm audit lo que hace es que se va por todas nuestras dependencias e identifica si hay vulnerabilidades desconocidas.

Si tuvieramos un proyecto antiguo con vulnerabilidades lo que tendriamos que hacer para corregirlas es correr el comando ``npm audit fix``

Como puedes ver estas vulnerabilidades pueden ocurrir en cualquier momento, lo idea es correr ``npm audit`` de vez en cuando, sin embargo podemos automatizar la deteccción de vulnerabilidades usando un servicio llamado ``snyk``.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Automatizar el chequeo de vulnerabilidades con Snyk

Para usar snyk lo primero es crear una cuenta en https://app.snyk.io/signup para agilizar el proceso recomiendo usar la cuenta de GitHub.

<div align="center">
 <img src="./assets/snyk-landing.png" alt="">
</div>

Despues de la creación de la cuenta nos redireccionara a las integraciones o podemos ir directamente mediante el link ``https://app.snyk.io/org/<usuario>/integrations``.

<div align="center">
 <img src="./assets/synk-integration.png" alt="">
</div>

Seleccionamos la integración con GitHub (ó con el servicio más adecuado para nuestro proyecto) y allí nos aseguramos de conectar nuestra cuenta con GitHub, otorgando los permisos necesarios.

<div align="center">
 <img src="./assets/snyk-connected.png" alt="">
</div>

Por ultimo necesitamos agregar el repositorio de nuestro proyecto para que haga la revision automática de vulnerabilidades en cada Pull request, mediante el botón ``Add your GitHub repositories to Snyk``.

Allí buscaremos el repositorio de nuestro proyecto, lo seleccionamos y le damos en el botón ``Add 1 selected repository to Snyk``.

Cuando termine la integración podemos dirigirnos al dashboard de nuestros proyectos haciendo click en la pestaña ``Projects`` o mediante el link ``https://app.snyk.io/org/<usuario></usuario>/projects`` y verificar el estado de nuestras dependencias:

<div align="center">
 <img src="./assets/snyk-projects.png" alt="">
</div>

En lo posible debemos evitar tener vulnerabilidades High (H) o Medium (M) para corregirlas le damos click en ``View report and fix``.

<code>Tener en cuenta que algunas vulnerabilidades no tienen solución en el momento por lo que toca estar pendiente de un posible fix o cambiar de librería.</code>

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Qué es OWASP y buenas prácticas de seguridad

**OWASP**: son las siglas del **Open Web Application Security Proyect**, es una organización que se encarga de velar por las buenas prácticas de seguridad a nivel mundial. Hay un documento que se llama el **Top Ten OWASP** y **lista los 10 resgos de seguridad más comunes**.

Hablemos de las primeras 3:

**Inyección**: es un ataque que describe como hacer sql-inyection, esté ataque determina que hay input que no están protegidos podemos usar código SQL en nuestros inputs directamente para afectar la base de datos

**Broken Autentication**: Está relaciona con todo el tema de autenticación, explica en no fomentar o banear personas que intentan autenticar muchas veces o usar contraseñas muy debiles. Por ejemplo te puedes dirigir a [howsecureismypassword](https://howsecureismypassword.net/) y probar que tan seguro es tu password.

Si yo ingreso el password ``123456`` me dice que el password será crakeado instantaneamente y esto es porque este password hace parte de los top 5 de los password más usados, la mejor manera de construir un password seguro es que tenga muchos caracteres inluso caracteres especiales.

**Sesitive Data Exposure**: Aunque tu no lo creas revelar información sensible al usuario puede ser factor para que los hackers hagan algo llamado **ingenieria social**, si ellos tienen tu información personal se pueden hacer pasar por identidades gubernamentales o por cualquier otra identidad que se haga creer que es tu banco, seguridad social, etc. 

Por eso es muy importante mantener la información segura y encriptada. La [GDPR] que significa **General Data Protection Regulation** que te obliga a que la información de tus usuarios sea guardada de manera segura, es muy importante seguir esta ley porque si no te pueden multar.

Si quieres seguir profundizando en esté tema te recomiendo el curso de OWASP que está en platzi.

Top Ten de seguridad de OWASP
https://www.owasp.org/images/5/5e/OWASP-Top-10-2017-es.pdf

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>

## Buenas prácticas de seguridad

- **Usar un gestor de contraseñas**: las contraseñas nunca se deben de repetir además los gestores de contraseñas nos indican si las contraseñas tienen buena seguridad, si están repetidas y las genera por nosotros, recurda que las contraseñas son como la ropa interior. _Debes cambiarlas regularmente, no las debes dejar en cima del escritorio, y nunca se las prestes a nadie_.

<div align="center">
  <img src="./assets/passwords.png" alt="">
</div>
<br>

- **Usar multi-factor auth**: o autenticación en 2 pasos, estó trata además de que introduzcas la contraseña en tu cuenta, debes además generar otro método de autenticación, esté puede ser _reconocimiento facial, la huella, o hay algo muy interesante llamado ue keys: son una llave que necesita ser introducida a tu computador para poder acceder a tu cuenta_.

- **Seguridad en tu entorno**: Si tu dejas tu computador al aire libre en un lugar inseguro fácilmente también te van ha poder hackear, de nada sirve que tengas la puerta más segura con todos los cerrojos si dejas una ventana abierta de tu casa.

- **Manten actualizadas tus aplicaciones y SO**: como vimos en clases anteriores las vulnerabilidades de los paquetes suceden de un momento para otro, es muy importante entonces mantener actualizadas las aplicaciones y el sistema operativo porque ahí es donde se corrigen todas estas vulnerabilidades, además como lo mencionamos debes mantener actualizadas las dependencias, no solo de un proyecto si no de todos tus proyectos.

- **Mantente informado**: twitter es una muy buena fuente de información acerca de cuales son los ataques de seguridad, el hastag ``#secure`` ``#cibersecure`` te puede ayudar a identificar que es lo que esta sucediendo, investiga que blogs de seguridad existen, ve ha eventos, y si vas a salir con una aplicación a produccion te recomiendo que contrates a una compañia experta en seguridad que te haga una auditoria de tu aplicación.

<div align="right">
  <small><a href="#tabla-de-contenido">🡡 volver al inicio</a></small>
</div>
<br>
  <p align="center" style="font-weight:bold">by: Jasan Hernández :D</p>
<br>