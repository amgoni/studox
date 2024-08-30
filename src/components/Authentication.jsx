import { useState, useRef, useContext } from "react";
import { db } from "../config/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import AuthContext from "../store/auth-context.jsx";
import "./Authentication.scss";

// eslint-disable-next-line react/prop-types
const Authentication = ({ closeModal }) => {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const resetForm = () => {
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    setErrorMessage("");
    setSuccessMessage("");

    if (
      firstNameInputRef.current &&
      lastNameInputRef.current &&
      confirmPasswordInputRef.current
    ) {
      firstNameInputRef.current.value = "";
      lastNameInputRef.current.value = "";
      confirmPasswordInputRef.current.value = "";
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setErrorMessage("");

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGhYB-dLysal9zzFkuWKSrLnKguGaoy4Q";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGhYB-dLysal9zzFkuWKSrLnKguGaoy4Q";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          // Add user to database

          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";

            // Check if the error is due to incorrect credentials
            if (
              data &&
              data.error &&
              data.error.message === "INVALID_PASSWORD"
            ) {
              errorMessage = "Invalid email or password.";
            } else if (
              data &&
              data.error &&
              data.error.message === "EMAIL_NOT_FOUND"
            ) {
              errorMessage = "Email not found.";
            } else if (
              data &&
              data.error &&
              data.error.message === "EMAIL_EXISTS"
            ) {
              errorMessage = "Email already exists.";
            } else if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if (!isLogin) {
          // Check if the ref is not null before accessing current
          if (
            firstNameInputRef.current &&
            lastNameInputRef.current &&
            confirmPasswordInputRef.current
          ) {
            const firstName = firstNameInputRef.current.value;
            const lastName = lastNameInputRef.current.value;
            const enteredConfirmPassword =
              confirmPasswordInputRef.current.value;

            if (!isLogin && enteredPassword !== enteredConfirmPassword) {
              setErrorMessage("Passwords do not match!");
              return;
            }

            const docRef = addDoc(collection(db, "users"), {
              firstName: firstName,
              lastName: lastName,
              userId: data.localId,
              email: enteredEmail,
            });

            console.log("Document written with ID: ", docRef.id);
          }
        }

        authCtx.login(data.idToken, data.localId);

        setSuccessMessage("Success!");
        setTimeout(() => {
          setSuccessMessage("");
          resetForm();
          closeModal();
        }, 1000);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.message); // Set the error message
      });
  };

  return (
    <section className="authentication">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className="authentication-field">
            <label htmlFor="name">First Name</label>
            <input type="text" id="name" required ref={firstNameInputRef} />
          </div>
        )}
        {!isLogin && (
          <div className="authentication-field">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" required ref={lastNameInputRef} />
          </div>
        )}
        <div className="authentication-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className="authentication-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            onFocus={() => setShowPasswordRequirements(true)}
            onBlur={() => setShowPasswordRequirements(false)}
          />
          {!isLogin && showPasswordRequirements && (
            <p className="password-requirements">
              Password must be at least 6 characters long.
            </p>
          )}
        </div>
        {!isLogin && (
          <div className="authentication-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              required
              ref={confirmPasswordInputRef}
            />
          </div>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="authentication-buttons">
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Loading...</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <button
            type="button"
            className="authentication-toggle"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Authentication;
