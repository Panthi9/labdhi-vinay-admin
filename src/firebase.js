// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyiwtRqWQXUJOrCExN4H8dYEzeH5RMsaI",
  authDomain: "labdhi-vinay-6f7b3.firebaseapp.com",
  projectId: "labdhi-vinay-6f7b3",
  storageBucket: "labdhi-vinay-6f7b3.appspot.com",
  messagingSenderId: "256750887962",
  appId: "1:256750887962:web:206f31ed3951c891429da3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export{app};