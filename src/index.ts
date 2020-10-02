import { Request, Response } from "express";
import { appendFile } from "fs";
import "reflect-metadata";
import {createConnection, getConnection} from "typeorm";
import {createConnections} from "typeorm";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
const express = require('express');
const app = express();
const cors = require('cors');

async () => {
    
}


createConnection('db1').then(async connection => {

    //*********INNER JOIN**********
    //iniciar cors
    app.use(cors());
    
    //lectura y parseo del body
    app.use( express.json());
    let photoRepository = connection.getRepository(Photo);

    app.get("/photo", async (req: Request, res: Response) => {

    let photos = await photoRepository.find({ relations: ["metadata"] });
    res.json(photos);
    console.log(photos);
    });

    app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto', 3000);  
    });

}).catch(error => console.log(error));


//Conexiones multiples
// createConnections().then(async connection => {
//     console.log(connection);
// }).catch(error => console.log(error));