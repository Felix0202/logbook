socket.on('connect', () => {

});

let user = {};
let lastVehiclePos = 0;

// LOGS FUNCTIONS

function loadLOGEntryList() {
    if (user.data.vehicles[lastVehiclePos]){
        LOGEntryList = user.data.vehicles[lastVehiclePos].LOGEntryList;
    } else {
        LOGEntryList = []
    }
}

function saveLOGEntryList() {
    socket.emit('saveLOGEntryList', {'list': LOGEntryList, 'pos': lastVehiclePos});
}

// SECURITY FUNCTIONS

function stringToHash(string) {

    var hash = 0;

    if (string.length == 0) return hash;

    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return hash;
}

// USER FUNCTION

function newUser () {
    let I_newUser_name = document.getElementById('I_newUser_name');
    let I_newUser_email = document.getElementById('I_newUser_email');
    let I_newUser_PW = document.getElementById('I_newUser_PW');
    let I_newUser_checkPW = document.getElementById('I_newUser_checkPW');

    let userName = I_newUser_name.value;
    let email = I_newUser_email.value;
    let PW = stringToHash(I_newUser_PW.value);
    let checkPW = stringToHash(I_newUser_checkPW.value);

    let data = {
        'userName': userName,
        'email': email,
        'PW': PW,
        'checkPW': checkPW
    };

    socket.emit('newUser', data);

    socket.on('userData', (newUserData) => {
        user = newUserData;
        loadLOGEntryList();
        changeSite('user');
    });

    socket.on('userRegister', (data) => {
        document.getElementById('I_newUser_response').innerHTML = `<p>${data.answer}</p>`;
        isLoggedIn = data.isOK;
    });
}

function userLogin () {
    let I_userLogin_identification = document.getElementById('I_userLogin_identification');
    let I_userLogin_PW = document.getElementById('I_userLogin_PW');

    let identification = I_userLogin_identification.value;
    let PW = stringToHash(I_userLogin_PW.value);

    let data = {
        'identification': identification,
        'PW': PW
    };

    socket.emit('userLogin', data);

    socket.on('userStartMessage', (data) => {
        document.getElementById('I_user_response').innerHTML = `<p>${data}</p>`;
    });

    socket.on('userData', (data) => {
        user = data;
        isLoggedIn = true;
        loadLOGEntryList();
        changeSite('user');
        sessionStorage.setItem('myLOGRDATA', JSON.stringify(user));
    });
}

function changeAccountData (index, data) {
    socket.emit('changeAccountData', { 'index': index, 'data': data });

    socket.on('changeResponse', (data) => {
        newMessage(data.text, data.isError);
    });
}

function changeVehicleData (index, data) {
    socket.emit('changeVehicleData', { 'index': index, 'data': data });

    user.data.vehicles[index].name = data.name;
    user.data.vehicles[index].licencePlate = data.licencePlate;
    user.data.vehicles[index].mileAge = data.mileAge;
    user.data.vehicles[index].notes = data.notes;

    socket.on('changeResponse', (data) => {
        newMessage(data.text, data.isError);
    });
}

function deleteVehicle (index) {
    socket.emit('deleteVehicleData', { 'index': index});

    socket.on('deleteResponse', (data) => {
        newMessage(data.text, data.isError);
        user.data.vehicles.splice(index, 1);
        printVehicles();
    });
}

