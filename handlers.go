package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"
)

type PatientData struct {
	//Timestamp  time.Time `json:"timestamp"`
	SelectedID int       `json:"selectedID"`
	Data       string    `json:"data"`
	Timestamp  time.Time `json:"timestamp"`
}

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
	IsNew    bool   `json:"isnew"`
	Id       int    `json:"id"`
}

func (app *application) handlePatientData(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}

	var decoded_data PatientData
	json.Unmarshal([]byte(reqBody), &decoded_data)

	if decoded_data.SelectedID == 0 && decoded_data.Data == "" {
		return
	}

	decoded_data.Timestamp = time.Now()

	// NOW WRITE DATA TO DATABASE FOR DOCTORS ID
	sqlQuery := `INSERT INTO patientdata (id, data) VALUES ($1, $2)`
	_, err = app.DB.Exec(sqlQuery, decoded_data.SelectedID, decoded_data.Data)
	if err != nil {
		log.Fatal(err)
	}

	go app.deletePatientData(decoded_data)
}

func (app *application) handleDoctorData(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}

	var decoded_data User
	json.Unmarshal([]byte(reqBody), &decoded_data)

	sqlQuery := `SELECT data FROM patientdata WHERE id=$1`
	rows, err := app.DB.Query(sqlQuery, decoded_data.Id)

	var allData []PatientData
	for rows.Next() {
		var data string
		err = rows.Scan(&data)
		allData = append(allData, PatientData{Data: data, Timestamp: time.Now()})
	}

	json, err := json.Marshal(allData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(json)
}

func (app *application) handleLogin(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	enableCors(&w)
	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}

	var user User
	json.Unmarshal([]byte(reqBody), &user)

	if user.Username != "" && user.Password != "" {
		if !user.IsNew {
			userID := app.confirmUserLogin(user)
			var jsMessage []byte
			if userID != -1 && userID != 0 {
				jsMessage, _ = marshalledJSON(false, fmt.Sprintf("%v", userID))
			} else {
				jsMessage, _ = marshalledJSON(true, fmt.Sprintf("%v", userID))
			}
			w.Write(jsMessage)
		} else if user.IsNew {
			var jsMessage []byte
			err := app.createNewUser(&user)
			if err != nil {
				jsMessage, err = marshalledJSON(false, "Account Created")
			} else {
				jsMessage, err = marshalledJSON(true, err.Error())
			}
			if err != nil {
				log.Fatal(err)
			}
			w.Write(jsMessage)
		}
	}

}
