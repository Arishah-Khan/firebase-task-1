import { getAuth, createUserWithEmailAndPassword } from "./firebase.js";

const auth = getAuth();

let userEmail = document.getElementById("email");
let userPassword = document.getElementById("regpass");
let signupBtn = document.getElementById("signupBtn");

// Email regex for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

signupBtn.addEventListener("click", () => {
  if (userEmail.value.trim() && userPassword.value.trim()) {
    
    // Validate email format with regex
    if (!emailRegex.test(userEmail.value.trim())) {
      Swal.fire("Invalid email", "Please enter a valid email address", "error");
      return;
    }

    if (!userPassword.value.trim()) {
      Swal.fire("Please enter your password");
      return;
    }
    
    if (userPassword.value.length < 6) {
      Swal.fire("Password should be at least 6 characters long");
      return;
    }

    createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
      .then((userCredential) => {
        Swal.fire("Success!", "Account created successfully", "success");

        setTimeout(() => {
          location.href = "login.html";
        }, 2000);
      })
      .catch((error) => {
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
          case "auth/operation-not-allowed":
            Swal.fire("Error", "Email/password accounts are not enabled. Please contact support.", "error");
            break;
          case "auth/network-request-failed":
            Swal.fire("Error", "Network error. Please check your internet connection and try again.", "error");
            break;
          default:
            Swal.fire("Error", `Something went wrong: ${error.message}`, "error");
            break;
        }
      });
  } else {
    Swal.fire("Please fill all fields");
  }

  userEmail.value = "";
  userPassword.value = "";


});
