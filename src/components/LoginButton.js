import React, { useContext } from "react";
import { UserCtx } from "../contexts";
import Button from "./Button";

function LoginButton({ children, variant, ...rebassProps }) {
  const { user, doLogin, doLogout } = useContext(UserCtx);
  const actionForm = (
    <span>
      <Button onClick={doLogin} variant={variant} {...rebassProps}>
        {children || "Se connecter ou créer un compte"}
      </Button>
    </span>
  );
  return (
    <div>
      {user ? (
        <Button
          onClick={doLogout}
          variant={variant || "outline"}
          {...rebassProps}
        >
          Se déconnecter
        </Button>
      ) : (
        actionForm
      )}
    </div>
  );
}

export default LoginButton;
