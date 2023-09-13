import { useAuth0 } from "@auth0/auth0-react";
import style from "./Login.module.css";

const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
    });
  };

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <div className={style.loginContainer}>
      {!isAuthenticated && (
        <>
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handleLogin}>Log In</button>
        </>
      )}
      {isAuthenticated && <button onClick={handleLogout}>Log Out</button>}
    </div>
  );
};

export default Login;
