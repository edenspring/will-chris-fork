import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = {};
    if(username.length < 4){
      errors.username = "Username Must Contain 4+ Letters"
    }else if(password.length < 6){
      errors.password = "Password Must Contain 6+ Letters"
    }else if(confirmPassword !== password){
      errors.confirmPassword = "Passwords must match"
    }
    setErrors(errors)
  }, [errors ,username ,password ,confirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
          console.log('-----------',errors,data && data.errors)
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}
        <div className="user-information">
          <h1>Sign Up</h1>
          <label>
            <input
              placeHolder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {<p className="errors">{errors.credentials}</p>}
          <label>
            <input
              placeHolder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {<p className="errors">{errors.username}</p>}
          <label>
            <input
              placeHolder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {<p className="errors">{errors.firstName}</p>}
          <label>
            <input
              placeHolder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {<p className="errors">{errors.lastName}</p>}
          <label>
            <input
              placeHolder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {<p className="errors">{errors.password}</p>}
          <label>
            <input
              placeHolder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {<p className="errors">{errors.confirmPassword}</p>}
          <button 
            type="submit" 
            id="sign-me-up"
            disabled={Boolean(Object.values(errors).length)}
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}

export default SignupFormModal;