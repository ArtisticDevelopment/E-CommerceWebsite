import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    //deconstructing user from the response
    //from signInWithGooglePopup
    const { user } = await signInWithGooglePopup();
    console.log(user);
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <div>
        <h1>I am the Sign In page</h1>
        <button onClick={logGoogleUser}>Sign In With Google Popup</button>
      </div>
    </div>
  );
};

export default SignIn;
