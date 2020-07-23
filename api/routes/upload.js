module.exports = app => {
    const controller = require('../controllers/upload')();
  
     app.route('/api/v1/noticias/upload')
      .post(controller.fileUpload);

      app.route('/api/v1/eventos/upload')
      .post(controller.fileUpload);

      app.route('/api/v1/comunicados/upload')
      .post(controller.fileUpload);

      app.route('/api/v1/usuarios/upload')
      .post(controller.fileUpload);

      app.route('/api/v1/vocesabia/upload')
      .post(controller.fileUpload);

      app.route('/api/v1/videos/upload')
      .post(controller.fileUpload);
  }