var multer  =   require('multer');
module.exports = () => {
    const controller = {};  

    var nomeImagem = "";

    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/images');
        },
        filename: function (req, file, callback) {
            nomeImagem = file.originalname;
            console.log(nomeImagem);
            callback(null, nomeImagem);
            }
    });

    var upload = multer({ storage : storage}).single('imagem');    

    controller.fileUpload = (req, res) => {
        upload(req,res,function(err) {
            if(err) {
                console.log("erro " + err);
                return res.end("Error uploading file.");
            }
            res.json({"nomeImagem":nomeImagem});
        });
      }

    return controller;
}
