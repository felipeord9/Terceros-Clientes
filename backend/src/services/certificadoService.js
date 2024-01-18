const { models } = require('../libs/sequelize')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const MailService = require('./mailService')
const fs = require('fs');
const pdf = require('html-pdf');
const path = require('path');
const fsExtra = require('fs-extra');
const nodemailer = require('nodemailer');
const numeroALetras = require('numero-a-letras');
const conversor = require('conversor-numero-a-letras-es-ar');

const find = async () => {
  const certificados = await models.Certificado.findAll()
  return certificados
}

const findAll = async (cedula) => {
  const certificado = await models.Certificado.findAll({
    where: {
      tercero:cedula
    }
  })
  return certificado
}

const findOne = async (id) => {
  const certificado = await models.Certificado.findByPk(id)

  if(!certificado) throw boom.notFound('Certificado no encontrado')

  return certificado
}

const findByTercero = async (tercero) => {
  const certificado = await models.Certificado.findOne({
   where: {tercero }
})

  if(!certificado) throw boom.notFound('Certificado no encontrado')

  return certificado
}

/* const findByEmail = async (email) => {
  const user = await models.Certificado.findOne({
   where: {email }
})

  if(!user) throw boom.notFound('Usuario no encontrado')

  return user
} */

const create = async (body) => {
    const newCertificado = await models.Certificado.create(body)
    return newCertificado  
}

const update = async (id, changes) => {
  const certificado = await findOne(id)
  const updatedCertificado = await certificado.update(changes)

  return updatedCertificado
}

const sendCertificado = async (body)=>{
  let ClaseConversor = conversor.conversorNumerosALetras;
  let miConversor = new ClaseConversor();
  const valor = body.retenidoFinal;
  const numeroNormal = valor.replace(/[,.']/g, "");
  var resultado = Math.floor(numeroNormal/100)
  var letras = miConversor.convertToText(resultado);  
  /* const valor = body.retenidoFinal;
  const numeroNormal = valor.replace(/[,.']/g, "");
  const letras = numeroALetras.NumerosALetras(numeroNormal) */
  try{
    function crearArchivoHTML() {
      const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <style>
          * {
          font-size: 8px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            height: auto;
          }
          thead {
            background-color: #d6d6d6;
            color: #000;
          }
          tbody {
            display: block;
            min-height: 100vh;
          }
          tr {
            display: table;
            width: 100%;
            table-layout: fixed;
  
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #888;
          }
        </style>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CERTIFICADO DE RETENCION POR ICA</title>
      </head>
      <body>
        <div
          style="
            font-family: Arial, Helvetica, sans-serif;
            padding: 1rem 2rem;
          "
        >
        <div style="width: 100%; display: flex;">
          <img style="width: 320px; height: 90px;" 
            src="https://sucursales.granlangostino.com/wp-content/uploads/2022/12/cropped-Logo-el-gran-langostino.png"
            alt="Logo de la empresa"
          />
          <br/><br/>
          <h2 style="font-size: 16px; font-weight: bolder; margin: 0">
            EL GRAN LANGOSTINO S.A.S.
          </h2>
          <h2 style="font-size: 14px; font-weight: bolder; margin: 0">Nit: 835.001.216-8</h2>
          <h2 style="font-size: 14px; font-weight: bolder; margin: 0">OFICINA PRINCIPAL
          <p style="margin: 0.3rem 0; font-size: 12px;">CL 13 # 32-417</p>
          <p style="margin: 0.3rem 0; font-size: 12px;">ACOPI - YUMBO</p>
        </div>
        <br/>
        <h1 style="text-align: center; font-size: 22px; font-weight: bold; margin:0 ;">CERTIFICADO DE RETENCION POR ICA</h1>
        <h3 style="text-align: center; font-size: 13px;  margin:0">Año 2023</h3>
        <br/>
          <hr style="width: 100%; border: 1.5px solid black;"/>
          <div style="width: 100%; font-size: 13px; margin-top: 10px;">
            <div style="position: relative; margin-bottom: 2rem;">
              <div style="position: relative; border: 1px solid black; border-radius: 5px; width: 55%; padding: 1rem;">
                <h3 style="background: #fff; font-size: 12px; position: absolute; top: -8px; left: 25px; margin: 0; padding: 0px 10px;">Razon Social a quien se le practicó la retención</h3>
                <div>
                  <p style="margin: 0; width: 100%; font-size: 12px"><strong style="margin-right: 0.5rem; font-size: 12px">${
                    body.nombreTercero
                  }</strong></p>
                </div>
                <div>
                  <p style="margin: 0; width: 100%; font-size: 12px"><strong style="margin-right: 0.5rem; font-size: 12px">Nit: </strong>${
                    body.cedula
                  }</p>
                </div>
                <div>
                  <p style="margin: 0; width: 100%; font-size: 12px"><strong style="margin-right: 0.5rem; font-size: 12px">Dirección: </strong>${
                    body.direccion
                  }</p>
                </div>
                <div>
                    <p style="margin: 0; width: 100%; font-size: 12px"><strong style="margin-right: 0.5rem; font-size: 12px">Ciudad: </strong>${
                      body.ciudad
                    }</p>
                </div>
              </div>
            </div>
            <div style="width: 100%;height: auto; border: 1px solid black;">
              <table style="width: 100%; height: auto;">
                <thead>
                  <tr>
                  <th style="width: 340px; font-size: 12px">CONCEPTO DEL PAGO SUJETO A RETENCION</th>
                  <th style="width: 45px; justify-content: center; text-align: center; font-size: 12px">TASA %</th>
                  <th style="width: 97px; justify-content: center; text-align: center; font-size: 12px">VALOR BASE</th>
                  <th style="justify-content: center; text-align: center; font-size: 12px">CIUDAD ICA</th>
                  <th style="width: 97px; justify-content: center; text-align: center; font-size: 12px">VALOR RETENIDO</th>
                  </tr>
                </thead>
                <tbody>
                  ${body.filtro.map((elem) => {
                    return `
                        <tr>
                          <td style="width: 340px; font-size: 12px">${elem.concepto}</td>
                          <td style="width: 45px; justify-content: center; text-align: center; font-size: 12px">${elem.tasa} %</td>
                          <td style="width: 97px; justify-content: center; text-align: center; font-size: 12px">$ ${elem.base}</td>
                          <td style="justify-content: center; text-align: center; font-size: 12px">${elem.ciudadIca}</td>
                          <td style="width: 97px; justify-content: center; text-align: center; font-size: 12px">$ ${elem.valorRetenido}</td>
                        </tr>
                        `;
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td style="width: 340px; font-size: 12px"><strong style="font-size: 12px">TOTAL</strong></td>
                    <td style="width: 45px; justify-content: center; text-align: center; font-size: 12px">----------</td>
                    <td style="width: 97px; justify-content: center; text-align: center; font-size: 12px">$ ${body.baseFinal}</td>
                    <td style="justify-content: center; text-align: center; font-size: 12px">----------------</td>
                    <td style="width: 97px; justify-content: center; text-align: center; font-size: 12px">$ ${body.retenidoFinal}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <br/>
            <p style="margin: 0; width: 100%; font-size: 15px; "><strong style="margin-right: 0.5rem; font-size: 15px">VALOR RETENIDO: </strong>${
              letras.toUpperCase()
            } PESOS</p>
            <br/><br/><br/><br/>
              <h3 style="font-size: 15px">Este certificado se expide el: ${body.fechaFormateada}</h3>
          </div>
        </div>
      </body>
    </html>`;
    fs.writeFileSync('uploads/archivo.html',html);
    console.log('Archivo HTML creado con éxito.')
    }
    crearArchivoHTML();

    const htmlContent= fs.readFileSync('uploads/archivo.html', 'utf-8');
    const options = {
      format: 'A4', // Tamaño del papel
      orientation: 'portrait', // Orientación del papel (portrait o landscape)
    }; 
     pdf.create(htmlContent, options).toFile('uploads/html.pdf', function (err, res) {
      if (err) return console.log(err);
      console.log(`PDF generado en: ${res.filename}`);
      // Configura el transporte del correo electrónico
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'oficialdecumplimiento@granlangostino.com',
            pass: 'Ofici4l@2024'
          }
      });
      const message = {
        from: 'oficialdecumplimiento@granlangostino.com',
        to: body.correoEnvio, // Coloca la dirección de correo del destinatario
        subject: 'Certificado de retención por ICA - El Gran Langostino S.A.S.',
        text: `Cordial saludo ${body.nombreTercero},
              Su certificado de retención por ICA, se ha generado de manera exitosa, 
              lo podrá visualizar en la parte inferior de este correo.`,
        attachments: [
          {
            filename: 'certificado_retencion_ica.pdf', // Nombre del archivo adjunto en el correo
            path: 'uploads/html.pdf' // Ruta del archivo PDF que quieres enviar
          }
        ],
        html:`<p>Yumbo, ${body.fechaFormateada}.</p>
        <p>Señores</p>
        <p>${body.nombreTercero}</p>
        <br/>
        <p>Cordial saludo </p>
        <p>Adjunto estamos remitiendo el CERTIFICADO DE RETENCIÓN POR ICA del año agravable 2023.</p>
        <br/>
        <p>Cualquier duda o información adicional, por favor responder a:</p>
        <p>${body.usuarioEmisor}</p>
        <p>${body.correoEmisor}</h6>
        <p>Tels. 695 46 78 Ext. 104</p>
        <br/><br/>
        <p><u>Aviso Legal</u></p>
          <p>
            SU CORREO LO TENEMOS REGISTRADO DENTRO DE NUESTRA BASE DE
            DATOS COMO CORREO/CONTACTO CORPORATIVO (DATO PÚBLICO), POR LO TANTO,
            SI NO DESEA SEGUIR RECIBIENDO INFORMACIÓN DE NUESTRA EMPRESA, LE
            AGRADECEMOS NOS INFORME AL RESPECTO.</p> <p>El contenido de este mensaje de
            correo electrónico y todos los archivos adjuntos a éste contienen
            información de carácter confidencial y/o uso privativo de EL GRAN
            LANGOSTINO S.A.S y de sus destinatarios. Si usted recibió este mensaje
            por error, por favor elimínelo y comuníquese con el remitente para
            informarle de este hecho, absteniéndose de divulgar o hacer cualquier
            copia de la información ahí contenida, gracias. En caso contrario
            podrá ser objeto de sanciones legales conforme a la ley 1273 de 2009.
        </p>
        `,
      };
      const auto ={
        from: 'oficialdecumplimiento@granlangostino.com',
        to: body.correoEmisor, // Coloca la dirección de correo del destinatario
        subject: 'Certificado de retención por ICA - El Gran Langostino S.A.S.',
        text: `Cordial saludo ${body.nombreTercero},
              Su certificado de retención por ICA, se ha generado de manera exitosa, 
              lo podrá visualizar en la parte inferior de este correo.`,
        attachments: [
          {
            filename: 'certificado_retencion_ica.pdf', // Nombre del archivo adjunto en el correo
            path: 'uploads/html.pdf' // Ruta del archivo PDF que quieres enviar
          }
        ],
        html:`<p>Cordial saludo trabajador,</p>

        <p>Este correo es una copia del correo que se le envió a ${body.nombreTercero} con certificado de retención por ICA, Porfavor revise la información y si hay alguna inconsistenica comuniquese con su jefe de área
        o con el área de sistemas para brindarle una atención y solución.</p>`,
      }
      transporter.sendMail(message, (error, info) => {
        if (error) {
          return console.log('Error al enviar el correo al cliente:', error);
        }else{
          transporter.sendMail(auto, (error,info)=>{
            if (error) {
              return console.log('Error al enviar el correo al cliente:', error);
            }
            const rutaHTML = path.join('uploads/archivo.html');
            const rutaPDF = path.join('uploads/html.pdf');
            console.log('Correo electrónico enviado:', info.response);
            fsExtra.remove(rutaHTML)
            console.log('html borrado')
            fsExtra.remove(rutaPDF)
            console.log('pdf borrado')
          })

        }
        
      });
    });
  }catch (error){
    console.error(error)
    console.status(500,error)
  }
}

const certificadoRfte = async(body)=>{
  let ClaseConversor = conversor.conversorNumerosALetras;
  let miConversor = new ClaseConversor();
  const valor = body.retenidoFinal;
  const numeroNormal = valor.replace(/[,.']/g, "");
  var resultado = Math.floor(numeroNormal/100)
  var letras = miConversor.convertToText(resultado);
  try{
    function crearArchivoHTML() {
      const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <style>
          * {
          font-size: 8px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            height: auto;
          }
          thead {
            background-color: #d6d6d6;
            color: #000;
          }
          tbody {
            display: block;
            min-height: 100vh;
          }
          tr {
            display: table;
            width: 100%;
            table-layout: fixed;
  
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #888;
          }
        </style>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CERTIFICADO DE RETENCION EN LA FUENTE</title>
      </head>
      <body>
        <div
          style="
            font-family: Arial, Helvetica, sans-serif;
            padding: 1rem 2rem;
          "
        >
        <div style="width: 100%; display: flex;">
          <img style="width: 320px; height: 90px;" 
            src="https://sucursales.granlangostino.com/wp-content/uploads/2022/12/cropped-Logo-el-gran-langostino.png"
            alt="Logo de la empresa"
          />
          <br/><br/>
          <h2 style="font-size: 16px; font-weight: bolder; margin: 0">
            EL GRAN LANGOSTINO S.A.S.
          </h2>
          <h2 style="font-size: 14px; font-weight: bolder; margin: 0">Nit: 835.001.216-8</h2>
          <h2 style="font-size: 14px; font-weight: bolder; margin: 0">OFICINA PRINCIPAL
          <p style="margin: 0.3rem 0; font-size: 12px;">CL 13 # 32-417</p>
          <p style="margin: 0.3rem 0; font-size: 12px;">ACOPI - YUMBO</p>
        </div>
        <br/>
        <h1 style="text-align: center; font-size: 22px; font-weight: bold; margin:0 ;">CERTIFICADO DE RETENCION EN LA FUENTE</h1>
        <h3 style="text-align: center; font-size: 13px;  margin:0">Año 2023</h3>
        <br/>
          <hr style="width: 100%; border: 1.5px solid black;"/>
          <div style="width: 100%; font-size: 13px; margin-top: 10px;">
            <div style="position: relative; margin-bottom: 2rem;">
              <div style="position: relative; border: 1px solid black; border-radius: 5px; width: 55%; padding: 1rem;">
                <h3 style="background: #fff; font-size: 12px; position: absolute; top: -8px; left: 25px; margin: 0; padding: 0px 10px;">Razon Social a quien se le practicó la retención</h3>
                <div>
                  <p style="margin: 0; width: 100%; font-size: 12px"><strong style="margin-right: 0.5rem; font-size: 12px">${
                    body.nombreTercero
                  }</strong></p>
                </div>
                <div>
                  <p style="margin: 0; width: 100%; font-size: 12px"><strong style="margin-right: 0.5rem; font-size: 12px">Nit: </strong>${
                    body.cedula
                  }</p>
                </div>
                <div>
                  <p style="margin: 0; width: 100%; font-size: 12px"><strong style="margin-right: 0.5rem; font-size: 12px">Dirección: </strong>${
                    body.direccion
                  }</p>
                </div>
                <div>
                    <p style="margin: 0; width: 100%; font-size: 12px"><strong style="margin-right: 0.5rem; font-size: 12px">Ciudad: </strong>${
                      body.ciudad
                    }</p>
                </div>
              </div>
            </div>
            <div style="width: 100%;height: auto; border: 1px solid black;">
              <table style="width: 100%; height: auto;">
                <thead>
                  <tr>
                  <th style="width: 360px; font-size: 12px">CONCEPTO DEL PAGO SUJETO A RETENCION</th>
                  <th style="width: 60px; justify-content: center; text-align: center; font-size: 12px">TASA %</th>
                  <th style="justify-content: center; text-align: center; font-size: 12px">VALOR BASE</th>
                  <th style="justify-content: center; text-align: center; font-size: 12px">VALOR RETENIDO</th>
                  </tr>
                </thead>
                <tbody>
                  ${body.filtro.map((elem) => {
                    return `
                        <tr>
                          <td style="width: 360px; font-size: 12px">${elem.concepto}</td>
                          <td style="width: 60px; justify-content: center; text-align: center; font-size: 12px">${elem.tasa} %</td>
                          <td style="justify-content: center; text-align: center; font-size: 12px">$${elem.base}</td>
                          <td style="justify-content: center; text-align: center; font-size: 12px">$${elem.valorRetenido}</td>
                        </tr>
                        `;
                  })}
                </tbody>
                <tfoot>
                  <tr>
                  <td style="width: 360px; font-size: 12px"><strong style="font-size: 12px">TOTAL</strong></td>
                  <td style="width: 60px; justify-content: center; text-align: center; font-size: 12px">----------</td>
                  <td style="justify-content: center; text-align: center; font-size: 12px">$ ${body.baseFinal}</td>
                  <td style="justify-content: center; text-align: center; font-size: 12px">$ ${body.retenidoFinal}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <br/>
            <p style="margin: 0; width: 100%; font-size: 15px; "><strong style="margin-right: 0.5rem; font-size: 15px">VALOR RETENIDO: </strong>${
              letras.toUpperCase()
            } PESOS</p>
            <br/><br/><br/><br/>
              <h3 style="font-size: 15px">Este certificado se expide el: ${body.fechaFormateada}</h3>
          </div>
        </div>
      </body>
    </html>`;
    fs.writeFileSync('uploads/archivo.html',html);
    console.log('Archivo HTML creado con éxito.')
    }
    crearArchivoHTML();

    const htmlContent= fs.readFileSync('uploads/archivo.html', 'utf-8');
    const options = {
      format: 'A4', // Tamaño del papel
      orientation: 'portrait', // Orientación del papel (portrait o landscape)
    }; 
     pdf.create(htmlContent, options).toFile('uploads/html.pdf', function (err, res) {
      if (err) return console.log(err);
      console.log(`PDF generado en: ${res.filename}`);
      // Configura el transporte del correo electrónico
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'oficialdecumplimiento@granlangostino.com',
            pass: 'Ofici4l@2024'
          }
      });
      const message = {
        from: 'oficialdecumplimiento@granlangostino.com',
        to: body.correoEnvio, // Coloca la dirección de correo del destinatario
        subject: 'Certificado de retención en la fuente - El Gran Langostino S.A.S.',
        text: `Cordial saludo ${body.nombreTercero},
              Su certificado de retención en la fuente, se ha generado de manera exitosa, 
              lo podrá visualizar en la parte inferior de este correo.`,
        attachments: [
          {
            filename: 'certificado_retencion_enla_fuente.pdf', // Nombre del archivo adjunto en el correo
            path: 'uploads/html.pdf' // Ruta del archivo PDF que quieres enviar
          }
        ],
        html:`<p>Yumbo, ${body.fechaFormateada}.</p>
        <p>Señores</p>
        <p>${body.nombreTercero}</p>
        <br/>
        <p>Cordial saludo </p>
        <p>Adjunto estamos remitiendo el CERTIFICADO DE RETENCIÓN EN LA FUENTE del año agravable 2023.</p>
        <br/>
        <p>Cualquier duda o información adicional, por favor responder a:</p>
        <p>${body.usuarioEmisor}</p>
        <p>${body.correoEmisor}</h6>
        <p>Tels. 695 46 78 Ext. 104</p>
        <br/><br/>
        <p><u>Aviso Legal</u></p>
          <p>
            SU CORREO LO TENEMOS REGISTRADO DENTRO DE NUESTRA BASE DE
            DATOS COMO CORREO/CONTACTO CORPORATIVO (DATO PÚBLICO), POR LO TANTO,
            SI NO DESEA SEGUIR RECIBIENDO INFORMACIÓN DE NUESTRA EMPRESA, LE
            AGRADECEMOS NOS INFORME AL RESPECTO.</p> <p>El contenido de este mensaje de
            correo electrónico y todos los archivos adjuntos a éste contienen
            información de carácter confidencial y/o uso privativo de EL GRAN
            LANGOSTINO S.A.S y de sus destinatarios. Si usted recibió este mensaje
            por error, por favor elimínelo y comuníquese con el remitente para
            informarle de este hecho, absteniéndose de divulgar o hacer cualquier
            copia de la información ahí contenida, gracias. En caso contrario
            podrá ser objeto de sanciones legales conforme a la ley 1273 de 2009.
        </p>`,
      };
      const auto ={
        from: 'oficialdecumplimiento@granlangostino.com',
        to: body.correoEmisor, // Coloca la dirección de correo del destinatario
        subject: 'Certificado de  retención en la fuente - El Gran Langostino S.A.S.',
        text: `Cordial saludo ${body.nombreTercero},
              Su certificado de retención en la fuente, se ha generado de manera exitosa, 
              lo podrá visualizar en la parte inferior de este correo.`,
        attachments: [
          {
            filename: 'certificado_retencion_enla_fuente.pdf', // Nombre del archivo adjunto en el correo
            path: 'uploads/html.pdf' // Ruta del archivo PDF que quieres enviar
          }
        ],
        html:`<p>Cordial saludo trabajador,</p>

        <p>Este correo es una copia del correo que se le envió a ${body.nombreTercero} con certificado 
        de retención en la fuente, Porfavor revise la información y si hay alguna inconsistenica comuniquese con su jefe de área
        o con el área de sistemas para brindarle una atención y solución.</p>`,
      }
      transporter.sendMail(message, (error, info) => {
        if (error) {
          return console.log('Error al enviar el correo al cliente:', error);
        }else{
          transporter.sendMail(auto, (error,info)=>{
            if (error) {
              return console.log('Error al enviar el correo al cliente:', error);
            }
            const rutaHTML = path.join('uploads/archivo.html');
            const rutaPDF = path.join('uploads/html.pdf');
            console.log('Correo electrónico enviado:', info.response);
            fsExtra.remove(rutaHTML)
            console.log('html borrado')
            fsExtra.remove(rutaPDF)
            console.log('pdf borrado')
          })
        }
      });
    });
  }catch (error){
    console.error(error)
    console.status(500,error)
  }
}

const sendCertificadoIva = async (body)=>{
  let ClaseConversor = conversor.conversorNumerosALetras;
  let miConversor = new ClaseConversor();
  const valor = body.retenidoFinal;
  const numeroNormal = valor.replace(/[,.']/g, "");
  var resultado = Math.floor(numeroNormal/100)
  var letras = miConversor.convertToText(resultado);
  try{
    function crearArchivoHTML() {
      const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <style>
          * {
          font-size: 8px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            height: auto;
          }
          thead {
            background-color: #d6d6d6;
            color: #000;
          }
          tbody {
            display: block;
            min-height: 100vh;
          }
          tr {
            display: table;
            width: 100%;
            table-layout: fixed;
  
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
        </style>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CERTIFICADO DE RETENCION POR IVA</title>
      </head>
      <body>
        <div
          style="
            font-family: Arial, Helvetica, sans-serif;
            padding: 1rem 2rem;
          "
        >
        <div style="width: 100%; display: flex;">
          <img style="width: 320px; height: 90px;" 
            src="https://sucursales.granlangostino.com/wp-content/uploads/2022/12/cropped-Logo-el-gran-langostino.png"
            alt="Logo de la empresa"
          />
          <br/><br/>
          <h2 style="font-size: 16px; font-weight: bolder; margin: 0">
            EL GRAN LANGOSTINO S.A.S.
          </h2>
          <h2 style="font-size: 14px; font-weight: bolder; margin: 0">Nit: 835.001.216-8</h2>
          <h2 style="font-size: 14px; font-weight: bolder; margin: 0">OFICINA PRINCIPAL
          <p style="margin: 0.3rem 0; font-size: 12px;">CL 13 # 32-417</p>
          <p style="margin: 0.3rem 0; font-size: 12px;">ACOPI - YUMBO</p>
        </div>
        <br/>
        <h1 style="text-align: center; font-size: 22px; font-weight: bold; margin:0 ;">CERTIFICADO DE RETENCION POR IVA</h1>
        <h3 style="text-align: center; font-size: 13px;  margin:0">Año 2023</h3>
        <br/>
          <hr style="width: 100%; border: 1.5px solid black;"/>
          <div style="width: 100%; font-size: 13px; margin-top: 10px;">
            <div style="position: relative; margin-bottom: 2rem;">
              <div style="position: relative; border: 1px solid black; border-radius: 5px; width: 55%; padding: 1rem;">
                <h3 style="background: #fff; font-size: 12px; position: absolute; top: -8px; left: 25px; margin: 0; padding: 0px 10px;">Razon Social a quien se le practicó la retención</h3>
                <div>
                  <p style="margin: 0; width: 100%; font-size: 12px"><strong style="margin-right: 0.5rem; font-size: 12px">${
                    body.nombreTercero
                  }</strong></p>
                </div>
                <div>
                  <p style="margin: 0; width: 100%; font-size: 12px"><strong style="margin-right: 0.5rem; font-size: 12px">Nit: </strong>${
                    body.cedula
                  }</p>
                </div>
                <div>
                  <p style="margin: 0; width: 100%; font-size: 12px"><strong style="margin-right: 0.5rem; font-size: 12px">Dirección: </strong>${
                    body.direccion
                  }</p>
                </div>
                <div>
                    <p style="margin: 0; width: 100%; font-size: 12px"><strong style="margin-right: 0.5rem; font-size: 12px">Ciudad: </strong>${
                      body.ciudad
                    }</p>
                </div>
              </div>
            </div>
            <div style="width: 100%;height: auto; border: 1px solid black;">
              <table style="width: 100%; height: auto;">
                <thead>
                  <tr>
                  <th style="width: 360px; font-size: 12px">CONCEPTO DEL PAGO SUJETO A RETENCION</th>
                  <th style="width: 60px; justify-content: center; text-align: center; font-size: 12px">TASA %</th>
                  <th style="justify-content: center; text-align: center; font-size: 12px">VALOR BASE</th>
                  <th style="justify-content: center; text-align: center; font-size: 12px">VALOR RETENIDO</th>
                  </tr>
                </thead>
                <tbody>
                  ${body.filtro.map((elem) => {
                    return `
                        <tr>
                          <td style="width: 360px; font-size: 12px">${elem.concepto}</td>
                          <td style="width: 60px; justify-content: center; text-align: center; font-size: 12px">${elem.tasa} %</td>
                          <td style="justify-content: center; text-align: center; font-size: 12px">$${elem.base}</td>
                          <td style="justify-content: center; text-align: center; font-size: 12px">$${elem.valorRetenido}</td>
                        </tr>
                        `;
                  })}
                </tbody>
                <tfoot>
                  <tr>
                  <td style="width: 360px; font-size: 12px"><strong style="font-size: 12px">TOTAL</strong></td>
                  <td style="width: 60px; justify-content: center; text-align: center; font-size: 12px">----------</td>
                  <td style="justify-content: center; text-align: center; font-size: 12px">$ ${body.baseFinal}</td>
                  <td style="justify-content: center; text-align: center; font-size: 12px">$ ${body.retenidoFinal}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <br/>
            <p style="margin: 0; width: 100%; font-size: 15px; "><strong style="margin-right: 0.5rem; font-size: 15px">VALOR RETENIDO: </strong>${
              letras.toUpperCase()
            } PESOS</p>
            <br/><br/><br/><br/>
              <h3 style="font-size: 15px">Este certificado se expide el: ${body.fechaFormateada}</h3>
          </div>
        </div>
      </body>
    </html>`;
    fs.writeFileSync('uploads/archivo.html',html);
    console.log('Archivo HTML creado con éxito.')
    }
    crearArchivoHTML();
    const htmlContent= fs.readFileSync('uploads/archivo.html', 'utf-8');
    const options = {
      format: 'A4', // Tamaño del papel
      orientation: 'portrait', // Orientación del papel (portrait o landscape)
    }; 
     pdf.create(htmlContent, options).toFile('uploads/html.pdf', function (err, res) {
      if (err) return console.log(err);
      console.log(`PDF generado en: ${res.filename}`);
      // Configura el transporte del correo electrónico
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'oficialdecumplimiento@granlangostino.com',
            pass: 'Ofici4l@2024'
          }
      });
      const message = {
        from: 'oficialdecumplimiento@granlangostino.com',
        to: body.correoEnvio, // Coloca la dirección de correo del destinatario
        subject: 'Certificado de retención por IVA - El Gran Langostino S.A.S.',
        text: `Cordial saludo ${body.nombreTercero},
              Su certificado de retención por IVA, se ha generado de manera exitosa, 
              lo podrá visualizar en la parte inferior de este correo.`,
        attachments: [
          {
            filename: 'certificado_retencion_iva.pdf', // Nombre del archivo adjunto en el correo
            path: 'uploads/html.pdf' // Ruta del archivo PDF que quieres enviar
          }
        ],
        html:`<p>Yumbo, ${body.fechaFormateada}.</p>
        <p>Señores</p>
        <p>${body.nombreTercero}</p>
        <br/>
        <p>Cordial saludo </p>
        <p>Adjunto estamos remitiendo el CERTIFICADO DE RETENCIÓN POR IVA del año agravable 2023.</p>
        <br/>
        <p>Cualquier duda o información adicional, por favor responder a:</p>
        <p>${body.usuarioEmisor}</p>
        <p>${body.correoEmisor}</h6>
        <p>Tels. 695 46 78 Ext. 104</p>
        <br/><br/>
        <p><u>Aviso Legal</u></p>
          <p>
            SU CORREO LO TENEMOS REGISTRADO DENTRO DE NUESTRA BASE DE
            DATOS COMO CORREO/CONTACTO CORPORATIVO (DATO PÚBLICO), POR LO TANTO,
            SI NO DESEA SEGUIR RECIBIENDO INFORMACIÓN DE NUESTRA EMPRESA, LE
            AGRADECEMOS NOS INFORME AL RESPECTO.</p> <p>El contenido de este mensaje de
            correo electrónico y todos los archivos adjuntos a éste contienen
            información de carácter confidencial y/o uso privativo de EL GRAN
            LANGOSTINO S.A.S y de sus destinatarios. Si usted recibió este mensaje
            por error, por favor elimínelo y comuníquese con el remitente para
            informarle de este hecho, absteniéndose de divulgar o hacer cualquier
            copia de la información ahí contenida, gracias. En caso contrario
            podrá ser objeto de sanciones legales conforme a la ley 1273 de 2009.
        </p>`,
      };
      const auto ={
        from: 'oficialdecumplimiento@granlangostino.com',
        to: body.correoEmisor, // Coloca la dirección de correo del destinatario
        subject: 'Certificado de  retención por IVA - El Gran Langostino S.A.S.',
        text: `Cordial saludo ${body.nombreTercero},
              Su certificado de retención por IVA, se ha generado de manera exitosa, 
              lo podrá visualizar en la parte inferior de este correo.`,
        attachments: [
          {
            filename: 'certificado_retencion_por_iva.pdf', // Nombre del archivo adjunto en el correo
            path: 'uploads/html.pdf' // Ruta del archivo PDF que quieres enviar
          }
        ],
        html:`<p>Cordial saludo trabajador,</p>

        <p>Este correo es una copia del correo que se le envió a ${body.nombreTercero} con certificado 
        de retención por IVA, Porfavor revise la información y si hay alguna inconsistenica comuniquese con su jefe de área
        o con el área de sistemas para brindarle una atención y solución.</p>`,
      }
      transporter.sendMail(message, (error, info) => {
        if (error) {
          return console.log('Error al enviar el correo al cliente:', error);
        }else{
          transporter.sendMail(auto, (error,info)=>{
            if (error) {
              return console.log('Error al enviar el correo al cliente:', error);
            }
            const rutaHTML = path.join('uploads/archivo.html');
            const rutaPDF = path.join('uploads/html.pdf');
            console.log('Correo electrónico enviado:', info.response);
            fsExtra.remove(rutaHTML)
            console.log('html borrado')
            fsExtra.remove(rutaPDF)
            console.log('pdf borrado')
          })
        }
      });
    });
}catch(error){
  console.error(error)
  console.status(500,error)
}
}

module.exports = {
  find,
  findOne,
  findByTercero,
  findAll,
  /* findByName, */
  create,
  update,
  sendCertificado,
  sendCertificadoIva,
  certificadoRfte
}