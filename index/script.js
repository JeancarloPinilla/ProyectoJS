function saveUser() {
    const username = document.getElementById("username").value.trim();
    localStorage.setItem("username", username);
}