package categoriaClient

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"
	"log"

	"gorm.io/gorm"
)

var Db *gorm.DB

func GetAllCategories() []models.Category {
	var categories []models.Category
	result := Db.Find(&categories)
	if result.Error != nil {
		log.Fatal("Error getting categories: ", result.Error)
	}
	return categories
}
