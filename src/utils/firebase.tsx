//IMPORTAÇÃO DA INICIALIZAÇÃO DA APLICAÇÃO E DOS SERVIÇOS DO FIREBASE
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, getRedirectResult, signInWithRedirect, signInWithPopup} from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA9PiLPPkKs6lnq2M5LjsxKe8l2gggI1bo",
  authDomain: "saferun-8b3f2.firebaseapp.com",
  projectId: "saferun-8b3f2",
  storageBucket: "saferun-8b3f2.firebasestorage.app",
  messagingSenderId: "886254534533",
  appId: "1:886254534533:web:5f16b329445b3b65900eec"
};

//INICIA A APLICAÇÃO DO FIREBASE
const app = initializeApp(firebaseConfig);

//INICIA O SERVIÇO DE AUTENTICAÇÃO DO FIREBASE
const auth = getAuth(app);

//INICIA O PROVEDOR DO GOOGLE
const provider = new GoogleAuthProvider();

//INICIA O LOCAL DE SALVAMENTO
const storage = getStorage(app)

//EXPORTA AS FUNÇÕES CRIADAS ACIMA
export { signInWithRedirect, auth, provider, getRedirectResult, GoogleAuthProvider, storage, signInWithPopup }