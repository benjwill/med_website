package main

import (
	"crypto/rand"
	"database/sql"
	"encoding/json"
	"errors"
	"hash/fnv"
	"math"
	"math/big"
	"net/http"
	"time"
)

type JSONresponse struct {
	Error   bool   `json:"error"`
	Message string `json:"message"`
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func hash(s string) uint32 {
	h := fnv.New32a()
	h.Write([]byte(s))
	return h.Sum32()
}

func generateRandomNumber(numberOfDigits int) (int, error) {
	maxLimit := int64(int(math.Pow10(numberOfDigits)) - 1)
	lowLimit := int(math.Pow10(numberOfDigits - 1))

	randomNumber, err := rand.Int(rand.Reader, big.NewInt(maxLimit))
	if err != nil {
		return 0, err
	}
	randomNumberInt := int(randomNumber.Int64())

	// Handling integers between 0, 10^(n-1) .. for n=4, handling cases between (0, 999)
	if randomNumberInt <= lowLimit {
		randomNumberInt += lowLimit
	}

	// Never likely to occur, kust for safe side.
	if randomNumberInt > int(maxLimit) {
		randomNumberInt = int(maxLimit)
	}
	return randomNumberInt, nil
}

func marshalledJSON(isErr bool, message string) ([]byte, error) {
	var marshalledData []byte
	payload := JSONresponse{
		Error:   isErr,
		Message: message,
	}
	marshalledData, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}

	return marshalledData, nil
}

func (app *application) confirmUserLogin(user User) int { //returns ID of user if able, else -1
	//var data string
	hashedPassword := hash(user.Password)

	if user.Username == "" || user.Password == "" {
		return -1
	}

	var requestedID int
	sqlQuery := `SELECT id FROM users WHERE password=$1 AND username=$2`
	_ = app.DB.QueryRow(sqlQuery, hashedPassword, user.Username).Scan(&requestedID)

	if requestedID != 0 {
		return requestedID
	}

	return -1
}

func (app *application) createNewUser(user *User) error {
	userExists, err := app.userExists(user)
	if err != nil {
		return errors.New("Could not create new user")
	}
	if userExists {
		return errors.New("User already exists")
	}

	randomID, err := generateRandomNumber(8)
	if err != nil {
		return err
	}
	hashedPassword := hash(user.Password)

	queryStr := `INSERT INTO users (id, username, password) VALUES ($1, $2, $3)`
	_, err = app.DB.Exec(queryStr, randomID, user.Username, hashedPassword)
	if err != nil {
		return err
	}
	return nil
}

func (app *application) userExists(user *User) (bool, error) {
	var username string
	queryStr := `SELECT username FROM users WHERE username=$1`
	err := app.DB.QueryRow(queryStr, user.Username).Scan(&username)
	if err != nil {
		if err != sql.ErrNoRows {
			return false, err
		}

		return false, nil
	}

	return true, nil
}

func (app *application) deletePatientData(p PatientData) error {
	time.Sleep(5 * time.Minute)
	sqlQuery := `DELETE FROM patientdata WHERE id=$1`
	_, err := app.DB.Exec(sqlQuery, p.SelectedID)
	if err != nil {
		return err
	}

	return nil
}
