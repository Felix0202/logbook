const express = require('express');
const http = require('http');
const fs = require('fs');
const user = require('./js/user.js');

const port = 3000;
const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server);

//Middleware STATIC
let options = {
    extensions: ['html']
}

app.use(express.static('public', options));
app.use(express.json());

// Starts Server
server.listen(port, () => {
    console.log(`Server erfolgreich gestartet!`);
    console.log(`Erreichbar unter http://localhost:${port}`);
});

let currentClients = 0;

io.on('connection', (socket) => {
    let currentUser = {};

    let isUserLoggedIn = false;

    currentClients++;
    console.log(` ${currentClients} Users online`);

    socket.on('disconnect', () => {
        currentClients--;
        console.log(`  ${currentClients} Users online`);
    });

    socket.on('newUser', (data) => {
        let newUser = new user.newUser(data.userName, data.email, data.PW, data.checkPW, data.category);
        isUserLoggedIn = newUser._isUserDataOK;
        socket.emit('userRegister', { 'answer': newUser.answer, 'isOK': isUserLoggedIn});
        if (isUserLoggedIn) {
            currentUser = newUser._user;
            let tempPW = currentUser.pw;
            let tempUser = currentUser;
            delete tempUser.pw;
            currentUser.pw = tempPW;
            socket.emit('userData', tempUser);
            openDataTransfers();
        }
    });

    socket.on('userLogin', (data) => {
        console.log("New Login: " + data.identification);
        currentUser = user.getUser(data.identification, data.PW);
        if (currentUser !== null) {
            let tempPW = currentUser.pw;
            let tempUser = currentUser;
            delete tempUser.pw;
            currentUser.pw = tempPW;
            socket.emit('userData', tempUser);
            isUserLoggedIn = true;
            openDataTransfers();
        } else {
            socket.emit('userStartMessage', "Wrong Email / Password User not found");
        }
    });

    function openDataTransfers () {
        if (isUserLoggedIn){
            socket.on('changeAccountData', (newData) => {
                let isNewDataOK = true;

                if (newData.index === 'email'){
                    isNewDataOK = user.checkEmail(newData.data);
                    if (!isNewDataOK){
                        socket.emit('changeResponse', { 'text': "New Email not valid!", 'isError': true});
                    }
                }
                if (newData.index === 'pw'){
                    if (newData.data == 0){
                        isNewDataOK = false;
                        socket.emit('changeResponse', { 'text': "New Password not valid!", 'isError': true});
                    }
                }
                if (currentUser[newData.index] && isNewDataOK){
                    currentUser[newData.index] = newData.data;
                    user.saveUser(currentUser);
                    socket.emit('changeResponse', { 'text': "Data saved!", 'isError': false});
                }
            });

            socket.on('changeVehicleData', (newData) => {
                if (currentUser.data.vehicles[newData.index]){
                    currentUser.data.vehicles[newData.index].name = newData.data.name;
                    currentUser.data.vehicles[newData.index].licencePlate = newData.data.licencePlate;
                    currentUser.data.vehicles[newData.index].mileAge = newData.data.mileAge;
                    currentUser.data.vehicles[newData.index].notes = newData.data.notes;
                    user.saveUser(currentUser);
                    socket.emit('changeResponse', { 'text': "Data saved!", 'isError': false});
                } else if (newData.index === -1) {
                    currentUser.data.vehicles.push(newData.data);
                    user.saveUser(currentUser);
                    socket.emit('changeResponse', { 'text': "Data saved!", 'isError': false});
                }
            });

            socket.on('deleteVehicleData', (newData) => {
                if (currentUser.data.vehicles[newData.index]){
                    delete currentUser.data.vehicles[newData.index];
                    currentUser.data.vehicles = [];
                    user.saveUser(currentUser);
                    socket.emit('deleteResponse', { 'text': "Data deleted!", 'isError': false});
                }
            });

            socket.on('saveLOGEntryList', (data) => {
                if (currentUser.data.vehicles[data.pos]) currentUser.data.vehicles[data.pos].LOGEntryList = data.list;
                user.saveUser(currentUser);
            });
        }
    }
});