package inscripcionHandler

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/dto"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/services"
	"fmt"
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

func GetInscripcionByActividadID(c *gin.Context) {
	log.Debug("Get inscripcion by actividad ID")
	actividadIDParam := c.Param("id")

	if actividadIDParam == "" {
		log.Error("Actividad ID is required")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Actividad ID is required"})
		return
	}

	var actividadID uint

	if _, err := fmt.Sscanf(actividadIDParam, "%d", &actividadID); err != nil {
		log.Error("Invalid Actividad ID: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Actividad ID must be a positive integer"})
		return
	}

	inscripciones, err := services.InscripcionService.GetInscripcionByActividadID(actividadID)

	if err != nil {
		log.Error("Error fetching inscripciones: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching inscripciones"})
		return
	}

	if len(inscripciones) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No inscripciones found for this actividad"})
		return
	}

	c.JSON(http.StatusOK, inscripciones)
}
