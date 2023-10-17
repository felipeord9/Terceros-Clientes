const { config } = require('../config')

const url = `${config.apiUrl2}/clasificaciones`;

function getAllClasificaciones() {
  return fetch(url)
    .then(res => res.json())
    .then(res => res.data)
}

export {
  getAllClasificaciones
}