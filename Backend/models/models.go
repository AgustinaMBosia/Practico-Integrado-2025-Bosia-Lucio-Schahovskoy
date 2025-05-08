package models

import "gorm.io/gorm"

type Usuario struct {
	gorm.Model        //agrega 4 campos comunes de toda entidad Id,CreatedAt, UpdatedAt, DeletedAt
	Email      string `gorm:"unique"`
	Password   string
	Rol        string // "admin" o "socio" si el admin y socio como admin,socio
}

type Actividad struct {
	Dia       string
	Horario   string
	Cupo      uint
	Categoria string
	Profesor  string
}

type Inscripciones struct {
}
