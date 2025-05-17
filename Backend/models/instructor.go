package models

type Instructor struct {
	Id       int    `gorm:"primaryKey"`
	Nombre   string `gorm:"type:varchar(250);not null"`
	Email    string `gorm:"type:varchar(250);not null"`
	Telefono int    `gorm:"type:int;not null"`
}

type Instructors []Instructor
