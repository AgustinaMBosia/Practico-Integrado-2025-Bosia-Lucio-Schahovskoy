package main

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/config"

	"github.com/gin-gonic/gin"
)

func main() {
	config.InitDB()
	router := gin.Default()
	router.Run()
}
