const { models } = require('../libs/sequelize')

const find = () => {
  const ciudades = models.ciudades.findAll()
  return ciudades
}

const findByCodigo = async (city)=>{
  const ciudad = models.ciudades.findOne({
    where : {codigo:city}
  })
  if(!ciudad) throw boom.notFound('ciudad no encontrada')
  
  return ciudad
}

module.exports = {
  find,
  findByCodigo
}