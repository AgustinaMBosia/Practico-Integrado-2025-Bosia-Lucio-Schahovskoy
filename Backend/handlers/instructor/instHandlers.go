package instructorHandler

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/services"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func GetAllInstructors(c *gin.Context) {
	log.Println("Get all instructors")

	instructors, err := services.InstructorService.GetAllInstructors()
	if err != nil {
		log.Println("Error fetching instructors:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching instructors"})
		return
	}

	c.JSON(http.StatusOK, instructors)
}
