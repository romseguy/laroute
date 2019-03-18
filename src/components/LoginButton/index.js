import "./login.css";
import React, { useContext } from "react";

function Login() {
  const { user, doLogin, doLogout } = useContext(UserCtx);
  const style = { cursor: "pointer" };
  var actionForm = (
    <span>
      <button style={style} onClick={doLogin}>
        Login or Sign Up
      </button>
    </span>
  );
  return (
    <div className="Login">
      {user ? (
        <button style={style} onClick={doLogout}>
          Logout
        </button>
      ) : (
        actionForm
      )}
    </div>
  );
}

export default Login;
