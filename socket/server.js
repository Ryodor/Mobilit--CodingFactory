process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
//const manette2 = require('./controllerStruct');
const manette1 = require('./controllerStruct');
const fetch = require('node-fetch');
const io = require('socket.io')();
var SerialPort = require('serialport');
var xbee_api = require('xbee-api');
var C = xbee_api.constants;

var xbeeAPI = new xbee_api.XBeeAPI({
  api_mode: 1
});

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
let serialport = new SerialPort("/dev/tty.SLAB_USBtoUART", {
  baudRate: 9600,
}, function (err) {
  if (err) {
    return console.log('Error: ', err.message)
  }
});

serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);

serialport.on("open", function () {
<<<<<<< Updated upstream
 /* var frame_obj = { // AT Request to be sent
    type: C.FRAME_TYPE.AT_COMMAND,
    command: "D0",
    commandParameter: [5],
  };*/
=======
  // var frame_obj = { // AT Request to be sent
  //   type: C.FRAME_TYPE.AT_COMMAND,
  //   command: "NI",
  //   commandParameter: [],
  // };
>>>>>>> Stashed changes

  // xbeeAPI.builder.write(frame_obj);

  frame_obj = { // AT Request to be sent
    type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
    destination64: "FFFFFFFFFFFFFFFF",
    command: "D1",
    commandParameter: [],
  };
  xbeeAPI.builder.write(frame_obj);

  initialiseController();
  getDataTest();

  manette1.idPlayer = 1;
  //manette2.idPlayer = 2;
});

var initialedController = false;
var macAdressTable = [];
var frameTable = [];
// All frames parsed by the XBee will be emitted here
xbeeAPI.parser.on("data", function (frame) {
  if(macAdressTable.indexOf(frame.remote16) == -1 && frame.remote64.startsWith('0013a200')){
    manette1.macAddress = frame.remote16;
  }
  //console.log(frame);
  //console.log(frame.type);
  console.log(macAdressTable);
  //on new device is joined, register it

  //on packet received, dispatch event
  //let dataReceived = String.fromCharCode.apply(null, frame.data);
  if (C.FRAME_TYPE.ZIGBEE_RECEIVE_PACKET === frame.type) {
    console.log("C.FRAME_TYPE.ZIGBEE_RECEIVE_PACKET");
    let dataReceived = String.fromCharCode.apply(null, frame.data);
    console.log(">> ZIGBEE_RECEIVE_PACKET >", dataReceived);

    browserClient && browserClient.emit('pad-event', {
      device: frame.remote64,
      data: dataReceived
    });
  }

  if (C.FRAME_TYPE.NODE_IDENTIFICATION === frame.type) {
    //let dataReceived = String.fromCharCode.apply(null, frame.nodeIdentifier);
    console.log(">> ZIGBEE_RECEIVE_PACKET >", frame);
  } else if (C.FRAME_TYPE.ZIGBEE_IO_DATA_SAMPLE_RX === frame.type) {       
    frameTable.push(frame);
    manette1.getBtn(frame);
    manette1.setTmpLed();
    console.log(manette1);
    //console.log(frame);

<<<<<<< Updated upstream
  } else if (C.FRAME_TYPE.ZIGBEE_IO_DATA_SAMPLE_RX === frame.type) {
    console.log("Zibgee IO DATA: " + frame.data);
=======
    if((manette1.btnBlue) == 1 && (manette1.tmpLedBlue == 1 && (manette1.ledBlue == 0))){
      frameTable.push(manette1.ledBlueOn());
        xbeeAPI.builder.write(manette1.ledBlueOn());
        setTimeout(() => {
          xbeeAPI.builder.write(manette1.ledBlueOff());
        }, 1000);
    } 
    // if(manette1.btnBlue == 0 && (manette1.tmpLedBlue == 0 && (manette1.ledBlue == 1))) {      
    //   frameTable.push(manette1.ledBlueOff());
    //   try {
    //     xbeeAPI.builder.write(manette1.ledBlueOff());
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   console.log('bleu off');        
    // }
  
    if(manette1.btnRed == 1 && (manette1.tmpLedRed == 1 && (manette1.ledRed == 0))){   
      frameTable.push(manette1.ledRedOn());
      xbeeAPI.builder.write(manette1.ledRedOn());
      setTimeout(() => {
        xbeeAPI.builder.write(manette1.ledRedOff());
      }, 1000);
    } 
    // if(manette1.btnRed == 0 && (manette1.tmpLedRed == 0 && (manette1.ledRed == 1 ))) {
    //   frameTable.push(manette1.ledRedOff());
    //   try {
    //     xbeeAPI.builder.write(manette1.ledRedOff()); 
    //   } catch (error) {
    //     console.log(error);
    //   }             
    // }

    if(manette1.btnYellow == 1 && (manette1.tmpLedYellow == 1 &&(manette1.ledYellow == 0))){
      frameTable.push(manette1.ledYellowOn());      
      xbeeAPI.builder.write(manette1.ledYellowOn());           
      setTimeout(() => {
        xbeeAPI.builder.write(manette1.ledYellowOff());
      }, 1000);
    }
    // if(manette1.btnYellow == 0 && (manette1.tmpLedYellow == 0 &&(manette1.ledYellow == 1))){
    //   frameTable.push(manette1.ledYellowOff());
    //   try {
    //     xbeeAPI.builder.write(manette1.ledYellowOff()); 
    //   } catch (error) {
    //     console.log(error);
    //   }      
    // }
>>>>>>> Stashed changes

    if(manette1.btnGreen == 1 && (manette1.tmpLedGreen == 1 &&(manette1.ledGreen == 0))){
      frameTable.push(manette1.ledGreenOn());
      xbeeAPI.builder.write(manette1.ledGreenOn());
      setTimeout(() => {
        xbeeAPI.builder.write(manette1.ledGreenOff());
      }, 1000);
    }

    // if(manette1.btnGreen == 0 && (manette1.tmpLedGreen == 0 &&(manette1.ledGreen == 1))){
    //   frameTable.push(manette1.ledGreenOff());
    //   xbeeAPI.builder.write(manette1.ledGreenOff());
    // }
    manette1.setLed();    
  } else if (C.FRAME_TYPE.REMOTE_COMMAND_RESPONSE === frame.type) {
<<<<<<< Updated upstream
    console.log("Remote command response:" + frame.data);
=======
    //console.log(frame);
    //console.log("Remote command response: " + frame.data);
>>>>>>> Stashed changes
  } else {
    console.debug(frame);
    let dataReceived = String.fromCharCode.apply(null, frame.commandData)
    console.log(dataReceived);
  }

});
let browserClient;
io.on('connection', (client) => {
  console.log(client.client.id);
  browserClient = client;

  client.on('subscribeToPad', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    // setInterval(() => {
    //   client.emit('pad-event', {
    //     device: "test device",
    //     data: Math.round(Math.random()) * 2 - 1
    //   })
    //   ;
    // }, Math.random() * 1000);
  });

  client.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = 8001;
io.listen(port);
console.log('listening on port ', port);
//
// serial_xbee.on("data", function(data) {
//     console.log(data.type);
//   // console.log('xbee data received:', data.type);
//   // client.emit('timer', "pouet");
// //
// });

// shepherd.on('ready', function () {
//   console.log('Server is ready.');
//
//   // allow devices to join the network within 60 secs
//   shepherd.permitJoin(60, function (err) {
//     if (err)
//       console.log(err);
//   });
// });
//
// shepherd.start(function (err) {                // start the server
//   if (err)
//     console.log(err);
// });

initialiseController = (numberOfController) => {
  var frame_obj;
  // frame_obj = {
  //   type: C.FRAME_TYPE.AT_COMMAND,
  //   command: "ID",
  //   commandParameter: [7777],
  // };
  // xbeeAPI.builder.write(frame_obj);        

  // frame_obj = { // AT Request to be sent
  //   type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
  //   destination64: "FFFFFFFFFFFFFFFF",
  //   command: "ID",
  //   commandParameter: [7777],
  // };
  // xbeeAPI.builder.write(frame_obj);    

    frame_obj = { // AT Request to be sent
      type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
      destination64: "FFFFFFFFFFFFFFFF",
      command: "IR",
      commandParameter: [0],
    };
    xbeeAPI.builder.write(frame_obj);        

    frame_obj = { // AT Request to be sent
      type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
      destination64: "FFFFFFFFFFFFFFFF",
      command: "P2",
      commandParameter: [4],
    };
    xbeeAPI.builder.write(frame_obj);

    frame_obj = { // AT Request to be sent
      type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
      destination64: "FFFFFFFFFFFFFFFF",
      command: "D4",
      commandParameter: [4],
    };
    xbeeAPI.builder.write(frame_obj);  

    frame_obj = { // AT Request to be sent
      type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
      destination64: "FFFFFFFFFFFFFFFF",
      command: "P0",
      commandParameter: [4],
    };
    xbeeAPI.builder.write(frame_obj);    

    frame_obj = { // AT Request to be sent
      type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
      destination64: "FFFFFFFFFFFFFFFF",
      command: "D7",
      commandParameter: [4],
    };
    xbeeAPI.builder.write(frame_obj);

    frame_obj = { // AT Request to be sent
      type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
      destination64: "FFFFFFFFFFFFFFFF",
      command: "D1",
      commandParameter: [0],
    };
    xbeeAPI.builder.write(frame_obj); 

    frame_obj = { // AT Request to be sent
      type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
      destination64: "FFFFFFFFFFFFFFFF",
      command: "D2",
      commandParameter: [0],
    };
    xbeeAPI.builder.write(frame_obj); 

    frame_obj = { // AT Request to be sent
      type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
      destination64: "FFFFFFFFFFFFFFFF",
      command: "D3",
      commandParameter: [0],
    };
    xbeeAPI.builder.write(frame_obj); 

    frame_obj = { // AT Request to be sent
      type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
      destination64: "FFFFFFFFFFFFFFFF",
      command: "D5",
      commandParameter: [0],
    };
    xbeeAPI.builder.write(frame_obj); 

};

let getDataTest = () => {
  console.log('req start');
  fetch(`https://localhost:8443/games`)
  .then(res => res.json())
  .then(json => console.log(json));
}

