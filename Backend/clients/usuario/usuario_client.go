package usuarioClient

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"
	"log"

	"gorm.io/gorm"
)

var Db *gorm.DB

func GetUserById(id int) models.User {
	var user models.User

	Db.Where("id = ?", id).First(&user)
	return user
}

func PostUser(user models.User) models.User {
	result := Db.Create(&user)
	if result.Error != nil {
		log.Fatal("Error creating user: ", result.Error)
	}
	return user
}
