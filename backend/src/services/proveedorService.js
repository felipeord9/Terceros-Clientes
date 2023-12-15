const { models } = require("../libs/sequelize");

const find=()=>{
    const Proveedores = models.Proveedores.findAll()
    return Proveedores
};
const findOne = async (id) => {
    const Proveedor = await models.Proveedores.findByPk(id)
  
    if(!Proveedor) throw boom.notFound('Tercero no encontrado')
  
    return Proveedor
}
const findByCedula = async (cedula) => {
    const proveedor = await models.Proveedores.findOne({
     where: {cedula }
  })
  
    if(!proveedor) throw boom.notFound('Proveedor no encontrado')
  
    return proveedor
  }

const create = async(body)=>{
    const newProveedor = await models.Proveedores.create(body)
    return newProveedor    
}

const update = async (id, changes) => {
    const proveedor = await findOne(id)
    const updatedProveedor = await proveedor.update(changes)
  
    return updatedProveedor
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

const removeByCedula = async(cedula)=>{
    const proveedor = await findByCedula(cedula)
    await proveedor.destroy(cedula)
    return cedula
}

module.exports={
    find,
    create,
    findOne,
    remove,
    validarProveedor,
    update,
    removeByCedula,
    findByCedula,
}