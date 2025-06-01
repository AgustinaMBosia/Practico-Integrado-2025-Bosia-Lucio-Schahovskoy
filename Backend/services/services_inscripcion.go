package services

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/clients/inscripcion"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/dto"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/models"
)

type inscriptionService struct{}

type inscripcionServiceInterface interface {
	AddInscripcion(inscripcionDto dto.InscriptionDto) (dto.InscriptionDto, error)
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
