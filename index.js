const simpleData = [
    {
        startTime: "00:00",
        endTime: "01:30",
        color: "#f6be23",
        title: "#TeamDevkode",
    },
    {
        startTime: "4:30",
        endTime: "7:30",
        color: "#f6501e",
        title: "#TeamDevkode",
    },
    {
        startTime: "12:00",
        endTime: "13:30",
        color: "#029be5",
        title: "#TeamDevkode",
    },
    {
        startTime: "9:00",
        endTime: "10:00",
        color: "#029be5",
        title: "#TeamDevkode",
    },
    {
        startTime: "16:00",
        endTime: "19:00",
        color: "#029be5",
        title: "#TeamDevkode",
    },
    {
        startTime: "20:30",
        endTime: "22:30",
        color: "#029be5",
        title: "#TeamDevkode",
    },
]

const conflictingData = [
    {
        startTime: "00:00",
        endTime: "01:30",
        color: "#f6be23",
        title: "#TeamDevkode",
    },
    {
        startTime: "3:30",
        endTime: "7:30",
        color: "#f6501e",
        title: "#TeamDevkode",
    },
    {
        startTime: "4:30",
        endTime: "8:30",
        color: "#f6501e",
        title: "#TeamDevkode",
    },
    {
        startTime: "6:30",
        endTime: "9:00",
        color: "#f6501e",
        title: "Demo",
    },
    {
        startTime: "11:00",
        endTime: "13:30",
        color: "#029be5",
        title: "#TeamDevkode",
    },
    {
        startTime: "12:00",
        endTime: "13:30",
        color: "#029be5",
        title: "#TeamDevkode",
    },
    {
        startTime: "9:30",
        endTime: "10:30",
        color: "#029be5",
        title: "#TeamDevkode",
    },
    {
        startTime: "16:00",
        endTime: "17:00",
        color: "#029be5",
        title: "#TeamDevkode",
    },
    {
        startTime: "15:00",
        endTime: "17:00",
        color: "#029be5",
        title: "#TeamDevkode",
    },
    {
        startTime: "18:00",
        endTime: "19:00",
        color: "#f6501e",
        title: "#TeamDevkode",
    },
    {
        startTime: "20:30",
        endTime: "22:30",
        color: "#029be5",
        title: "#TeamDevkode",
    },
    {
        startTime: "20:30",
        endTime: "22:30",
        color: "#029be5",
        title: "#TeamDevkode",
    },
]

const loadData = conflictingData

const calAreaEle = document.querySelector('#cal-area')

let currentTimes = []

const initCalender = (hrs = 24, currentTimes = []) => {
    calAreaEle.innerHTML = ``
    for (let hr = 1; hr < hrs; hr++) {
        let suffix = getSuffixFromHr(hr)
        let displayHr = hr > 12 ? hr - 12 : hr
        calAreaEle.innerHTML += getTimeLine(`${displayHr}:00 ${suffix}`)
    }
    loadData.forEach(item => {
        calAreaEle.innerHTML += populateCalItem(item, currentTimes)
    });
    console.log("times:", currentTimes);
}

const populateCalItem = ({ startTime, endTime, color, title }, currentTimes) => {
    const topPosition = calculateStartPosition(startTime)
    const height = getCalItemHeight(startTime, endTime) + 'px'
    const conflicts = checkConflict(currentTimes, { startTime, endTime })
    const currentTime = { start: getTotalTime(startTime), end: getTotalTime(endTime), conflicts: conflicts > 0 ? conflicts : 1 }
    const width = conflicts > 0 ? (300 / (currentTime.conflicts * 2)) + 'px' : 300 + 'px'
    currentTimes.push(currentTime)
    return `<div style="background-color:${color};top:${topPosition};height:${height};width:${width}" class="cal-item">
    <p>${title}</p>
    <p>${convert24to12hrFormat(startTime)} - ${convert24to12hrFormat(endTime)}</p>
    </div>`
}

const checkConflict = (currentTimes, { startTime, endTime }) => {
    let conflicts = 0
    start = getTotalTime(startTime)
    end = getTotalTime(endTime)
    for (const element of currentTimes) {
        if ((element.start <= start && element.end >= start) || (element.start >= start && element.end <= end)) {
            conflicts++
        }
    }
    console.log('conflict!', startTime, endTime, conflicts);
    return conflicts
}

const convert24to12hrFormat = (time) => {
    const splitTime = time.split(':')
    const hr = Number(splitTime[0])
    const mins = splitTime[1]
    let convertedHr = hr
    const suffix = getSuffixFromHr(hr)
    // const mins = Number(splitTime[1])
    if (hr > 12) {
        convertedHr = hr - 12
    }
    convertedHr = convertedHr < 10 ? `0${convertedHr}` : String(convertedHr)

    return `${convertedHr}:${mins} ${suffix}`

}

const getSuffixFromHr = (hr) => {
    return hr > 12 ? 'PM' : 'AM'
}

const calculateStartPosition = (startTime) => {
    const splitData = startTime.split(':')
    const hr = Number(splitData[0])
    const mins = Number(splitData[1])
    const startPos = (hr * 60) + mins
    // console.log(startPos, hr, mins);
    return startPos + 'px'
}
const getCalItemHeight = (startTime, endTime) => {
    // console.log(`start: ${getTotalTime(endTime)}  ${getTotalTime(startTime)}`);
    return (getTotalTime(endTime) - getTotalTime(startTime))
}

const getTotalTime = (time) => {
    const timeSplit = time.split(':')
    const hrsToMins = Number(timeSplit[0]) * 60
    const mins = Number(timeSplit[1])
    const totalTime = hrsToMins + mins
    // console.log("total time: ", totalTime);
    return totalTime
}

const getTimeLine = (str) => {
    return `<div class="timeLine">
            <span class="time">${str}</span>
            <div class="line"></div>
        </div>`
}

initCalender(24, currentTimes)


