module.exports = app => {
    const controller = require('../controllers/administrador')();
    const db = require('../../config/database')
  
     app.route('/api/v1/administrador')
      .get(controller.administrador);

      app.route('/api/v1/administrador/:id')
      .get(controller.administradorId);
    
      app.route('/api/v1/administrador')
      .post(controller.newAdministrador);
      
      app.route('/api/v1/administrador')
      .put(controller.updateAdministrador);

      app.route('/api/v1/administrador/:id')
      .delete(controller.deleteAdministrador);

      app.route('/api/v1/administrador/login')
      .post(controller.login);
  }