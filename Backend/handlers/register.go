package handlers

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/dto"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/services"

	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	var user dto.UserDto
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}
	newUser, err := services.RegisterService.UserRegister(user)
	if err != nil {
		c.JSON(500, gin.H{"error": "Error registering user"})
		return
	}
	c.JSON(201, gin.H{
		"message": "User registered successfully",
		"user":    newUser,
	})
}
