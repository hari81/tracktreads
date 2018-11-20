import { FileSystem } from 'expo';
import * as Firebase from '../database/Firebase';

// import Expo from "expo"
// const Expo = require('expo')
import Util from '../config/Util';


// //////////////
// Backup test

// Upload DB file
test('First test', async () => {

    let result = null;
    let filePath = FileSystem.documentDirectory + 'SQLite/' + Util.ConstantHelper.db_name
    await Firebase.uploadFileToFirebase(filePath)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {

    })


    expect(1).toBe(1);
})