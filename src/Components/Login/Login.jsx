import { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Login.css";
import { FirebaseContext } from "../../store/Context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (formSubmitted) {
      validateEmail(e.target.value);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (formSubmitted) {
      validatePassword(e.target.value);
    }
  };

  const validateEmail = (value) => {
    if (!value) {
      setEmailError("Please enter the email");
    } else if (!isValidEmail(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError(""); // Clear the error if the email is valid
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Please enter the password");
    } else {
      setPasswordError(""); // Clear the error if the password is entered
    }
  };

  const isValidEmail = (value) => {
    // Simple email validation regex
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  
    // Validate inputs
    validateEmail(email);
    validatePassword(password);
  
    if (emailError || passwordError) {
      return; // Don't proceed if there are validation errors
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      navigate('/');
    } catch (error) {
      console.error("Error logging in:", error.message);
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/invalid-email":
          setEmailError("Please check the email");
          break;
        case "auth/wrong-password":
          setPasswordError("Invalid password");
          break;
        case "auth/invalid-credential":
          setPasswordError("Invalid user");
          break;
        default:
          setPasswordError("An error occurred while logging in");
          break;
      }
    }
  };
  

  return (
    <div>
      <div className="loginParentDiv">
        <img width="340px" height="230px" src={Logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          {formSubmitted && emailError && <div className="error">{emailError}</div>}
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          {formSubmitted && passwordError && <div className="error">{passwordError}</div>}
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
