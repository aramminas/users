import Firebase from './Firebase'

/* Get All Users Data  */ /* (public) */
const getUsersData = () => {
    return new Promise(function(resolve, reject) {
        Firebase.database.ref(`users`).once('value').then(function(snapshot) {
            const results = snapshot.val() || []
            if(results.length !== 0){
                resolve(results)
            }else if(Object.keys(results).length === 0){
                reject({message: 'Database error. Objects `Users results` not found!'})
            }
        }).catch(error=>{
            reject({message: `Database error. 'Users results data! ${error.message}`})
        })
    })
}

/* Set Users Data From Github Api */ /* (public) */
const setUsersData = (data) => {
    return new Promise(function(resolve, reject) {
        Firebase.database.ref(`users/`).set({
            ...data
        },function(error) {
            if (error) {
                reject({message: `Database error. 'Add Users' data! ${error.message}`})
            } else {
                resolve({message: true})
            }
        }).catch(error=>{
            reject({message: `Database error. 'Add Users' data! ${error.message}`})
        })
    })
}

/* Remove User By Id */ /* (public) */
const removeUser = (id) => {
    return new Promise(function(resolve, reject) {
        Firebase.database.ref(`/users`).child(id).remove().then(function() {
            processData().then(data => {
                if(data.result){
                    resolve({result: true})
                }else {
                    reject({message: `Database error. 'Process Data Users' data!`})
                }
            }).catch(error => {
                reject(error)
            })
        }).catch(error => {
            reject(error)
        })
    })
}

/* Update data */ /* (public) */
const updateData = (table, id, data) => {
    return new Promise(function(resolve, reject) {
        Firebase.database.ref(table).child(id).update(data,function (error) {
            if(error){
                reject({message: `Database error. '${table}' data! ${error.message}`})
            }else {
                resolve({message: true})
            }
        }).catch(error => {
            reject({message: `Database error. '${table}' data! ${error.message}`})
        })
    })
}

/* Add New Data  */ /* (public) */
const addNewData = (table, id, data) => {
    return new Promise(function(resolve, reject) {
        Firebase.database.ref(`${table}/${id}`).set({
            ...data
        },function(error) {
            if (error) {
                reject({message: `Database error. '${table} Add' data! ${error.message}`})
            } else {
                resolve({message: true})
            }
        }).catch(error=>{
            reject({message: `Database error. '${table}' data! ${error.message}`})
        })
    })
}

/* Check data and remove empty cells */ /* (static) */
const processData = () => {
    return new Promise(function(resolve, reject) {
        getUsersData().then(data => {
            const processArray = data.filter(function (el) {
                return el !== undefined
            })
            setUsersData(processArray).then(data=>{
                if(data.message){
                    resolve({result: true})
                }else {
                    reject({message: `Database error. 'Process Data Users' data!`})
                }
            }).catch(error => {
                reject(error)
            })
        }).catch(error => {
            reject(error)
        })
    })
}

const FirebaseFunctions = {
    getUsersData, // get users data from firebase db
    setUsersData, // set users data from github api to firebase db
    removeUser, // remove user by id from firebase db
    updateData, // update data from firebase db
    addNewData, // add new data in firebase db
}

export default FirebaseFunctions