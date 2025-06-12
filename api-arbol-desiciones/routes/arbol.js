const express = require("express");
const router = express.Router();

const ruta_genomica_metagenomica = require("../subarboles/rutaGenomicaMetagenomica");
const { pregunta, siguientes_pasos } = require("..");

const arbolDecisiones = {
    "inicio": {
        "pregunta": "Tipo de material genético",
        "opciones": ["ADN", "ARN"],
        "siguientes_pasos": {
            "ADN": {
                "pregunta": "¿Requiere extracción de ADN?",
                "opciones": ["Sí", "No"],
                "siguientes_pasos": {
                    "Sí": {
                        "costo_extraccion": "valor",
                        "pregunta": "¿Requiere análisis de calidad?",
                        "opciones": ["Sí", "No"],
                        "siguientes_pasos": {
                            "Sí": {
                                "costo_analisis_calidad": "valor"
                            }
                        }
                    }
                },
                "pregunta": "Tipo de aplicación",
                "opciones": ["CHIP SEC", "GENOMICA", "METAGENOMICA"],
                "siguientes_pasos": {
                    "CHIP SEC": {
                        "pregunta": "Tipo de biblioteca",
                        "opciones": ["DNA Genómico"],
                        "siguientes_pasos": {
                            "DNA Genómico": {
                                "pregunta": "Tipo de secuenciación",
                                "opciones": ["Resecuenciación", "Secuenciación de Novo"],
                                "siguientes_pasos": {
                                    "Resecuenciación": {
                                        "pregunta": "Tipo de organismo",
                                        "opciones": ["Eucariote", "Procariote"],
                                        "siguientes_pasos": {
                                            "Eucariote": {
                                                "pregunta": "Plataforma",
                                                "opciones": ["Illumina"],
                                                "siguientes_pasos": {
                                                    "Illumina": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["NEXT SEQ 500"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    }
                                                }
                                            },
                                            "Procariote": {
                                                "pregunta": "Plataforma",
                                                "opciones": ["Illumina"],
                                                "siguientes_pasos": {
                                                    "Illumina": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["NEXT SEQ 500"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "Secuenciación de Novo": {
                                        "pregunta": "¿Conoces el organismo?",
                                        "opciones": ["Sí", "No"],
                                        "siguientes_pasos": {
                                            "Sí": {
                                                "pregunta": "Tipo de organismo",
                                                "opciones": ["Eucariote", "Procariote"],
                                                "siguientes_pasos": {
                                                    "Eucariote": {
                                                        "pregunta": "Plataforma",
                                                        "opciones": ["Illumina"],
                                                        "siguientes_pasos": {
                                                            "Illumina": {
                                                                "pregunta": "Opción",
                                                                "opciones": ["NEXT SEQ 500"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                },
                                                            }
                                                        }
                                                    },
                                                    "Procariote": {
                                                        "pregunta": "Plataforma",
                                                        "opciones": ["Illumina"],
                                                        "siguientes_pasos": {
                                                            "Illumina": {
                                                                "pregunta": "Opción",
                                                                "opciones": ["NEXT SEQ 500"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                },
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            "No": {
                                                "pregunta": "Plataforma",
                                                "opciones": ["Illumina"],
                                                "siguientes_pasos": {
                                                    "Illumina": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["NEXT SEQ 500"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "GENOMICA": {
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
                                            "Eucariote": {
                                                "pregunta": "Plataforma",
                                                "opciones": ["Illumina", "Nanopore"],
                                                "siguientes_pasos": {
                                                    "Illumina": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["NEXT SEQ 500", "ISEQ", "NEXT SEQ 1000/2000", "NOVASEQ X+"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    },
                                                    "Nanopore": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["MINION"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    }
                                                }
                                            },
                                            "Procariote": {
                                                "pregunta": "Plataforma",
                                                "opciones": ["Illumina", "Nanopore"],
                                                "siguientes_pasos": {
                                                    "Illumina": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["NEXT SEQ 500", "ISEQ", "NEXT SEQ 1000/2000", "NOVASEQ X+"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    },
                                                    "Nanopore": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["MINION"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    }
                                                }
                                            },
                                            "Virus": {
                                                "pregunta": "Plataforma",
                                                "opciones": ["Illumina", "Nanopore"],
                                                "siguientes_pasos": {
                                                    "Illumina": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["NEXT SEQ 500", "ISEQ", "NEXT SEQ 1000/2000", "NOVASEQ X+"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    },
                                                    "Nanopore": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["MINION"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    }
                                                }
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
                                                    "Eucariote": {
                                                        "pregunta": "Plataforma",
                                                        "opciones": ["Illumina", "Nanopore"],
                                                        "siguientes_pasos": {
                                                            "Illumina": {
                                                                "pregunta": "Opción",
                                                                "opciones": ["NEXT SEQ 500", "ISEQ", "NEXT SEQ 1000/2000", "NOVASEQ X+"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                },
                                                            },
                                                            "Nanopore": {
                                                                "pregunta": "Opción",
                                                                "opciones": ["MINION"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                },
                                                            }
                                                        }
                                                    },
                                                    "Procariote": {
                                                        "pregunta": "Plataforma",
                                                        "opciones": ["Illumina", "Nanopore"],
                                                        "siguientes_pasos": {
                                                            "Illumina": {
                                                                "pregunta": "Opción",
                                                                "opciones": ["NEXT SEQ 500", "ISEQ", "NEXT SEQ 1000/2000", "NOVASEQ X+"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                },
                                                            },
                                                            "Nanopore": {
                                                                "pregunta": "Opción",
                                                                "opciones": ["MINION"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                },
                                                            }
                                                        }
                                                    },
                                                    "Virus": {
                                                        "pregunta": "Plataforma",
                                                        "opciones": ["Illumina", "Nanopore"],
                                                        "siguientes_pasos": {
                                                            "Illumina": {
                                                                "pregunta": "Opción",
                                                                "opciones": ["NEXT SEQ 500", "ISEQ", "NEXT SEQ 1000/2000", "NOVASEQ X+"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                },
                                                            },
                                                            "Nanopore": {
                                                                "pregunta": "Opción",
                                                                "opciones": ["MINION"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                },
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            "No": {
                                                "pregunta": "Plataforma",
                                                "opciones": ["Illumina", "Nanopore"],
                                                "siguientes_pasos": {
                                                    "Illumina": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["NEXT SEQ 500", "ISEQ", "NEXT SEQ 1000/2000", "NOVASEQ X+"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    },
                                                    "Nanopore": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["MINION"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    }
                                                }
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
                                            "Illumina": {
                                                "pregunta": "Tipo de amplicon PCR2",
                                                "opciones": ["12S", "16S", "COI", "ITS", "TRNA-LEV", "18S", "28S"],
                                                "siguientes_pasos": {
                                                    "pregunta": "Tipo de secuenciación",
                                                    "opciones": ["Resequenciación", "Secuenciación de Novo"],
                                                    "siguientes_pasos": {
                                                        "Resequenciación": {
                                                            "pregunta": "Tipo de organismo",
                                                            "opciones": ["Eucariote", "Procariote", "Virus"],
                                                            "siguientes_pasos": {
                                                                "Eucariote": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
                                                                },
                                                                "Procariote": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
                                                                },
                                                                "Virus": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
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
                                                                        "Eucariote": {
                                                                            "pregunta": "Plataforma",
                                                                            "opciones": ["Illumina", "Nanopore"],
                                                                            "siguientes_pasos": {
                                                                                "costo_secuenciacion": "valor",
                                                                                "costo_limpieza": "valor",
                                                                                "costo_analisis_bioinformatico": "valor"
                                                                            }
                                                                        },
                                                                        "Procariote": {
                                                                            "pregunta": "Plataforma",
                                                                            "opciones": ["Illumina", "Nanopore"],
                                                                            "siguientes_pasos": {
                                                                                "costo_secuenciacion": "valor",
                                                                                "costo_limpieza": "valor",
                                                                                "costo_analisis_bioinformatico": "valor"
                                                                            }
                                                                        },
                                                                        "Virus": {
                                                                            "pregunta": "Plataforma",
                                                                            "opciones": ["Illumina", "Nanopore"],
                                                                            "siguientes_pasos": {
                                                                                "costo_secuenciacion": "valor",
                                                                                "costo_limpieza": "valor",
                                                                                "costo_analisis_bioinformatico": "valor"
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                "No": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
                                                                }
                                                            }
                                                        }

                                                    }
                                                }
                                            },
                                            "Nanopore": {
                                                "pregunta": "Tipo de amplicon PCR2",
                                                "opciones": ["12S", "16S", "COI", "ITS", "TRNA-LEV", "18S", "28S"],
                                                "siguientes_pasos": {
                                                    "pregunta": "Tipo de secuenciación",
                                                    "opciones": ["Resequenciación", "Secuenciación de Novo"],
                                                    "siguientes_pasos": {
                                                        "Resequenciación": {
                                                            "pregunta": "Tipo de organismo",
                                                            "opciones": ["Eucariote", "Procariote", "Virus"],
                                                            "siguientes_pasos": {
                                                                "Eucariote": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
                                                                },
                                                                "Procariote": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
                                                                },
                                                                "Virus": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
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
                                                                        "Eucariote": {
                                                                            "pregunta": "Plataforma",
                                                                            "opciones": ["Illumina", "Nanopore"],
                                                                            "siguientes_pasos": {
                                                                                "costo_secuenciacion": "valor",
                                                                                "costo_limpieza": "valor",
                                                                                "costo_analisis_bioinformatico": "valor"
                                                                            }
                                                                        },
                                                                        "Procariote": {
                                                                            "pregunta": "Plataforma",
                                                                            "opciones": ["Illumina", "Nanopore"],
                                                                            "siguientes_pasos": {
                                                                                "costo_secuenciacion": "valor",
                                                                                "costo_limpieza": "valor",
                                                                                "costo_analisis_bioinformatico": "valor"
                                                                            }
                                                                        },
                                                                        "Virus": {
                                                                            "pregunta": "Plataforma",
                                                                            "opciones": ["Illumina", "Nanopore"],
                                                                            "siguientes_pasos": {
                                                                                "costo_secuenciacion": "valor",
                                                                                "costo_limpieza": "valor",
                                                                                "costo_analisis_bioinformatico": "valor"
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                "No": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
                                                                }
                                                            }
                                                        }

                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "No": {
                                        "pregunta": "Tipo de amplicon PCR1",
                                        "opciones": ["12S", "16S", "COI", "ITS", "TRNA-LEV", "18S", "28S"],
                                        "siguientes_pasos": {
                                            "pregunta": "Tipo de amplicon PCR2",
                                            "opciones": ["12S", "16S", "COI", "ITS", "TRNA-LEV", "18S", "28S"],
                                            "siguientes_pasos": {
                                                "pregunta": "Tipo de secuenciación",
                                                "opciones": ["Resequenciación", "Secuenciación de Novo"],
                                                "siguientes_pasos": {
                                                    "Resequenciación": {
                                                        "pregunta": "Tipo de organismo",
                                                        "opciones": ["Eucariote", "Procariote", "Virus"],
                                                        "siguientes_pasos": {
                                                            "Eucariote": {
                                                                "pregunta": "Plataforma",
                                                                "opciones": ["Illumina", "Nanopore"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                }
                                                            },
                                                            "Procariote": {
                                                                "pregunta": "Plataforma",
                                                                "opciones": ["Illumina", "Nanopore"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                }
                                                            },
                                                            "Virus": {
                                                                "pregunta": "Plataforma",
                                                                "opciones": ["Illumina", "Nanopore"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                }
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
                                                                    "Eucariote": {
                                                                        "pregunta": "Plataforma",
                                                                        "opciones": ["Illumina", "Nanopore"],
                                                                        "siguientes_pasos": {
                                                                            "costo_secuenciacion": "valor",
                                                                            "costo_limpieza": "valor",
                                                                            "costo_analisis_bioinformatico": "valor"
                                                                        }
                                                                    },
                                                                    "Procariote": {
                                                                        "pregunta": "Plataforma",
                                                                        "opciones": ["Illumina", "Nanopore"],
                                                                        "siguientes_pasos": {
                                                                            "costo_secuenciacion": "valor",
                                                                            "costo_limpieza": "valor",
                                                                            "costo_analisis_bioinformatico": "valor"
                                                                        }
                                                                    },
                                                                    "Virus": {
                                                                        "pregunta": "Plataforma",
                                                                        "opciones": ["Illumina", "Nanopore"],
                                                                        "siguientes_pasos": {
                                                                            "costo_secuenciacion": "valor",
                                                                            "costo_limpieza": "valor",
                                                                            "costo_analisis_bioinformatico": "valor"
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            "No": {
                                                                "pregunta": "Plataforma",
                                                                "opciones": ["Illumina", "Nanopore"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                }
                                                            }
                                                        }
                                                    }

                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },

                    "METAGENOMICA": {
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
                                            "Eucariote": {
                                                "pregunta": "Plataforma",
                                                "opciones": ["Illumina", "Nanopore"],
                                                "siguientes_pasos": {
                                                    "Illumina": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["NEXT SEQ 500", "ISEQ", "NEXT SEQ 1000/2000", "NOVASEQ X+"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    },
                                                    "Nanopore": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["MINION"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    }
                                                }
                                            },
                                            "Procariote": {
                                                "pregunta": "Plataforma",
                                                "opciones": ["Illumina", "Nanopore"],
                                                "siguientes_pasos": {
                                                    "Illumina": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["NEXT SEQ 500", "ISEQ", "NEXT SEQ 1000/2000", "NOVASEQ X+"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    },
                                                    "Nanopore": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["MINION"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    }
                                                }
                                            },
                                            "Virus": {
                                                "pregunta": "Plataforma",
                                                "opciones": ["Illumina", "Nanopore"],
                                                "siguientes_pasos": {
                                                    "Illumina": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["NEXT SEQ 500", "ISEQ", "NEXT SEQ 1000/2000", "NOVASEQ X+"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    },
                                                    "Nanopore": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["MINION"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    }
                                                }
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
                                                    "Eucariote": {
                                                        "pregunta": "Plataforma",
                                                        "opciones": ["Illumina", "Nanopore"],
                                                        "siguientes_pasos": {
                                                            "Illumina": {
                                                                "pregunta": "Opción",
                                                                "opciones": ["NEXT SEQ 500", "ISEQ", "NEXT SEQ 1000/2000", "NOVASEQ X+"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                },
                                                            },
                                                            "Nanopore": {
                                                                "pregunta": "Opción",
                                                                "opciones": ["MINION"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                },
                                                            }
                                                        }
                                                    },
                                                    "Procariote": {
                                                        "pregunta": "Plataforma",
                                                        "opciones": ["Illumina", "Nanopore"],
                                                        "siguientes_pasos": {
                                                            "Illumina": {
                                                                "pregunta": "Opción",
                                                                "opciones": ["NEXT SEQ 500", "ISEQ", "NEXT SEQ 1000/2000", "NOVASEQ X+"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                },
                                                            },
                                                            "Nanopore": {
                                                                "pregunta": "Opción",
                                                                "opciones": ["MINION"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                },
                                                            }
                                                        }
                                                    },
                                                    "Virus": {
                                                        "pregunta": "Plataforma",
                                                        "opciones": ["Illumina", "Nanopore"],
                                                        "siguientes_pasos": {
                                                            "Illumina": {
                                                                "pregunta": "Opción",
                                                                "opciones": ["NEXT SEQ 500", "ISEQ", "NEXT SEQ 1000/2000", "NOVASEQ X+"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                },
                                                            },
                                                            "Nanopore": {
                                                                "pregunta": "Opción",
                                                                "opciones": ["MINION"],
                                                                "siguientes_pasos": {
                                                                    "costo_secuenciacion": "valor",
                                                                    "costo_limpieza": "valor",
                                                                    "costo_analisis_bioinformatico": "valor"
                                                                },
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            "No": {
                                                "pregunta": "Plataforma",
                                                "opciones": ["Illumina", "Nanopore"],
                                                "siguientes_pasos": {
                                                    "Illumina": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["NEXT SEQ 500", "ISEQ", "NEXT SEQ 1000/2000", "NOVASEQ X+"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    },
                                                    "Nanopore": {
                                                        "pregunta": "Opción",
                                                        "opciones": ["MINION"],
                                                        "siguientes_pasos": {
                                                            "costo_secuenciacion": "valor",
                                                            "costo_limpieza": "valor",
                                                            "costo_analisis_bioinformatico": "valor"
                                                        },
                                                    }
                                                }
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
                                            "Illumina": {
                                                "pregunta": "Tipo de amplicon PCR2",
                                                "opciones": ["12S", "16S", "COI", "ITS", "TRNA-LEV", "18S", "28S"],
                                                "siguientes_pasos": {
                                                    "pregunta": "Tipo de secuenciación",
                                                    "opciones": ["Resequenciación", "Secuenciación de Novo"],
                                                    "siguientes_pasos": {
                                                        "Resequenciación": {
                                                            "pregunta": "Tipo de organismo",
                                                            "opciones": ["Eucariote", "Procariote", "Virus"],
                                                            "siguientes_pasos": {
                                                                "Eucariote": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
                                                                },
                                                                "Procariote": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
                                                                },
                                                                "Virus": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
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
                                                                        "Eucariote": {
                                                                            "pregunta": "Plataforma",
                                                                            "opciones": ["Illumina", "Nanopore"],
                                                                            "siguientes_pasos": {
                                                                                "costo_secuenciacion": "valor",
                                                                                "costo_limpieza": "valor",
                                                                                "costo_analisis_bioinformatico": "valor"
                                                                            }
                                                                        },
                                                                        "Procariote": {
                                                                            "pregunta": "Plataforma",
                                                                            "opciones": ["Illumina", "Nanopore"],
                                                                            "siguientes_pasos": {
                                                                                "costo_secuenciacion": "valor",
                                                                                "costo_limpieza": "valor",
                                                                                "costo_analisis_bioinformatico": "valor"
                                                                            }
                                                                        },
                                                                        "Virus": {
                                                                            "pregunta": "Plataforma",
                                                                            "opciones": ["Illumina", "Nanopore"],
                                                                            "siguientes_pasos": {
                                                                                "costo_secuenciacion": "valor",
                                                                                "costo_limpieza": "valor",
                                                                                "costo_analisis_bioinformatico": "valor"
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                "No": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
                                                                }
                                                            }
                                                        }

                                                    }
                                                }
                                            },
                                            "Nanopore": {
                                                "pregunta": "Tipo de amplicon PCR2",
                                                "opciones": ["12S", "16S", "COI", "ITS", "TRNA-LEV", "18S", "28S"],
                                                "siguientes_pasos": {
                                                    "pregunta": "Tipo de secuenciación",
                                                    "opciones": ["Resequenciación", "Secuenciación de Novo"],
                                                    "siguientes_pasos": {
                                                        "Resequenciación": {
                                                            "pregunta": "Tipo de organismo",
                                                            "opciones": ["Eucariote", "Procariote", "Virus"],
                                                            "siguientes_pasos": {
                                                                "Eucariote": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
                                                                },
                                                                "Procariote": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
                                                                },
                                                                "Virus": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
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
                                                                        "Eucariote": {
                                                                            "pregunta": "Plataforma",
                                                                            "opciones": ["Illumina", "Nanopore"],
                                                                            "siguientes_pasos": {
                                                                                "costo_secuenciacion": "valor",
                                                                                "costo_limpieza": "valor",
                                                                                "costo_analisis_bioinformatico": "valor"
                                                                            }
                                                                        },
                                                                        "Procariote": {
                                                                            "pregunta": "Plataforma",
                                                                            "opciones": ["Illumina", "Nanopore"],
                                                                            "siguientes_pasos": {
                                                                                "costo_secuenciacion": "valor",
                                                                                "costo_limpieza": "valor",
                                                                                "costo_analisis_bioinformatico": "valor"
                                                                            }
                                                                        },
                                                                        "Virus": {
                                                                            "pregunta": "Plataforma",
                                                                            "opciones": ["Illumina", "Nanopore"],
                                                                            "siguientes_pasos": {
                                                                                "costo_secuenciacion": "valor",
                                                                                "costo_limpieza": "valor",
                                                                                "costo_analisis_bioinformatico": "valor"
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                "No": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
                                                                }
                                                            }
                                                        }

                                                    }
                                                }
                                            }
                                        },
                                        "No": {
                                            "pregunta": "Tipo de amplicon PCR1",
                                            "opciones": ["12S", "16S", "COI", "ITS", "TRNA-LEV", "18S", "28S"],
                                            "siguientes_pasos": {
                                                "pregunta": "Tipo de amplicon PCR2",
                                                "opciones": ["12S", "16S", "COI", "ITS", "TRNA-LEV", "18S", "28S"],
                                                "siguientes_pasos": {
                                                    "pregunta": "Tipo de secuenciación",
                                                    "opciones": ["Resequenciación", "Secuenciación de Novo"],
                                                    "siguientes_pasos": {
                                                        "Resequenciación": {
                                                            "pregunta": "Tipo de organismo",
                                                            "opciones": ["Eucariote", "Procariote", "Virus"],
                                                            "siguientes_pasos": {
                                                                "Eucariote": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
                                                                },
                                                                "Procariote": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
                                                                },
                                                                "Virus": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
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
                                                                        "Eucariote": {
                                                                            "pregunta": "Plataforma",
                                                                            "opciones": ["Illumina", "Nanopore"],
                                                                            "siguientes_pasos": {
                                                                                "costo_secuenciacion": "valor",
                                                                                "costo_limpieza": "valor",
                                                                                "costo_analisis_bioinformatico": "valor"
                                                                            }
                                                                        },
                                                                        "Procariote": {
                                                                            "pregunta": "Plataforma",
                                                                            "opciones": ["Illumina", "Nanopore"],
                                                                            "siguientes_pasos": {
                                                                                "costo_secuenciacion": "valor",
                                                                                "costo_limpieza": "valor",
                                                                                "costo_analisis_bioinformatico": "valor"
                                                                            }
                                                                        },
                                                                        "Virus": {
                                                                            "pregunta": "Plataforma",
                                                                            "opciones": ["Illumina", "Nanopore"],
                                                                            "siguientes_pasos": {
                                                                                "costo_secuenciacion": "valor",
                                                                                "costo_limpieza": "valor",
                                                                                "costo_analisis_bioinformatico": "valor"
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                "No": {
                                                                    "pregunta": "Plataforma",
                                                                    "opciones": ["Illumina", "Nanopore"],
                                                                    "siguientes_pasos": {
                                                                        "costo_secuenciacion": "valor",
                                                                        "costo_limpieza": "valor",
                                                                        "costo_analisis_bioinformatico": "valor"
                                                                    }
                                                                }
                                                            }
                                                        }

                                                    }
                                                }
                                            }


                                        }
                                    },
                                }
                            }
                        },
                    }
                }
            }
        }
    },
    "ARN": {
        "pregunta": "¿Requiere extracción de ARN?",
        "opciones": ["Sí", "No"],
        "siguientes_pasos": {
            "Sí": {
                "costo_extraccion": "valor",
                "pregunta": "¿Requiere análisis de calidad?",
                "opciones": ["Sí", "No"],
                "siguientes_pasos": {
                    "Sí": {
                        "costo_analisis_calidad": "valor"
                    }
                }
            }
        },
        "pregunta": "Tipo de organismo",
        "opciones": ["Eucariote", "Procariote", "Virus"],
        "siguientes_pasos": {
            "Eucariote": {
                "pregunta": "Tipo de biblioteca",
                "opciones": ["Small RNA", "mRNA"],
                "siguientes_pasos": {
                    "Small RNA": {
                        "pregunta": "Tipo de plataforma",
                        "opciones": ["Illumina"],
                        "siguientes_pasos": {
                            "Illumina": {
                                "pregunta": "Opción",
                                "opciones": ["NEXT SEQ 500"],
                                "siguientes_pasos": {
                                    "costo_secuenciacion": "valor",
                                    "costo_limpieza": "valor",
                                    "costo_analisis_bioinformatico": "valor"
                                }
                            }
                        }
                    },

                    "mRNA": {
                        "pregunta": "Su muestra tiene rRNA ribosomales",
                        "opciones": ["Sí", "No"],
                        "siguientes_pasos": {
                            "Sí": {
                                "costo_limpieza": "valor",
                                "pregunta": "Servicio bioinformático",
                                "opciones": ["Ensamble de Novo", "Análisis de Expresión Diferencial", "Ambos"],
                                "siguientes_pasos": {
                                    "Ensamble de Novo": {
                                        "costo_analisis_bioinformatico": "valor",
                                        "tipo_plataforma": "NEXT SEQ 500"
                                    },
                                    "Análisis de Expresión Diferencial": {
                                        "costo_analisis_bioinformatico": "valor",
                                        "tipo_plataforma": "NEXT SEQ 500"
                                    },
                                    "Ambos": {
                                        "costo_analisis_bioinformatico": "valor",
                                        "tipo_plataforma": "NEXT SEQ 500"
                                    }
                                }
                            },
                            "No": {
                                "pregunta": "Servicio bioinformático",
                                "opciones": ["Ensamble de Novo", "Análisis de Expresión Diferencial", "Ambos"],
                                "siguientes_pasos": {
                                    "Ensamble de Novo": {
                                        "costo_analisis_bioinformatico": "valor",
                                        "tipo_plataforma": "NEXT SEQ 500"
                                    },
                                    "Análisis de Expresión Diferencial": {
                                        "costo_analisis_bioinformatico": "valor",
                                        "tipo_plataforma": "NEXT SEQ 500"
                                    },
                                    "Ambos": {
                                        "costo_analisis_bioinformatico": "valor",
                                        "tipo_plataforma": "NEXT SEQ 500"
                                    }
                                }
                            }
                        }

                    }
                }
            },
            "Procariote": {
                "pregunta": "Tipo de biblioteca",
                "opciones": ["Small RNA", "mRNA"],
                "siguientes_pasos": {
                    "Small RNA": {
                        "pregunta": "Tipo de plataforma",
                        "opciones": ["Illumina"],
                        "siguientes_pasos": {
                            "Illumina": {
                                "pregunta": "Opción",
                                "opciones": ["NEXT SEQ 500"],
                                "siguientes_pasos": {
                                    "costo_secuenciacion": "valor",
                                    "costo_limpieza": "valor",
                                    "costo_analisis_bioinformatico": "valor"
                                }
                            }
                        }
                    },
                    "mRNA": {
                        "pregunta": "Su muestra tiene rRNA ribosomales",
                        "opciones": ["Sí", "No"],
                        "siguientes_pasos": {
                            "Sí": {
                                "costo_limpieza": "valor",
                                "pregunta": "Servicio bioinformático",
                                "opciones": ["Análisis de Expresión Diferencial"],
                                "siguientes_pasos": {
                                    "Análisis de Expresión Diferencial": {
                                        "costo_analisis_bioinformatico": "valor",
                                        "tipo_plataforma": "NEXT SEQ 500"
                                    }
                                }
                            },
                            "No": {
                                "pregunta": "Servicio bioinformático",
                                "opciones": ["Análisis de Expresión Diferencial"],
                                "siguientes_pasos": {
                                    "Análisis de Expresión Diferencial": {
                                        "costo_analisis_bioinformatico": "valor",
                                        "tipo_plataforma": "NEXT SEQ 500"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "Virus": {
                "pregunta": "Tipo de biblioteca",
                "opciones": ["RNA Viral"],
                "siguientes_pasos": {
                    "RNA Viral": {
                        "pregunta": "Tipo de plataforma",
                        "opciones": ["Illumina"],
                        "siguientes_pasos": {
                            "Illumina": {
                                "pregunta": "Opción",
                                "opciones": ["NEXT SEQ 500", "ISEQ"],
                                "siguientes_pasos": {
                                    "costo_secuenciacion": "valor",
                                    "costo_limpieza": "valor",
                                    "costo_analisis_bioinformatico": "valor"
                                }
                            }
                        }
                    }
                }

            }
        }
    }
}
                }
            }
        }
    }
};


router.get("/arbol", (req, res) => {
    res.json(arbolDecisiones);
});

module.exports = router;