package instructorClient

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"
	"log"

	"gorm.io/gorm"
)

var Db *gorm.DB

func GetAllInstructors() []models.Instructor {
	var instructors []models.Instructor
	result := Db.Find(&instructors)
	if result.Error != nil {
		log.Fatal("Error fetching instructors: ", result.Error)
	}
	return instructors
}
