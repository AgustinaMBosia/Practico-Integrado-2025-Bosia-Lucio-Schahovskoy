package config

import (
	actividadClient "Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/clients/actividad"
	categoriaClient "Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/clients/categoria"
	inscripcionClient "Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/clients/inscripcion"
	instructorClient "Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/clients/instructor"
	usuarioClient "Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/clients/usuario"
	"fmt"
	"log"
	"os"
	"time"

	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	Db  *gorm.DB
	err error
)

func init() {
	err = godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPassword, dbHost, dbPort, dbName)

	// Intentar conectarse hasta 10 veces con 5 segundos de espera entre intentos
	const maxRetries = 10
	const delaySeconds = 5

	fmt.Println("🧪 DB ENV CONFIG:", dbUser, dbPassword, dbHost, dbPort, dbName)

	for i := 1; i <= maxRetries; i++ {
		Db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Info),
		})
		if err == nil {
			log.Println("✅ Database connection established successfully")
			break
		}
		log.Printf("❌ Failed to connect to DB (attempt %d/%d): %v", i, maxRetries, err)
		time.Sleep(delaySeconds * time.Second)
	}

	if err != nil {
		log.Fatal("❌ Could not connect to the database after several attempts.")
	}

	usuarioClient.Db = Db
	inscripcionClient.Db = Db
	actividadClient.Db = Db
	categoriaClient.Db = Db
	instructorClient.Db = Db
}

func StartDbEngine() {
	Db.AutoMigrate(&models.User{})
	Db.AutoMigrate(&models.Inscription{})
	Db.AutoMigrate(&models.Activity{})
	Db.AutoMigrate(&models.Category{})
	Db.AutoMigrate(&models.Instructor{})
	log.Println("✅ Finished migrating database tables")
}
