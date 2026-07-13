document.getElementById("facultyForm").addEventListener("submit", function(e){

    e.preventDefault();

    const data = {

        faculty_name: document.getElementById("faculty_name").value,

        department: document.getElementById("department").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value

    };

    fetch("http://127.0.0.1:3000/faculty",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    })

    .then(res=>res.json())

    .then(result=>{

        document.getElementById("message").innerHTML=

        "<div class='alert alert-success'>Faculty Added Successfully</div>";

        document.getElementById("facultyForm").reset();
        loadFaculty();

    })

    .catch(err=>{

        document.getElementById("message").innerHTML=

        "<div class='alert alert-danger'>Error</div>";

        console.log(err);

    });

});
function loadFaculty(){

    fetch("http://localhost:3000/faculty-list")

    .then(res => res.json())

    .then(data => {

        let rows="";

        data.forEach(f=>{

            rows += `
<tr>

<td>${f.faculty_id}</td>

<td>${f.faculty_name}</td>

<td>${f.department}</td>

<td>${f.email}</td>

<td>${f.phone}</td>

<td>

<button
class="btn btn-danger btn-sm"
onclick="deleteFaculty(${f.faculty_id})">

Delete

</button>

</td>

</tr>
`;

        });

        document.querySelector("#facultyTable tbody").innerHTML=rows;

    });

}
loadFaculty();
function deleteFaculty(id){

    if(!confirm("Are you sure you want to delete this faculty?")){
        return;
    }

    fetch("http://localhost:3000/faculty/" + id, {

        method: "DELETE"

    })

    .then(res => res.json())

    .then(result => {

        console.log(result);
alert(JSON.stringify(result));

        loadFaculty();

    })

    .catch(err => {

        console.log(err);

        alert("Delete Failed");

    });

}