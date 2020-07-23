const db = require('../../config/database');
module.exports = () => {
    const controller = {};  

    controller.administrador = (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        db.then(conn =>{
          conn.query("SELECT * FROM administradores")
        .then(rows => {
          res.json(rows);
        })
        .catch(err => { 
          res.json({"erro":err})
        });
        
      })
    }

    controller.administradorId = (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      db.then(conn =>{
        conn.query("SELECT * FROM administradores WHERE id = ?", [req.params.id])
      .then(rows => {
        res.json(rows);
      })
      .catch(err => { 
        res.json(err)
      });
      
    })
  }

    controller.newAdministrador = (req, res) => {
      console.log(req.body.textoAbreviado);
      db.then(conn =>{
        conn.query("INSERT INTO administradores (nome,cpf,email,dataNascimento,departamento,ramal,celular,telefone,estado,usuario,senha,imagem) VALUES('"+req.body.nome+"','"+req.body.cpf+"','"+req.body.email+"','"+req.body.dataNascimento+"','"+req.body.departamento+"','"+
        req.body.ramal +"','"+ req.body.celular+"','"+ req.body.telefone +"','"+ req.body.estado +"','"+ req.body.usuario +"','"+  req.body.senha +"','"+ req.body.imagem +"'); ")
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

  controller.updateAdministrador = (req, res) => {
    var conteudo = JSON.stringify(req.body);
    console.log(conteudo);    
    db.then(conn =>{
      conn.query("UPDATE administradores SET nome = ? ,cpf = ?, email = ? , dataNascimento = ? , departamento = ?  ,ramal = ? ,celular = ? , telefone = ? , estado = ? , usuario = ? , senha = ?   , imagem = ? "+
                 "WHERE id = ?",[req.body.nome,req.body.cpf,req.body.email,req.body.dataNascimento,req.body.departamento, req.body.ramal, req.body.celular,  req.body.telefone, req.body.estado ,req.body.usuario ,req.body.senha ,req.body.imagem ,req.body.id])
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

controller.deleteAdministrador = (req, res) => {
  db.then(conn =>{
    conn.query("DELETE FROM administradores WHERE id = ?",[req.params.id])
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

controller.login = (req, res) =>{
      db.then(conn =>{
        conn.query("SELECT * FROM administradores Where usuario = ? and senha = ? ",[req.body.usuario, req.body.senha])
      .then(rows => {
        if(rows.length == 0)
        {
            res.json({"logado":null})
        }else        
        {
          res.json({"logado":rows[0].id})
        }
      })
      .catch(err => { 
        res.json(err)
      });
    
 })
}


    //controller.noticias = async (req,res) => res.status(200).json(await noticias_.getAll())
    return controller;
}