import { startSubmit, stopSubmit, SubmissionError } from 'redux-form';
import apiRequest, {api} from '../../apis/v1';

export const signIn = (credentials) => async (dispatch, getState, getFirebase) => {
    return new Promise((resolve,reject) => {
      const firebase = getFirebase();
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then(() => {
        resolve("success");
      }).catch((err) => {
        console.log(err.code);
        if(err.code === "auth/user-not-found")
          reject(new SubmissionError({email: "User with this email doesn't exist !"}));
        else if(err.code === "auth/wrong-password")
          reject(new SubmissionError({password: "Wrong password!"}));
      });
    });
}

export const signOut = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    
    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

export const signUp = (newUser) => async (dispatch, getState, getFirebase) => {
  //TODO - IMPROVE
  return new Promise((resolve, reject) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    console.log(newUser);
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email, 
      newUser.password
    ).then(resp => {
      let a = firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0]
      }).then(() => {
          return sendUserDataToServer(resp.user.xa, {});
      });
      console.log(a);

      return a;
    }).then((response) => {
      console.log(response);
      resolve("success");
    }).catch((err) => {
      console.log("ERROR: " + err)
      if(err.code === "auth/email-already-in-use" || err.code === "auth/invalid-email"){
        reject(new SubmissionError({email: err.message}));
      }
      else if(err.code === "auth/weak-password"){
        reject(new SubmissionError({password: err.message}));
      }
      else {
        reject(new SubmissionError({_error: err.message}));
      }

    });
  });

}

export const sendUserDataToServer = (token, userDto) => {
  return new Promise((resolve, reject) => {
    api.post('users',userDto,{
      headers:{
        'Authorization' : 'Bearer ' + token,
        'Content-Type': 'application/json' 
      }
    }).then(() => {
      resolve("success");
    })
    .catch(error => {
      reject({message: error});
    });
  });

}