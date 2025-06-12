const secuencia = require("./secuencia");

const opcionesAmplicon = ["12S", "16S", "COI", "ITS", "TRNA-LEV", "18S", "28S"];

const generarPasoPCR2 = {
  pregunta: "PCR2: Tipo de amplicon",
  opciones: opcionesAmplicon,
  siguientes_pasos: opcionesAmplicon.reduce((acc, tipo) => {
    acc[tipo] = secuencia;
    return acc;
  }, {})
};

module.exports = {
  pregunta: "PCR1: Tipo de amplicon",
  opciones: opcionesAmplicon,
  siguientes_pasos: opcionesAmplicon.reduce((acc, tipo) => {
    acc[tipo] = generarPasoPCR2;
    return acc;
  }, {})
};
