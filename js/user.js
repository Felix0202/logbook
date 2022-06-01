const fs = require('fs');
const userFilePath = "./data/";

let emailValidString = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let isUserDataOK = true;

module.exports.newUser = class user {
    constructor(userName, email, PW, checkPW) {
        let answer = "";
        this._isUserDataOK = true;
        answer = this.checkNewUserData(userName, email, PW, checkPW);
        if (this._isUserDataOK) {
            let newUser = {
                'userName': userName,
                'email': email,
                'pw': PW,
                'data': {
                    'vehicles': [{
                        'name': 'Vehicle',
                        'licencePlate': '',
                        'mileAge': 0,
                        'LOGEntryList': []
                    }],
                    'settings': {}
                }
            }
            this._user = newUser;
            fs.writeFile(`${userFilePath + newUser.userName}.json`, JSON.stringify(newUser, null, 2), 'utf-8', function (err) {
                if (err) throw err;
            })
            answer = "New User Created!";
        }
        this._answer = answer;
    }

    checkNewUserData(userName, email, PW, checkPW) {
        let answer = "";
        if (userName === "" || email === "" || PW === "" || checkPW === "") {
            answer = "Input not complete!";
            this._isUserDataOK = false;
        } else {
            isUserDataOK = true;
            answer = this.checkUserNameAvailable(userName)
            if (this._isUserDataOK) answer = this.checkEmail(email);
            if (this._isUserDataOK) answer = this.checkPWandCheckPW(PW, checkPW);
        }
        return answer;
    }

    checkUserNameAvailable(userName) {
        try {
            fs.accessSync(`${userFilePath + userName}.json`, fs.constants.F_OK);
            this._isUserDataOK = false;
            return "Username already taken!";
        } catch (e) {

        }
    }

    checkEmail(email) {
        if (!email.match(emailValidString)) {
            this._isUserDataOK = false;
            return "Email is not valid!";
        }
    }

    checkPWandCheckPW(PW, checkPW) {
        if (checkPW !== PW) {
            this._isUserDataOK = false;
            return "Password and Check Password are not the same!";
        }
    }

    get answer() {
        return this._answer;
    }
}

module.exports.checkEmail = function (email) {
    if (!email.match(emailValidString)) return false;
    return true;
}

module.exports.saveUser = function saveUser(user) {
    fs.writeFile(`${userFilePath + user.userName}.json`, JSON.stringify(user, null, 2), 'utf-8', function (err) {
        if (err) throw err;
    })
}

module.exports.getUser = function getUser(identification, PW) {
    if (!(identification === "" || PW === "")) {
        if (fs.existsSync(`${userFilePath + identification}.json`)) {
            let user = JSON.parse(fs.readFileSync(`${userFilePath + identification}.json`, "utf8"));
            if (user.pw === PW) return user;
        }
    }
    return null;
}