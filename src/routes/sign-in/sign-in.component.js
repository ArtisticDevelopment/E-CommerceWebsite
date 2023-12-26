import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  useEffect(async () => {
    try {
      const response = await getRedirectResult(auth);
      console.log(response);
    } catch (error) {
      console.error("Error in getRedirectResult:", error);
    }
  }, []);

  const logGoogleUser = async () => {
    //deconstructing user from the response
    //from signInWithGooglePopup
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWithGoogleRedirect();
  //   console.log({ user });
  // };

  return (
    <div>
      <div>
        <h1>I am the Sign In page</h1>
        <button onClick={logGoogleUser}>Sign In With Google Popup</button>
        <button onClick={signInWithGoogleRedirect}>
          Sign In With Google Redirect
        </button>
      </div>
    </div>
  );
};

export default SignIn;
