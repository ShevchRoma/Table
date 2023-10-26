import React from "react";
import "./Login.scss";
import { useAppDispatch } from "../../redux/store";
import { userAuth } from "../../redux/slices/authSlice/asyncActions";
import { useTypedSelector } from "../../redux/typedHooks/useTypedSelector";
import { setError } from "../../redux/slices/authSlice/authSlice";

const Login = () => {
  const [login, setLogin] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loginDirty, setLoginDirty] = React.useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = React.useState<boolean>(false);
  const [loginError, setLoginError] = React.useState("Email cannot be empty");
  const [passwordError, setPasswordError] = React.useState("Password cannot be empty");
  const { error } = useTypedSelector((state) => state.auth);

  const [formValid, setFormValid] = React.useState(false);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (loginError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [loginError, passwordError]);

  const onLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
    const re = /^[a-z0-9]+$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setLoginError("Login is not correct");
    } else {
      setLoginError("");
    }
  };
  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length > 15 || e.target.value.length < 3) {
      setPasswordError("Password must be longer than 3 and shorter 15");
    } else {
      setPasswordError("");
    }
  };
  const submitForm = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(userAuth({ username: login, password: password }));
    setLogin("");
    setPassword("");
    setFormValid(false);
  };
  React.useEffect(() => {
    if (error) {
      alert("Error: " + error.error);
      dispatch(setError(""));
    }
  }, [submitForm]);

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "login":
        setLoginDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form className="login__form">
        {loginDirty && loginError && <div className="error">{loginError}</div>}
        <input
          name="login"
          type="text"
          onBlur={(e) => blurHandler(e)}
          value={login}
          onChange={onLoginHandler}
          placeholder="Enter your login"
        />
        {passwordDirty && passwordError && (
          <div className="error">{passwordError}</div>
        )}
        <input
          name="password"
          type="password"
          onBlur={(e) => blurHandler(e)}
          onChange={onPasswordHandler}
          value={password}
          placeholder="Enter your password"
        />
        <button onClick={submitForm} disabled={!formValid} type="submit">
          {formValid ? "Now Click Me =)" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
