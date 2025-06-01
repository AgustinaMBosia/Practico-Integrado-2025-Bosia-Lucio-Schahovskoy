package dto

type InscriptionDto struct {
	Id           int    `json:"id"`
	Fecha        string `json:"fecha"`
	UserID       int    `json:"usuario_id"`
	Username     string `json:"username"`
	ActivityID   int    `json:"actividad_id"`
	ActivityName string `json:"nombre_actividad"`
}

type InscriptionsDto []InscriptionDto

/*
	"fecha":"fecha",
	"usuario_id": 1,
	"username": "username",
	"actividad_id": 1,
	"nombre_actividad":"nombre"

}
*/
