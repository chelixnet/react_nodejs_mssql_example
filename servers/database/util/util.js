function sendDbResponse(err, rowCount, data, callback) {
    
    console.log('[util-sendDbResponse] err: ' + err);
    console.log('[util-sendDbResponse] rowCount: ' + rowCount);
    console.log('[util-sendDbResponse] data: ' + data);

    if (err) {
        callback(err);
    } else {
        if (rowCount < 1) {
            callback(null, false);
        }
        else {
            callback(null, data, rowCount);
        }
    }
}

function buildRow(columns, data) {
    console.log('[util-buildRow] columns: ' + columns);
    
    var row = {};
    columns.forEach(function (column) {
        console.log('[util-buildRow] column.value: ' + column.value);
        row[column.metadata.colName] = column.value
    });

    data.push(row);
    console.log('[util-buildRow] data: ' + data);
}

module.exports = {
    sendDbResponse: sendDbResponse,
    buildRow: buildRow
}