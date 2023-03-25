import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisabled,setIsDisabled] = useState(true);
  const { closeModal } = useModal();
  useEffect(() => {
    if(
        credential.length < 4 ||
        password.length < 6
      ){
        setIsDisabled(true)
      }else{
        setIsDisabled(false)
      }
  },[credential,password])
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const errors = {};
    if(password.length < 6) errors.password = 'Password must be longer than 6 characters.';
    if(credential.length < 4) errors.credential = 'Credential must be longer than 4 characters.';
    setErrors(errors);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data){
            setErrors("The provided credentials were invalid");
          } 
        }
      );
  };

  const handleDemoUser = () => {
    return dispatch(sessionActions.login({ credential:'testUserName', password:'password'}))
      .then(closeModal);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ul>
          {<div className="errors">{Object.values(errors)}</div>}
        </ul>
        <div className="user-information">
          <h1>Log In</h1>
          <label>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              placeholder="Username or Email"
            />
          </label>
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </label>
        </div>
        <div className="login-buttons">
          <button type="submit" disabled={isDisabled} id="login">Log In</button>
          <button type="submit" onClick={handleDemoUser} id="demo-user">
            Demo User
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;