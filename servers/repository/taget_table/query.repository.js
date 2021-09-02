
var response = require('../../shared/response.js');
var TYPES = require('tedious').TYPES;

function QueryRepository(dbContext) {

    function findQuery(req, res, next) {
        console.log('[findQuery] req.params.PARAM1: ' + req.params.PARAM1);
        console.log('[findQuery] req.params.PARAM2: ' + req.params.PARAM2);
        if (req.params.PARAM1) {
            var parameters = [];

            parameters.push({ name: 'PARAM1', type: TYPES.VarChar, val: req.params.PARAM1 });

            var query = "select TOP 1 COL1, COL2, "
                         + "COL3, COL4, "
                         + "from TARGET_TABLE WITH (NOLOCK) where PARAM1 = @PARAM1 ORDER BY CRDT DESC"
            console.log('[find] PARAM1 query: ' + query);

            dbContext.getQuery(query, parameters, false, function (error, data) {
                if (data) {
                    req.data = data[0];
                    return next();
                }
                return res.sendStatus(404);
            });
        } else if (req.params.PARAM2) {
            var parameters = [];

            parameters.push({ name: 'PARAM2', type: TYPES.VarChar, val: req.params.PARAM2 });

            var query = "select COUNT(*) AS CNT, PARAM2 "
                         + "from TARGET_TABLE WITH (NOLOCK) where PARAM2 = @PARAM2 ORDER BY CRDT DESC"
                         + "group by PARAM2 "
            console.log('[find] PARAM2 query: ' + query);

            dbContext.getQuery(query, parameters, false, function (error, data) {
                if (data) {
                    req.data = data[0];
                    return next();
                }
                return res.sendStatus(404);
            });
        }
    }

    function getQuerys(req, res) {
        console.log('[getQuerys] req.params.PARAM3: ' + req.params.PARAM3);
        if (req.query.PARAM3) {
            var parameters = [];

            parameters.push({ name: 'PARAM3', type: TYPES.Int, val: req.query.PARAM3 });

            var query = "select TOP 1 PARAM3, ABC from TARGET_TABLE where PARAM3 = @PARAM3"
            console.log('[getQuerys] query: ' + query);

            dbContext.getQuery(query, parameters, false, function (error, data) {
                return res.json(response(data, error));
            });
        }
        else {
            dbContext.get("getQuery", function (error, data) {
                return res.json(response(data, error));
            });
        }
    }

    function getQuery(req, res) {
        return res.json(req.data);
    }

    function postQuerys(req, res) {

        var parameters = [];

        parameters.push({ name: 'FirstName', type: TYPES.VarChar, val: req.body.FirstName });
        parameters.push({ name: 'LastName', type: TYPES.VarChar, val: req.body.LastName });
        parameters.push({ name: 'MiddleName', type: TYPES.VarChar, val: req.body.MiddleName });
        parameters.push({ name: 'DOB', type: TYPES.DateTime, val: new Date(req.body.DOB) });
        parameters.push({ name: 'Designation', type: TYPES.VarChar, val: req.body.Designation });
        parameters.push({ name: 'ReportingTo', type: TYPES.VarChar, val: req.body.ReportingTo });
        parameters.push({ name: 'Salary', type: TYPES.Int, val: req.body.Salary });

        // Object.entries(Queryt).forEach((property)=>{
        //     parameters.push({name:'@'+property[0]})
        // });

        dbContext.post("insertQuery", parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }

    function putQuery(req, res) {

        var parameters = [];

        Object.entries(req.data).forEach((property) => {

            if (req.body[property[0]]) {
                parameters.push(
                    {
                        name: property[0],
                        val: req.body[property[0]],
                        type: TYPES.VarChar
                    });
            } else {

                parameters.push(
                    {
                        name: property[0],
                        val: property[1],
                        type: TYPES.VarChar
                    });
            }
        });

        // parameters.push({ name: 'FirstName', type: TYPES.VarChar, val: req.body.FirstName });
        // parameters.push({ name: 'LastName', type: TYPES.VarChar, val: req.body.LastName });
        // parameters.push({ name: 'MiddleName', type: TYPES.VarChar, val: req.body.MiddleName });
        // parameters.push({ name: 'DOB', type: TYPES.DateTime, val: new Date(req.body.DOB) });
        // parameters.push({ name: 'Designation', type: TYPES.VarChar, val: req.body.Designation });
        // parameters.push({ name: 'ReportingTo', type: TYPES.VarChar, val: req.body.ReportingTo });
        // parameters.push({ name: 'Salary', type: TYPES.Int, val: req.body.Salary });

        // Object.entries(req.body).forEach((property) => {
        //     parameters.push({ name: '@' + property[0] })
        // });

        dbContext.post("InsertQuery", parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }

    function deleteQuery(req, res) {

        var parameters = [];

        if (req.data.Id) {
            var parameters = [];

            parameters.push({ name: 'Id', type: TYPES.VarChar, val: req.data.Id });

            var query = "delete from tbl_Queryt where Id = @Id"

            dbContext.getQuery(query, parameters, false, function (error, data, rowCount) {
                if (rowCount > 0) {
                    return res.json('Record is deleted');
                }
                return res.sendStatus(404);
            });
        }
    }

    function getQuerysWothDepartment(req, res) {

        dbContext.get("GetQueryWithDepartment", function (error, data) {
            return res.json(response(data, error));
        });
    }

    function SearchQuery(req, res) {

        var parameters = [];

        parameters.push({ name: 'Salary', type: TYPES.Int, val: req.query.salary });

        var query = "select TOP 1 * from TARGET_TABLE where CRDT>=@Salary"

        dbContext.get(query, parameters, function (error, data) {
            return res.json(response(data, error));
        });
    }

    return {
        getAll: getQuerys,
        get: getQuery,
        post: postQuerys,
        put: putQuery,
        getMulti: getQuerysWothDepartment,
        find: SearchQuery,
        intercept: findQuery,
        delete: deleteQuery
    }
}

module.exports = QueryRepository;