const exorres = require('express');
const bodyParser = require('body-parser');

const app = exorres();// esto es una instancia de express, trae todas las funcionalidades de express
const port = 8888;// si tienen una aplicacion en el mismop uerto 8888, hayq ue cambiar el numero aca

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());//esto se encarga de procesar la infomracion que viene en el cuerpo de la peticion

//iniciamos el servidor indicando que escuche en el "puerto" 8888 y le vamos a pasar un call back
//donde le indicamos que va a hacer nuestro servidor cuando se inicie
app.listen(port, () => {
    console.log('Servidor iniciado en: http://localhost:' + port);
    //este console solo se muestra en la consola/terminal integrado, nos sirve para debugear cosas, no se muestrs en el navegador
});
// app. y el verbo http que queremos usar (get, post, put, delete, etc)
// '/' es la ruta raiz de nuestra aplicacion, seria el index o home
// (req, res) => {} es un callback que recibe dos parametros
// req (request/peticion): la peticion que hace el cliente
// res (espuesta): la respuesta que le vamos a dar al cliente
// dentro de la funcion de flecha definimos lo que queremos que haga nuestro servidor
//
app.get('/', (req, res) => {//aca le indicamos que queresmo hacer cuando alguien haga una peticion get a la ruta '/'
    res.send('Hola Mundo desde Express');
    //res es el objeto que va a responder desde el servidor al cliente
});

app.get('/saludo/:nombre', (req, res) => {//con ':' express entiende que lo que venga despues es una variable
    //const nombre = req.params.nombre;// esto es parecido a $_GET['GET'] en php
    const {nombre}= req.params;
    res.send('hola '+nombre);
    res.json();
});

//con esto podemos personzalizar el mensaje de error 404
app.use((req,res, next)=>{
    res.status(404);
    res.send(`
        <h1>404 - pagina no encontrada</h1>
        <p>La pagina que buscas no existe</p>
        <a href="/">Volver al inicio</a>
        `);
})