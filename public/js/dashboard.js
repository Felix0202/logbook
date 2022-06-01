function createDashboard() {
    createStats();
    create_TimeDistance_Chart()
}

function createStats() {
    let totalDistance = 0;

    for (let i = 0; i < LOGEntryList.length; i++) {
        totalDistance += LOGEntryList[i].distance;
    }

    document.getElementById('BOX_DB_Stats_tD').innerHTML =
        `
        <div class="BOX_DB_Chart"><p class="P_DB_Stats_Value">${totalDistance}</p><p class="P_DB_Stats_Unit">km</p></div>
        <div class="BOX_DB_Stats_Headline"><p>Total Distance:</p> </div>
        `;

    let totalTime = 0;
    let counter = 0

    for (let i = 0; i < LOGEntryList.length; i++) {
        if (LOGEntryList[i].time !== "NOINPUT") {
            totalTime += LOGEntryList[i].time;
            counter++;
        }
    }
    document.getElementById('BOX_DB_Stats_aD').innerHTML =
        `
        <div class="BOX_DB_Chart"><p class="P_DB_Stats_Value">${Math.round(totalDistance / counter * 10) / 10}</p><p class="P_DB_Stats_Unit">km</p></div>
        <div class="BOX_DB_Stats_Headline"><p>Average Distance:</p> </div>
        `;
    document.getElementById('BOX_DB_Stats_tT').innerHTML =
        `
        <div class="BOX_DB_Chart"><p class="P_DB_Stats_Value">${Math.round((totalTime >= 1 ? totalTime : totalTime * 60) * 100) / 100}</p><p class="P_DB_Stats_Unit">${totalTime >= 1 ? 'h' : 'min'}</p></div>
        <div class="BOX_DB_Stats_Headline"><p>Total Time:</p> </div>
        `;
    let aT = Math.round(totalTime / counter * 100) / 100;
    document.getElementById('BOX_DB_Stats_aT').innerHTML =
        `
        <div class="BOX_DB_Chart"><p class="P_DB_Stats_Value">${Math.round((aT >= 1 ? aT : aT * 60) * 100) / 100}</p><p class="P_DB_Stats_Unit">${aT >= 1 ? 'h' : 'min'}</p></div>
        <div class="BOX_DB_Stats_Headline"><p>Average Time (about):</p> </div>
        `;
    document.getElementById('BOX_DB_Stats_aV').innerHTML =
        `
        <div class="BOX_DB_Chart"><p class="P_DB_Stats_Value">${Math.round(totalDistance / totalTime * 10) / 10}</p><p class="P_DB_Stats_Unit">km/h</p></div>
        <div class="BOX_DB_Stats_Headline"><p>Average Velocity (about):</p> </div>
        `;
}

function create_TimeDistance_Chart() {
    if (LOGEntryList.length != 0) {
        document.getElementById('BOX_DB_CHART_Time_Distance').innerHTML = `<canvas id="CHART_DB_Time_Distance"></canvas>`;
        let chartHtml = document.getElementById('CHART_DB_Time_Distance').getContext('2d');

        let data = {
            labels: [],
            datasets: [{
                label: 'Distance (KM)',
                data: [],
                backgroundColor: SecondFontColor,
            }],

        }

        for (let i = 0; i < LOGEntryList.length; i++) {
            data.labels.push(`${LOGEntryList[i].date}`);
            data.datasets[0].data.push(LOGEntryList[i].distance);
        }

        let delayed;

        let chart = new Chart(chartHtml, {
            type: 'bar',
            data: data,
            options: {
                animation: {
                    onComplete: () => {
                        delayed = true;
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default' && !delayed) {
                            delay = context.dataIndex * 300 + context.datasetIndex * 100;
                        }
                        return delay;
                    },
                },
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: SecondFontColor
                        }
                    },
                    y: {
                        ticks: {
                            color: SecondFontColor
                        }
                    }
                }
            }
        })
    } else {
        newMessage('This Vehicle doesn´t have any logs', true);
        document.getElementById('BOX_DB_CHART_Time_Distance').innerHTML = `<div class="BOX_DB_Chart"><p class="P_DB_Stats_Value">No LOGS found</p></div>`;
    }
}