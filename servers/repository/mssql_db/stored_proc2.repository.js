
var response = require('../../shared/response.js');
const connection = require('../../database/connect.js');
var TYPES = require('tedious').TYPES;

function SP2Repository(dbContext) {

    function runSP(req, res, next) {

        console.log('[runSP] BEGIN --------------------------------------------------> TARGET_SP: ' + req.params.TARGET_SP);
        console.log('[runSP] >>> ' + spName + ', req.params: ' + req.params);
        
                
        var parameters = [];
        
        var spName = '';
        switch(req.params.TARGET_SP)    //SP: Stored Procedures
        {
            //---BSA---
            case 'getData':
                console.log('[runSP] ' + spName + ', pPARAM1: ' + req.params.PARAM1);

                parameters.push({ name: 'pPARAM1', type: TYPES.VarChar, val: req.params.PARAM1 });
                spName = 'STORED_PROC_NAME_GET';
                break;
            case 'setData':
                console.log('[runSP] --------------------------------------------------------------------');
                console.log('[runSP] ' + spName + ', pPARAM1: ' + req.params.PARAM1);
                console.log('[runSP] ' + spName + ', pPARAM2: ' + req.params.PARAM2);
                console.log('[runSP] ' + spName + ', pPARAM3: ' + req.params.PARAM3);
                console.log('[runSP] ' + spName + ', pPARAM4: ' + req.params.PARAM4);
                console.log('[runSP] ' + spName + ', pPARAM5: ' + req.params.PARAM5);

                parameters.push({ name: 'pPARAM1', type: TYPES.VarChar, val: req.params.PARAM1 });
                parameters.push({ name: 'pPARAM2', type: TYPES.VarChar, val: req.params.PARAM2 });
                parameters.push({ name: 'pPARAM3', type: TYPES.VarChar, val: req.params.PARAM3 });
                parameters.push({ name: 'pPARAM4', type: TYPES.VarChar, val: req.params.PARAM4 });
                parameters.push({ name: 'pPARAM5', type: TYPES.VarChar, val: req.params.PARAM5 });
                /*
                var params = [
                                { name: 'pPARAM1', type: TYPES.VarChar, val: req.params.PARAM1 }, 
                                { name: 'pPARAM2', type: TYPES.VarChar, val: req.params.PARAM2 },
                                { name: 'pPARAM3', type: TYPES.VarChar, val: req.params.PARAM3 },
                                { name: 'pPARAM4', type: TYPES.VarChar, val: req.params.PARAM4 },
                                { name: 'pPARAM5', type: TYPES.VarChar, val: req.params.PARAM5 }
                            ];
                */
                spName = 'STORED_PROC_NAME_SET';
                break;
            default:
                break;
        }

        spName = spName + ' ';
        console.log('[runSP] spName: [' + spName + ']');
        console.log('[runSP] spName: [' + spName + '] count: ' + parameters.length);
        dbContext.get(spName, parameters, false, function (error, data) {
            console.log('[runSP] data: ' + data);
            console.log('[runSP] data[0]: ' + data[0]);
            if (data) {
                req.data = data[0];
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

module.exports = SP2Repository;