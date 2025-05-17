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

func InitDb() {
	err = godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")
	dns := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPassword, dbHost, dbPort, dbName)

	Db, err = gorm.Open(mysql.Open(dns), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}
	log.Println("Database connection established successfully")

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
	log.Println("Finishing Migration Database Tables")

}
