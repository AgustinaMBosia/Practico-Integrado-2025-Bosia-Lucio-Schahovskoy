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
			log.Println("Database connection established successfully")
			break
		}
		log.Printf("Failed to connect to DB (attempt %d/%d): %v", i, maxRetries, err)
		time.Sleep(delaySeconds * time.Second)
	}

	if err != nil {
		log.Fatal("Could not connect to the database after several attempts.")
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
	log.Println("Finished migrating database tables")

	// Poblar tabla users
	var userCount int64
	Db.Model(&models.User{}).Count(&userCount)
	if userCount == 0 {
		Db.Create(&models.User{Username: "admin", PasswordHash: "$2a$10$ziwjNjQdppZtS1WN7JUcqOXXxkiecIsSaTSIuzMsmiVOrx7kj7hOu", Email: "admin@email.com", Rol: true})
		Db.Create(&models.User{Username: "usuario", PasswordHash: "$2a$10$ziwjNjQdppZtS1WN7JUcqOXXxkiecIsSaTSIuzMsmiVOrx7kj7hOu", Email: "usuario@email.com", Rol: false})
	}

	// Poblar tabla categories
	var catCount int64
	Db.Model(&models.Category{}).Count(&catCount)
	if catCount == 0 {
		Db.Create(&models.Category{Nombre: "Cuerpo y mente"})
		Db.Create(&models.Category{Nombre: "Fitness y cardio"})
		Db.Create(&models.Category{Nombre: "Fortalecimiento y Postura"})

	}

	// Poblar tabla instructors
	var instCount int64
	Db.Model(&models.Instructor{}).Count(&instCount)
	if instCount == 0 {
		Db.Create(&models.Instructor{Nombre: "Ana Torres", Email: "ana@email.com", Telefono: 3511234567})
		Db.Create(&models.Instructor{Nombre: "Pedro Gómez", Email: "pedro@email.com", Telefono: 3517654321})
		Db.Create(&models.Instructor{Nombre: "Lucía Fernández", Email: "lucia@email.com", Telefono: 3519876543})
	}

	// Poblar tabla activities
	var actCount int64
	Db.Model(&models.Activity{}).Count(&actCount)
	if actCount == 0 {
		Db.Create(&models.Activity{
			Titulo:       "Yoga Inicial",
			Dia:          "Lunes",
			Horario:      "10:00",
			Imagen:       "https://sacredtribeyoga.com/wp-content/uploads/2021/01/Untitled-design-38.png",
			Cupo:         15,
			Descripcion:  "Clase de yoga básica",
			CategoriaID:  1,
			InstructorID: 1,
		})
		Db.Create(&models.Activity{
			Titulo:       "Zumba Power",
			Dia:          "Miércoles",
			Horario:      "18:00",
			Imagen:       "http://www.shbarcelona.es/blog/es/wp-content/uploads/2015/05/adelgaza-bailando-zumba.jpg",
			Cupo:         20,
			Descripcion:  "Clase de zumba avanzada",
			CategoriaID:  3,
			InstructorID: 2,
		})
		Db.Create(&models.Activity{
			Titulo:       "Pilates Avanzado",
			Dia:          "Miércoles",
			Horario:      "18:30",
			Imagen:       "https://cdn.bioguia.com/embed/40cdd919eb835826b551c61729d1981660888087/Pilates.jpeg",
			Cupo:         12,
			Descripcion:  "Sesión avanzada de pilates para mejorar fuerza y postura",
			CategoriaID:  2,
			InstructorID: 1,
		})
		Db.Create(&models.Activity{
			Titulo:       "Funcional Intensivo",
			Dia:          "Martes",
			Horario:      "19:00",
			Imagen:       "https://delfitsports.es/wp-content/uploads/2022/07/11-buenos-ejercicios-para-incluir-en-tu-entrenamiento-funcional-1000x600-1.jpg",
			Cupo:         20,
			Descripcion:  "Entrenamiento funcional de alta intensidad para quemar calorías",
			CategoriaID:  2,
			InstructorID: 3,
		})
		Db.Create(&models.Activity{
			Titulo:       "Stretching y Relajación",
			Dia:          "Jueves",
			Horario:      "09:00",
			Imagen:       "https://actitudsaludable.net/wp-content/uploads/2015/08/tecnicas-de-relajacion.jpg",
			Cupo:         18,
			Descripcion:  "Clase para mejorar la flexibilidad y reducir el estrés",
			CategoriaID:  1,
			InstructorID: 3,
		})
	}

	// Poblar tabla inscriptions
	var inscCount int64
	Db.Model(&models.Inscription{}).Count(&inscCount)
	if inscCount == 0 {
		Db.Create(&models.Inscription{Fecha: "2025-07-01", UserId: 1, ActivityID: 1})
		Db.Create(&models.Inscription{Fecha: "2025-07-02", UserId: 2, ActivityID: 2})
		Db.Create(&models.Inscription{Fecha: "2025-07-03", UserId: 1, ActivityID: 3})
		Db.Create(&models.Inscription{Fecha: "2025-07-04", UserId: 2, ActivityID: 4})
	}
}