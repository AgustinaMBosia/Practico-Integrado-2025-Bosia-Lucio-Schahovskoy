package models

type User struct {
	Id           int    `gorm:"primaryKey"`
	Username     string `gorm:"type:varchar(250);not null"`
	PasswordHash string `gorm:"type:varchar(500);not null"`
	Email        string `gorm:"type:varchar(250);not null"`
	Rol          bool   `gorm:"not null"`
}

type Users []User
