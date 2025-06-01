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

func GetInscripcionByActividadID(actividadID uint) []models.Inscription {
	var inscripciones []models.Inscription
	result := Db.Preload("User").Preload("Activity").Where("activity_id = ?", actividadID).Find(&inscripciones)
	if result.Error != nil {
		log.Fatal("Error fetching inscripciones: ", result.Error)
	}
	return inscripciones
}

func GetInscripcionByUsuarioAndActividadID(usuarioID uint, actividadID uint) models.Inscription {
	var inscripcion models.Inscription
	result := Db.Preload("User").Preload("Activity").Where("user_id = ? AND activity_id = ?", usuarioID, actividadID).First(&inscripcion)
	if result.Error != nil {
		log.Fatal("Error fetching inscripcion: ", result.Error)
	}
	return inscripcion
}
