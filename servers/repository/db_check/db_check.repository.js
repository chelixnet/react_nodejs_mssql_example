
var response = require('../../shared/response.js');
var TYPES = require('tedious').TYPES;

function DbCheckRepository(dbContext) {

    function getDate(req, res, next) {
        console.log('[getDate] req.params.param1: ' + req.params.param1);
        //if (req.params.HMC_CODE) {
            var parameters = [];

            parameters.push({ name: 'param1', type: TYPES.Int, val: req.params.param1 });

            var query = "select GETDATE() as CurrentDateTime"
            console.log('[getDate] query: ' + query);

            dbContext.getQuery(query, parameters, false, function (error, data) {
                if (data) {
                    req.data = data[0];
                    return next();
                }
                return res.sendStatus(404);
            });
        //}
    }

    function getDbCheckAll(req, res) {
        console.log('[getDbCheckAll] req.params.trans_date: ' + req.params.trans_date);
        if (req.query.trans_date) {
            var parameters = [];

            parameters.push({ name: 'trans_date', type: TYPES.Int, val: req.query.trans_date });

            var query = "select GETDATE() "
            console.log('[getDbCheckAll] query: ' + query);

            dbContext.getQuery(query, parameters, false, function (error, data) {
                return res.json(response(data, error));
            });
        }
        else {
            dbContext.get("getDbCheck", function (error, data) {
                return res.json(response(data, error));
            });
        }
    }

    function getDbCheck(req, res) {
        return res.json(req.data);
    }


    return {
        getAll: getDbCheckAll,
        get: getDbCheck,
        intercept: getDate
    }
}

module.exports = DbCheckRepository;