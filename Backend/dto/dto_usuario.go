package dto

type UserDto struct {
	Id       int    `json:"id"`
	Nombre   string `json:"nombre"`
	Email    string `json:"email"`
	Telefono string `json:"telefono"`
}

type UsersDto []UserDto
