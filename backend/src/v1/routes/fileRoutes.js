const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const fileUpload = require('express-fileupload');
const { Client } = require('smb2');
const rimraf = require('rimraf');
const fsExtra = require('fs-extra');

/* const app = express(); */

const router = express.Router();

//metodo multer.storage.diskStorage

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
    let uploadPath = 'C:/Users/Practicante 2/Downloads/';
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Los meses son de 0 a 11
    const day = date.getDate();
    const minute = date.getMilliseconds();
    const nombre = 
    uploadPath = path.join(uploadPath, String(year)+'-'+ String(month)+'-'+ String(day));
      const ruta = `${uploadPath}`
      if(!ruta){
        fs.mkdirSync(ruta)   
      }
      cb(null, ruta)
    },
    filename: function (req, file, cb) {
    cb(null, file.fieldname);
  }
});

/* const upload = multer({ storage: storage }); */

const upload = multer({ dest: 'uploads/' });
router.post('/', upload.fields([
  /* { name: 'pdfFile0' },
  { name: 'pdfFile1' },
  { name: 'pdfFile2' },
  { name: 'pdfFile3' },
  { name: 'pdfFile4' },
  { name: 'pdfFile5' },
  { name: 'pdfFile6' },
  { name: 'pdfFile7' },
  { name: 'pdfFile8' },
  { name: 'pdfFile9' },
  { name: 'pdfFile10' },
  { name: 'pdfFile11' },
  { name: 'pdfFile12' },
  { name: 'pdfFile13' } */
  // Add more fields if necessary

  /* second form */
  { name: 'Vinculacion' },
  { name: 'ComprAntc' },
  { name: 'CtaInst' },
  { name: 'Pagare' },
  { name: 'Rut' },
  { name: 'Ccio' },
  { name: 'CrepL' },
  { name: 'Ef' },
  { name: 'Certban' },
  { name: 'Refcom' },
  { name: 'Cvbo' },
  { name: 'Firdoc' },
  { name: 'Infemp' },
  { name: 'Infrl' },
  { name: 'Otros'},
  { name: 'ValAnt'},
]), async (req, res) => {
  const folderName = req.body.folderName; 

  const folderPath = path.join(`C:/Users/Practicante 2/Downloads/${folderName}`);
 
/* const folderPath = path.join(`smb${folderName}`);
 */if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  for (const fileInputName in req.files){
    req.files[fileInputName].forEach((file)=>{
      const clientName = req.body.clientName;
      const extension = path.extname(file.originalname);
      const newFilePath = path.join(folderPath,file.fieldname+`-${clientName}`+extension);
      fs.rename(file.path,newFilePath,(err)=>{
        if(err){
          res.status(500).send('error al guardar los archivos');
        }
      })
    })
  } res.status(200).send('archivos guardados');

  /* try to conecto to samba */
  /* const client = new Client({
    share: 'smb://appterceros:L4ng0K3nsh1@192.168.4.237/aplicativoterceros',
    domain: null, // Puede ser null o omitido si no se requiere autenticación
    username: appterceros,
    password: L4ng0K3nsh1,
  });
  await client.up */
});

router.delete('/:folderName', (req,res)=>{
  const folderName = req.params.folderName; 
  const rutaArchivo = path.join(`C:/Users/Practicante 2/Downloads/${folderName}`);

  fsExtra.remove(rutaArchivo)
    .then(() => {
      console.log('Carpeta eliminada correctamente');
    })
    .catch((err) => {
      console.error(`Error al eliminar la carpeta: ${err.message}`);
    });if (err) {
      console.error(err);
      return res.status(500).send('Error al eliminar la carpeta');
    }
});

module.exports=router
