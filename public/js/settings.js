function createSettings() {
    document.getElementById('BOX_SETTINGS_NAV').style.height = parseFloat(document.getElementsByTagName('body')[0].offsetHeight) - parseFloat(document.getElementsByTagName('header')[0].offsetHeight) + 'px';
    changeSettingsContent('account');
}

function changeSettingsContent(newContent) {
    let output = document.getElementById('BOX_SETTINGS_CONTENT');
    switch (newContent) {
        case 'account':
            output.innerHTML =
                `<h2>Hello ${user.userName}!</h2>
                <p>Your Account:</p>
                <p>(Old) Email: ${user.email}</p>
                <p>Want to change email? - Just type in your new one</p>
                <div style="display: flex">
                    <input type="text" id="I_changeEMail" placeholder="new email"><br>
                    <div class="BTN" style="margin-left: 1vw" onclick="changeEMail()">CHANGE</div>
                </div>
                <p>Want to change password? - Just type in your new one</p>
                <div style="display: flex">
                    <input type="password" id="I_changePW" placeholder="new Password">
                    <input type="password" id="I_changePWcheck" placeholder="new Password" style="margin-left: 1vw">
                    <div class="BTN" style="margin-left: 1vw" onclick="changePW()">CHANGE</div>
                </div>
                `;
            break;
        case 'vehicles':
            output.innerHTML = html_template_settings_vehicles;
            printVehicles();
            break;
        case 'goals':
            output.innerHTML =
                `<h2>Cooming soon</h2>
                <p>Soon you can set yourself goals, like 1000km in a month etc.</p>`;
            break;

    }
}

// ACCOUNT FUNCTIONS

function changePW() {
    let pw = document.getElementById('I_changePW').value;
    let checkpw = document.getElementById('I_changePWcheck').value;

    if (pw === checkpw && pw !== "") {
        changeAccountData('pw', stringToHash(pw));
        document.getElementById('I_changePW').value = "";
        document.getElementById('I_changePWcheck').value = "";
    } else {
        newMessage("Passwords are not the same!", true);
    }
}

function changeEMail() {
    let email = document.getElementById('I_changeEMail').value;

    changeAccountData('email', email);
    document.getElementById('I_changeEMail').value = "";
    changeSettingsContent('account');

    //Output in userServer_functions.js
}

// VEHICLE FUNCTIONS
function printVehicles() {
    let output = document.getElementsByClassName('BOX_SETTINGS_VEHICLES_Entries').item(0);
    output.innerHTML = `<p style="margin-left: 3vw">No vehicles saved / loading vehicles ... </p>`;
    let outputString = "";
    for (let i = 0; i < user.data.vehicles.length; i++) {
        let tempVehicle = user.data.vehicles[i];
        outputString +=
            `<div id="BOX_SETTINGS_VEHICLES_TEMPVEHICLE${i}">
            <div>${tempVehicle.name}</div>
            <div>${tempVehicle.licencePlate}</div>
            <div>${tempVehicle.mileAge} km</div>
            <div onClick="printVehicleData(${i})"><strong>v</strong></div></div>`;
    }
    if (outputString !== "") output.innerHTML = outputString;
}

function printVehicleData(index) {
    printVehicles();
    let tempVehicle = user.data.vehicles[index];
    let tempBox = document.getElementById(`BOX_SETTINGS_VEHICLES_TEMPVEHICLE${index}`);
    tempBox.style.display = "block";
    tempBox.style.textAlign = "left";
    tempBox.style.paddingLeft = "5vw";
    tempBox.style.paddingRight = "5vw";
    tempBox.innerHTML = html_template_settings_vehicle_edit;

    document.getElementById('BTN_SETTINGS_VEHICLES_SUBMIT').onclick = function () {
        editVehicleData(index)
    };
    document.getElementById('BTN_SETTINGS_VEHICLES_DELETE').onclick = function () {
        deleteVehicleData(index)
    }

    document.getElementById('I_SETTINGS_VEHICLES_tempVehicle_name').value = tempVehicle.name;
    document.getElementById('I_SETTINGS_VEHICLES_tempVehicle_licencePlate').value = tempVehicle.licencePlate;
    document.getElementById('I_SETTINGS_VEHICLES_tempVehicle_mileAge').value = tempVehicle.mileAge;
    document.getElementById('I_SETTINGS_VEHICLES_tempVehicle_notes').value = tempVehicle.notes;
}

function editVehicleData(index) {
    let name = document.getElementById('I_SETTINGS_VEHICLES_tempVehicle_name').value;
    let licencePlate = document.getElementById('I_SETTINGS_VEHICLES_tempVehicle_licencePlate').value;
    let mileAge = document.getElementById('I_SETTINGS_VEHICLES_tempVehicle_mileAge').value;
    let notes = document.getElementById('I_SETTINGS_VEHICLES_tempVehicle_notes').value;

    let newVehicle = {
        'name': name,
        'licencePlate': licencePlate,
        'mileAge': parseFloat(mileAge),
        'notes': notes
    };

    changeVehicleData(index, newVehicle);
    printVehicles();
}

function deleteVehicleData(index) {
    if (user.data.vehicles.length >= index) {
        deleteVehicle(index);
        printVehicles();
    }
}

function newVehicle() {
    let I_newVehicle_name = document.getElementById('I_SETTINGS_NEWVEHICLE_name');
    let I_newVehicle_licencePLate = document.getElementById('I_SETTINGS_NEWVEHICLE_licencePlate');
    let I_newVehicle_mileAge = document.getElementById('I_SETTINGS_NEWVEHICLE_mileAge');
    let I_newVehicle_notes = document.getElementById('I_SETTINGS_NEWVEHICLE_notes');

    let name = I_newVehicle_name.value;
    let licencePlate = I_newVehicle_licencePLate.value;
    let mileAge = I_newVehicle_mileAge.value;
    let notes = I_newVehicle_notes.value;

    let message = saveAndCheckVehicle(name, licencePlate, mileAge, notes);
    if (document.getElementById('I_SETTINGS_NEWVEHICLE_response')) document.getElementById('I_SETTINGS_NEWVEHICLE_response').innerHTML = message;
}

function saveAndCheckVehicle(name, licencePlate, mileAge, notes) {
    if (name === "" || mileAge < 0 || licencePlate === "") {
        return '<p style="color: var(--errorColor)">Please insert the name, the licence Plate and the mile-Age</p>';
    } else {
        let newVehicle = {
            'mileAge': parseFloat(mileAge),
            'licencePlate': licencePlate,
            'name': name,
            'notes': notes,
            'LOGEntryList': []
        }

        user.data.vehicles.push(newVehicle);

        changeVehicleData(-1, newVehicle);

        printVehicles();
        document.getElementsByTagName('overlay')[0].innerHTML = html_template_vehicleSavedMessage;
        setTimeout(() => {
            document.getElementsByTagName('overlay')[0].innerHTML = "";
        }, 2900)
    }
}