const _dbCheckRepository = require('./db_check/db_check.repository.js');
const _stored_proc1_Repository = require('./mssql_db/stored_proc1.repository.js');

const dbContext = require('../database/dbContext');

module.exports = function (router) {
    //DB CHECK---------------------------------------------
    const dbCheckRepository = _dbCheckRepository(dbContext);
    router.route('/db_check')
    .get(dbCheckRepository.getAll);
    
    
    router.use('/db_check/date', dbCheckRepository.intercept);

    router.route('/db_check/date')
        .get(dbCheckRepository.get);


    //SP1Repository---------------------------------------------
    const stored_proc1_Repository = _stored_proc1_Repository(dbContext);

    
    router.use('/pis/pdp/:TARGET_SP/:GET_ALL/:A_CD/:B_CD', stored_proc1_Repository.intercept);

    router.route('/pis/pdp/:TARGET_SP/:GET_ALL/:A_CD/:B_CD')
        .get(stored_proc1_Repository.get);


}