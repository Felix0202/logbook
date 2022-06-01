let LOGEntryList;
let LOGEntryList_sortedParameter;

let lastSortParameter = '-date';

function saveAndCheckEntry(distance, time, startPoint, destination, weather, date, notes, indexOFBOX) {
    if (distance === "" || distance < 0 || date === "") {
        return '<p style="color: var(--errorColor)">Please insert at least the distance and date</p>';
    } else {
        let unit = document.getElementById('I_Log_Entry_Unit').value;
        let entry = {
            'distance': parseFloat(distance),
            'time': (unit === 'h' ? parseFloat(time) : parseFloat(time) / 60),
            'startPoint': ((startPoint !== "") ? startPoint : "NOINPUT"),
            'destination': ((destination !== "") ? destination : "NOINPUT"),
            'weather': ((weather !== "") ? weather : "NOINPUT"),
            'date': date,
            'notes': notes
        }

        if (indexOFBOX || indexOFBOX == 0) {
            user.data.vehicles[lastVehiclePos].mileAge = parseFloat(user.data.vehicles[lastVehiclePos].mileAge) - parseFloat(LOGEntryList_sortedParameter[indexOFBOX].distance);
            user.data.vehicles[lastVehiclePos].mileAge = parseFloat(user.data.vehicles[lastVehiclePos].mileAge) + parseFloat(distance);
            LOGEntryList[indexOFBOX] = entry;
        } else {
            LOGEntryList.push(entry);
            user.data.vehicles[lastVehiclePos].mileAge += parseFloat(distance);
        }

        printEntries(`${lastSortParameter}`);
        document.getElementsByTagName('overlay')[0].innerHTML = html_template_entrySavedMessage;
        setTimeout(() => {
            document.getElementsByTagName('overlay')[0].innerHTML = "";
        }, 2900)
    }
}

function newLogEntry() {
    let I_newLogEntry_distance = document.getElementById('I_newLog_Entry_distance');
    let I_userLogin_time = document.getElementById('I_newLog_Entry_time');
    let I_newLogEntry_startPoint = document.getElementById('I_newLog_Entry_startPoint');
    let I_newLogEntry_destination = document.getElementById('I_newLog_Entry_destination');
    let I_newLogEntry_weather = document.getElementById('I_newLog_Entry_weather');
    let I_newLogEntry_date = document.getElementById('I_newLog_Entry_date');
    let I_newLogEntry_notes = document.getElementById('I_newLog_Entry_notes');

    let distance = I_newLogEntry_distance.value;
    let time = I_userLogin_time.value;
    let startPoint = I_newLogEntry_startPoint.value;
    let destination = I_newLogEntry_destination.value;
    let weather = I_newLogEntry_weather.value;
    let date = I_newLogEntry_date.value;
    let notes = I_newLogEntry_notes.value;

    let message = saveAndCheckEntry(distance, time, startPoint, destination, weather, date, notes);
    if (document.getElementById('I_newLog_Entry_response')) document.getElementById('I_newLog_Entry_response').innerHTML = message;
}

function printEntries(sortParameter) {
    LOGEntryList_sortedParameter = LOGEntryList;

    if (!sortParameter) {
        sortParameter = document.getElementById('I_LOG_SORT').value;
    }
    sortEntries(sortParameter);

    let output = document.getElementsByClassName('BOX_LOG_Entries')[0];
    output.innerHTML = `<p style="margin-left: 3vw">No Logs yet / loading Logs ... </p>`;
    let outputString = "";
    if (LOGEntryList_sortedParameter.length > 0) {
        if (sortParameter && sortParameter.charAt(0) === "-") {
            for (let i = LOGEntryList_sortedParameter.length - 1; i >= 0; i--) {
                let tempEntry = LOGEntryList_sortedParameter[i];
                outputString +=
                    `<div id="BOX_LOG_TEMP_ENTRY${i}">
                    <div>${tempEntry.date}</div>
                    <div>${tempEntry.distance} km</div>
                    <div>${Math.round((tempEntry.time >= 1 ? tempEntry.time : tempEntry.time * 60) * 100) / 100} ${tempEntry.time >= 1 ? 'h' : 'min'}</div>
                    <div onclick="printFullEntry(${i})"><strong>v</strong></div>
                </div>`;
            }
        } else {
            for (let i = 0; i < LOGEntryList_sortedParameter.length; i++) {
                let tempEntry = LOGEntryList_sortedParameter[i];
                outputString +=
                    `<div id="BOX_LOG_TEMP_ENTRY${i}">
                    <div>${tempEntry.date}</div>
                    <div>${tempEntry.distance} km</div>
                    <div>${Math.round((tempEntry.time >= 1 ? tempEntry.time : tempEntry.time * 60) * 100) / 100} ${tempEntry.time >= 1 ? 'h' : 'min'}</div>
                    <div onclick="printFullEntry(${i})"><strong>v</strong></div>
                </div>`;
            }
        }
        output.innerHTML = outputString;
    }

    LOGEntryList = LOGEntryList_sortedParameter;
    saveLOGEntryList();
    lastSortParameter = sortParameter;
}

function printFullEntry(indexOfBOX) {
    printEntries(lastSortParameter);
    let tempEntry = LOGEntryList_sortedParameter[indexOfBOX];
    let tempBox = document.getElementById(`BOX_LOG_TEMP_ENTRY${indexOfBOX}`);
    tempBox.style.display = "block";
    tempBox.style.textAlign = "left";
    tempBox.style.paddingLeft = "5vw";
    tempBox.style.paddingRight = "5vw";
    tempBox.innerHTML = html_template_editLogEntry;

    document.getElementById('BTN_editLog_Entry_SUBMIT').onclick = function () {
        editLogEntry(indexOfBOX)
    };
    document.getElementById('BTN_editLog_Entry_DELETE').onclick = function () {
        deleteEntry(indexOfBOX)
    }

    let isTimeInMin = false;

    if (tempEntry.time < 1) isTimeInMin = true;

    document.getElementById('I_editLog_Entry_distance').value = tempEntry.distance;
    document.getElementById('I_editLog_Entry_time').value = (isTimeInMin ? tempEntry.time * 60 : tempEntry.time);
    if (isTimeInMin){
        document.getElementById('I_Log_Entry_Unit').value = 'min';
    } else {
        document.getElementById('I_Log_Entry_Unit').value = 'h';
    }
    document.getElementById('I_editLog_Entry_startPoint').value = tempEntry.startPoint;
    document.getElementById('I_editLog_Entry_destination').value = tempEntry.destination;
    document.getElementById('I_editLog_Entry_weather').value = tempEntry.weather;
    document.getElementById('I_editLog_Entry_date').value = tempEntry.date;
    document.getElementById('I_editLog_Entry_notes').value = tempEntry.notes;
}

function editLogEntry(indexOfBOX) {
    let I_editLogEntry_distance = document.getElementById('I_editLog_Entry_distance');
    let I_editLogEntry_time = document.getElementById('I_editLog_Entry_time');
    let I_editLogEntry_startPoint = document.getElementById('I_editLog_Entry_startPoint');
    let I_editLogEntry_destination = document.getElementById('I_editLog_Entry_destination');
    let I_editLogEntry_weather = document.getElementById('I_editLog_Entry_weather');
    let I_editLogEntry_date = document.getElementById('I_editLog_Entry_date');
    let I_editLogEntry_notes = document.getElementById('I_editLog_Entry_notes');

    let distance = I_editLogEntry_distance.value;
    let time = I_editLogEntry_time.value;
    let startPoint = I_editLogEntry_startPoint.value;
    let destination = I_editLogEntry_destination.value;
    let weather = I_editLogEntry_weather.value;
    let date = I_editLogEntry_date.value;
    let notes = I_editLogEntry_notes.value;

    let message = saveAndCheckEntry(distance, time, startPoint, destination, weather, date, notes, indexOfBOX);
    if (message) document.getElementById('I_editLog_Entry_response').innerHTML = message;
}

function deleteEntry(indexOfElement) {
    if (LOGEntryList.length > indexOfElement) {
        LOGEntryList.splice(indexOfElement, 1);
        saveLOGEntryList();
        printEntries(lastSortParameter);
    }
}

function GetSortOrder(parameter) {
    return function (a, b) {
        if (a[parameter] > b[parameter]) {
            return 1;
        } else if (a[parameter] < b[parameter]) {
            return -1;
        }
        return 0;
    }
}

function sortEntries(parameter) {
    if (parameter.charAt(0) === "-") {
        parameter = parameter.substring(1);
    }

    LOGEntryList_sortedParameter = LOGEntryList;

    LOGEntryList_sortedParameter.sort(GetSortOrder(`${parameter}`));
}