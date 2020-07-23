module.exports = app => {
    const controller = require('../controllers/eventos')();
  
     app.route('/api/v1/eventos')
      .get(controller.eventos);

      app.route('/api/v1/eventos/busca')
      .post(controller.busca);

      app.route('/api/v1/eventos/:id')
      .get(controller.eventosId);
    
      app.route('/api/v1/eventos')
      .post(controller.newEvento);
      
      app.route('/api/v1/eventos')
      .put(controller.updateEvento);

      app.route('/api/v1/eventos/:id')
      .delete(controller.deleteEvento);
  }