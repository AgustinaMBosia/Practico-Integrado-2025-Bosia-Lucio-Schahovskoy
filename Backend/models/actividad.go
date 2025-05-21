package models

type Activity struct {
	Id           int      `gorm:"primaryKey"`
	Titulo       string   `gorm:"varchar(250);not null"`
	Horario      string   `gorm:"varchar(250);not null"`
	Dia          string   `gorm:"varchar(250);not null"`
	Cupo         int      `gorm:"int;not null"`
	Descripcion  string   `gorm:"varchar(250);not null"`
	Categoria    Category `gorm:"foreignkey:CategoriaID"`
	CategoriaID  int
	Instructor   Instructor `gorm:"foreignkey:InstructorID"`
	InstructorID int
}

type Activities []Activity
