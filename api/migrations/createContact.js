function createContactTable (tableName) {
    const sql = 'CREATE TABLE IF NOT EXISTS $tableName ' + 
        '(`id` INTEGER NOT NULL, `messages` TEXT NOT NULL, `time` TEXT NOT NULL);';

    const value = {
        $tableName: tableName,
    };

    db.run(sql, value, function(error) {
        if (error) {
            next(error);
        }        
    });
}

module.exports = createContactTable;