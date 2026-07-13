const form = document.getElementById("subjectForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const data = {

        subject_name: document.getElementById("subject_name").value,
        semester: document.getElementById("semester").value,
        department: document.getElementById("department").value,
        faculty_id: document.getElementById("faculty_id").value,
        theory_hours: document.getElementById("theory_hours").value,
        practical_hours: document.getElementById("practical_hours").value

    };

    fetch("http://localhost:3000/subjects",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    })

    .then(res=>res.json())

    .then(result=>{

        document.getElementById("message").innerHTML=
        "<h4 style='color:green'>Subject Added Successfully</h4>";

        form.reset();

        loadSubjects();

    });

});


function loadSubjects(){

    fetch("http://localhost:3000/subjects-list")

    .then(res=>res.json())

    .then(data=>{

        let rows="";

        data.forEach(s=>{

            rows+=`
            <tr>

            <td>${s.subject_id}</td>

            <td>${s.subject_name}</td>

            <td>${s.semester}</td>

            <td>${s.department}</td>

            <td>${s.faculty_name}</td>

            <td>${s.theory_hours}</td>

            <td>${s.practical_hours}</td>

<td>
<button
class="btn btn-danger btn-sm"
onclick="deleteSubject(${s.subject_id})">
Delete
</button>
</td>

            </tr>
            `;

        });

        document.querySelector("#subjectTable tbody").innerHTML=rows;

    });

}
function loadFacultyDropdown(){

    fetch("http://localhost:3000/faculty-list")

    .then(res => res.json())

    .then(data => {

        let options = "<option value=''>Select Faculty</option>";

        data.forEach(f => {

            options += `
            <option value="${f.faculty_id}">
                ${f.faculty_name}
            </option>
            `;

        });

        document.getElementById("faculty_id").innerHTML = options;

    });

}
loadSubjects();
loadFacultyDropdown();
function deleteSubject(id){

    if(!confirm("Delete this subject?"))
        return;

    fetch(`http://localhost:3000/subjects/${id}`,{

        method:"DELETE"

    })

    .then(res=>res.json())

    .then(result=>{

        alert(result.message);

        loadSubjects();

    })

    .catch(err=>{

        console.log(err);

    });

}