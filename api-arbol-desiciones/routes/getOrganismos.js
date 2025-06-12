// routes/getOrganismos.js
const fs = require("fs");
const path = require("path");

const obtenerOrganismos = async (tipo) => {
  const filePath = path.join(__dirname, `../data/${tipo.toLowerCase()}.json`);
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf8");
  const organismos = JSON.parse(data);
  return organismos.map(org => `${org.nombre} | ${org.tamaño_genoma ?? "Desconocido"} bp`);
};

module.exports = obtenerOrganismos;
