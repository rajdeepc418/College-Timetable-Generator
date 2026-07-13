document.getElementById("generateBtn").addEventListener("click", () => {

    fetch("http://localhost:3000/generate-timetable", {
        method: "POST"
    })
    .then(res => res.json())
    .then(result => {

        alert(result.message);

        loadTimetable();

    });

});


function loadTimetable() {

    fetch("http://localhost:3000/timetable")
    .then(res => res.json())
    .then(data => {

        const tbody = document.getElementById("timetableBody");
        tbody.innerHTML = "";

        const timetable = {};

        data.forEach(t => {

            const time =
    formatTime(t.start_time) +
    " - " +
    formatTime(t.end_time);

            if (!timetable[time]) {

                timetable[time] = {
                    Monday: "",
                    Tuesday: "",
                    Wednesday: "",
                    Thursday: "",
                    Friday: ""
                };

            }

            timetable[time][t.day_name] =
                `${t.subject_name}<br><small>${t.room_name}</small>`;

        });

        const timeOrder = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM"
];

        timeOrder.forEach(time => {

            tbody.innerHTML += `
            <tr>
                <td><b>${time}</b></td>
                <td>${timetable[time]?.Monday || ""}</td>
                <td>${timetable[time]?.Tuesday || ""}</td>
                <td>${timetable[time]?.Wednesday || ""}</td>
                <td>${timetable[time]?.Thursday || ""}</td>
                <td>${timetable[time]?.Friday || ""}</td>
            </tr>`;
        });

    })
    .catch(err => console.log(err));

}

loadTimetable();

document.getElementById("pdfBtn").addEventListener("click", () => {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("landscape");

    pdf.setFontSize(18);
    pdf.text("College Weekly Timetable", 14, 15);

    const head = [[
        "Time",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
    ]];

    const body = [];

    document.querySelectorAll("#timetableBody tr").forEach(row => {

        const rowData = [];

        row.querySelectorAll("td").forEach(td => {

            rowData.push(td.innerText);

        });

        body.push(rowData);

    });

    pdf.autoTable({

        head: head,

        body: body,

        startY: 25,

        theme: "grid",

        styles: {

            fontSize: 10,

            halign: "center",

            valign: "middle"

        },

        headStyles: {

            fillColor: [40,40,40]

        }

    });

    pdf.save("College_Timetable.pdf");

});
function formatTime(time){

    let [hour, minute] = time.split(":");

    hour = parseInt(hour);

    let ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;

    if(hour === 0) hour = 12;

    return hour.toString().padStart(2,"0") + ":" + minute + " " + ampm;

}