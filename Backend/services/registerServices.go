package services

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/config"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/dto"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"

	"errors"

	"golang.org/x/crypto/bcrypt"
)

type registerService struct{}
type registerServiceInterface interface {
	UserRegister(userDto dto.UserDto) (dto.UserDto, error)
}

var RegisterService registerServiceInterface

func init() {
	RegisterService = &registerService{}
}

func (s *registerService) UserRegister(userDto dto.UserDto) (dto.UserDto, error) {
	var existingUser models.User
	if err := config.Db.Where("username = ?", userDto.Username).First(&existingUser).Error; err == nil {
		return dto.UserDto{}, errors.New("username already exists")
	}

	var newUser models.User

	newUser.Username = userDto.Username
	newUser.Email = userDto.Email
	newUser.PasswordHash = userDto.PasswordHash
	newUser.Rol = userDto.Rol

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.PasswordHash), bcrypt.DefaultCost)
	if err != nil {
		return dto.UserDto{}, err
	}
	newUser.PasswordHash = string(hashedPassword)
	if err := config.Db.Create(&newUser).Error; err != nil {
		return dto.UserDto{}, err
	}
	return dto.UserDto{
		Id:       newUser.Id,
		Username: newUser.Username,
		Email:    newUser.Email,
		Rol:      newUser.Rol,
	}, nil
}
