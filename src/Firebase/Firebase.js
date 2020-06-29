import app from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyARUoD2_fu_oUiRPBQQcmi2riCC3mTqD0o",
    authDomain: "users-4eb94.firebaseapp.com",
    databaseURL: "https://users-4eb94.firebaseio.com",
    projectId: "users-4eb94",
    storageBucket: "users-4eb94.appspot.com",
    messagingSenderId: "866679448429",
    appId: "1:866679448429:web:fc3b6a2da5b93fdc6d7064"
}

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
        this.database = app.database()
    }
}

let FB = new Firebase()

export default FB