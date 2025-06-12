const obtenerOrganismos = require("../routes/getOrganismos");
const pcr2 = require("./pcr2");
const pcr1 = require("./pcr1");


const ruta_genomica_metagenomica = {
    "pregunta": "Tipo de biblioteca",
    "opciones": ["DNA Genómico", "Amplicon"],
    "siguientes_pasos": {
        "DNA Genómico": {
            "pregunta": "Tipo de secuenciación",
            "opciones": ["Resecuenciación", "Secuenciación de Novo"],
            "siguientes_pasos": {
                "Resecuenciación": {
                    "pregunta": "Tipo de organismo",
                    "opciones": ["Eucariote", "Procariote", "Virus"],
                    "siguientes_pasos": {
                        "Eucariote": async () => ({
                            "pregunta": "Nombre del organismo",
                            "opciones": await obtenerOrganismos("Eucariote")
                            
                            
                        }),
                        "Procariote": async () => ({
                            "pregunta": "Nombre del organismo",
                            "opciones": await obtenerOrganismos("Procariote")
                        }),
                        "Virus": async () => ({
                            "pregunta": "Nombre del organismo",
                            "opciones": await obtenerOrganismos("Virus")
                        })
                    }
                },
                "Secuenciación de Novo": {
                    "pregunta": "¿Conoces el organismo?",
                    "opciones": ["Sí", "No"],
                    "siguientes_pasos": {
                        "Sí": {
                            "pregunta": "Tipo de organismo",
                            "opciones": ["Eucariote", "Procariote", "Virus"],
                            "siguientes_pasos": {
                                "Eucariote": async () => ({
                                    "pregunta": "Nombre del organismo",
                                    "opciones": await obtenerOrganismos("Eucariote")
                                }),
                                "Procariote": async () => ({
                                    "pregunta": "Nombre del organismo",
                                    "opciones": await obtenerOrganismos("Procariote")
                                }),
                                "Virus": async () => ({
                                    "pregunta": "Nombre del organismo",
                                    "opciones": await obtenerOrganismos("Virus")
                                })
                            }
                        },
                        "No": {
                            "pregunta": "Tamaño aproximado del organismo",
                            "opciones": ["Número Float"]
                        }
                    }
                }
            }
        },

        "Amplicon": {
            "pregunta": "Tiene PCR1",
            "opciones": ["Sí", "No"],
            "siguientes_pasos": {
                "Sí": {
                    "pregunta": "Cuenta con secuencia:",
                    "opciones": ["Illumina", "Nanopore"],
                    "siguientes_pasos": {
                        "Illumina": pcr2,
                        "Nanopore": pcr2
                    }
                },
                "No": pcr1
            }
        }
    }
};

module.exports = ruta_genomica_metagenomica;