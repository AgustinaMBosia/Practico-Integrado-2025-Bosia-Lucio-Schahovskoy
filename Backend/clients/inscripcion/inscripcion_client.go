package inscripcionClient

import (
	"log"

	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"

	"gorm.io/gorm"
)

var Db *gorm.DB

func PostInscripcion(inscripcion models.Inscription) models.Inscription {
	result := Db.Create(&inscripcion)
	if result.Error != nil {
		log.Fatal("Error creating inscripcion: ", result.Error)
	}
	return inscripcion
}
