package inscripcionClient

import (
	"log"

	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"

	"gorm.io/gorm"

	"errors"
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
	result := Db.Preload("User").Preload("Activity").
		Where("user_id = ? AND activity_id = ?", usuarioID, actividadID).
		First(&inscripcion)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return models.Inscription{} // inscripción no encontrada, id = 0
		}
		log.Printf("Error fetching inscripcion: %v", result.Error)
		return models.Inscription{}
	}

	return inscripcion
}

func DeleteInscripcion(usuarioID uint, actividadID uint) {
	var inscripcion models.Inscription
	result := Db.Where("user_id = ? AND activity_id = ?", usuarioID, actividadID).First(&inscripcion)
	if result.Error != nil {
		log.Fatal("Error finding inscripcion: ", result.Error)
	}

	result = Db.Delete(&inscripcion)
	if result.Error != nil {
		log.Fatal("Error deleting inscripcion: ", result.Error)
	}
}

func GetInscripcionesByUsuarioID(usuarioID uint) []models.Inscription {
	var inscripciones []models.Inscription
	result := Db.Preload("User").Preload("Activity").Where("user_id = ?", usuarioID).Find(&inscripciones)
	if result.Error != nil {
		log.Fatal("Error fetching inscripciones: ", result.Error)
	}
	return inscripciones
}

func DeleteInscripcionesByActividadID(id int) {
	var inscripciones []models.Inscription
	result := Db.Where("activity_id = ?", id).Find(&inscripciones)
	if result.Error != nil {
		log.Fatal("Error finding inscripciones: ", result.Error)
	}

	if len(inscripciones) == 0 {
		log.Println("No inscripciones found for activity ID:", id)
		return
	}

	result = Db.Delete(&inscripciones)
	if result.Error != nil {
		log.Fatal("Error deleting inscripciones: ", result.Error)
	}
}
