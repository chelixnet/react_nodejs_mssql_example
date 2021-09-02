
var response = require('../../shared/response.js');
const connection = require('../../database/connect.js');
var TYPES = require('tedious').TYPES;

function stored_proc1_Repository(dbContext) {

    function runSP(req, res, next) {

        console.log('[runSP] BEGIN --------------------------------------------------> TARGET_SP: ' + req.params.TARGET_SP);
        var parameters = [];
        
        var spName = '';
        switch(req.params.TARGET_SP)    //SP: Stored Procedures
        {
            //---PIS---
            case 'getStatus':
                parameters.push({ name: 'pGET_ALL', type: TYPES.VarChar, val: req.params.GET_ALL }); //0: get each line, 1: get all lines
                parameters.push({ name: 'pA_CD', type: TYPES.VarChar, val: req.params.A_CD });
                parameters.push({ name: 'pB_CD', type: TYPES.VarChar, val: req.params.B_CD });
                spName = 'SP_STORED_PROCEDURE_NAME1';
                console.log('[runSP] ' + spName + ', pGET_ALL: ' + req.params.GET_ALL);
                console.log('[runSP] ' + spName + ', pA_CD: ' + req.params.A_CD);
                console.log('[runSP] ' + spName + ', pB_CD: ' + req.params.B_CD);
                break;
            case 'getSerial':
                parameters.push({ name: 'pGET_ALL', type: TYPES.VarChar, val: req.params.GET_ALL }); //0: get each line, 1: get all lines
                parameters.push({ name: 'pA_CD', type: TYPES.VarChar, val: req.params.A_CD });
                parameters.push({ name: 'pB_CD', type: TYPES.VarChar, val: req.params.B_CD });
                spName = 'SP_STORED_PROCEDURE_NAME2_SERIAL';
                console.log('[runSP] ' + spName + ', pGET_ALL: ' + req.params.GET_ALL);
                console.log('[runSP] ' + spName + ', pA_CD: ' + req.params.A_CD);
                console.log('[runSP] ' + spName + ', pB_CD: ' + req.params.B_CD);
                break;
            default:
                break;
        }

        spName = spName + ' ';
        console.log('[runSP] spName: [' + spName + ']');
        
        dbContext.get(spName, parameters, false, function (error, data) {
            console.log('[runSP] data: ' + data);
            //console.log('[runSP] data[0]: ' + data[0]);
            if (data) {
                req.data = data;
                return next();
            }
            return res.sendStatus(404);
        });
        

        
    }

    
    function getSP(req, res) {
        return res.json(req.data);
    }


    return {
        get: getSP,
        intercept: runSP
    }
}

module.exports = stored_proc1_Repository;