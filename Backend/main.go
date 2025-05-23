package main

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/app"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/config"
)

func main() {
	config.StartDbEngine()
	app.StartRoute()
}
