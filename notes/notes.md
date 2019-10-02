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

Un JWT consta de 3 partes: **Header, Payload y Signature**

- El **Header**: tiene 2 atributos, el tipo que en esté caso siempre debería ser JWT y el algoritmo de encriptación de la firma, el algoritmo de encriptación de la firma puede ser sincrono o asincrono. Recordemos que los algoritmos asincronos **usan 2 llaves** de encriptación; una llave **privada** y una llave **pública**, donde la llave pública se usa para encriptar y la llave privada se usa para desencriptar y el los algoritmos de encriptación sincronos se usa la misma llave para desencriptar e incriptar, ambos son seguros de usar pero depende donde los uses.

Los algoritmos asincronos deben usarse donde hay partes públicas que puedan tener acceso a está llave, mientras que los algoritmos sincronos solo deben usarse en sistemas como el [backend](https://platzi.com/blog/que-es-frontend-y-backend/).

- **Payload**: Es donde guardamos toda la información de nuestro usuario, incluso todos los scopes de autorización, esté payload se compone de algó llamado los **claims**, los claims son generalmente representados por 3 letras para mantener el JWT muy pequeño, hay diferentes tipos de claims.

Nosotros en la página donde está el estandart podemos ver en la sección 4.1 lo que se llama los ``Registered Claim Name``s. Estos son ``clains`` especificos que tienen una definición propia y debe respetarse.

También podemos usar los ``Public Claim Names``, estos pueden usarse entre diferentes aplicaciones y ya estan también definidos, mientras que los **Private Claim Names**, son los que tu defines para tu aplicación.

- **Signature**: La tercera parte del JWT que es la firma y es lo que hace muy poderoso el JWT está compuesto por el header códificado más el payload códificado, ha esto se le aplica el algoritmo de encriptación por su puesto usando un ``secret``. En el caso del algoritmo H256 debemos usar un string de 256 bits de longitud.

