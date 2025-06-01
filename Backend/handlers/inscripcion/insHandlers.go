package inscripcionHandler

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/dto"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/services"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"net/http"
	//"strconv"
)

func AddInscripcion(c *gin.Context) {
	log.Debug("Post inscripcion")
	var inscripcionDto dto.InscriptionDto

	if err := c.ShouldBindJSON(&inscripcionDto); err != nil {
		log.Error("Error binding JSON: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	newInscripcion, err := services.InscripcionService.AddInscripcion(inscripcionDto)

	if err != nil {
		log.Error("Error creating inscripcion: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating inscripcion"})
		return
	}

	c.JSON(http.StatusCreated, newInscripcion)
}
