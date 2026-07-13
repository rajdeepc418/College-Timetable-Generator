const form = document.getElementById("classroomForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const data = {

        room_name: document.getElementById("room_name").value,

        room_type: document.getElementById("room_type").value,

        capacity: document.getElementById("capacity").value

    };

    fetch("http://localhost:3000/classrooms", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    })

    .then(res => res.json())

    .then(result => {

        document.getElementById("message").innerHTML =
        "<h4 style='color:green'>Classroom Added Successfully</h4>";

        form.reset();

        loadClassrooms();

    });

});

function loadClassrooms() {

    fetch("http://localhost:3000/classrooms-list")

    .then(res => res.json())

    .then(data => {

        let rows = "";

        data.forEach(room => {

    rows += `
<tr>

<td>${room.room_id}</td>
<td>${room.room_name}</td>
<td>${room.room_type}</td>
<td>${room.capacity}</td>

<td>
<button
class="btn btn-danger btn-sm"
onclick="deleteClassroom(${room.room_id})">
Delete
</button>
</td>

</tr>
`;

});

        document.querySelector("#classroomTable tbody").innerHTML = rows;

    });

}

loadClassrooms();
function deleteClassroom(id){

    if(!confirm("Delete this classroom?"))
        return;

    fetch(`http://localhost:3000/classrooms/${id}`,{

        method:"DELETE"

    })

    .then(res=>res.json())

    .then(result=>{

        alert(result.message);

        loadClassrooms();

    })

    .catch(err=>{

        console.log(err);

    });

}