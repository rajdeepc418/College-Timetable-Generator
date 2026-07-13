document.getElementById("loginForm").addEventListener("submit", function(e){

    e.preventDefault();

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    if(
        email==="admin@gmail.com"
        &&
        password==="admin123"
    ){

        sessionStorage.setItem("login","true");

        window.location.href="dashboard.html";

    }

    else{

        document.getElementById("msg").innerHTML=
        "<span style='color:red'>Invalid Email or Password</span>";

    }

});
document.getElementById("showPassword").addEventListener("click", () => {

    const pass = document.getElementById("password");

    if(pass.type === "password"){

        pass.type = "text";

        document.getElementById("showPassword").innerHTML = "Hide Password";

    }

    else{

        pass.type = "password";

        document.getElementById("showPassword").innerHTML = "Show Password";

    }

});