package utils

import (
	"errors"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/golang-jwt/jwt"
)

var mySignInKey = []byte("mySecretKey")

func getTokenExpiration() time.Duration {
	expStr := os.Getenv("TOKEN_EXPIRATION_MINUTES")
	expMin, err := strconv.Atoi(expStr)
	if err != nil {
		expMin = 60 // valor por defecto
	}
	return time.Duration(expMin) * time.Minute
}

func GenerateToken(userId int, userName string, userEmail string, userRolBool bool) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"Id":       userId,
		"Username": userName,
		"Email":    userEmail,
		"Rol":      userRolBool,
		"exp":      time.Now().Add(getTokenExpiration()).Unix(),
	})

	tokenString, err := token.SignedString(mySignInKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func ParseToken(tokenString string) (jwt.MapClaims, error) {

	// saca bearer si existe
	if strings.HasPrefix(tokenString, "Bearer ") {
		tokenString = strings.TrimPrefix(tokenString, "Bearer ")
	}

	// Parsear y validar firma y estructura
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Validar método de firma
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("método de firma no válido")
		}
		return mySignInKey, nil
	})

	if err != nil {
		return nil, err
	}

	// Obtener y validar claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// Validación explícita de expiración
		if expFloat, ok := claims["exp"].(float64); ok {
			exp := int64(expFloat)
			if time.Now().Unix() > exp {
				return nil, errors.New("token expirado")
			}
		} else {
			return nil, errors.New("campo de expiración inválido")
		}

		return claims, nil
	}

	return nil, errors.New("token inválido")
}
