package utils

import (
	"time"

	"github.com/golang-jwt/jwt"
)

var mySingInKey = []byte("mySecretKey")

func GenerateToken(userId int, userName string, userEmail string, userRol string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"Id":       userId,
		"Username": userName,
		"Email":    userEmail,
		"Rol":      userRol,
		"exp":      time.Now().Add(time.Hour * 1).Unix(),
	})

	tokenString, err := token.SignedString(mySingInKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
