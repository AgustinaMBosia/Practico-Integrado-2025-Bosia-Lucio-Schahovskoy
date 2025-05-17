package actividadClient

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"
	"log"

	"gorm.io/gorm"
)

var Db *gorm.DB

func GetActividadById(id int) models.Activity {
	var actividad models.Activity

	Db.Where("id = ?", id).Preload("Category").Preload("Instructor").First(&actividad)
	return actividad
}

func PostActividad(actividad models.Activity) models.Activity {
	result := Db.Create(&actividad)
	if result.Error != nil {
		log.Fatal("Error creating actividad: ", result.Error)
	}
	return actividad
}
