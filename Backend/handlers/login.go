package handlers

//esto tendria que estar en base a los dto de user no el model

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/config"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/utils"

	"log"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var Db *gorm.DB

type ErrorResponse struct {
	Message string `json:"message"`
}

func Register(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, ErrorResponse{Message: "Invalid input"})
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.PasswordHash), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(500, ErrorResponse{Message: "Error hashing password"})
		return
	}
	user.PasswordHash = string(hashedPassword)

	if err := config.Db.Create(&user).Error; err != nil {
		c.JSON(500, ErrorResponse{Message: "Error saving user to database"})
		return
	}

	c.JSON(201, gin.H{
		"message": "User registered successfully",
		"user":    user.Username,
	})
}

func Login(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, ErrorResponse{Message: "Invalid input"})
		return
	}

	log.Println("Attempting to log in user:", user.Username)

	var storedUser models.User
	if err := config.Db.Where("username = ?", user.Username).First(&storedUser).Error; err != nil {
		log.Println("User not found:", user.Username)
		c.JSON(401, ErrorResponse{Message: "Invalid username or password"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(storedUser.PasswordHash), []byte(user.PasswordHash))
	if err != nil {
		log.Println("Password mismatch for user:", user.Username)
		c.JSON(401, ErrorResponse{Message: "Invalid username or password"})
		return
	}

	token, err := utils.GenerateToken(storedUser.Id, storedUser.Username, storedUser.Email, storedUser.Rol)
	if err != nil {
		log.Println("Error generating token for user:", user.Username, "Error:", err)
		c.JSON(500, ErrorResponse{Message: "Error generating token"})
		return
	}

	log.Println("User logged in successfully:", user.Username)
	c.JSON(200, gin.H{
		"token":  token,
		"Id":     storedUser.Id,
		"Nombre": storedUser.Username,
		"Email":  storedUser.Email,
		"Rol":    storedUser.Rol,
	})
}
