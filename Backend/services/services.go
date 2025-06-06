package services

// → verificar email y password, generar token.

// → buscar actividades, crear actividad, editar actividad.

// → inscribir usuarios en actividades.

// → buscar usuarios, crear usuario, editar usuario.

// → buscar categorias, crear categoria, editar categoria.

// → buscar inscripciones, crear inscripcion, editar inscripcion.

import (
	actividadCliente "Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/clients/actividad"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/dto"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"
)

type actividadService struct{}

type actividadServiceInterface interface {
	GetActividadById(id int) (dto.ActivityDto, error)
	GetAllActividades() ([]dto.ActivityDto, error)
	AddActividad(actividadDto dto.ActivityDto) (dto.ActivityDto, error)
	UpdateActividad(actividadDto dto.ActivityDto) (dto.ActivityDto, error)
	DeleteActividad(id int) error
	BuscarActividad(texto string) ([]dto.ActivityDto, error)
}

var (
	ActividadService actividadServiceInterface
)

func init() {
	ActividadService = &actividadService{}
}

func (s *actividadService) GetActividadById(id int) (dto.ActivityDto, error) {
	var actividad models.Activity = actividadCliente.GetActividadById(id)
	var actividadDto dto.ActivityDto

	if actividad.Id == 0 {
		return actividadDto, nil
	}

	actividadDto.Id = actividad.Id
	actividadDto.Titulo = actividad.Titulo
	actividadDto.Horario = actividad.Horario
	//Esta linea de abajo es la que agregue
	actividadDto.Imagen = actividad.Imagen
	actividadDto.Dia = actividad.Dia
	actividadDto.Descripcion = actividad.Descripcion
	actividadDto.Cupo = actividad.Cupo
	actividadDto.DescripcionCategoria = actividad.Categoria.Nombre
	actividadDto.CategoriaID = actividad.Categoria.Id
	actividadDto.InstructorID = actividad.Instructor.Id
	actividadDto.InstructorNombre = actividad.Instructor.Nombre

	return actividadDto, nil
}

func (s *actividadService) GetAllActividades() ([]dto.ActivityDto, error) {
	var actividades []models.Activity = actividadCliente.GetAllActividades()
	var actividadesDto []dto.ActivityDto

	for _, actividad := range actividades {
		var actividadDto dto.ActivityDto
		actividadDto.Id = actividad.Id
		actividadDto.Titulo = actividad.Titulo
		actividadDto.Horario = actividad.Horario
		//Agregue esta linea de abajo
		actividadDto.Imagen = actividad.Imagen
		actividadDto.Dia = actividad.Dia
		actividadDto.Descripcion = actividad.Descripcion
		actividadDto.Cupo = actividad.Cupo
		actividadDto.DescripcionCategoria = actividad.Categoria.Nombre
		actividadDto.CategoriaID = actividad.Categoria.Id
		actividadDto.InstructorID = actividad.Instructor.Id
		actividadDto.InstructorNombre = actividad.Instructor.Nombre

		actividadesDto = append(actividadesDto, actividadDto)
	}

	return actividadesDto, nil
}
func (s *actividadService) AddActividad(actividadDto dto.ActivityDto) (dto.ActivityDto, error) {
	// Permitir CategoriaID e InstructorID vacíos para pruebas
	var actividad models.Activity
	actividad.Titulo = actividadDto.Titulo
	actividad.Horario = actividadDto.Horario
	actividad.Imagen = actividadDto.Imagen
	actividad.Dia = actividadDto.Dia
	actividad.Descripcion = actividadDto.Descripcion
	actividad.Cupo = actividadDto.Cupo

	// Solo asignar si son distintos de cero
	if actividadDto.CategoriaID != 0 {
		actividad.CategoriaID = actividadDto.CategoriaID
	}
	if actividadDto.InstructorID != 0 {
		actividad.InstructorID = actividadDto.InstructorID
	}

	newActividad := actividadCliente.PostActividad(actividad)

	var newActividadDto dto.ActivityDto
	newActividadDto.Id = newActividad.Id
	newActividadDto.Titulo = newActividad.Titulo
	newActividadDto.Horario = newActividad.Horario
	newActividadDto.Imagen = newActividad.Imagen
	newActividadDto.Dia = newActividad.Dia
	newActividadDto.Descripcion = newActividad.Descripcion
	newActividadDto.Cupo = newActividad.Cupo
	newActividadDto.DescripcionCategoria = newActividad.Categoria.Nombre
	newActividadDto.CategoriaID = newActividad.Categoria.Id
	newActividadDto.InstructorID = newActividad.Instructor.Id
	newActividadDto.InstructorNombre = newActividad.Instructor.Nombre

	return newActividadDto, nil
}

func (s *actividadService) UpdateActividad(actividadDto dto.ActivityDto) (dto.ActivityDto, error) {
	actividad := models.Activity{
		Id:           actividadDto.Id,
		Titulo:       actividadDto.Titulo,
		Horario:      actividadDto.Horario,
		Imagen:       actividadDto.Imagen,
		Dia:          actividadDto.Dia,
		Descripcion:  actividadDto.Descripcion,
		Cupo:         actividadDto.Cupo,
		CategoriaID:  actividadDto.CategoriaID,
		InstructorID: actividadDto.InstructorID,
	}

	updatedActividad := actividadCliente.UpdateActividad(actividad.Id, actividad)

	var updatedActividadDto dto.ActivityDto
	updatedActividadDto.Id = updatedActividad.Id
	updatedActividadDto.Titulo = updatedActividad.Titulo
	updatedActividadDto.Horario = updatedActividad.Horario
	updatedActividadDto.Imagen = updatedActividad.Imagen
	updatedActividadDto.Dia = updatedActividad.Dia
	updatedActividadDto.Descripcion = updatedActividad.Descripcion
	updatedActividadDto.Cupo = updatedActividad.Cupo
	updatedActividadDto.DescripcionCategoria = updatedActividad.Categoria.Nombre
	updatedActividadDto.CategoriaID = updatedActividad.Categoria.Id
	updatedActividadDto.InstructorID = updatedActividad.Instructor.Id
	updatedActividadDto.InstructorNombre = updatedActividad.Instructor.Nombre

	return updatedActividadDto, nil
}

func (s *actividadService) DeleteActividad(id int) error {
	err := actividadCliente.DeleteActividad(id)
	if err != nil {
		return err
	}
	return nil
}

func (s *actividadService) BuscarActividad(texto string) ([]dto.ActivityDto, error) {
	var actividades []models.Activity = actividadCliente.BuscarActividad(texto)
	var actividadesDto []dto.ActivityDto

	for _, actividad := range actividades {
		var actividadDto dto.ActivityDto
		actividadDto.Id = actividad.Id
		actividadDto.Titulo = actividad.Titulo
		actividadDto.Horario = actividad.Horario
		actividadDto.Imagen = actividad.Imagen
		actividadDto.Dia = actividad.Dia
		actividadDto.Descripcion = actividad.Descripcion
		actividadDto.Cupo = actividad.Cupo
		actividadDto.DescripcionCategoria = actividad.Categoria.Nombre
		actividadDto.CategoriaID = actividad.Categoria.Id
		actividadDto.InstructorID = actividad.Instructor.Id
		actividadDto.InstructorNombre = actividad.Instructor.Nombre

		actividadesDto = append(actividadesDto, actividadDto)
	}

	return actividadesDto, nil
}
