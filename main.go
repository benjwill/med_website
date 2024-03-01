package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

type application struct {
	DSN string
	DB  *sql.DB
}

// DSN for connecting to db
const (
	user     = "postgres"
	password = "IDFG9265ps!!"
	dbname   = "postgres"
	port     = "5432"
	sslMode  = "disable"
)

func main() {
	var app application

	connectionString := fmt.Sprintf("user=%s password=%s dbname=%s port=%s sslmode=%s", user, password, dbname, port, sslMode)

	app.DSN = connectionString

	db, err := sql.Open("postgres", app.DSN)
	if err != nil {
		log.Fatal(err)
	}
	defer app.DB.Close()

	app.DB = db

	_, err = app.DB.Exec(`DELETE FROM patientdata`)
	if err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("/patientData", app.handlePatientData)
	http.HandleFunc("/doctorData", app.handleDoctorData)
	http.HandleFunc("/login", app.handleLogin)
	http.ListenAndServe(":8080", nil)
}
