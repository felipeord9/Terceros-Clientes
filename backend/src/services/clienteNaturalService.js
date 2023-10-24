const { models } = require("../libs/sequelize");

const find=()=>{
    const ClientesNaturales = models.ClienteNatural.findAll()
    return ClientesNaturales
};

const create = async(body)=>{
    const newClienteNatural = await models.ClienteNatural.create(body)
    return newClienteNatural
}

const findOne = async (id) => {
    const ClienteNatural = await models.ClienteNatural.findByPk(id)
  
    if(!ClienteNatural) throw boom.notFound('Tercero no encontrado')
  
    return ClienteNatural
}

module.exports={
    find,
    create,
    findOne
}