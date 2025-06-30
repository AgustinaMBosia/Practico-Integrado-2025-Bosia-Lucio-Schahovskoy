package services

import (
	categoriaClient "Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/clients/categoria"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/dto"
	"log"
)

type categoriaService struct{}

type categoriaServiceInterface interface {
	GetAllCategories() ([]dto.CategoryDto, error)
}

var (
	CategoriaService categoriaServiceInterface
)

func init() {
	CategoriaService = &categoriaService{}
}

func (s *categoriaService) GetAllCategories() ([]dto.CategoryDto, error) {
	var categoriesDto []dto.CategoryDto
	categories := categoriaClient.GetAllCategories()

	for _, category := range categories {
		categoryDto := dto.CategoryDto{
			Id:     category.Id,
			Nombre: category.Nombre,
		}
		categoriesDto = append(categoriesDto, categoryDto)
	}

	if len(categoriesDto) == 0 {
		log.Println("No categories found")
	}

	return categoriesDto, nil
}
