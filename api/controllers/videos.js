const db = require('../../config/database');
module.exports = () => {
    const controller = {};  

    controller.videos = (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        db.then(conn =>{
          conn.query("SELECT * FROM videos ORDER BY dataPostagem desc")
        .then(rows => {
          res.json(rows);
        })
        .catch(err => { 
          res(err)
        });
        
      })
    }

    controller.videosId = (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      db.then(conn =>{
        conn.query("SELECT * FROM videos WHERE id = ?", [req.params.id])
      .then(rows => {
        res.json(rows);
      })
      .catch(err => { 
        res(err)
      });
      
    })
  }

    controller.newvideos = (req, res) => {
      console.log(req.body);
      db.then(conn =>{
        conn.query("INSERT INTO videos (dataPostagem,textoAbreviado,texto,video,ativo,youtube) VALUES('"+req.body.dataPostagem+"','"+req.body.textoAbreviado+"','"+req.body.texto+"','"+req.body.video+"',"+req.body.ativo+ "," + req.body.yotube + "); ")
        .then(resp =>{
          console.log(resp)          
          res.json({"mensagem": "ok"})
        }).catch(err =>{
          console.log(err);
          res.json({"mensagem": "erro"})
        })
      }).catch(err =>{
        console.log(err);
        res.json({"mensagem": "erro relacionado ao banco"})               
      })
  }

  controller.updatevideos = (req, res) => {
    var conteudo = JSON.stringify(req.body);
    console.log(conteudo);    
    db.then(conn =>{
      conn.query("UPDATE videos SET dataPostagem = ? ,textoAbreviado = ?, texto = ? , video = ? , ativo = ? , youtube = ? "+
                 "WHERE id = ?",[req.body.dataPostagem,req.body.textoAbreviado,req.body.texto,req.body.video,req.body.ativo,req.body.yotube,req.body.id])
      .then(resp =>{
        console.log(resp)          
        res.json({"mensagem": "ok"})
      }).catch(err =>{
        console.log(err);
        res.json({"mensagem": "erro"})
      })
    }).catch(err =>{
      console.log(err);
      res.json({"mensagem": "erro relacionado ao banco"})               
    })
}

controller.deletevideos = (req, res) => {
  db.then(conn =>{
    conn.query("DELETE FROM videos WHERE id = ?",[req.params.id])
    .then(resp =>{
      console.log(resp)          
      res.json({"mensagem": "ok"})
    }).catch(err =>{
      console.log(err);
      res.json({"mensagem": "erro"})
    })
  }).catch(err =>{
    console.log(err);
    res.json({"mensagem": "erro relacionado ao banco"})               
  })
}
    //controller.noticias = async (req,res) => res.status(200).json(await noticias_.getAll())
    return controller;
}