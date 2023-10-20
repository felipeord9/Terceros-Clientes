const { config } = require('../config')

const url = `${config.apiUrl2}/ciudades`;

function getAllCiudades() {
  return fetch(url)
    .then(res => res.json())
    .then(res => res.data)
}

export {
  getAllCiudades
}