const ClienteNaturalService = require('../services/clienteNaturalService')

const findAllClientesNaturales = async(req,res,next)=>{
    try{
        const data=await ClienteNaturalService.find()

        res.status(200).json({
            message:'OK',
            data
        })
    } catch(error){
        console.log(error)
        next(error)
    }
}

const createClienteNatural = async (req,res,next)=>{
    try{
        const {body}=req
        console.log(body)
        const data = await ClienteNaturalService.create({
            tipoPersona: body.tipoPersona,
            tipoPago: body.tipoPago,
            clasificacionDescription: body.clasficacion,
            agenciaDescription: body.agency,
            solicitante: body.solicitante,
            clienteNombre: body.clienteNombre,
            tipoDocumento: body.tipoDocumento,
            numeroIdentificacion: body.numeroIdentificacion,
            direccion: body.direccion,
            departamento: body.departamento,
            ciudad: body.ciudad,
            celular: body.celular,
            telefono: body.telefono,
            createdAt: body.createdAt,
            correoContacto: body.correoContacto,
            correoFactura: body.correoFactura,
            observations: body.observations,
            userName: body.createdBy,
        })
        res.status(201).json({
            message:'Created',
            data
        })
    }
    catch(error){
        console.log(error)
        next(error)
    }
}

const findOneClienteNatural = async (req, res, next) => {
    try {
      const { params: { id } } = req;
      const data = await ClienteNaturalService.findOne(id);
  
      res.status(200).json({
        message: 'OK',
        data
      })
    } catch (error) {
      next(error)
    }
  };

module.exports = {
    findAllClientesNaturales,
    createClienteNatural,
    findOneClienteNatural
}