package categoriaHandler

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetAllCategorias(c *gin.Context) {
	categorias, err := services.CategoriaService.GetAllCategories()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching categorias"})
		return
	}
	c.JSON(http.StatusOK, categorias)
}
