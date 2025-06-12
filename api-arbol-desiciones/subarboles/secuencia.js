module.exports = {
    "pregunta": "Tipo de secuenciación",
    "opciones": ["Resecuenciación", "Secuenciación de Novo"],
    "siguientes_pasos": {
        "Resecuenciación": {
            "pregunta": "Tipo de organismo",
            "opciones": ["Eucariote", "Procariote", "Virus"],
            "siguientes_pasos": {
                "Eucariote": {
                    "pregunta": "Nombre del organismo",
                    "busqueda_api": true // Indica que se debe hacer búsqueda en NCBI
                },
                "Procariote": {
                    "pregunta": "Nombre del organismo",
                    "busqueda_api": true
                },
                "Virus": {
                    "pregunta": "Nombre del organismo",
                    "busqueda_api": true
                }
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
                        "Eucariote": { "pregunta": "Nombre del organismo", "busqueda_api": true },
                        "Procariote": { "pregunta": "Nombre del organismo", "busqueda_api": true },
                        "Virus": { "pregunta": "Nombre del organismo", "busqueda_api": true }
                    }
                },
                "No": { "pregunta": "Tamaño aproximado del organismo", "opciones": ["Número Float"] }
            }
        }
    }
};