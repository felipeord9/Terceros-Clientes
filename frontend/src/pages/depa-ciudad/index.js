import { useState, useEffect } from "react";
const paisesData = [
  {
    nombre: "Argentina",
    ciudad:  ["Buenos Aires", "Mar del Plata"]
  },
  {
    nombre: "Mexico",
    ciudad: ["Ciudad de México"]
  },
  {
    nombre: "Francia",
    ciudad: ["Paris"]
  }
];

export default function DepaCiudad() {
  const [data, setData] = useState([]),
    [pais, setPais] = useState(""),
    [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    // captura de datos de la db o local
    setData(paisesData);
  }, []);

  useEffect(() => {
    data.forEach((data) => {
      if (data.nombre === pais) {
        setCiudades(data.ciudad);
      }
    });
  }, [pais]);

  return (
    <>
      <select defaultValue="" onChange={(event) => setPais(event.target.value)}>
        <option disabled value="">
          --Seleccione un pais--
        </option>
        {data.map((data) => {
          return (
            <option key={data.nombre} value={data.nombre}>
              {data.nombre ? data.nombre : null}
            </option>
          );
        })}
      </select>
      <select>
        <option>--Seleccione una ciudad--</option>
        {ciudades.length &&
          ciudades.map((nombre, key) => {
            return (
              <option key={key} value={nombre}>
                {nombre}
              </option>
            );
          })}
      </select>
    </>
  );
}