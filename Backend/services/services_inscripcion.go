package services

import (
	inscripcionClient "Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/clients/inscripcion"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/dto"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"
)

type inscriptionService struct{}

type inscripcionServiceInterface interface {
	AddInscripcion(inscripcionDto dto.InscriptionDto) (dto.InscriptionDto, error)
	GetInscripcionByActividadID(actividadID uint) (dto.InscriptionsDto, error)
	GetInscripcionByUsuarioAndActividadID(usuarioID uint, actividadID uint) (dto.InscriptionDto, error)
	DeleteInscripcion(usuarioID uint, actividadID uint) error
	GetInscripcionesByUsuarioID(usuarioID uint) (dto.InscriptionsDto, error)
	DeleteInscripcionesByActividadID(id int) error
}

var (
	InscripcionService inscripcionServiceInterface
)

func init() {
	InscripcionService = &inscriptionService{}
}

func (s *inscriptionService) AddInscripcion(inscripcionDto dto.InscriptionDto) (dto.InscriptionDto, error) {
	var inscripcion models.Inscription
	inscripcion.UserId = inscripcionDto.UserID
	inscripcion.ActivityID = inscripcionDto.ActivityID
	inscripcion.Fecha = inscripcionDto.Fecha

	newInscripcion := inscripcionClient.PostInscripcion(inscripcion)

	inscripcionDto.Id = newInscripcion.Id
	return inscripcionDto, nil
}

func (s *inscriptionService) GetInscripcionByActividadID(actividadID uint) (dto.InscriptionsDto, error) {
	var inscripcionesDto dto.InscriptionsDto
	inscripciones := inscripcionClient.GetInscripcionByActividadID(actividadID)

	for _, inscripcion := range inscripciones {
		inscripcionDto := dto.InscriptionDto{
			Id:           inscripcion.Id,
			Fecha:        inscripcion.Fecha,
			UserID:       inscripcion.UserId,
			Username:     inscripcion.User.Username,
			ActivityID:   inscripcion.ActivityID,
			ActivityName: inscripcion.Activity.Titulo,
		}
		inscripcionesDto = append(inscripcionesDto, inscripcionDto)
	}

	return inscripcionesDto, nil
}

func (s *inscriptionService) GetInscripcionByUsuarioAndActividadID(usuarioID uint, actividadID uint) (dto.InscriptionDto, error) {
	var inscripcionDto dto.InscriptionDto
	inscripcion := inscripcionClient.GetInscripcionByUsuarioAndActividadID(usuarioID, actividadID)

	if inscripcion.Id == 0 {
		return inscripcionDto, nil // No se encontró inscripción
	}

	inscripcionDto.Id = inscripcion.Id
	inscripcionDto.Fecha = inscripcion.Fecha
	inscripcionDto.UserID = inscripcion.UserId
	inscripcionDto.Username = inscripcion.User.Username
	inscripcionDto.ActivityID = inscripcion.ActivityID
	inscripcionDto.ActivityName = inscripcion.Activity.Titulo

	return inscripcionDto, nil
}

func (s *inscriptionService) DeleteInscripcion(usuarioID uint, actividadID uint) error {
	inscripcionClient.DeleteInscripcion(usuarioID, actividadID)
	return nil
}

func (s *inscriptionService) GetInscripcionesByUsuarioID(usuarioID uint) (dto.InscriptionsDto, error) {
	var inscripcionesDto dto.InscriptionsDto
	inscripciones := inscripcionClient.GetInscripcionesByUsuarioID(usuarioID)

	for _, inscripcion := range inscripciones {
		inscripcionDto := dto.InscriptionDto{
			Id:           inscripcion.Id,
			Fecha:        inscripcion.Fecha,
			UserID:       inscripcion.UserId,
			Username:     inscripcion.User.Username,
			ActivityID:   inscripcion.ActivityID,
			ActivityName: inscripcion.Activity.Titulo,
		}
		inscripcionesDto = append(inscripcionesDto, inscripcionDto)
	}

	return inscripcionesDto, nil
}

func (s *inscriptionService) DeleteInscripcionesByActividadID(id int) error {
	inscripcionClient.DeleteInscripcionesByActividadID(id)
	return nil
}
