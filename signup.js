import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "./firebase.js";

const auth = getAuth();
const provider = new GoogleAuthProvider();

let userEmail = document.getElementById("email");
let userPassword = document.getElementById("regpass");
let signupBtn = document.getElementById("signupBtn");
let googleBtn = document.getElementById("googleBtn");

signupBtn.addEventListener("click", async () => {
  console.log("Sign-up button clicked");

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
    console.log("User created:", userCredential);

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
    console.error("Error during sign-up:", error);

    let errorMessage = "Something went wrong. Please try again.";
    switch (errorCode) {
      case "auth/email-already-in-use":
        errorMessage = "This email is already in use.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email format.";
        break;
      case "auth/weak-password":
        errorMessage = "Password is too weak.";
        break;
      case "auth/network-request-failed":
        errorMessage = "Network error.";
        break;
      default:
        errorMessage = `Error: ${error.message}`;
        break;
    }

    Swal.fire("Error", errorMessage, "error");

    userEmail.value = "";
    userPassword.value = "";
  }
});

googleBtn.addEventListener("click", () => {
  console.log("Google sign-in button clicked");

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Google Sign-In successful:", result.user);

      Swal.fire({
        icon: "success",
        title: "Sign-In Successful",
        text: `Welcome, ${result.user.displayName}! Redirecting to your profile...`,
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        window.location.href = "profile.html";
      });
    })
    .catch((error) => {
      console.error("Error during Google sign-in:", error);

      let message = "An unknown error occurred.";
      switch (error.code) {
        case "auth/popup-blocked":
          message = "Popup was blocked. Please allow popups.";
          break;
        case "auth/popup-closed-by-user":
          message = "You closed the popup. Try again.";
          break;
        case "auth/invalid-api-key":
          message = "Invalid API key.";
          break;
        case "auth/network-request-failed":
          message = "Network error.";
          break;
        case "auth/account-exists-with-different-credential":
          message = "An account exists with this email.";
          break;
        case "auth/operation-not-allowed":
          message = "Google Sign-In is not enabled.";
          break;
      }

      Swal.fire({
        icon: "error",
        title: "Sign-In Failed",
        text: message,
      });
    });
});
