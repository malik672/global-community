import { Outlet,Link } from "react-router-dom";
import React, { useState } from 'react';
import {useEffect} from "react"
import {useLocation} from "react-router-dom"

const Header = () => {
  const location = useLocation();
  
  const re = window.addEventListener('load', (e)=>{})
  
  
  useEffect(() => {
  const btns =  document.querySelector('.btn-wallet')
   const wallets = async(e) =>{
      if(window.ethereum.networkVersion !== '4'){
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: "0x4"}],
        })
        btns.innerText = "connect wallet";
      }else if(window.ethereum.networkVersion === '4'){
        btns.innerText =window.ethereum.selectedAddress;
      } if(window.ethereum.selectedAddress === null){
        btns.innerText = 'connect wallet';
      }
   }
   wallets()
  }, [re]);
  const wallet = async(e) => {
    if(window.ethereum){
   
      await window.ethereum.request({
       method: "eth_requestAccounts",
       params: [
         {
           eth_accounts: {}
         }
       ]
     });
   
     if(window.ethereum.networkVersion !== '4'){
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: "0x4"}],
      })
     }else{
       alert("connected");
     }
   
    }else{
      alert("please install metamask")
    }
   }
   

  
  const [state, setState] = useState("");
   
 
  return(
      <header className="header">
        <div>
          <Link to="/">
             <h1>Global Community</h1>
          </Link>
        </div>
         <nav>
             <ul className="display">
               <button>
                 <div>. . .</div>
               </button>
             </ul>
             <ul className='liste'>
                 <li>
                   <button className="btn">
                     <Link to="/content">Donate</Link>
                   </button>
                 </li>
                 <li>
                   <button className="btn btn-donation">
                       <Link to="/form">start a fundraiser</Link>
                    </button>
                 </li>
                 
                 <button className="btn btn-wallet" onClick={(e) =>(wallet(e))}>
                      Connect Wallet
                 </button>
                 <li>
                 <button className="btn">
                     <Link to="/Campaign">my campaign</Link>
                 </button>
                 </li>
             </ul>
         </nav>
         <Outlet/>
      </header>
  )
}


export default Header;