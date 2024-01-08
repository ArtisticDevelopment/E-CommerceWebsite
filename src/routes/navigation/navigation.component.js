import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "../../routes/navigation/navigation.styles.scss";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  //instantiating User from context
  const { currentUser, setCurrentUser } = useContext(UserContext);

  //local signout function to call Firebase signOutUser
  // const signOutHandler = async () => {
  //   await signOutUser();
  //   setCurrentUser(null);
  // };

  //stopped using signOutHandler to prevent rerendering of three
  //components (nav, sign-in, sign-up). Now there is the
  //authStateChangedListener inside user.context that is able to
  //setCurrentUser locally every time the user/auth value changes from
  //a full object to null by signing in and out. This helps upkeep
  //a dynamic UI and optimization
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
