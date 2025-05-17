package instructorClient

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"
	"log"

	"gorm.io/gorm"
)

var Db *gorm.DB

func GetInstructorById(id int) models.Instructor {
	var instructor models.Instructor

	Db.Where("id = ?", id).First(&instructor)
	return instructor
}

func PostInstructor(instructor models.Instructor) models.Instructor {
	result := Db.Create(&instructor)
	if result.Error != nil {
		log.Fatal("Error creating instructor: ", result.Error)
	}
	return instructor
}
