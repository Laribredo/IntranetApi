const db = require('../../config/database');
module.exports = () => {
    const controller = {};  

    controller.comunicados = (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        db.then(conn =>{
          conn.query("SELECT * FROM comunicados ORDER BY dataPostagem desc")
        .then(rows => {
          res.json(rows);
        })
        .catch(err => { 
          res(err)
        });
        
      })
    }

    controller.busca = (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      db.then(conn =>{
        conn.query("select * from comunicados where textoAbreviado like '%"+req.body.busca+"%' or texto like '%"+req.body.busca+"%' order by dataPostagem desc;")
      .then(rows => {
        res.json(rows);
      })
      .catch(err => { 
        res(err)
      });
      
    })
  }
  

    controller.comunicadosId = (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      db.then(conn =>{
        conn.query("SELECT * FROM comunicados WHERE id = ?", [req.params.id])
      .then(rows => {
        res.json(rows);
      })
      .catch(err => { 
        res(err)
      });
      
    })
  }

    controller.newComunicados = (req, res) => {
      console.log(req.body.textoAbreviado);
      db.then(conn =>{
        conn.query("INSERT INTO comunicados (dataPostagem,textoAbreviado,texto,imagem,ativo) VALUES('"+req.body.dataPostagem+"','"+req.body.textoAbreviado+"','"+req.body.texto+"','"+req.body.imagem+"',"+req.body.ativo+"); ")
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

  controller.updateComunicados = (req, res) => {
    var conteudo = JSON.stringify(req.body);
    console.log(conteudo);    
    db.then(conn =>{
      conn.query("UPDATE comunicados SET dataPostagem = ? ,textoAbreviado = ?, texto = ? , imagem = ? , ativo = ? "+
                 "WHERE id = ?",[req.body.dataPostagem,req.body.textoAbreviado,req.body.texto,req.body.imagem,req.body.ativo,req.body.id])
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

controller.deleteComunicados = (req, res) => {
  db.then(conn =>{
    conn.query("DELETE FROM comunicados WHERE id = ?",[req.params.id])
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