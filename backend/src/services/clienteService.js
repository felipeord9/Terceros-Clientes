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

const validarCliente = async (cedula)=>{
    const cliente = await models.Clientes.findOne({
        where:{cedula:cedula}
    })
    if(!cliente) throw boom.notFound('Cliente no encontrado')
    return cliente
}

const remove = async(id)=>{
    const cliente = findOne(id)
    ;(await cliente).destroy(id)

    /* const cliente = findOne(id)
    cliente.destroy(id)
    return id */

/*     models.Clientes.sequelize.query(`ALTER SEQUENCE clientes_id_seq RESTART WITH ${id};`)
 */    /* models.Clientes.destroy(id)
    models.Clientes.sequelize.query(`DELETE FROM clientes_id WHERE ${cliente.id}`) */
}

module.exports={
    find,
    create,
    findOne,
    remove,
    validarCliente
}