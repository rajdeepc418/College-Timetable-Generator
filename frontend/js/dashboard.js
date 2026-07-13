if(sessionStorage.getItem("login") !== "true"){

    window.location.href = "login.html";

}
document.getElementById("logoutBtn").addEventListener("click", () => {

    sessionStorage.removeItem("login");

    window.location.href = "login.html";

});