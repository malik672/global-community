import React from 'react';
import { initializeApp } from 'firebase/app';
import Header from './Header';
import {useEffect, useState} from "react"
import Web3 from 'web3';
import abi from "./Donate.json";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import {BigNumber} from "bignumber.js";
import { getStorage, ref as sRef } from "firebase/storage";



const Content = () => {
   
  const [state, setState] = useState([]);
  const [values, setValue] = useState("");
  const [address, setAddress] = useState("");
  const [inputs, setInputs] = useState("");
  const [filterItems, setFilterItems] = useState([]);
  const [progress, setProgress] = useState("")

  const web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(abi.abi,'0x2C5893AfB778579F8a7a7e1D338fDAcc8C89113b');
 
  
  useEffect(()=>{
    const getContent = async() =>{
      try{
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
  
        // const app = initializeApp(firebaseConfig);
        const db = getDatabase();
  
        const refrence = ref(db, 'users/')
        onValue(refrence, (snapshot) =>{
          const data = snapshot.val();
          if(data !== null){
            const datas = Object.entries(data);
            setState(datas);
            datas.map((a)=>{
              console.log(a[1].address);
            })
          }
        })
      }catch(e){
        console.log(e);
      }
    }
    getContent()
    // const  getImage = () => {
    //   try{
          
    //       const storage =  getStorage();  
    //       console.log(ups); 
    
    //   }catch(e){
    //     console.error(e)
    //   }
    
    //   }
    //   getImage()
  }, [])



  const donate = async(home) =>{
    if(values.length !== 0 && window.ethereum.selectedAddress !== null){

      const Big = new BigNumber(values).times(10 ** 18)
      const rear = Big
      const wei = web3.utils.toBN(rear)
      console.log(wei);

      try{
        const test =  await contract.methods.Donates(home,wei).send({
        from:window.ethereum.selectedAddress, 
        value:wei
        });
        if(test.status == true){
          donates(home,wei)
        }
      
      }catch(e){
        console.error(e)
      }
    }

    console.log(address);
  }

  const donates = async(address, homes) =>{
      const tests =  await contract.methods.donations(address).call({
       from:window.ethereum.selectedAddress, 
       value:0
      });
      const weis = web3.utils.fromWei(tests);
      const db = getDatabase();
      const refrence = ref(db,  address);
      set(refrence, {
        weis:weis
      })

  }

  
 
   const search = async(vals) => {
       setInputs(vals);
       if(inputs !== ''){
         const rear =  state.filter((ea)=>{
           return (ea[1].address).toLowerCase().includes(inputs.toLowerCase())
         });
         setFilterItems(rear);
       }else{
         setFilterItems(state)
       }
       
   }
   
   console.log(address)


  return (
    <div>
       <Header/>
       <input type="search" onChange={(e)=>(search(e.target.value))} placeholder="use search bar to search for address fundraisers" className="search"/>
       <div className="cards">
        {inputs.length > 1 ? (filterItems.map((ea)=>{
         
         return (
         <ul className="card-body">
           <li>{<img  className="image" src={ea[1].imageURL} alt=""></img>}</li>
           <li>{ea[1].name}</li>
           <li>{ea[1].target} ETH</li>
           <li>{ea[1].address}</li>
           <li>{ea[1].description}</li>
           <li>
             <div className="flix">
               <input required type="number" onChange={(e)=>setValue(e.target.value)}></input>
               <button type="submit" className="btn-address" onClick={(e)=>donate(ea[1].address)}>Donate</button>
               <input type="text" className="address" onLoad={(e) => setAddress(e[1].address)} value={ea[1].address}>{ea[1].address}</input>
             </div>
           </li>
         </ul>)
        })) : (state.map((ea)=>{
          return (
          <ul className="card-body">
            <li>{<img  className="image" src={ea[1].imageURL} alt=""></img>}</li>
            <li>{ea[1].name}</li>
            <li>{ea[1].target} ETH</li>
            <li className ="li-add">{ea[1].address}</li>
            
            <li>{ea[1].description}</li>
            <li>
              <div className="flix">
                <input required type="number" className="flix-1" onChange={(e)=>setValue(e.target.value)}></input>
                <button type="submit" className="btn-address" onClick={(e)=>donate(ea[1].address)}>Donate</button>
                <input type="text" className="address" onLoad={(e) => setAddress(ea[1].address)} value={ea[1].address}></input>
              </div>
            </li>
          </ul>)
         }))}
       </div>
    </div>
  )
}

export default Content;