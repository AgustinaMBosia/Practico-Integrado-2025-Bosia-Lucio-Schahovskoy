package handlers

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/utils"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

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

	// Save the user to the data source
	// This is a placeholder; replace with actual database logic
	// TODO: Replace with actual database logic to save the user

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

	// Assuming you have a slice of users available
	users := []models.User{} // This should be replaced with actual data source

	storedUser, ok := models.FindUserByUsername(users, user.Username)
	if !ok {
		c.JSON(401, ErrorResponse{Message: "Invalid username or password"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(storedUser.PasswordHash), []byte(user.PasswordHash))
	if err != nil {
		c.JSON(401, ErrorResponse{Message: "Invalid username or password"})
		return
	}
	token, err := utils.GenerateToken(storedUser.Id, storedUser.Username, storedUser.Email, storedUser.Rol)
	if err != nil {
		c.JSON(500, ErrorResponse{Message: "Error generating token"})
		return
	}
	c.JSON(200, gin.H{
		"token":  token,
		"Id":     storedUser.Id,
		"Nombre": storedUser.Username,
		"Email":  storedUser.Email,
		"Rol":    storedUser.Rol,
	})
}
