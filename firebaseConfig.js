
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyD3tDuql_0MCjPPIQaimd1JfqrtR1FiSW0",
    authDomain: "fir-app-2f0da.firebaseapp.com",
    projectId: "fir-app-2f0da",
    storageBucket: "fir-app-2f0da.appspot.com",
    messagingSenderId: "297766252082",
    appId: "1:297766252082:web:adb1f0dd9f4ea92a49962b"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };