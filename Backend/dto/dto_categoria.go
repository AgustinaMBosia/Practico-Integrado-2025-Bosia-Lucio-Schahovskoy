package dto

type CategoryDto struct {
	Id     int    `json:"id"`
	Nombre string `json:"Nombre"`
}

type CategoriesDto []CategoryDto
