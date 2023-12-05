const { models } = require("../libs/sequelize");

const find=()=>{
    const Proveedores = models.Proveedores.findAll()
    return Proveedores
};

const create = async(body)=>{
    const newProveedor = await models.Proveedores.create(body)
    return newProveedor    
}

const findOne = async (id) => {
    const Proveedor = await models.Proveedores.findByPk(id)
  
    if(!Proveedor) throw boom.notFound('Tercero no encontrado')
  
    return Proveedor
}

const validarProveedor = async (cedula)=>{
    const Proveedor = await models.Proveedores.findOne({
        where:{cedula:cedula}
    })
    if(!Proveedor) throw boom.notFound('Proveedor no encontrado')
    return Proveedor
}

const remove = async(id)=>{
    const proveedor = findOne(id)
    ;(await proveedor).destroy(id)
}

module.exports={
    find,
    create,
    findOne,
    remove,
    validarProveedor,
}