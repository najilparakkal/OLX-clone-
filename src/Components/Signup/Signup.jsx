import { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/Context";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumError, setPhoneNumError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { auth, firestore } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (formSubmitted) {
      validateUsername(e.target.value);
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (formSubmitted) {
      validateEmail(e.target.value);
    }
  };
  const handlePhoneNumChange = (e) => {
    setPhoneNum(e.target.value);
    if (formSubmitted) {
      validatePhoneNum(e.target.value);
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (formSubmitted) {
      validatePassword(e.target.value);
    }
  };

  const validateUsername = (value) => {
    if (!value) {
      setUsernameError("Please enter the username");
    } else {
      setUsernameError("");
    }
  };

  const validateEmail = (value) => {
    if (!value) {
      setEmailError("Please enter the email");
    } else if (!isValidEmail(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePhoneNum = (value) => {
    if (!value) {
      setPhoneNumError("Please enter the phone number");
    } else {
      setPhoneNumError("");
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Please enter the password");
    } else {
      setPasswordError("");
    }
  };

  const isValidEmail = (value) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    validateUsername(username);
    validateEmail(email);
    validatePhoneNum(phoneNum);
    validatePassword(password);

    if (usernameError || emailError || phoneNumError || passwordError) {
      return;
    }

    try {
      const userData = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userData.user, { displayName: username });

      const userDocRef = doc(firestore, "users", userData.user.uid);

      await setDoc(userDocRef, {
        email: email,
        phone: phoneNum,
        username: username,
      });
      navigate("/Login");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="340px" height="230px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={handleUsernameChange}
          />
          <br />
          {formSubmitted && <div className="error" style={{ color: "red" }}>{usernameError}</div>}
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
          {formSubmitted && <div className="error" style={{ color: "red" }}>{emailError}</div>}
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phoneNum}
            onChange={handlePhoneNumChange}
          />
          <br />
          {formSubmitted && <div className="error" style={{ color: "red" }}>{phoneNumError}</div>}
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
          {formSubmitted && <div className="error" style={{ color: "red" }}>{passwordError}</div>}
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
