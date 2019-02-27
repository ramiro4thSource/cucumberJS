var MongoClient = require('mongodb');
var settings = require('../config')

var db = null;
//Const url with auth
//const url = `mongodb://${dbSettings.userName}:${dbSettings.password}@${dbSettings.ip}:${dbSettings.port}/${dbSettings.name}`;
// Const url without auth
const url = `mongodb://${settings.db.ip}:${settings.db.port}/${settings.db.name}`;

/**connection function 
 *Prints connection status
 */
export const connection = () => {
    return new Promise((res, rej) => {
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, (err, client) => {
            if (err) {
                rej(`Database connection error: ${err}`)
            }
            else {
                db = client.db();
                res(`${client.db().databaseName} succesfully connected`)
            }
        })
    })
}


/**dbInstance function returns db object.
 * 
 */
export const dbInstance = () => {
    if (db) {
        return db;
    }
}