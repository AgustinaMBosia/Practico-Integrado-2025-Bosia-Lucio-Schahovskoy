package services

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/config"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/utils"

	"golang.org/x/crypto/bcrypt"
)

type loginService struct{}
type loginServiceInterface interface {
	Login(username, password string) (models.User, string, error)
}

var LoginService loginServiceInterface

func init() {
	LoginService = &loginService{}
}

func (s *loginService) Login(username, password string) (models.User, string, error) {
	var user models.User
	if err := config.Db.Where("username = ?", username).First(&user).Error; err != nil {
		return models.User{}, "", err
	}
	err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		return models.User{}, "", err
	}
	token, err := utils.GenerateToken(user.Id, user.Username, user.Email, user.Rol)
	if err != nil {
		return models.User{}, "", err
	}
	return user, token, nil
}
