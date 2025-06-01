package actividadClient

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"
	"log"
	"strings"

	"gorm.io/gorm"
)

var Db *gorm.DB

func GetActividadById(id int) models.Activity {
	var actividad models.Activity

	// el el preload de Categoria decia "category" y no andaba, lo cambie a "categoria" atte:Karol
	Db.Where("id = ?", id).Preload("Categoria").Preload("Instructor").First(&actividad)
	return actividad
}

func PostActividad(actividad models.Activity) models.Activity {
	result := Db.Create(&actividad)
	if result.Error != nil {
		log.Fatal("Error creating actividad: ", result.Error)
	}
	return actividad
}

func GetAllActividades() []models.Activity {
	var actividades []models.Activity

	//aca tmb lo cambie
	result := Db.Preload("Categoria").Preload("Instructor").Find(&actividades)

	if result.Error != nil {
		log.Fatal("Error getting all actividades: ", result.Error)
	}

	return actividades
}

func UpdateActividad(id int, actividad models.Activity) models.Activity {
	var existingActividad models.Activity

	// Verificar si la actividad existe
	if Db.First(&existingActividad, id).RowsAffected == 0 {
		log.Println("Actividad not found with ID:", id)
		return models.Activity{}
	}

	// Actualizar los campos de la actividad existente
	existingActividad.Titulo = actividad.Titulo
	existingActividad.Horario = actividad.Horario
	existingActividad.Imagen = actividad.Imagen
	existingActividad.Dia = actividad.Dia
	existingActividad.Descripcion = actividad.Descripcion
	existingActividad.Cupo = actividad.Cupo
	existingActividad.CategoriaID = actividad.CategoriaID
	existingActividad.InstructorID = actividad.InstructorID

	// Guardar los cambios en la base de datos
	if err := Db.Save(&existingActividad).Error; err != nil {
		log.Println("Error updating actividad:", err)
		return models.Activity{}
	}

	return existingActividad
}

func DeleteActividad(id int) error {
	var actividad models.Activity

	// Verificar si la actividad existe
	if Db.First(&actividad, id).RowsAffected == 0 {
		log.Println("Actividad not found with ID:", id)
		return nil // No error, but no activity found
	}

	// Eliminar la actividad
	if err := Db.Delete(&actividad).Error; err != nil {
		log.Println("Error deleting actividad:", err)
		return err
	}

	return nil
}

func BuscarActividad(texto string) []models.Activity {
	var actividades []models.Activity
	textoLike := "%" + strings.ToLower(texto) + "%"

	result := Db.
		Joins("JOIN categories ON categories.id = activities.categoria_id").
		Preload("Categoria").
		Preload("Instructor").
		Where(`
		LOWER(activities.titulo) LIKE ? OR
		LOWER(activities.descripcion) LIKE ? OR
		LOWER(categories.nombre) LIKE ? OR
		LOWER(activities.horario) LIKE ?`,
			textoLike, textoLike, textoLike, textoLike,
		).
		Find(&actividades)

	if result.Error != nil {
		log.Println("Error searching actividades:", result.Error)
	}

	return actividades
}
