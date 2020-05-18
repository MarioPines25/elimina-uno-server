'use strict';
const log4js = require('log4js');
const logger = log4js.getLogger('SampleWebApp');
const express = require('express');
const router = express.Router();

// excel interactions
var Excel = require('exceljs');
var workbook = new Excel.Workbook();

// json file writer
const writeJsonFile = require('write-json-file');

//db interactions
const query = require('../db/queries/query.js');

router.get('/',async function (req,res){
    //res.setHeader('Content-Type', 'text/plain');

    /* 
        El procedimiento para llenar la base de datos sera el siguiente:
        1.  Accedemos a las filas creando un objeto con cada uno de los jugadores:

            nombre = 3
            posicion = 22
            pierna = 15
            nacionalidad = 6
            club = 10
            media = 8
            imagen = 5

        2.  Por cada uno de estos jugadores anyadimos una nueva entrada
            a la tabla futbol
    */
    workbook.xlsx.readFile('./fifa19.xlsx')
       .then(async function() {

           var worksheet = workbook.getWorksheet(1);

           var nombres = worksheet.getColumn(3).values;
           var posiciones = worksheet.getColumn(22).values;
           var piernas = worksheet.getColumn(15).values;
           var nacionalidades = worksheet.getColumn(6).values;
           var clubes = worksheet.getColumn(10).values;
           var medias = worksheet.getColumn(8).values;
           var imagenes = worksheet.getColumn(5).values;

           var jugador;   // En esta variable almacenamos jugador por jugador /7
           var jugadores=new Array(nombres.length);
           for(var i = 2; i < nombres.length; i++){
            jugador = [nombres[i],posiciones[i], piernas[i], nacionalidades[i], clubes[i], medias[i],imagenes[i]];

            /*
            console.log("JUGADOR: " + jugador[0] + ", POSICION: " + jugador[1] +
            ", PIERNA: " + jugador[2] + ", NACIONALIDAD: " + jugador[3] + 
            ", CLUB: "+ jugador[4] + ", MEDIA: " + jugador[5] + ", IMAGEN: "+ jugador[6]);
            */
           
            jugadores[i]=jugador;

            var futboQuery = 'INSERT INTO futbol(jugador,posicion,pierna,nacionalidad,club,media,foto)VALUES($1,$2,$3,$4,$5,$6,$7)'
            var futbol = await query(futboQuery, [jugador[0],jugador[1],jugador[2],jugador[3],jugador[4],jugador[5],jugador[6]])
            
           }

           await writeJsonFile('jugadores.json', {jugadores: jugadores});

           res.statusCode = 200;
           res.send('---- BASE DE DATOS LLENADA ----');
       }) 
})
module.exports=router