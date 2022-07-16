import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "https://firebase-services.vercel.app/",
  // This must be true.
  handleCodeInApp: true,
  // iOS: {
  //   bundleId: 'com.example.ios'
  // },
  // android: {
  //   packageName: 'com.example.android',
  //   installApp: true,
  //   minimumVersion: '12'
  // },
  // dynamicLinkDomain: 'example.page.link'
};

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // // The signed-in user info.
      const user = result.user;
      console.log({ user });
      // ...
    })
    .catch((error) => {
      // // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // // ...
    });
};

export const signUpWithEmailAndPassword = () => {
  createUserWithEmailAndPassword(
    auth,
    "ezekaemmanuel1710@gmail.com",
    "password1234"
  )
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log({ user });
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.log({ error });
      // ..
    });
};

export const logInWithEmailAndPassword = () => {
  signInWithEmailAndPassword(auth, "eec.studies@gmail.com", "1234")
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log({ user });
      // ...
    })
    .catch((error) => {
      console.log({ error });
    });
};

export const sendEmailLink = () => {
  sendSignInLinkToEmail(auth, "eec.studies@gmail.com", actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem("emailForSignIn", "eec.studies@gmail.com");
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // ...
      console.log({ error });
    });
};
