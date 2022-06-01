
let main = document.getElementsByTagName('main')[0];
let overlay = document.getElementsByTagName('overlay')[0];
let NAV_ABOUT = document.getElementById('NAV_ABOUT');
let NAV_LOG = document.getElementById('NAV_LOG');
let NAV_DASHBOARD = document.getElementById('NAV_DASHBOARD');

let backgroudColor = getComputedStyle(document.documentElement).getPropertyValue('--backgroundColor');
let fontColor = getComputedStyle(document.documentElement).getPropertyValue('--fontColor');
let hoverColor = getComputedStyle(document.documentElement).getPropertyValue('--hoverColor');
let specialColor = getComputedStyle(document.documentElement).getPropertyValue('--specialColor');
let errorColor = getComputedStyle(document.documentElement).getPropertyValue('--errorColor');

let SecondBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--SecondBackgroundColor');
let SecondFontColor = getComputedStyle(document.documentElement).getPropertyValue('--SecondFontColor');
let colorDBCharts = getComputedStyle(document.documentElement).getPropertyValue('--colorDBCharts');

let isLoggedIn = false;
let latestSite = "";

function changeSite(newSite) {
    NAV_DASHBOARD.style.color = "";
    NAV_LOG.style.color = "";
    NAV_ABOUT.style.color = "";
    deleteOverlay();

    if (isLoggedIn) {
        switch (newSite) {
            case 'start':
                main.innerHTML = html_template_start;
                ScrollReveal().reveal('.BOX_START_CONTENT');
                break;
            case 'about':
                NAV_ABOUT.style.color = specialColor;
                main.innerHTML = html_template_about;
                ScrollReveal().reveal('.BOX_ABOUT_TEXT');
                break;
            case 'user':
                main.innerHTML = html_template_settings;
                createSettings();
                break;
            case 'dashboard':
                NAV_DASHBOARD.style.color = specialColor;
                main.innerHTML = html_template_dashBoard;
                printVehicleSelect();
                createDashboard();
                checkVehicleExists();
                break;
            case 'log':
                NAV_LOG.style.color = specialColor;
                main.innerHTML = html_template_log;
                printVehicleSelect();
                printEntries("-date");
                checkVehicleExists();
                break;
            case 'newLOGEntry':
                NAV_LOG.style.color = specialColor;
                overlay.innerHTML = html_template_newLogEntry;
                break;
            case 'newVehicle':
                overlay.innerHTML = html_template_newVehicle;
                break;
            default:
        }
    } else {
        switch (newSite) {
            case 'start':
                main.innerHTML = html_template_start;
                ScrollReveal().reveal('.BOX_START_CONTENT');
                break;
            case 'about':
                NAV_ABOUT.style.color = specialColor;
                main.innerHTML = html_template_about;
                ScrollReveal().reveal('.BOX_ABOUT_TEXT');
                break;
            case 'user':
                main.innerHTML = html_template_userStart;
                break;
            default:
                main.innerHTML = html_template_userStart
                notLoggedInError();
                break;
        }
    }
    latestSite = newSite;
}

changeSite('start');

function notLoggedInError() {
    overlay.innerHTML = html_template_notLoggedInError;
    setTimeout(() => {
        if (document.getElementById('BOX_notLoggedInError')) document.getElementById('BOX_notLoggedInError').remove();
    }, 3000)
}

function deleteOverlay() {
    overlay.innerHTML = "";
}

function userLoginMethodeChange(index) {
    if (index == 1) {
        document.getElementById('BOX_NewUser').style.display = "none";
        document.getElementById('BOX_UserInputs').style.display = "block";
        document.getElementById('P_UserLogin').style.color = specialColor;
        document.getElementById('P_UserRegistration').style.color = "";
    } else {
        document.getElementById('BOX_NewUser').style.display = "block";
        document.getElementById('P_UserRegistration').style.color = specialColor;
        document.getElementById('P_UserLogin').style.color = "";
        document.getElementById('BOX_UserInputs').style.display = "none";
    }
}

function newMessage(message, isError) {
    if (isError) {
        overlay.innerHTML =
            `<div class="BOX_overlayMessage" style="color: var(--errorColor)"><p style="font-size: var(--fontSizeHeader)">${message}</p></div>`;
    } else {
        overlay.innerHTML =
            `<div class="BOX_overlayMessage"><p style="font-size: var(--fontSizeHeader)">${message}</p></div>`;
    }
    setTimeout(() => {
        deleteOverlay();
    }, 3000);
}

function printVehicleSelect () {
    let outputString = "";
    for (let i = 0; i < user.data.vehicles.length; i++) {
        outputString += `<option value="${i}">${user.data.vehicles[i].name}</option>`;
    }
    document.getElementById('I_VEHICLE_CHANGE').innerHTML = outputString;
}

function changeLastVehiclePos(pos){
    lastVehiclePos = pos;
    loadLOGEntryList();
    if (latestSite === 'log')  printEntries(`${lastSortParameter}`);
    if (latestSite === 'dashboard') createDashboard();
}

function checkVehicleExists () {
    if (user.data.vehicles.length <= 0) newMessage("Please create a Vehicle (User -> Vehicle)", true)
}