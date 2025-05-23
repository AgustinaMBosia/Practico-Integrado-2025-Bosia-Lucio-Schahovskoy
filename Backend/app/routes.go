package app

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/handlers"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/handlers/actividad"
)

func mapUrls() {
	router.POST("/login", handlers.Login)
	router.POST("/register", handlers.Register)

	// router.GET("/actividad", handlers.GetAllActividades)
	router.GET("/actividad/:id", actividadHandler.GetActividadById)
	// router.POST("/actividad", handlers.AddActividad)
	// router.PUT("/actividad/:id", handlers.UpdateActividad)
	// router.DELETE("/actividad/:id", handlers.DeleteActividad)

	// router.GET("/actividad?query=texto", handlers.DeleteActividad)

	// router.GET("/inscripcion/usuario/:id", handlers.GetInscripcionByUsuarioID)
	// router.GET("/inscripcion/actividad/:id", handlers.GetInscripcionByActividadID)
	// router.GET("/inscripcion/usuario/:id/actividad/:id", handlers.GetInscripcionByUsuarioAndActividadID)
	// router.POST("/inscripcion", handlers.AddInscripcion)
	// router.DELETE("/inscripcion/:usuario_id/:actividad_id", handlers.DeleteIns)

	// router.GET("/categoria", handlers.GetAllCategorias)
	// router.POST("/categoria", handlers.AddCategoria)
	// router.DELETE("/categoria/:id", handlers.DeleteCategoria)

	// router.GET("/instructor", handlers.GetAllInstructores)
	// router.POST("/instructor", handlers.AddInstructor)
	// router.PUT("/instructor/:id", handlers.UpdateInstructor)
	// router.DELETE("/instructor/:id", handlers.DeleteInstructor)

}
