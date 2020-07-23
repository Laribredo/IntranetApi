module.exports = app => {
    const controller = require('../controllers/videos')();
  
     app.route('/api/v1/videos')
      .get(controller.videos);

      app.route('/api/v1/videos/:id')
      .get(controller.videosId);
    
      app.route('/api/v1/videos')
      .post(controller.newvideos);
      
      app.route('/api/v1/videos')
      .put(controller.updatevideos);

      app.route('/api/v1/videos/:id')
      .delete(controller.deletevideos);
  }