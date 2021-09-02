var Request = require('tedious').Request;
var connection = require('./connect');
var utility = require('./util/util');
const { TYPES } = require('tedious');

function spGetExecute(qry, params, isMultiSet, callback) {
    var data = [];
    var dataset = [];
    var resultset = 0;

    console.log('[dbContext-spGetExecute] qry: ' + qry);

    request = new Request(qry, function (err, rowCount) {
        console.log('[dbContext-spGetExecute] rowCount: ' + rowCount);

        console.log('[dbContext-spGetExecute] dataset.length: ' + dataset.length);
        rowCount = dataset.length;

        utility.sendDbResponse(err, rowCount, dataset, callback);

    });

    params.forEach(param => {
        var TYPES = require('tedious').TYPES;

        request.addParameter(param.name, TYPES.VarChar, param.val);
        console.log('[dbContext-spGetExecute] ' + ' param.name: ' + param.name + ', param.type: ' + param.type + ', param.val: ' + param.val);
    });

    request.on('row', function (columns) {
        utility.buildRow(columns, data);
        console.log('[dbContext-spGetExecute] data: ' + data);
    });

    request.on('doneInProc', function (rowCount, more, rows) {
        if (isMultiSet == false) {
            dataset = data;
        } else {
            dataset.push(data);
            data = [];
        }
        console.log('[dbContext-spGetExecute] dataset2: ' + dataset);
    });

    connection.callProcedure(request);
}

function spPostExecute(qry, params, callback) {
    var newdata = [];

    request = new Request(qry, function (err, rowCount) {
        console.log('[dbContext-spPostExecute] rowCount: ' + rowCount);
        utility.sendDbResponse(err, rowCount, newdata, callback);
    });

    params.forEach(param => {

        request.addParameter(param.name, param.type, param.val);

    });

    request.on('row', function (columns) {
        utility.buildRow(columns, newdata);
        console.log('[dbContext-spPostExecute] newdata: ' + newdata);
    });

    connection.callProcedure(request);
}

function queryGetExecute(qry, params, isMultiSet, callback) {
    var data = [];
    var dataset = [];
    var resultset = 0;


    console.log('[dbContext-queryGetExecute] qry: ' + qry);
    request = new Request(qry, function (err, rowCount) {
        console.log('[dbContext-queryGetExecute] rowCount: ' + rowCount);
        console.log('[dbContext-queryGetExecute] dataset.length: ' + dataset.length);
        utility.sendDbResponse(err, rowCount, dataset, callback);
    });

    params.forEach(param => {
        var TYPES = require('tedious').TYPES;

        request.addParameter(param.name, TYPES.VarChar, param.val);
        console.log('[dbContext-queryGetExecute] param.name: ' + param.name + ', param.type: ' + param.type + ', param.val: ' + param.val);
    });

    request.on('row', function (columns) {
        utility.buildRow(columns, data);
        console.log('[dbContext-queryGetExecute] data: ' + data);
    });

    request.on('doneInProc', function (rowCount, more, rows) {
        if (isMultiSet == false) {
            dataset = data;
        } else {
            dataset.push(data);
            data = [];
        }
        console.log('[dbContext-queryGetExecute] dataset: ' + dataset);
    });
    connection.execSql(request);
}

function queryExecute(qry, params, isMultiSet, callback) {
    var data = [];
    var dataset = [];
    var resultset = 0;

    request = new Request(qry, function (err, rowCount) {
        utility.sendDbResponse(err, rowCount, dataset, callback);
    });

    params.forEach(param => {
        request.addParameter(param.name, param.type, param.val);
    });


    connection.execSql(request);
}

module.exports = {
    get: spGetExecute,
    post: spPostExecute,
    getQuery: queryGetExecute
};