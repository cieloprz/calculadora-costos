const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.get("/genoma/:nombreOrganismo", async (req, res) => {
    const { nombreOrganismo } = req.params;
    const url = `https://api.ncbi.nlm.nih.gov/genome/v1/genomes?name=${encodeURIComponent(nombreOrganismo)}`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (datos && datos.genomes.length > 0) {
            const organismos = datos.genomes.map(org => ({
                nombre: org.organism_name,
                tamañoGenoma: org.genome_size_mb + " Mb"
            }));
            res.json({ organismos });
        } else {
            res.status(404).json({ mensaje: "No se encontraron organismos con ese nombre." });
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar el organismo.", error });
    }
});

module.exports = router;