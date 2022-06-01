let html_template_entrySavedMessage = `<div class="BOX_overlayMessage"><p style="font-size: var(--fontSizeHeader)">Entry was saved!</p></div>`;

let html_template_vehicleSavedMessage = `<div class="BOX_overlayMessage"><p style="font-size: var(--fontSizeHeader)">Vehicle was saved!</p></div>`;

let html_template_notLoggedInError = `<div class="BOX_overlayMessage" id="BOX_notLoggedInError"><p style="font-size: var(--fontSizeHeader), color: var(--errorColor)">Please Login/Register first!</p></div>`;

let html_template_editLogEntry =
    `<div class="I_editLog_Entry">
        <div>Distance (in km)</div>
        <input name="distance" type="number" id="I_editLog_Entry_distance" placeholder="">
    </div>
    <div class="I_editLog_Entry">
        <div>Driven Time</div>
        <div style="display: flex; width: 40vw">
            <input name="distance" type="number" id="I_editLog_Entry_time" placeholder="" style="width: 35vw">
            <select name="" id="I_Log_Entry_Unit" style="width: 4.7vw; margin-left: 0.3vw">
                <option value="min">min</option>
                <option value="h">h</option>
            </select>
        </div>
    </div>
    <div class="I_editLog_Entry">
        <div>Start Point</div>
        <input name="startPoint" type="text" id="I_editLog_Entry_startPoint" placeholder="start Point">
    </div>
    <div class="I_editLog_Entry">
        <div>Destination</div>
        <input name="destination" type="text" id="I_editLog_Entry_destination" placeholder="destination">
    </div>
    <div class="I_editLog_Entry">
        <div>Weather</div>
        <input name="weather" type="text" id="I_editLog_Entry_weather" placeholder="weather">
    </div>
    <div class="I_editLog_Entry">
        <div>Date</div>
        <input name="date" type="date" id="I_editLog_Entry_date">
    </div>
    <div class="I_editLog_Entry">
        <div>Notes</div>
        <input name="notes" type="text" id="I_editLog_Entry_notes" placeholder="notes">
    </div>
    <div style="display: flex; justify-content: space-around; padding-top: 2vh">
        <div class="BTN" id="BTN_editLog_Entry_SUBMIT">SAVE</div>
        <div class="BTN" id="BTN_editLog_Entry_DELETE"><p style="color: var(--errorColor); margin: 0px">DELETE</p></div>
        <div class="BTN" onClick="printEntries()">Close</div>
    </div>
       <div class="I_userLogin" id="I_editLog_Entry_response">
    
    </div>`;

let html_template_newLogEntry =
    `<div class="BOX_newLog_Entry">
        <div style="display: flex; justify-content: center">
            <p style="font-size: 2em">New Entry</p>
            <p onclick="deleteOverlay()" style="margin: 1.25em 0em 0em 1.25em;border: 1px solid var(--fontColor); width: 1.5em; height: 1.5em; text-align: center; border-radius: 5px; color: var(--specialColor); font-size: 1.5em"><strong> x </strong></p>
        </div>
        <div>
            <div class="I_newLog_Entry">
                <input name="distance" type="number" id="I_newLog_Entry_distance" placeholder="distance (in km)">
            </div>
            <div class="I_newLog_Entry">
                <input name="time" type="number" id="I_newLog_Entry_time" placeholder="time" style="width: 25vw">
                <select name="" id="I_Log_Entry_Unit" style="width: 4.7vw">
                    <option value="min">min</option>
                    <option value="h">h</option>
                </select>
            </div>
            <div class="I_newLog_Entry">
                <input name="startPoint" type="text" id="I_newLog_Entry_startPoint" placeholder="start Point">
            </div>
            <div class="I_newLog_Entry">
                <input name="destination" type="text" id="I_newLog_Entry_destination" placeholder="destination">
            </div>
            <div class="I_newLog_Entry">
                <input name="weather" type="text" id="I_newLog_Entry_weather" placeholder="weather">
            </div>
            <div class="I_newLog_Entry">
                <input name="date" type="date" id="I_newLog_Entry_date">
            </div>
            <script>
                document.getElementById('I_newLog_Entry_date').valueAsDate = new Date();
            </script>
            <div class="I_newLog_Entry">
                <input name="notes" type="text" id="I_newLog_Entry_notes" placeholder="notes">
            </div>
            <div class="BTN" id="BTN_newLog_Entry_SUBMIT" onclick="newLogEntry()">SAVE</div>
            <div class="I_userLogin" id="I_newLog_Entry_response">
            </div>
        </div>
    </div>
    `;

let html_template_about =
    `<div class="BOX_ABOUT_TEXT load-hidden">
        <h2>This is actually a school project</h2>
        <p>myLogr is a school project, made in a subject called "Medien Technik" in the higher technical college in Leonding, Austria.</p>
    </div>
    <div class="BOX_ABOUT_TEXT load-hidden">
        <h2>The Idea behind myLogr</h2>
        <p>Is to make an easy-to-use platform for driving-beginners, normal drivers, buissnesses, etc. to monitor their rides and vehicles.</p>
        <h3>How I got the idea</h3>
        <p>I am a driving beginner myself and in order to get the licence I have to drive 3000km and I have to  write down every single ride on paper. <br>So I thougth why not make a online platform to make this easier for everybody.</p>
    </div>
    <br><br>
    <div class="BOX_ABOUT_TEXT load-hidden">
        <h3>myLOGR</h3>
        <p>Made by © Felix Wimberger<br>
            Special thanks to <a href="https://www.teamvienna.at">TVG GmbH</a> and <a href="http://www.papertronic.at">Papertronic GmbH</a> for hosting this site.
        </p>
    </div>`;

let html_template_start =
    `<div class="BOX_START">
        <div class="BOX_START_CONTENT load-hidden" style="flex-wrap: wrap">
            <div class="BOX_START_CONTENT_Text" style="width: 80vw">
                <h2>What is myLOGR?</h2>
                <p>myLOGR is an easy to use Online Appplication witch allows you to save all your rides, in your different vehicles. </p>
            </div>
            <div class="BOX_START_CONTENT_Text" style="width: 80vw">
                <h3>And how does it work?</h3>
                <p>You just have to login and you can instantly see all your rides in the log history or all the Statistics in the dashboard</p>
            </div>
        </div>
        <div class="BOX_START_CONTENT load-hidden"><h1 style="color: var(--specialColor)"><strong>Functions: </strong></h1></div>
        <div class="BOX_START_CONTENT load-hidden">
            <div class="BOX_START_CONTENT_img">
                <img src="./img/db_example.png" alt="db example">
            </div>
            <div class="BOX_START_CONTENT_Text">
                <h2>Dashboard</h2>
                <p>Here you can see Statistics about your different Vehicles and logs.</p>
            </div>
        </div>
        <div class="BOX_START_CONTENT load-hidden">
            <div class="BOX_START_CONTENT_Text">
                <h2>LOG - History</h2>
                <p>Here you can see, edit or delete all your different logs saved in the selected vehicle.</p>
            </div>
            <div class="BOX_START_CONTENT_img">
                <img src="./img/logs_example.png" alt="db example">
            </div>
        </div>
        <div class="BOX_START_CONTENT load-hidden">
            <div class="BOX_START_CONTENT_img">
                <img src="./img/account_example.png" alt="db example">
            </div>
            <div class="BOX_START_CONTENT_Text">
                <h2>Account</h2>
                <p>Here you can change your Account data, create new Vehicles, edit or delete existing Vehicles.<br>And in the future, you will be able to set yourself goals.</p>
            </div>
        </div>
        <div class="BOX_START_CONTENT load-hidden" style="width: 80vw;">
            <div class="BTN" style="margin-left: auto; margin-right: auto; font-size: calc(var(--fontSizeHeader)*2)" onclick="changeSite('user'); userLoginMethodeChange(2)">Register now!</div>
        </div>
    </div>
    `;

let html_template_userStart =
    `<div id="BOX_UserStart">
        <div id="BOX_UserLoginMethodeChange">
            <div onclick="userLoginMethodeChange(1)"><p id="P_UserLogin" style="color: var(--specialColor)"><strong>Login</strong></p></div>
            <div onclick="userLoginMethodeChange(2)"><p id="P_UserRegistration"><strong>Register</strong></p></div>
        </div>
        <div id="BOX_UserInputs">
            <div class="BOX_userLogin">
                <div class="I_userLogin">
                    <input name="identification" type="text" id="I_userLogin_identification"
                           placeholder="username">
                </div>
                <div class="I_userLogin">
                    <input name="PW" type="password" id="I_userLogin_PW" placeholder="password">
                </div>
                <div class="BTN" id="BTN_userLogin_SUBMIT" onclick="userLogin()">LOGIN</div>
                <div class="I_userLogin" id="I_user_response">
    
            </div>
            </div>
        </div>
        <div id="BOX_NewUser">
            <div class="I_NewUser">
                <input name="userName" type="text" id="I_newUser_name" placeholder="username">
            </div>
            <div class="I_NewUser">
                <input name="email" type="text" id="I_newUser_email" placeholder="E-Mail">
            </div>
            <div class="I_NewUser">
                <input name="PW" type="password" id="I_newUser_PW" placeholder="password">
            </div>
            <div class="I_NewUser">
                <input name="checkPW" type="password" id="I_newUser_checkPW" placeholder="check password">
            </div>
            <div class="BTN" id="BTN_newUser_SUBMIT" onclick="newUser()">REGISTER</div>
            <div class="I_NewUser" id="I_newUser_response">
                
            </div>
        </div>
    </div>
`;

let html_template_settings =
    `<div class="BOX_SETTINGS_MAIN">
        <div id="BOX_SETTINGS_NAV">
            <div class="buttonLIkeDiv" onclick="changeSettingsContent('account')">Account</div>
            <div class="buttonLIkeDiv" onclick="changeSettingsContent('vehicles')">Vehicles</div>
            <div class="buttonLIkeDiv" onclick="changeSettingsContent('goals')">Goals</div>
        </div>
        
        <div id="BOX_SETTINGS_CONTENT">
            
        </div>
    </div>`;

let html_template_log =
    `<div class="BOX_VEHICLE_HEADER">
        <div><p style="margin: 0px; font-size: var(--fontSizeInput)">VEHICLE: </p></div>
        <div style="width: 3vw"></div>
        <select id="I_VEHICLE_CHANGE" onchange="javascript:changeLastVehiclePos(document.getElementById('I_VEHICLE_CHANGE').value)">
            
        </select>
    </div>
    <div class="BOX_LOG_HEADER">
        <div>Last Logs: </div>
        <div style="display: flex">
            <div>
                SORT BY:
                <select name="" id="I_LOG_SORT" onchange="javascript:printEntries(document.getElementById('I_LOG_SORT').value)">
                    <option value="-date">Date (newest)</option>
                    <option value="date">Date (oldest)</option>
                    <option value="distance">Distance (lowest)</option>
                    <option value="-distance">Distance (highest)</option>
                    <option value="time">Time (lowest)</option>
                    <option value="-time">Time (highest)</option>
                </select>
            </div>
            <div style="width: 2vw"></div>
            <div onclick="changeSite('newLOGEntry')" style="border: 1px solid var(--fontColor); width: var(--fontSizeButton); height: var(--fontSizeButton); text-align: center; border-radius: 5px; color: var(--specialColor)"><strong> + </strong></div>
        </div>
       
    </div>
    <div class="BOX_LOG">
        <div class="BOX_LOG_Entries_Header" style="border-bottom: 1px var(--fontColor) solid">
            <div>DATE</div>
            <div>DISTANCE</div>
            <div>TIME</div>
            <div>MORE INFO</div>
        </div>
        <div class="BOX_LOG_Entries"></div>
    </div>
    <div onload="printEntries('-date')"></div>
    `;

let html_template_dashBoard =
    `<div class="BOX_VEHICLE_HEADER" style="margin-right: 1vw">
        <div><p style="margin: 0px; font-size: var(--fontSizeInput)">VEHICLE: </p></div>
        <div style="width: 3vw"></div>
        <select id="I_VEHICLE_CHANGE" onchange="javascript:changeLastVehiclePos(document.getElementById('I_VEHICLE_CHANGE').value)">
            
        </select>
    </div>
    <div class="BOX_DB_Charts">
        <div class="BOX_DB_STATS" id="BOX_DB_Stats_tD"></div>
        <div id="BOX_DB_CHART_Time_Distance"></div>
        <div class="BOX_DB_STATS" id="BOX_DB_Stats_aD"></div>
        <div class="BOX_DB_STATS" id="BOX_DB_Stats_tT"></div>
        <div class="BOX_DB_STATS" id="BOX_DB_Stats_aT"></div>
        <div class="BOX_DB_STATS" id="BOX_DB_Stats_aV"></div>  
    </div>`;

let html_template_settings_vehicles =
    `<h2>Vehicles</h2>
     <div class="BOX_SETTINGS_VEHICLES_HEADER">
        <div>Your Vehicles</div>
        <div onclick="changeSite('newVehicle')" style="border: 1px solid var(--fontColor); width: var(--fontSizeButton); height: var(--fontSizeButton); text-align: center; border-radius: 5px; color: var(--specialColor)"><strong> + </strong></div>
     </div>

    </div>
    <div class="BOX_SETTINGS_VEHICLES">
        <div class="BOX_SETTINGS_VEHICLES_Entries_Header" style="border-bottom: 1px var(--fontColor) solid">
            <div>NAME</div>
            <div>LICENCE PLATE</div>
            <div>MILEAGE</div>
            <div>CHANGE DATA</div>
        </div>
        <div class="BOX_SETTINGS_VEHICLES_Entries"></div>
    </div>
    `;

let html_template_settings_vehicle_edit =
    `<div class="I_SETTINGS_VEHICLES_tempVehicle">
        <div>NAME</div>
        <input name="name" type="text" id="I_SETTINGS_VEHICLES_tempVehicle_name" placeholder="NAME">
    </div>
    <div class="I_SETTINGS_VEHICLES_tempVehicle">
        <div>LICENCE PLATE</div>
        <input name="name" type="text" id="I_SETTINGS_VEHICLES_tempVehicle_licencePlate" placeholder="LICENCEPLATE">
    </div>
    <div class="I_SETTINGS_VEHICLES_tempVehicle">
        <div>MILEAGE</div>
        <input name="name" type="number" id="I_SETTINGS_VEHICLES_tempVehicle_mileAge" placeholder="MILEAGE">
    </div>
    <div class="I_SETTINGS_VEHICLES_tempVehicle">
        <div>NOTES</div>
        <input name="name" type="text" id="I_SETTINGS_VEHICLES_tempVehicle_notes" placeholder="NOTES">
    </div>
    <div style="display: flex; justify-content: space-around; padding-top: 2vh">
        <div class="BTN" id="BTN_SETTINGS_VEHICLES_SUBMIT">SAVE</div>
        <div class="BTN" id="BTN_SETTINGS_VEHICLES_DELETE"><p style="color: var(--errorColor); margin: 0px">DELETE</p></div>
        <div class="BTN" onClick="printVehicles()">Close</div>
    </div>
       <div class="I_userLogin" id="I_editLog_Entry_response">
    
    </div>`;

let html_template_newVehicle =
    `<div class="BOX_SETTINGS_VEHICLES_NEW">
        <div style="display: flex; justify-content: center">
            <p style="font-size: 2em">New VEHICLE</p>
            <p onclick="deleteOverlay()" style="margin: 1.25em 0em 0em 1.25em;border: 1px solid var(--fontColor); width: 1.5em; height: 1.5em; text-align: center; border-radius: 5px; color: var(--specialColor); font-size: 1.5em"><strong> x </strong></p>
        </div>
        <div>
            <div class="I_SETTINGS_NEWVEHICLE">
                <input name="name" type="text" id="I_SETTINGS_NEWVEHICLE_name" placeholder="NAME">
            </div>
            <div class="I_SETTINGS_NEWVEHICLE">
                <input name="name" type="text" id="I_SETTINGS_NEWVEHICLE_licencePlate" placeholder="LICENCEPLATE">
            </div>
            <div class="I_SETTINGS_NEWVEHICLE">
                <input name="name" type="number" id="I_SETTINGS_NEWVEHICLE_mileAge" placeholder="MILEAGE">
            </div>
            <div class="I_SETTINGS_NEWVEHICLE">
                <input name="name" type="text" id="I_SETTINGS_NEWVEHICLE_notes" placeholder="NOTES">
            </div>
            <div class="BTN" id="BTN_SETTINGS_NEWVEHICLE_SUBMIT" onclick="newVehicle()">SAVE</div>
            <div class="I_SETTINGS_NEWVEHICLE" id="I_SETTINGS_NEWVEHICLE_response">
            </div>
        </div>
    </div>
    `;