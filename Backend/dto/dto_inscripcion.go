package dto

type InscriptionDto struct {
	Id           int    `json:"id"`
	Fecha        string `json:"fecha"`
	UsuerID      int    `json:"usuario_id"`
	Username     string `json:"username"`
	ActivityID   int    `json:"actividad_id"`
	ActivityName string `json:"nombre_actividad"`
}

type InscriptionsDto []InscriptionDto
