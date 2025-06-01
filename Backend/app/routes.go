package app

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/handlers"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/handlers/actividad"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/handlers/inscripcion"
)

func mapUrls() {
	router.POST("/login", handlers.Login)
	router.POST("/register", handlers.Register)

	router.GET("/actividad", actividadHandler.GetAllActividades)
	router.GET("/actividad/:id", actividadHandler.GetActividadById)
	router.POST("/actividad", actividadHandler.AddActividad)
	router.PUT("/actividad/:id", actividadHandler.UpdateActividad)
	router.DELETE("/actividad/:id", actividadHandler.DeleteActividad)

	// Endpoint para buscar actividades por texto en título, horario, descripción o categoría
	//router.GET("/actividad/buscar", actividadHandler.BuscarActividades)

	// router.GET("/inscripcion/usuario/:id", handlers.GetInscripcionByUsuarioID)
	// router.GET("/inscripcion/actividad/:id", handlers.GetInscripcionByActividadID)
	// router.GET("/inscripcion/usuario/:id/actividad/:id", handlers.GetInscripcionByUsuarioAndActividadID)
	router.POST("/inscripcion", inscripcionHandler.AddInscripcion)
	// router.DELETE("/inscripcion/:usuario_id/:actividad_id", handlers.DeleteIns)

	// router.GET("/categoria", handlers.GetAllCategorias)
	// router.POST("/categoria", handlers.AddCategoria)
	// router.DELETE("/categoria/:id", handlers.DeleteCategoria)

	// router.GET("/instructor", handlers.GetAllInstructores)
	// router.POST("/instructor", handlers.AddInstructor)
	// router.PUT("/instructor/:id", handlers.UpdateInstructor)
	// router.DELETE("/instructor/:id", handlers.DeleteInstructor)
}
