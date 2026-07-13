console.log("******** NEW CODE RUNNING ********");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rajdeep@123",   
    database: "college_timetable"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
        console.log(err);
    } else {
        console.log("MySQL Connected Successfully");
    }
});

app.get("/", (req, res) => {
    res.send("College Timetable Backend Running Successfully");
});
app.get("/faculty", (req, res) => {
    res.send("Faculty Route Working");
});
// Add Faculty
app.post("/faculty", (req, res) => {
    console.log("POST /faculty called");
console.log(req.body);

    const { faculty_name, department, email, phone } = req.body;

    const sql =
    "INSERT INTO faculty(faculty_name,department,email,phone) VALUES (?,?,?,?)";

    db.query(
        sql,
        [faculty_name, department, email, phone],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
    message: "Faculty Added Successfully",
    result: result
            });

        }
    );

});
// Add Faculty Preferences
app.post("/faculty-preferences", (req, res) => {
     console.log("POST /faculty-preferences called");
    console.log(req.body);

    const {
        faculty_id,
        morning_preference,
        lecture_position,
        max_lectures,
        max_workload,
        max_subjects,
        theory_lab_same,
        minimum_gap
    } = req.body;

    const sql = `
    INSERT INTO faculty_preferences
    (faculty_id,morning_preference,lecture_position,max_lectures,max_workload,max_subjects,theory_lab_same,minimum_gap)
    VALUES (?,?,?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            faculty_id,
            morning_preference,
            lecture_position,
            max_lectures,
            max_workload,
            max_subjects,
            theory_lab_same,
            minimum_gap
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Faculty Preference Saved Successfully"
            });

        }
    );

});
// Add Subject
app.post("/subjects", (req, res) => {

    console.log("POST /subjects called");
    console.log(req.body);

    const {
        subject_name,
        semester,
        department,
        faculty_id,
        theory_hours,
        practical_hours
    } = req.body;

    const sql = `
    INSERT INTO subjects
    (subject_name, semester, department, faculty_id, theory_hours, practical_hours)
    VALUES (?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            subject_name,
            semester,
            department,
            faculty_id,
            theory_hours,
            practical_hours
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Subject Added Successfully"
            });

        }
    );

});
app.post("/classrooms", (req, res) => {

    const { room_name, room_type, capacity } = req.body;

    const sql =
    "INSERT INTO classrooms(room_name,room_type,capacity) VALUES (?,?,?)";

    db.query(
        sql,
        [room_name, room_type, capacity],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Classroom Added Successfully"
            });

        }
    );

});
// Add Time Slot
app.post("/timeslots", (req, res) => {

    const { day_name, start_time, end_time } = req.body;

    const sql =
    "INSERT INTO time_slots(day_name,start_time,end_time) VALUES (?,?,?)";

    db.query(
        sql,
        [day_name, start_time, end_time],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Time Slot Added Successfully"
            });

        }
    );

});
// Add Timetable Entry
app.post("/timetable", (req, res) => {

    const {
        faculty_id,
        subject_id,
        room_id,
        slot_id
    } = req.body;

    const sql =
    "INSERT INTO timetable(faculty_id,subject_id,room_id,slot_id) VALUES (?,?,?,?)";

    db.query(
        sql,
        [
            faculty_id,
            subject_id,
            room_id,
            slot_id
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                success:true,
                message:"Timetable Entry Added"
            });

        }
    );

});
// Get Complete Timetable
app.get("/timetable", (req, res) => {

    const sql = `
    SELECT
        t.timetable_id,
        f.faculty_name,
        s.subject_name,
        c.room_name,
        ts.day_name,
        ts.start_time,
        ts.end_time
    FROM timetable t
    JOIN faculty f
        ON t.faculty_id=f.faculty_id
    JOIN subjects s
        ON t.subject_id=s.subject_id
    JOIN classrooms c
        ON t.room_id=c.room_id
    JOIN time_slots ts
        ON t.slot_id=ts.slot_id
    ORDER BY
ts.day_name,
FIELD(
    ts.start_time,
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '12:00:00',
    '13:00:00',
    '14:00:00',
    '15:00:00'
);
    `;

    db.query(sql, (err, result) => {

        if(err){
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);

    });

});
app.post("/generate-timetable", (req, res) => {

    db.query("DELETE FROM timetable");

    db.query("SELECT * FROM faculty", (err, faculty) => {

        if (err) return res.status(500).json(err);

        db.query("SELECT * FROM subjects", (err, subjects) => {

            if (err) return res.status(500).json(err);

            db.query("SELECT * FROM classrooms", (err, classrooms) => {

                if (err) return res.status(500).json(err);

                db.query("SELECT * FROM time_slots", (err, slots) => {

                    if (err) return res.status(500).json(err);

                    db.query("SELECT * FROM faculty_preferences", (err, preferences) => {

                        if (err) return res.status(500).json(err);

                       let usedFaculty = {};
let usedRoom = {};
subjects.sort(() => Math.random() - 0.5);
slots.sort((a, b) => a.slot_id - b.slot_id);
subjects.forEach(subject => {

    let lectures = parseInt(subject.theory_hours);

    let allocated = 0;
    const randomStart = Math.floor(Math.random() * slots.length);

    for (let j = 0; j < slots.length; j++) {

    const i = (randomStart + j) % slots.length;

    if (allocated >= lectures)
        break;

    const slot = slots[i];

        // Skip Lunch Break (01:00 PM - 02:00 PM)
if (slot.start_time === "13:00:00") {
    continue;
}

        const facultyKey =
            subject.faculty_id + "_" + slot.slot_id;

        // Random room
const randomRoom =
    classrooms[Math.floor(Math.random() * classrooms.length)];

const roomKey =
    randomRoom.room_id + "_" + slot.slot_id;

if (usedFaculty[facultyKey])
    continue;

if (usedRoom[roomKey])
    continue;

usedFaculty[facultyKey] = true;
usedRoom[roomKey] = true;

db.query(
`
INSERT INTO timetable
(faculty_id,subject_id,room_id,slot_id)
VALUES (?,?,?,?)
`,
[
    subject.faculty_id,
    subject.subject_id,
    randomRoom.room_id,
    slot.slot_id
]
);

        allocated++;

    }

});

res.json({
    success: true,
    message: "Timetable Generated Successfully"
});

                    });

                });

            });

        });

    });

});
// Get All Faculty
app.get("/faculty-list", (req, res) => {

    db.query(
        "SELECT * FROM faculty ORDER BY faculty_id",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

});
// Get All Subjects
app.get("/subjects-list", (req, res) => {

    const sql = `
    SELECT
        s.subject_id,
        s.subject_name,
        s.semester,
        s.department,
        f.faculty_name,
        s.theory_hours,
        s.practical_hours
    FROM subjects s
    JOIN faculty f
    ON s.faculty_id = f.faculty_id
    ORDER BY s.subject_id
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});
// Get All Faculty Preferences
app.get("/faculty-preferences-list", (req, res) => {

    const sql = `
    SELECT
        p.preference_id,
        f.faculty_name,
        p.morning_preference,
        p.lecture_position,
        p.max_lectures,
        p.max_workload,
        p.max_subjects,
        p.theory_lab_same,
        p.minimum_gap
    FROM faculty_preferences p
    JOIN faculty f
    ON p.faculty_id = f.faculty_id
    ORDER BY p.preference_id;
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});
// Get All Classrooms
app.get("/classrooms-list", (req, res) => {

    db.query(
        "SELECT * FROM classrooms ORDER BY room_id",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }

    );

});
app.get("/dashboard-stats", (req, res) => {

    const sql = `
    SELECT
    (SELECT COUNT(*) FROM faculty) AS faculty,
    (SELECT COUNT(*) FROM subjects) AS subjects,
    (SELECT COUNT(*) FROM classrooms) AS rooms,
    (SELECT COUNT(*) FROM timetable) AS timetable;
    `;

    db.query(sql, (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

});
app.get("/dashboard-stats", (req, res) => {

    const sql = `
    SELECT
    (SELECT COUNT(*) FROM faculty) AS faculty,
    (SELECT COUNT(*) FROM subjects) AS subjects,
    (SELECT COUNT(*) FROM classrooms) AS rooms,
    (SELECT COUNT(*) FROM timetable) AS timetable;
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

});

 app.delete("/faculty/:id", (req, res) => {

    const id = req.params.id;

    // Delete timetable entries
    db.query(
        "DELETE FROM timetable WHERE faculty_id=?",
        [id],
        (err) => {

            if (err) return res.status(500).json(err);

            // Delete faculty preferences
            db.query(
                "DELETE FROM faculty_preferences WHERE faculty_id=?",
                [id],
                (err) => {

                    if (err) return res.status(500).json(err);

                    // Delete subjects
                    db.query(
                        "DELETE FROM subjects WHERE faculty_id=?",
                        [id],
                        (err) => {

                            if (err) return res.status(500).json(err);

                            // Delete faculty
                            db.query(
                                "DELETE FROM faculty WHERE faculty_id=?",
                                [id],
                                (err) => {

                                    if (err) return res.status(500).json(err);

                                    res.json({
                                        success: true,
                                        message: "Faculty Deleted Successfully"
                                    });

                                }
                            );

                        }
                    );

                }
            );

        }
    );

});
app.delete("/classrooms/:id", (req, res) => {

    const id = req.params.id;

    // Delete timetable entries using this room
    db.query(
        "DELETE FROM timetable WHERE room_id=?",
        [id],
        (err) => {

            if (err) return res.status(500).json(err);

            // Delete classroom
            db.query(
                "DELETE FROM classrooms WHERE room_id=?",
                [id],
                (err) => {

                    if (err) return res.status(500).json(err);

                    res.json({
                        success: true,
                        message: "Classroom Deleted Successfully"
                    });

                }
            );

        }
    );

});
app.delete("/subjects/:id", (req, res) => {

    const id = req.params.id;

    // First delete timetable entries
    db.query(
        "DELETE FROM timetable WHERE subject_id=?",
        [id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            // Now delete subject
            db.query(
                "DELETE FROM subjects WHERE subject_id=?",
                [id],
                (err) => {

                    if (err)
                        return res.status(500).json(err);

                    res.json({
                        success: true,
                        message: "Subject Deleted Successfully"
                    });

                }
            );

        }
    );

});
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});