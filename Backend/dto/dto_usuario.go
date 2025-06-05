package dto

type UserDto struct {
	Id           int    `json:"id"`
	PasswordHash string `json:"Password"`
	Username     string `json:"Username"`
	Email        string `json:"email"`
	Rol          bool   `json:"rol"`
}

type UsersDto []UserDto
