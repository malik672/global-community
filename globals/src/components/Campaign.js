import React from 'react';
import Header from "./Header";
import Web3 from 'web3';
import abi from "./Donate.json";
import { initializeApp } from 'firebase/app';
import {useEffect, useState} from "react"
import { getDatabase, ref, set, get, child, onValue, onChildRemoved, remove } from "firebase/database";

const Campaign = () => {
  const [state, setState] = useState([]);
  const [filter, setFilter] = useState("");
 
  const web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(abi.abi,'0x2C5893AfB778579F8a7a7e1D338fDAcc8C89113b');

  useEffect(()=>{
    const firebaseConfig = {
      apiKey: "AIzaSyA9Xi7rE8j2-G6Hhg-jxXGgGLZ-T3OZeRs",
      authDomain: "global-38c80.firebaseapp.com",
      projectId: "global-38c80",
      databaseURL:"https://global-38c80-default-rtdb.firebaseio.com/",
      storageBucket: "global-38c80.appspot.com",
      messagingSenderId: "436303615902",
      appId: "1:436303615902:web:6e28dfff6d4b6d2c12288f",
      measurementId: "G-G1WWBZSFJ8",
    };        

    //  const app = initializeApp(firebaseConfig);
     const db = getDatabase();

     const refrence = ref(db, 'users/')
        onValue(refrence, (snapshot) =>{
          const data = snapshot.val();
          if(data !== null){
            const datas = Object.entries(data);
            setState(datas);
          }
        })
        console.log(state);
  },[])
   

 
    const red = state.filter((ea)=>{
      return ea[1].address === window.ethereum.selectedAddress
    })


    const deleteds = async() => {
        
       try{
         const tests = await contract.methods.deleteUser().send({
          from: window.ethereum.selectedAddress
         })
         if(tests.status == true){
          const db = getDatabase();
          const refrence = ref(db, 'users/' + window.ethereum.selectedAddress);
         return remove(refrence, (item)=>{
             console.log(item);
          })
         }
       }catch(e){
        console.error(e)
       }
    }

  
  

  return (
    <div>
      <Header/>
      <div className='campaign'>
        {red.map((ea =>{
                              return (
                                <ul className="card-body">
                                  <li>{<img  className="image" src={ea[1].imageURL} alt="nbb"></img>}</li>
                                  <li>{ea[1].name}</li>
                                  <li>{ea[1].target} ETH</li>
                                  <li>{ea[1].address}</li>
                                  
                                  <li>{ea[1].description}</li>
                                  <button className="btn-delete" onClick={(e)=> deleteds(e)}>DELETE</button>
                                </ul>)
        }))}
      </div>
    </div>
  )
}

export default Campaign