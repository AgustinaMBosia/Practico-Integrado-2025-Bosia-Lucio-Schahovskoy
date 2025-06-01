package handlers

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/dto"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/services"

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	var user dto.UserDto
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}
	storedUser, token, err := services.LoginService.Login(user.Username, user.PasswordHash)
	if err != nil {
		c.JSON(401, gin.H{"error": "Invalid username or password"})
		return
	}
	c.JSON(200, gin.H{
		"message": "User logged in successfully",
		"token":   token,
		"user": gin.H{
			"id":       storedUser.Id,
			"username": storedUser.Username,
			"email":    storedUser.Email,
			"rol":      storedUser.Rol,
		},
	})
}
