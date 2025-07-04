package app

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/handlers"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/handlers/actividad"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/handlers/categoria"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/handlers/inscripcion"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/handlers/instructor"
)

func mapUrls() {
	router.POST("/login", handlers.Login)
	router.POST("/register", handlers.Register)

	router.GET("/actividad", actividadHandler.GetAllActividades)
	router.GET("/actividad/:id", actividadHandler.GetActividadById)
	router.POST("/actividad", actividadHandler.AddActividad)
	router.PUT("/actividad/:id", actividadHandler.UpdateActividad)
	router.DELETE("/actividad/:id", actividadHandler.DeleteActividad)

	// Endpoint para buscar actividades por texto en título, horario, descripción o categoría /actividad?query=texto
	router.GET("/actividad/buscar", actividadHandler.BuscarActividad)

	// lo que se pone en el endpoint es: /actividad?query=Yoga

	router.GET("/inscripcion/actividad/:id", inscripcionHandler.GetInscripcionByActividadID)
	router.GET("/inscripcion/usuario/:usuario_id/actividad/:actividad_id", inscripcionHandler.GetInscripcionByUsuarioAndActividadID)
	// este GET cambié como se llaman el :usuario_id y actividad_id

	router.POST("/inscripcion", inscripcionHandler.AddInscripcion)
	// también cambié el DELETE para que se entienda mejor
	router.DELETE("/inscripcion/usuario/:usuario_id/actividad/:actividad_id", inscripcionHandler.DeleteInscripcion)

	router.GET("/categoria", categoriaHandler.GetAllCategorias)
	// router.POST("/categoria", categoriaHandler.AddCategoria)
	// router.DELETE("/categoria/:id", categoriaHandler.DeleteCategoria)

	router.GET("/instructor", instructorHandler.GetAllInstructors)
	// router.POST("/instructor", instructorHandler.AddInstructor)
	// router.PUT("/instructor/:id", instructorHandler.UpdateInstructor)
	// router.DELETE("/instructor/:id", instructorHandler.DeleteInstructor)

	// FINAL
	// get de las actividades de un usario
	router.GET("/inscripcion/usuario/:usuario_id", inscripcionHandler.GetInscripcionesByUsuarioID)

}
