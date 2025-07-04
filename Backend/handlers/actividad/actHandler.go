package actividadHandler

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/dto"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/services"
	"net/http"
	"strconv"

	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/utils"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func UpdateActividad(c *gin.Context) {
	log.Debug("Update actividad id: " + c.Param("id"))
	id, _ := strconv.Atoi(c.Param("id"))

	// Validar token
	tokenString := c.GetHeader("Authorization")
	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Falta el token"})
		return
	}

	claims, err := utils.ParseToken(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido"})
		return
	}

	// Validar rol admin
	isAdmin, ok := claims["Rol"].(bool)
	if !ok || !isAdmin {
		c.JSON(http.StatusForbidden, gin.H{"error": "Solo administradores pueden editar actividades"})
		return
	}

	var actividadDto dto.ActivityDto

	if err := c.ShouldBindJSON(&actividadDto); err != nil {
		log.Error("Error binding JSON: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	actividadDto.Id = id

	updatedActividad, err := services.ActividadService.UpdateActividad(actividadDto)

	if err != nil {
		log.Error("Error updating actividad: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating actividad"})
		return
	}

	c.JSON(http.StatusOK, updatedActividad)
}

func DeleteActividad(c *gin.Context) {
	log.Debug("Delete actividad id: " + c.Param("id"))
	id, _ := strconv.Atoi(c.Param("id"))

	// Validar token
	tokenString := c.GetHeader("Authorization")
	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Falta el token"})
		return
	}
	claims, err := utils.ParseToken(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido"})
		return
	}
	// Validar rol admin
	isAdmin, ok := claims["Rol"].(bool)
	if !ok || !isAdmin {
		c.JSON(http.StatusForbidden, gin.H{"error": "Solo administradores pueden eliminar actividades"})
		return
	}

	// Primero, borrar las inscripciones de esa actividad
	err = services.InscripcionService.DeleteInscripcionesByActividadID(id)
	if err != nil {
		log.Error("Error deleting related inscripciones: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting related inscripciones"})
		return
	}

	// Luego, borrar la actividad
	err = services.ActividadService.DeleteActividad(id)
	if err != nil {
		log.Error("Error deleting actividad: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting actividad"})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}

func GetActividadById(c *gin.Context) {
	log.Debug("Actividad id to load: " + c.Param("id"))
	id, _ := strconv.Atoi(c.Param("id"))

	var actividadDto dto.ActivityDto

	actividadDto, err := services.ActividadService.GetActividadById(id)

	if err != nil {
		log.Error("Error getting actividad by id: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error getting actividad"})
		return
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

	// Validar token
	tokenString := c.GetHeader("Authorization")
	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Falta el token"})
		return
	}

	claims, err := utils.ParseToken(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido"})
		return
	}

	// Validar rol
	isAdmin, ok := claims["Rol"].(bool)
	if !ok || !isAdmin {
		c.JSON(http.StatusForbidden, gin.H{"error": "Solo administradores pueden crear actividades"})
		return
	}

	// Continuar con la lógica habitual
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

func BuscarActividad(c *gin.Context) {
	log.Debug("Buscar actividad")

	texto := c.Query("query")

	if texto == "" {
		log.Error("Query parameter 'texto' is required")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Query parameter 'texto' is required"})
		return
	}

	actividades, err := services.ActividadService.BuscarActividad(texto)

	if err != nil {
		log.Error("Error searching actividades: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error searching actividades"})
		return
	}

	if len(actividades) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No actividades found"})
		return
	}

	c.JSON(http.StatusOK, actividades)
}
