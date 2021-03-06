import { Imports, RegisterFunction } from "./server_types";
import { Router } from "express";
import * as fse from "fs-extra";
import * as mqtt from "mqtt";

export function setup (options: any, imports: Imports, register: RegisterFunction){
    let image_display = {
    };
    let imageDisplayRouter = Router();

    const client = mqtt.connect('mqtt://broker.hivemq.com');
    client.on('connect', () => {
    console.log("Mqtt broker connected");
        client.subscribe('ipw/ruxi/sensors', function() {
            client.on('message', function(topic, message, packet) {
                console.log("Received '" + message + "' on '" + topic + "'");
                if(topic === "ipw/ruxi/sensors") {
                    let stringMessage = Buffer.from(message).toString();
                    let objectMessage = JSON.parse(stringMessage);

                    fse.writeFileSync('./data.json', objectMessage);
                }

            });
          });
    });

    imageDisplayRouter.get("/get/data/iot", async(req,res) => {
        try {
            let iotData:Buffer = ({} as Buffer);
            let stringData:string = "";
            let sendData:any = {};

            iotData = fse.readFileSync("./data.json");  /This is a Buffer/
            if(iotData){
                stringData = Buffer.from(iotData).toString(); /This is a string/
            }else {
                console.log("could not read file");
                res.status(500).send({});
            }

            if(stringData){
                sendData = JSON.parse(stringData); /This is an object/
            }else {
                console.log("could not parse the file");
                res.status(500).send({});
            }

            if(sendData) {
                console.log(sendData.temparture);
                res.status(200).send(sendData);
            }

        } catch (e) {
            console.error(e);
            res.status(500).send({err:500});

        }
    });

 imageDisplayRouter.post("/send/data/iot", async(req,res) => {
        try {
            let message = req.body.message;
            let topic = req.body.topic;
            client.publish(topic,message);
            console.log("Sent to IoT: " + topic + message);

            res.status(200).send({});
        } catch (e) {
            console.error(e);
            res.status(500).send({err:500});

        }
    })



    //a simple get route -> Go to PostGetExample.vue to see how you can use it in the frontend;
    imageDisplayRouter.get("/get/data", async(req, res) => {
        try {
            res.status(200).send("This is a get example");
        } catch (e) {
            console.error(e);
            res.status(500).send({err:500});

        }
    });

    //a simple post route -> Go to PostGetExample.vue to see how you can use it in the frontend;
    imageDisplayRouter.post("/post/data", async(req, res) => {
        try {

            res.status(200).send("This is a post example");
        } catch (e) {
            console.error(e);
            res.status(500).send({err:500});

        }
    });



    imageDisplayRouter.get("/getfrom/iot", async(req, res) => {
        try {
            let data = req.body;
            


            res.status(200).send("This is a post example");
        } catch (e) {
            console.error(e);
            res.status(500).send({err:500});

        }
    });

    imageDisplayRouter.get("/example/:param1/:param2", async(req, res) => {
        try {
            let param1:string = req.params.param1;
            let param2number:number = parseInt(req.params.param2);
            console.log(param1);
            
            let response = param1 + "This is a response " + param2number;
           res.status(200).send(
                {
                    response:"Hardcoded string",
                    text:"I successfuly responded"
                }
            );

        } catch (e) {
            console.error(e);
            res.status(500).send({err:500});

        }
    });

    
    //webserver must be consumend in the package.json of this plugin in order for this to work
    imports.webserver.registerRouterApi(1, imageDisplayRouter);
    
    register (null, {
        image_display
    });
}