package models

type Inscription struct {
	Id         int    `gorm:"primaryKey"`
	Fecha      string `gorm:"varchar(250);not null"`
	User       User   `gorm:"foreignkey:UserId"`
	UserId     int
	Activity   Activity `gorm:"foreignkey:ActivityID"`
	ActivityID int
}

type Inscriptions []Inscription
