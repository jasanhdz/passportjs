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
