package config

import (
	actividadClient "Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/clients/actividad"
	categoriaClient "Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/clients/categoria"
	inscripcionClient "Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/clients/inscripcion"
	instructorClient "Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/clients/instructor"
	usuarioClient "Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/clients/usuario"
	"log"

	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	dba *gorm.DB
	err error
)

func InitDb() {
	// err = godotenv.Load()
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	// dbUser := os.Getenv("DB_USER")
	// dbPassword := os.Getenv("DB_PASSWORD")
	// dbHost := os.Getenv("DB_HOST")
	// dbPort := os.Getenv("DB_PORT")
	// dbName := os.Getenv("DB_NAME")
	// dns := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPassword, dbHost, dbPort, dbName)
	dns := "root:tomas2243@tcp(localhost:3306)/db_gym?charset=utf8mb4&parseTime=True&loc=Local"

	dba, err = gorm.Open(mysql.Open(dns), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}
	log.Println("Database connection established successfully")

	usuarioClient.Db = dba
	inscripcionClient.Db = dba
	actividadClient.Db = dba
	categoriaClient.Db = dba
	instructorClient.Db = dba
}

func StartDbEngine() {
	dba.AutoMigrate(&models.User{})
	dba.AutoMigrate(&models.Inscription{})
	dba.AutoMigrate(&models.Activity{})
	dba.AutoMigrate(&models.Category{})
	dba.AutoMigrate(&models.Instructor{})
	log.Println("Finishing Migration Database Tables")

}
