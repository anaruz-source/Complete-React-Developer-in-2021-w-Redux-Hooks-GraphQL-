import {initializeApp} from 'firebase/app';
import { getFirestore,  getDoc, doc, setDoc, addDoc, collection,  getDocsFromServer, getDocs,  query, writeBatch} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj8ZVOjlRi9tQazf___x6Wax3xzJKrFFU",
  authDomain: "crwnbdd.firebaseapp.com",
  projectId: "crwnbdd",
  storageBucket: "crwnbdd.appspot.com",
  messagingSenderId: "124300276673",
  appId: "1:124300276673:web:fa5c9aeed36751e35a3540"
};
initializeApp(firebaseConfig);

export const auth = getAuth();


export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});



export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);


export const firestore =  getFirestore();


export const createUserProfileDocument= async (userAuth, additionalData)=>{

if(!userAuth) return;

const userRef = doc(firestore, 'users', `${userAuth.uid}`);

const userSnap = await getDoc(userRef);



if(!userSnap.exists()) {



  const {displayName, email}= userAuth;
  const createdAt = new Date();
  try {


   await setDoc(userRef,{
      displayName,
      email,
      createdAt,
      ...additionalData
    })


  } catch(error){


    console.log('error creating user', error.message);
  }

}

return userRef;


}



export const addCollectionsAndDocuments = async (key, objs) => {

  const collectionRef = collection(firestore, key);

  

  const snap = await getDocsFromServer(query(collectionRef))

const batch = writeBatch(firestore);
  if(!snap.empty) return collectionRef
 
  
   
    objs.forEach( async(obj) => {

      try{

        const docRef = await addDoc(collectionRef, obj);
      
       batch.set( docRef)


      }catch( e){

         console.error(e)
      }
      
     
  
    })

    return await batch.commit();
 
}


export const convertCollectionsSnapshotToMap = (collections) => {

  let  transformedCollection = collections.docs.map(doc => {

    const {title, items} = doc.data()

    return {

      routeName : encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  transformedCollection = transformedCollection.reduce(
    (acc, collection) => { 
      acc[collection.title.toLowerCase()] = collection;
      return acc
    },
     {})

  console.log(transformedCollection)
  return transformedCollection
}


export const getCurrentUser = () => {

    return new Promise((resolve, reject) =>{

        const unsubscriberFromAuth = onAuthStateChanged(auth, userAuth => {

            unsubscriberFromAuth()

            resolve(userAuth)
        }, reject )
    })
}