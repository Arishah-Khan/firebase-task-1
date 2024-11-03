import { getAuth, createUserWithEmailAndPassword } from "./firebase.js";

const auth = getAuth();

let userEmail = document.getElementById("email");
let userPassword = document.getElementById("regpass");
let signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", async () => { 

  if (userEmail.value.trim() === "" || userPassword.value.trim() === "") {
    Swal.fire({
      title: "Warning!",
      text: "Please fill all fields",
      icon: "warning", 
      confirmButtonText: "OK"
    });
    return; 
  }
    try {
    const userCredential = await createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value);
    
    await Swal.fire({
      title: "Success!",
      text: "Account created successfully",
      icon: "success",
      confirmButtonText: "OK"
    });

    userEmail.value = "";
    userPassword.value = "";
    location.href = "signin.html";

  } catch (error) {
    const errorCode = error.code;

    switch (errorCode) {
      case "auth/email-already-in-use":
        Swal.fire("Error", "This email is already in use. Please use a different email.", "error");
        break;
      case "auth/invalid-email":
        Swal.fire("Error", "Invalid email format. Please enter a valid email address.", "error");
        break;
      case "auth/weak-password":
        Swal.fire("Error", "Password is too weak. Please use a stronger password.", "error");
        break;
      case "auth/network-request-failed":
        Swal.fire("Error", "Network error. Please check your internet connection and try again.", "error");
        break;
      default:
        Swal.fire("Error", `Something went wrong: ${error.message}`, "error");
        break;
    }

    userEmail.value = "";
    userPassword.value = "";
  }
});
