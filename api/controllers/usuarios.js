const db = require('../../config/database');
module.exports = () => {
    const controller = {};  

    controller.usuarios = (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        db.then(conn =>{
          conn.query("SELECT * FROM usuarios")
        .then(rows => {
          res.json(rows);
        })
        .catch(err => { 
          res(err)
        });
        
      })
    }

    controller.usuariosId = (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      db.then(conn =>{
        conn.query("SELECT * FROM usuarios WHERE id = ?", [req.params.id])
      .then(rows => {
        res.json(rows);
      })
      .catch(err => { 
        res(err)
      });
      
    })
  }

    controller.newusuario = (req, res) => {
      console.log(req.body.textoAbreviado);
      db.then(conn =>{
        conn.query("INSERT INTO usuarios (nome,cpf,email,dataNascimento,departamento,ramal,celular,telefone,estado,usuario,senha,imagem) VALUES('"+req.body.nome+"','"+req.body.cpf+"','"+req.body.email+"','"+req.body.dataNascimento+"','"+req.body.departamento+"','"+
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

  controller.updateUsuario = (req, res) => {
    var conteudo = JSON.stringify(req.body);
    console.log(conteudo);    
    db.then(conn =>{
      conn.query("UPDATE usuarios SET nome = ? ,cpf = ?, email = ? , dataNascimento = ? , departamento = ?  ,ramal = ? ,celular = ? , telefone = ? , estado = ? , usuario = ? , senha = ?   , imagem = ? "+
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

controller.deleteUsuario = (req, res) => {
  db.then(conn =>{
    conn.query("DELETE FROM usuarios WHERE id = ?",[req.params.id])
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
    conn.query("SELECT * FROM usuarios Where usuario = ? and senha = ? ",[req.body.usuario, req.body.senha])
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

controller.todosColaboradores = (req, res) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    db.then(conn =>{
      conn.query("select id,nome,imagem,dataNascimento from usuarios where MONTH(dataNascimento) = ?; ", [req.params.mes])
    .then(rows => {
      res.json(rows);
    })
    .catch(err => { 
      res(err)
    });
    
  })
}

controller.perfilPessoal = (req, res) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    db.then(conn =>{
      conn.query("select imagem,nome,departamento,email,ramal,telefone,celular,dataNascimento from usuarios where id = ?;", [req.params.id])
    .then(rows => {
      res.json(rows);
    })
    .catch(err => { 
      res(err)
    });
    
  })
}

controller.aniversariantesDoDia = (req, res) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    db.then(conn =>{
      conn.query("select id,nome,imagem from usuarios where DAY(dataNascimento) = ? and MONTH(dataNascimento) = ?; ", [req.params.dia,req.params.mes])
    .then(rows => {
      res.json(rows);
    })
    .catch(err => { 
      res(err)
    });
    
  })
}

// controller.perfilPessoal = (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   db.then(conn =>{
//       conn.query("select imagem,nome,setor,email,ramal,telefone,celular,dataNascimento from usuarios where id = ?; ", [req.params.id])
//   .then(rows => {
//     res.json(rows);
//   })
//   .catch(err => { 
//     res(err)
//   });
  
// })
// }

controller.ramais = (req, res) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    db.then(conn =>{
      conn.query("SELECT imagem,estado,nome,departamento,ramal,telefone,celular,email FROM usuarios")
    .then(rows => {
      res.json(rows);
    })
    .catch(err => { 
      res(err)
    });
    
  })
}

controller.alteraUsers = (req,res) =>{
  db.then(conn =>{
    conn.query("UPDATE usuarios SET ramal = ? ,telefone = ?, celular = ?, imagem = ?  "+
               "WHERE id = ?",[req.body.ramal,req.body.telefone,req.body.celular,req.body.imagem,req.body.id])
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

controller.alteraSenha = (req,res) =>{
  db.then(conn =>{
    conn.query("UPDATE usuarios SET senha = ?  "+
               "WHERE id = ?",[req.body.senha,req.body.id])
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
