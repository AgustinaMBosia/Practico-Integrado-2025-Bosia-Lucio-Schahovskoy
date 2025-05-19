package utils

import "github.com/golang-jwt/jwt"

var mySingInKey = []byte("mySecretKey")

func GenerateToken(userId int, userName string, userEmail string, userRol string) (string, error) {
	// Create a new token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"Id":     userId,
		"Nombre": userName,
		"Email":  userEmail,
		"Rol":    userRol,
	})

	// Sign the token with a secret key
	tokenString, err := token.SignedString(mySingInKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
