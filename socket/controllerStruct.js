var xbee_api = require('xbee-api');
var C = xbee_api.constants;

var controller = {
    idPlayer: null,

    btnBlue: 0,
    btnRed: 0,
    btnYellow: 0,
    btnGreen: 0,    

    ledBlue: 0,
    ledRed: 0,
    ledYellow: 0,
    ledGreen: 0,

    tmpLedBlue: 0,
    tmpLedRed: 0,
    tmpLedYellow: 0,
    tmpLedGreen: 0,

    buzzer: [0, 0, 0, 0],
    macAddress: "",
    getBtn: function({ digitalSamples }){        
        this.btnBlue = digitalSamples.DIO12;
        this.btnRed = digitalSamples.DIO4;
        this.btnYellow = digitalSamples.DIO10;
        this.btnGreen = digitalSamples.DIO7;        
    },
    setLed: function() {
        this.ledBlue = this.tmpLedBlue;
        this.ledRed = this.tmpLedRed
        this.ledYellow = this.tmpLedYellow;
        this.ledGreen = this.tmpLedGreen;
    },
    setTmpLed: function() {
        this.tmpLedBlue = this.btnBlue;
        this.tmpLedRed = this.btnRed;
        this.tmpLedYellow = this.btnYellow;
        this.tmpLedGreen = this.btnGreen;
    },
    ledBlueOn: function(){
        var frame_obj = { // AT Request to be sent
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination16: this.macAddress,
            command: "D1",
            commandParameter: [5],
        };
        console.log("bleu on");
        return frame_obj;
    },
    ledBlueOff: function(){
        var frame_obj = { // AT Request to be sent
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination16: this.macAddress,
            command: "D1",
            commandParameter: [4],
        };
        console.log("bleu off"); 
        return frame_obj;
    },
    ledRedOn: function(){
        var frame_obj = { // AT Request to be sent
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination16: this.macAddress,
            command: "D2",
            commandParameter: [5],
        };
        console.log('rouge on');
        return frame_obj;   
    },
    ledRedOff: function(){
        var frame_obj = { // AT Request to be sent
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination16: this.macAddress,
            command: "D2",
            commandParameter: [0],
        };
        console.log('rouge off'); 
        return frame_obj;   
    },
    ledYellowOn: function(){
        var frame_obj = { // AT Request to be sent
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination16: this.macAddress,
            command: "D3",
            commandParameter: [5],
        };        
        console.log('jaune on');
        return frame_obj;
    },
    ledYellowOff: function(){
        var frame_obj = { // AT Request to be sent
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination16: this.macAddress,
            command: "D3",
            commandParameter: [0],
        };
        console.log('jaune off');
        return frame_obj;
    },
    ledGreenOn: function(){
        var frame_obj = { // AT Request to be sent
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination16: this.macAddress,
            command: "D5",
            commandParameter: [5],
        };
        console.log('vert on');
        return frame_obj
    },
    ledGreenOff: function(){
        var frame_obj = { // AT Request to be sent
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination16: this.macAddress,
            command: "D5",
            commandParameter: [0],
        };
        console.log('vert off');
        return frame_obj;
    }
};
module.exports = controller;
