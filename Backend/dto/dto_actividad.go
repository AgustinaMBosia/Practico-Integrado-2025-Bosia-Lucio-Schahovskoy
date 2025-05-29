package dto

type ActivityDto struct {
	Id                   int    `json:"id"`
	Titulo               string `json:"titulo"`
	Horario              string `json:"horario"`
	//agregue esta linea de abajo
	Imagen               string `json:"imagen"`
	Dia                  string `json:"dia"`
	Cupo                 int    `json:"cupo"`
	Descripcion          string `json:"descripcion"`
	CategoriaID          int    `json:"categoria_id"`
	DescripcionCategoria string `json:"Categoria_description"`
	InstructorID         int    `json:"instructor_id"`
	InstructorNombre     string `json:"nombre_instructor"`

}

type ActivitiesDto []ActivityDto
