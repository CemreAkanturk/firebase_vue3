import { collection, getDocs ,addDoc ,deleteDoc ,doc ,onSnapshot } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyDAd41KlD6tOvGuN9hXH0YhzgBKrNnC0NY",
	authDomain: "stoktakip-60df2.firebaseapp.com",
	projectId: "stoktakip-60df2",
	storageBucket: "stoktakip-60df2.appspot.com",
	messagingSenderId: "777782371484",
	appId: "1:777782371484:web:8ffc8503a5cbb7f583f959",
	measurementId: "G-X388E16C2V"
   };
   // Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth()
const db = getFirestore();


export default{

 async fetchCustomers(){
	const snapshot  =  await getDocs(collection(db, "customers"));
	const data=snapshot.docs.map((doc) => {
		return { id: doc.id, ...doc.data() }
	   })
	 
	return  data
   },

   
   async AddCustomer(docData){
	const docRef = await addDoc(collection(db, "customers"), docData);
	if(docRef.id)
	return true
	else false
   },


 async DeleteCustomer(docId){
	await deleteDoc(doc(db, "customers", docId));
	
   },
   
 
}

