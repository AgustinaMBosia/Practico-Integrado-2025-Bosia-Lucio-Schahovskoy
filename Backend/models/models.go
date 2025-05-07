package models

type Usuario struct {
	Id       string `json:"id" gorm:"primaryKey"`
	Nombre   string
	Apellido string
}

type Socio struct {
}

type Administrador struct {
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
