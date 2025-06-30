package services

import (
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/clients/instructor"
	"Practico-Integrado-2025-Bosia-Lucio-Schahovskoy/Backend/dto"
)

type instructorService struct{}
type instructorServiceInterface interface {
	GetAllInstructors() ([]dto.InstructorDto, error)
}

var (
	InstructorService instructorServiceInterface
)

func init() {
	InstructorService = &instructorService{}
}
func (s *instructorService) GetAllInstructors() ([]dto.InstructorDto, error) {
	var instructorsDto []dto.InstructorDto
	instructors := instructorClient.GetAllInstructors()

	for _, instructor := range instructors {
		instructorDto := dto.InstructorDto{
			Id:     instructor.Id,
			Nombre: instructor.Nombre,
			Email:  instructor.Email,
		}
		instructorsDto = append(instructorsDto, instructorDto)
	}

	return instructorsDto, nil
}
