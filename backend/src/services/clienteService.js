const { models } = require("../libs/sequelize");

const find=()=>{
    const Clientes = models.Clientes.findAll()
    return Clientes
};

const create = async(body)=>{
    const newCliente = await models.Clientes.create(body)
    return newCliente    
}

const findOne = async (id) => {
    const Cliente = await models.Clientes.findByPk(id)
  
    if(!Cliente) throw boom.notFound('Tercero no encontrado')
  
    return Cliente
}

module.exports={
    find,
    create,
    findOne
}