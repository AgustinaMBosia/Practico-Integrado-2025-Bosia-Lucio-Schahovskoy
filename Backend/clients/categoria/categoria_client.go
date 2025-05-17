package categoriaClient

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"
	"log"

	"gorm.io/gorm"
)

var Db *gorm.DB

func GetCategoryById(id int) models.Category {
	var category models.Category

	Db.Where("id = ?", id).First(&category)
	return category
}

func PostCategory(category models.Category) models.Category {
	result := Db.Create(&category)
	if result.Error != nil {
		log.Fatal("Error creating category: ", result.Error)
	}
	return category
}

func GetAllCategories() []models.Category {
	var categories []models.Category
	result := Db.Find(&categories)
	if result.Error != nil {
		log.Fatal("Error getting categories: ", result.Error)
	}
	return categories
}
