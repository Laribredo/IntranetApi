module.exports = app => {
    const controller = require('../controllers/usuarios')();
    const db = require('../../config/database')
  
     app.route('/api/v1/usuarios')
      .get(controller.usuarios);

      app.route('/api/v1/usuarios/ramais')
      .get(controller.ramais);

      app.route('/api/v1/usuarios/aniversariantesDia/:dia/:mes')
      .get(controller.aniversariantesDoDia);

      app.route('/api/v1/usuarios/colaboradoresMes/:mes')
      .get(controller.todosColaboradores);

      app.route('/api/v1/usuarios/perfil-pessoal/:id')
      .get(controller.perfilPessoal);

    // //   app.route('/api/v1/usuarios/perfil-pessoal/:id')
    // //   .get(controller.todosColaboradores);

      app.route('/api/v1/usuarios/:id')
      .get(controller.usuariosId);
    
      app.route('/api/v1/usuarios')
      .post(controller.newusuario);
      
      app.route('/api/v1/usuarios')
      .put(controller.updateUsuario);

      app.route('/api/v1/usuarios/:id')
      .delete(controller.deleteUsuario);

      app.route('/api/v1/usuarios/login')
      .post(controller.login);

      app.route('/api/v1/usuarios/alterar')
      .post(controller.alteraUsers);

      app.route('/api/v1/usuarios/alterarSenha')
      .post(controller.alteraSenha);
  }