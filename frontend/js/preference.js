const form = document.getElementById("preferenceForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const data = {

        faculty_id: document.getElementById("faculty_id").value,
        morning_preference: document.getElementById("morning_preference").value,
        lecture_position: document.getElementById("lecture_position").value,
        max_lectures: document.getElementById("max_lectures").value,
        max_workload: document.getElementById("max_workload").value,
        max_subjects: document.getElementById("max_subjects").value,
        theory_lab_same: document.getElementById("theory_lab_same").value,
        minimum_gap: document.getElementById("minimum_gap").value

    };

    fetch("http://localhost:3000/faculty-preferences",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    })

    .then(res=>res.json())

    .then(result=>{

        document.getElementById("message").innerHTML =
        "<h4 style='color:green'>Preference Saved Successfully</h4>";

        form.reset();

        loadPreferences();

    });

});


function loadPreferences(){

    fetch("http://localhost:3000/faculty-preferences-list")

    .then(res=>res.json())

    .then(data=>{

        let rows="";

        data.forEach(p=>{

            rows+=`
            <tr>

            <td>${p.preference_id}</td>

            <td>${p.faculty_name}</td>

            <td>${p.morning_preference}</td>

            <td>${p.lecture_position}</td>

            <td>${p.max_lectures}</td>

            <td>${p.max_workload}</td>

            <td>${p.max_subjects}</td>

            <td>${p.theory_lab_same}</td>

            <td>${p.minimum_gap}</td>

            </tr>
            `;

        });

        document.querySelector("#preferenceTable tbody").innerHTML = rows;

    });

}

loadPreferences();