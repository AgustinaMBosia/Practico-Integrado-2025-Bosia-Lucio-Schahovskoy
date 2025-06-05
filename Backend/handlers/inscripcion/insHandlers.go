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

func GetInscripcionByUsuarioAndActividadID(c *gin.Context) {
	log.Debug("Get inscripcion by usuario and actividad ID")

	usuarioIDParam := c.Param("usuario_id")
	actividadIDParam := c.Param("actividad_id")

	if usuarioIDParam == "" || actividadIDParam == "" {
		log.Error("Usuario ID and Actividad ID are required")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Usuario ID and Actividad ID are required"})
		return
	}

	var usuarioID, actividadID uint

	if _, err := fmt.Sscanf(usuarioIDParam, "%d", &usuarioID); err != nil {
		log.Error("Invalid Usuario ID: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Usuario ID must be a positive integer"})
		return
	}

	if _, err := fmt.Sscanf(actividadIDParam, "%d", &actividadID); err != nil {
		log.Error("Invalid Actividad ID: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Actividad ID must be a positive integer"})
		return
	}

	inscripcion, err := services.InscripcionService.GetInscripcionByUsuarioAndActividadID(usuarioID, actividadID)

	if err != nil {
		log.Error("Error fetching inscripcion: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching inscripcion"})
		return
	}

	if (inscripcion == dto.InscriptionDto{}) {
		c.JSON(http.StatusNotFound, gin.H{"message": "No inscripcion found for this usuario and actividad"})
		return
	}

	c.JSON(http.StatusOK, inscripcion)
}

func DeleteInscripcion(c *gin.Context) {
	log.Debug("Delete inscripcion")

	usuarioIDParam := c.Param("usuario_id")
	actividadIDParam := c.Param("actividad_id")

	if usuarioIDParam == "" || actividadIDParam == "" {
		log.Error("Usuario ID and Actividad ID are required")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Usuario ID and Actividad ID are required"})
		return
	}

	var usuarioID, actividadID uint

	if _, err := fmt.Sscanf(usuarioIDParam, "%d", &usuarioID); err != nil {
		log.Error("Invalid Usuario ID: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Usuario ID must be a positive integer"})
		return
	}

	if _, err := fmt.Sscanf(actividadIDParam, "%d", &actividadID); err != nil {
		log.Error("Invalid Actividad ID: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Actividad ID must be a positive integer"})
		return
	}

	err := services.InscripcionService.DeleteInscripcion(usuarioID, actividadID)

	if err != nil {
		log.Error("Error deleting inscripcion: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting inscripcion"})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}
func GetInscripcionesByUsuarioID(c *gin.Context) {
	log.Debug("Get inscripciones by usuario ID")

	usuarioIDParam := c.Param("usuario_id")

	if usuarioIDParam == "" {
		log.Error("Usuario ID is required")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Usuario ID is required"})
		return
	}

	var usuarioID uint

	if _, err := fmt.Sscanf(usuarioIDParam, "%d", &usuarioID); err != nil {
		log.Error("Invalid Usuario ID: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Usuario ID must be a positive integer"})
		return
	}

	inscripciones, err := services.InscripcionService.GetInscripcionesByUsuarioID(usuarioID)

	if err != nil {
		log.Error("Error fetching inscripciones: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching inscripciones"})
		return
	}

	if len(inscripciones) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No inscripciones found for this usuario"})
		return
	}

	c.JSON(http.StatusOK, inscripciones)
}
