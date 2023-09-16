const schedule = {
    "Monday": [
        { start: "08:00", end: "08:45", subject: "Biology" },
        { start: "08:45", end: "09:30", subject: "Physics" },
        { start: "09:40", end: "10:25", subject: "Technick" },
        { start: "10:25", end: "11:10", subject: "Technick" },
        { start: "11:45", end: "12:20", subject: "Technick" },
        { start: "12:20", end: "13:05", subject: "IT" }
    ],
    "Tuesday": [
        { start: "08:00", end: "08:45", subject: "History" },
        { start: "08:45", end: "09:30", subject: "Religion" },
        { start: "09:40", end: "10:25", subject: "German" },
        { start: "10:25", end: "11:10", subject: "German" },
        { start: "11:45", end: "12:20", subject: "Maths" },
        { start: "12:20", end: "13:05", subject: "Maths" }
    ],
    "Wednesday": [
        { start: "08:00", end: "08:45", subject: "Sport" },
        { start: "08:45", end: "09:30", subject: "Politics" },
        { start: "09:40", end: "10:25", subject: "Maths" },
        { start: "10:25", end: "11:10", subject: "Maths" },
        { start: "11:45", end: "12:20", subject: "English" },
        { start: "12:20", end: "13:05", subject: "English" }
    ],
    "Thursday": [
        { start: "08:00", end: "08:45", subject: "Talk (English)" },
        { start: "08:45", end: "09:30", subject: "Chemistry" },
        { start: "09:40", end: "10:25", subject: "History" },
        { start: "10:25", end: "11:10", subject: "WBS" },
        { start: "11:45", end: "12:20", subject: "Religion" },
        { start: "14:00", end: "14:45", subject: "Geography" },
        { start: "14:45", end: "15:30", subject: "Music or Art" },
        { start: "15:35", end: "16:20", subject: "Music or Art" }
    ],
    "Friday": [
        { start: "08:00", end: "08:45", subject: "Sport" },
        { start: "08:45", end: "09:30", subject: "Sport" },
        { start: "09:40", end: "10:25", subject: "German" },
        { start: "10:25", end: "11:10", subject: "German" },
        { start: "11:45", end: "12:20", subject: "English" },
        { start: "12:20", end: "13:05", subject: "English" }
    ],

    "Breaks": [
        { start: "09:30", end: "09:40", subject: "Break" },
        { start: "11:10", end: "11:35", subject: "Big Break" },
        { start: "13:05", end: "14:00", subject: "Lunch Break" },
        { start: "15:30", end: "15:35", subject: "Break" }
    ]
};

// ... rest of the script remains unchanged.


const daysOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


function getCurrentPeriod(day, time) {
    if (day === "Saturday" || day === "Sunday") {
        return { subject: "It's a weekend!" };
    }

    const todaySchedule = schedule[day].concat(schedule["Breaks"]);
    for (let period of todaySchedule) {
        if (time >= period.start && time <= period.end) {
            return period;
        }
    }
    return null;
}

function getNextPeriod(day, time) {
    if (day === "Saturday" || day === "Sunday") {
        // Return the first period of Monday
        return schedule["Monday"][0];
    }

    const todaySchedule = schedule[day].concat(schedule["Breaks"]);
    for (let period of todaySchedule) {
        if (time < period.start) {
            return period;
        }
    }
    return null;
}

let currentPeriodIndex = 0;

function displayMondayPeriods() {
    if (currentPeriodIndex >= schedule.Monday.length) {
        currentPeriodIndex = 0;  // Reset to loop from the beginning
    }
    
    const period = schedule.Monday[currentPeriodIndex];
    const upcomingEl = document.getElementById("upcoming");
    upcomingEl.textContent = `${period.subject} from ${period.start} to ${period.end}`;
    upcomingEl.classList.add('slide');  // Add animation

    // Reset animation so it can play again next time
    setTimeout(() => {
        upcomingEl.classList.remove('slide');
    }, 1000);  // 1s is the duration of our rotateYFadeIn animation    

    currentPeriodIndex++;
}

function updateTime() {
    const now = new Date();
    const day = daysOrder[now.getDay()];
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;

    const current = getCurrentPeriod(day, currentTime);
    const next = getNextPeriod(day, currentTime);

    const currentPeriodEl = document.getElementById("currentPeriod");
    const timeLeftEl = document.getElementById("timeLeft");

    if (day === "Saturday" || day === "Sunday") {
        currentPeriodEl.textContent = current.subject;
        timeLeftEl.textContent = "Enjoy your day!";
        displayMondayPeriods();

        // Set to go through periods every 3 seconds. Adjust as needed.
        setInterval(displayMondayPeriods, 3000);
        return;
    }

    if (current) {
        currentPeriodEl.textContent = current.subject;
        timeLeftEl.textContent = `Ends at ${current.end}`;
    } else {
        currentPeriodEl.textContent = "Not in any period currently";
        timeLeftEl.textContent = "";
    }

    const upcomingEl = document.getElementById("upcoming");
    if (next) {
        upcomingEl.textContent = `Up next: ${next.subject} from ${next.start} to ${next.end}`;
    } else {
        upcomingEl.textContent = "No more periods for today!";
    }
}

updateTime();

setInterval(updateTime, 30000);  // Update 30000 every 30 seconds