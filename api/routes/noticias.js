module.exports = app => {
    const controller = require('../controllers/noticias')();
    const db = require('../../config/database')
  
     app.route('/api/v1/noticias')
      .get(controller.noticias);

      app.route('/api/v1/noticias/busca')
      .post(controller.busca);

      app.route('/api/v1/noticias/:id')
      .get(controller.noticiasId);
    
      app.route('/api/v1/noticias')
      .post(controller.newNoticia);
      
      app.route('/api/v1/noticias')
      .put(controller.updateNoticia);

      app.route('/api/v1/noticias/:id')
      .delete(controller.deleteNoticia);
  }