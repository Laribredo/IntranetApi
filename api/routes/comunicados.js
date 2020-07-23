module.exports = app => {
    const controller = require('../controllers/comunicados')();
    const db = require('../../config/database')
  
     app.route('/api/v1/comunicados')
      .get(controller.comunicados);

      app.route('/api/v1/comunicados/busca')
      .post(controller.busca);

      app.route('/api/v1/comunicados/:id')
      .get(controller.comunicadosId);
    
      app.route('/api/v1/comunicados')
      .post(controller.newComunicados);
      
      app.route('/api/v1/comunicados')
      .put(controller.updateComunicados);

      app.route('/api/v1/comunicados/:id')
      .delete(controller.deleteComunicados);
  }