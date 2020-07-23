module.exports = app => {
    const controller = require('../controllers/voceSabia')();
  
     app.route('/api/v1/vocesabia')
      .get(controller.voceSabia);

      app.route('/api/v1/vocesabia/busca')
      .post(controller.busca);

      app.route('/api/v1/vocesabia/:id')
      .get(controller.voceSabiaId);
    
      app.route('/api/v1/vocesabia')
      .post(controller.newvoceSabia);
      
      app.route('/api/v1/vocesabia')
      .put(controller.updatevoceSabia);

      app.route('/api/v1/vocesabia/:id')
      .delete(controller.deletevoceSabia);
  }