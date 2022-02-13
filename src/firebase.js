import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCCkM_RorDqhva3dEbW8f0BlPdn89fJnTs",
  authDomain: "arrive-prototype.firebaseapp.com",
  databaseURL: "https://arrive-prototype-default-rtdb.firebaseio.com",
  projectId: "arrive-prototype",
  storageBucket: "arrive-prototype.appspot.com",
  messagingSenderId: "729907029114",
  appId: "1:729907029114:web:fc97d5d2103a20957487c3"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();


// get references to Cloud Firestore, Database, and Authentication service, and export them
export const auth = firebase.auth();
export const database = firebase.database();
export const firestore = firebase.firestore();
firebase.firestore().enablePersistence();

const provider = new firebase.auth.GoogleAuthProvider();

export const updateUserProfile = (user, updatedUser, callback) => {
  console.log(user, updatedUser)
  // updates authentication profile
  user.updateProfile({
    displayName: updatedUser.displayName,
    photoURL: updatedUser.photoURL || null
  })
    .then(() => {
      const newUserObj = {
        displayName: updatedUser.displayName,
        email: user.email,
        photoURL: updatedUser.photoURL || null,
        // testing goal
        goal: updatedUser.goal || null,
        strengthsArr: updatedUser.strengthsArr || null
      }
      if (updatedUser.phoneNumber) { newUserObj.phoneNumber = updatedUser.phoneNumber }
      console.log(callback)
      if (callback) {
        callback(newUserObj)
      }
      console.log(newUserObj)
      // creates or updates Realtime database profile
      database.ref('users/' + user.uid).update(newUserObj)
    })
    .then(() => {
      console.log(`Successfully updated profile`)
    })
    .catch(function (error) {
      console.log(`Error updating user profile:`, error)
    });
}

export const updateUserObjInDB = (userID, prop) => {
  database.ref('users/' + userID).update(prop)
    .then(() => {
      console.log(`Successfully updated profile`)
    })
    .catch(function (error) {
      console.log(`Error updating user profile:`, error)
    });
}

// export const pushMessageObjInDB = (uid, displayName, message, recipientUidArr) => {
//   recipientUidArr.forEach((recipientUid) => {
//     const newMessageObj = {
//       newTime: {
//         uid: uid,
//         displayName: displayName,
//         message: message,
//         time: new Date()
//       }
//     }
//     database.ref('users/' + recipientUid + '/messages/').push(newMessageObj).then(() => {
//       console.log(`Successfully added message`)
//     })
//       .catch(function (error) {
//         console.log(`Error adding message:`, error)
//       });
//   })
// }

export const pushMessageObjInDB = (uid, displayName, message) => {
  console.log('getAllFirebaseUserIDs run')
  var allUsers = database.ref('/users');
  allUsers.once('value', (snapshot) => {
    const data = snapshot.val();
    // }).then((data) => {
    console.log(data)
    const allUsersArr = Object.keys(data)
    console.log(allUsersArr);
    allUsersArr.forEach((recipientUid) => {
      console.log(recipientUid)
      let newMessageObj = {
        uid: uid,
        displayName: displayName,
        message: message,
        time: new Date()
      }
      console.log(newMessageObj);
      database.ref('users/' + recipientUid + '/messages/').push(newMessageObj).then(() => {
        console.log(`Successfully added message`)
      })
        .catch(function (error) {
          console.log(`Error adding message:`, error)
        });
    })

  })
}

export const pushMessageIntoChannel = (uid, displayName, messageStr) => {
  const newMessageObj = {
    uid: uid,
    displayName: displayName,
    message: messageStr,
    time: new Date()
  }
  database.ref('channel/').push(newMessageObj).then(() => {
    console.log(`Successfully added message`)
  })
    .catch(function (error) {
      console.log(`Error adding message:`, error)
    });
}

export const deleteMessageFromUser = (uid, messageID) => {
  database.ref('users/' + uid + '/messages/' + messageID).remove().then(() => {
    console.log(`Successfully deleted message`)
  })
    .catch(function (error) {
      console.log(`Error deleting message:`, error)
    });
}

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // The signed-in user info.
      const user = result.user;
      console.log(user)
      // updateUserProfile(user, user)
    }).catch(function (error) {
      // Handle Errors here.
      console.log(error)
    });
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName } = user;
    try {
      await userRef.set({
        displayName,
        email,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};