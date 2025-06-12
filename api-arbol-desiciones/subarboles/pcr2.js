const secuencia = require("./secuencia");

module.exports = {
  pregunta: "PCR2: Tipo de amplicon",
  opciones: ["12S", "16S", "COI", "ITS", "TRNA-LEV", "18S", "28S"],
  siguientes_pasos: {
    "12S": secuencia,
    "16S": secuencia,
    "COI": secuencia,
    "ITS": secuencia,
    "TRNA-LEV": secuencia,
    "18S": secuencia,
    "28S": secuencia
  }
};

