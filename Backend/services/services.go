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

