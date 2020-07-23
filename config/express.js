const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
const cors = require('cors');
const multer = require('multer');
const consign    = require('consign')

module.exports = () => {
  const app = express();

    app.use(cors());
    // MIDDLEWARES
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))
    require('../api/routes/noticias')(app);
    require('../api/routes/eventos')(app);
    require('../api/routes/comunicados')(app);
    require('../api/routes/usuarios')(app);
    require('../api/routes/administrador')(app);
    require('../api/routes/voceSabia')(app);
    require('../api/routes/videos')(app);
    require('../api/routes/upload')(app);
  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  let caminho = "C:\\API_NODE" 
  console.log(caminho + '/public/images');
  
  app.use("/images", express.static(caminho + '/public/images'));
  return app;
};