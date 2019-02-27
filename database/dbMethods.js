var dbInstance = require('./mongoConnection');
var ObjectId = require('mongodb');



/**Get users function
* @returns {Promise} 
*/
export const getUsers = function () {
    return dbInstance().collection('users').find().project({ 'salt': 0, 'password': 0 }).toArray();
}

/**Get usersById function
 * @param {String} id - id user string
 * @returns {Promise} 
 */
export const getUserById = (id) => {
    if (!id) return ("Id is mandatory")
    return dbInstance().collection('users').findOne({ "_id": _createObject(id) },{projection:{ 'salt': 0, 'password': 0 }})
}

/**Get usersById function
 * @param {String} param - id user string
 * @returns {Promise} 
 */
export const getUserByParam = (param) => {
    return new Promise((res, rej) => {
        if (!id) rej("Id is mandatory")
        dbInstance().collection('users').findOne({ "_id": _createObject(id) }, (err, document) => {
            if (err) rej({ "querySuccess": false, "result": err })
            else res({ "querySuccess": true, "result": document })
        })
    })
}
//=======   LOCAL METHODS===========
/**Function to create object id
 * In case you need to search by id.
 * @param {String} id 
 */
function _createObject(id) {
    let objectId = new ObjectId(id);
    return objectId;
}