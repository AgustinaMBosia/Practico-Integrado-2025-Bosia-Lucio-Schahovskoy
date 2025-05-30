package actividadHandler

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/dto"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/services"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"net/http"
	"strconv"
)

func GetActividadById(c *gin.Context) {
	log.Debug("Actividad id to load: " + c.Param("id"))
	id, _ := strconv.Atoi(c.Param("id"))

	var actividadDto dto.ActivityDto

	actividadDto, err := services.ActividadService.GetActividadById(id)

	if err != nil {
	}

	c.JSON(http.StatusOK, actividadDto)
}

func GetAllActividades(c *gin.Context) {
	log.Debug("Get all actividades")

	actividades, err := services.ActividadService.GetAllActividades()

	if err != nil {
		log.Error("Error getting actividades: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error getting actividades"})
		return
	}

	c.JSON(http.StatusOK, actividades)
}

func AddActividad(c *gin.Context) {
	log.Debug("Add actividad")

	var actividadDto dto.ActivityDto

	if err := c.ShouldBindJSON(&actividadDto); err != nil {
		log.Error("Error binding JSON: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	newActividad, err := services.ActividadService.AddActividad(actividadDto)

	if err != nil {
		log.Error("Error adding actividad: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error adding actividad"})
		return
	}

	c.JSON(http.StatusCreated, newActividad)
}
