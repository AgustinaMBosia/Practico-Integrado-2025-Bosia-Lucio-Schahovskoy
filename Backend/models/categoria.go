package models

type Category struct {
	Id     int    `grom:"primarykey"`
	Nombre string `gorm:"varchar(250); not null"`
}

type Categories []Category
