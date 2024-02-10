const MONTHS_IN_ADVANCE = 6

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const now = new Date()
const nowYear = now.getFullYear()
const nowMonth = now.getMonth() + 1
const nowDay = now.getDate()
const nowDayOfWeek = now.getDay()

function daysInMonth(year, month) {
  return {
    1: 31,
    2: year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  }[month]
}

function isToday({year, month, day}) {
  return year === nowYear && month === nowMonth && day === nowDay
}

function isPast({year, month, day}) {
  return year <= nowYear && month <= nowMonth && day < nowDay
}

function dayOfWeek({year, month, day}) {
  return DAYS_OF_WEEK[new Date(year, month - 1, day).getDay()]
}

function createDay({year, month, day}, events) {
  // Create the day, even if there are no events
  const dayDiv = document.createElement("div")
  dayDiv.classList.add("day")
  if (isToday({year, month, day})) {
    dayDiv.classList.add("now-day")
  } else if (isPast({year, month, day})) {
    dayDiv.classList.add("past-day")
  }

  // The text that will go on the div
  let dayText = "" + day

  // Get the events for the day
  const dayEvents = events[year]?.[month]?.[day]

  // Add the text - it looks like react ;)
  dayDiv.innerHTML = `
    </div>
      <div class="day-number">${MONTHS[month - 1]} ${day} - ${dayOfWeek({year, month, day})}</div>
      ${dayEvents == undefined ? "" : `
        <div class="day-events">
          ${dayEvents.map(event => {
            const done = event.done
              return `
                - ${done ? "<s>" : ""}${event.text}${done ? "</s>" : ""} <br>
              `
            })
            .reduce((acc, val) => acc + val, "")}
        </div>
      `}
    </div>
  `

  return dayDiv
}

function createMonth({year, month}, events) {
  // Create the month div
  const monthDiv = document.createElement("div")
  monthDiv.classList.add("month")

  // Create the month title and add it
  const monthTitle = document.createElement("div")
  monthTitle.innerHTML = MONTHS[month - 1] + " " + year
  monthTitle.classList.add("month-title")
  monthDiv.appendChild(monthTitle)

  // Create each day
  for (let day = 1; day <= daysInMonth(year, month); day++) {
    const dayDiv = createDay({year, month, day}, events)
    monthDiv.appendChild(dayDiv)
  }

  return monthDiv
}

// Create the calender
const calender = document.getElementById("calender")
for (let month = nowMonth; month < nowMonth + MONTHS_IN_ADVANCE; month++) {
  const monthDiv = createMonth({year: nowYear + Math.floor((month - 1) / 12), month: (month - 1) % 12 + 1}, events)
  calender.appendChild(monthDiv)
}
