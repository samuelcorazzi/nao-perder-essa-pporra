
const path = require('path')
const fs = require('fs');
var http = require('http');  
var module = require("module")
var logger = require('morgan');
var express = require('express');
const { Console } = require('console');
var app =  module.exports = express();

const server = http.createServer((app))

//app.use(express.static(path.join(__dirname, "static")));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

//configuração 
app.set('port', process.env.PORT || 3000)


//error handlers
app.use(logErrors);

app.get('/', function(req, res){
   
    res.render('LP');
  });

  app.get('/index', function(req, res){
    res.render('index');
  });

 app.get('/home', function(req, res){
   res.render('LP');
 });

 app.get('/services', function(req, res){
  res.render('dashboard');
});

app.get('/team', function(req, res){
  res.render('dashboard');
});

app.get('/membro', function(req, res){
  res.render('LP');
});

app.post("/login", (req, res) => {    
    const { nomes, senha } = req.body
    console.log(nomes);
    console.log(senha);

    var data = fs.readFileSync("./usuarios.json");
    const usuariosparse = JSON.parse(data)
    console.log( usuariosparse)
    const user = usuariosparse.find(user => user.nome === nomes && user.senha === senha)
    console.log(user);
    if(user === undefined){
      console.log('usuario ou senha incorretos');
       res.status(500);
       res.render('error', {
           message: 'erro de acesso'});
    }
    else{
          res.render('dashboard')
    }
    
});
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);  

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
    res.send(err.status || 500, { error: err.message });
    } 
    else 
    { next(err);}
  };
  
  function error  (status, msg) {
    var err = new Error(msg);
    err.status = status;
    return err;
  };
  function logErrors  (err, req, res, next) {
    console.error(err.stack);
    next(err);
  };
  function errorHandler (err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
  };
//server   
server.listen(3000, () => {
    console.log('server na porta',3000);

})

//login do front pro back

//app.post('/login' , (req,res) => {
  //  const usuarioscad = fs.readfileSync('./usuarios.json')
   // const usuariosparse = JSON.parse(usuarioscad)
    //console.log( usuariosparse)

    //var name = req.body.nomes
    //var senha = req.body.senha 

    //for(var umUsuario of usuariosparse){
       // if(nome == umUsuario.nome && senha == umUsuario.senha){
      //      req.sesion.nome == umUsuario
     //       res.send('conectado')
    //        return
   //     }
  //  }
 //   res.send('falhou')
//})
