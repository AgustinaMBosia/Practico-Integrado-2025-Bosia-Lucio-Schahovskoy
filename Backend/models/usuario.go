package models

type User struct {
	Id           int    `gorm:"primaryKey"`
	Username     string `gorm:"type:varchar(250);not null"`
	PasswordHash string `gorm:"type:varchar(500);not null"`
	Email        string `gorm:"type:varchar(250);not null"`
	Rol          string `gorm:"type:varchar(250);not null"`
}

type Users []User

// FindUserByUsername searches for a user by username in the Users slice.
func FindUserByUsername(users []User, username string) (*User, bool) {
	for _, user := range users {
		if user.Username == username {
			return &user, true
		}
	}
	return nil, false
}
