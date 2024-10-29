import { getAuth, signInWithEmailAndPassword } from "./firebase.js";

const auth = getAuth();

let userEmail = document.getElementById("loginemail");
let userPassword = document.getElementById("loginpass");
let loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
    if (userEmail.value.trim() && userPassword.value.trim()) {
        
        signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
            .then((userCredential) => {
                const user = userCredential.user;
                Swal.fire("Success!", "You have successfully logged in!", "success"); // Successful login alert
                console.log(user); // Optional: For debugging or displaying user info in the console
            })
            .catch((error) => {
                const errorCode = error.code;

                // Handle different error codes using switch
                switch (errorCode) {
                    case "auth/user-not-found":
                        Swal.fire("Error", "User not found. Please check your email and try again.", "error");
                        break;
                    case "auth/wrong-password":
                        Swal.fire("Error", "Incorrect password. Please try again.", "error");
                        break;
                    case "auth/invalid-email":
                        Swal.fire("Error", "Invalid email format. Please enter a valid email address.", "error");
                        break;
                    case "auth/too-many-requests":
                        Swal.fire("Error", "Too many login attempts. Please try again later.", "error");
                        break;
                    case "auth/network-request-failed":
                        Swal.fire("Error", "Network error. Please check your internet connection.", "error");
                        break;
                    default:
                        Swal.fire("Error", `Something went wrong: ${error.message}`, "error");
                        break;
                }
            });
    } else {
        Swal.fire("Please fill in both email and password fields"); // Check for empty fields
    }

    // Clear input fields after login attempt
    userEmail.value = "";
    userPassword.value = "";

    location.href = "dashboard.html";
});
