const express = require('express');
const Joi = require('joi');
const sqlite3 = require('sqlite3').verbose();

const route = express.Router();
route.use(express.json());

let db = new sqlite3.Database('D:\\Fakultet\\III Godina\\SKRIPT JEZIK\\ZavrsniProjekat_Django\\DjangoProjekat\\db.sqlite3.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});


const schemaMalina = Joi.object().keys({
    idMalina: Joi.number().allow(),
    vrsta: Joi.string().max(100).required(),
    cenaPoKg: Joi.number().max(99999).required()

});

const schemaKupina = Joi.object().keys({
    idKupina: Joi.number().allow(),
    vrsta: Joi.string().max(100).required(),
    cenaPoKg: Joi.number().max(99999).required()
});


route.get('/malina/all', (req, res) => {
    let query = 'select * from Malina'
    let params = []
    db.serialize(function () {
        db.all(query, function (err, rows) {
            if (err) {
                res.send("Error encountered while getting all params");
                return console.error(err.message);
            }
            res.json({
                "message": "Successfully got all rows",
                "data": rows
            })
        });
    });
});

route.post('/malina/add', (req, res) => {
    let data = {
        vrsta: req.body.vrsta,
        cenaPoKg: req.body.cenaPoKg,
        klasa: req.body.klasa
    }
    let {error} = schemaMalina.validate(data);
    if (error)
        res.send("Error encountered while validating values");
    else {
        db.serialize(() => {
            db.run('INSERT INTO Malina( vrsta, cenaPoKg, klasa) VALUES(?,?,?)', [data.vrsta, data.cenaPoKg, data.klasa], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("New malina has been added");
                res.json({
                    "message": "New malina has been added into the database with ID = " + data.id + " and Vrsta = " + data.vrsta,
                    "data": data,
                    "id": this.id
                });
            });
        });
    }
});

route.post('/malina/update/:id', (req, res) => {
    let data = {
        vrsta: req.body.vrsta,
        cenaPoKg: req.body.cenaPoKg,
        klasa: req.body.klasa
    }
    let {error} = schemaMalina.validate(data);
    if (error)
        res.send("Error encountered while validating values");
    else {
        db.serialize(() => {
            db.run('UPDATE Malina SET vrsta = ?, cenaPoKg = ?, klasa = ? WHERE id = ?', [data.vrsta, data.cenaPoKg, data.klasa, req.params.id], function (err) {
                if (err) {
                    res.send("Error encountered while updating");
                    return console.error(err.message);
                }
                console.log("Entry updated successfully");
                res.json({
                    "message":"Entry updated successfully",
                    "data": data
                    //ovde changes
                });

            });
        });

    }
});

route.delete('/malina/delete/:id', (req, res) => {

    db.serialize(() => {
        db.run('DELETE FROM Malina WHERE id = ?', req.params.id, function (err) {
            if (err) {
                res.send("Error encountered while deleting");
                return console.error(err.message);
            }
            res.send("Entry deleted");
            console.log("Entry deleted");
        });
    });

});

route.get('/kupina/all', (req, res) => {
    let query = 'select * from Kupina'
    let params = []
    db.serialize(function () {
        db.all(query, function (err, rows) {
            if (err) {
                res.send("Error encountered while getting all params");
                return console.error(err.message);
            }
            res.json({
                "message": "Successfully got all rows",
                "data": rows
            })
        });
    });
});

route.post('/kupina/add', (req, res) => {
    let data = {
        vrsta: req.body.vrsta,
        cenaPoKg: req.body.cenaPoKg,
        klasa: req.body.klasa
    }
    let {error} = schemaKupina.validate(data);
    if (error)
        res.send("Error encountered while validating values");
    else {
        db.serialize(() => {
            db.run('INSERT INTO Kupina( vrsta, cenaPoKg, klasa) VALUES(?,?,?)', [data.vrsta, data.cenaPoKg, data.klasa], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("New kupina has been added");
                res.json({
                    "message": "New kupina has been added into the database with ID = " + data.id + " and Vrsta = " + data.vrsta,
                    "data": data,
                    "id": this.id
                });
            });
        });
    }
});

route.post('/kupina/update/:id', (req, res) => {
    let data = {
        vrsta: req.body.vrsta,
        cenaPoKg: req.body.cenaPoKg,
        klasa: req.body.klasa
    }
    let {error} = schemaKupina.validate(data);
    if (error)
        res.send("Error encountered while validating values");
    else {
        db.serialize(() => {
            db.run('UPDATE Kupina SET vrsta = ?, cenaPoKg = ?, klasa = ? WHERE id = ?', [data.vrsta, data.cenaPoKg, data.klasa, req.params.id], function (err) {
                if (err) {
                    res.send("Error encountered while updating");
                    return console.error(err.message);
                }
                console.log("Entry updated successfully");
                res.json({
                    "message":"Entry updated successfully",
                    "data": data
                    //ovde changes
                });

            });
        });

    }
});

route.delete('/kupina/delete/:id', (req, res) => {

    db.serialize(() => {
        db.run('DELETE FROM Kupina WHERE id = ?', req.params.id, function (err) {
            if (err) {
                res.send("Error encountered while deleting");
                return console.error(err.message);
            }
            res.send("Entry deleted");
            console.log("Entry deleted");
        });
    });

});


module.exports = route;

