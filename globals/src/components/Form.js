import Header from './Header';
import Web3 from 'web3';
import abi from "./Donate.json";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, ref, set } from "firebase/database";
import {ref as sRef, uploadBytes, getDownloadUrl, getDownloadURL } from "firebase/storage";
import {storage} from "./firebase";
import Footer from './Footer';
import Content from "./Content";
import { useState } from 'react';




const Form = () => {
   
  const[name, setName] = useState("");
  const[target, setTarget] = useState("");
  const[description, setDescription] = useState("");
  const[errors, setErrors] = useState("");
  const[url, setUrl] = useState("");
  const[img, setImg] = useState("");
  const[files, setFiles] = useState("");


   const web3 = new Web3(window.ethereum);
   let contract = new web3.eth.Contract(abi.abi,'0x2C5893AfB778579F8a7a7e1D338fDAcc8C89113b');
   
    //add fundraiser
    const main =async(e) =>{
      try{
        const firebaseConfig = {
          apiKey: "AIzaSyA9Xi7rE8j2-G6Hhg-jxXGgGLZ-T3OZeRs",
          authDomain: "global-38c80.firebaseapp.com",
          projectId: "global-38c80",
          storageBucket: "global-38c80.appspot.com",
          messagingSenderId: "436303615902",
          appId: "1:436303615902:web:6e28dfff6d4b6d2c12288f",
          measurementId: "G-G1WWBZSFJ8",
        };        

        const app = initializeApp(firebaseConfig);

        async function writeUserData(userId, name, target, description,imageURL, address){
          const db = getDatabase();
          const refrence = ref(db, 'users/' + userId);
          const ups = sRef(storage, "images/" + userId);

         const up  = await getDownloadURL(ups);

         
          set(refrence, {
            name:name,
            description:description,
            target:target,
            imageURL:up,
            address:address
          })
      
        }
        writeUserData(window.ethereum.selectedAddress, name, target, description, url,window.ethereum.selectedAddress);
      }catch(e){

      }
    }

    //check the file size
    function returnFileSize(number) {
      if(number < 1024) {
        return number + 'bytes';
      } else if(number >= 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + 'KB';
      } else if(number >= 1048576) {
        return (number/1048576).toFixed(1) + 'MB';
      }
    }
    
    //store image file and database to ipfs

    //get the image file
    function getFile () {
      const input = document.querySelector('.image');
      const preview = document.querySelector('.preview');
      while(preview.firstChild) {
        preview.removeChild(preview.firstChild);
      }
      const curFiles = input.files;
      if(curFiles.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No files currently selected for upload';
        preview.appendChild(para);
      } else {
        const list = document.createElement('ol');
        preview.appendChild(list);
    
        for(const file of curFiles) {
          const listItem = document.createElement('li');
          const para = document.createElement('p');
          if((file)) {
            para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
            const image = document.createElement('img')
            image.src = URL.createObjectURL(file);
            listItem.appendChild(image);
            listItem.appendChild(para);
        
            setImg(file);
          } else {
            para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
            listItem.appendChild(para);
          }
    
          list.appendChild(listItem);
        }
      }
    }
     // adds funraiser
     const add = async(e) => {
      e.preventDefault();
      

     try{
      const test =  await contract.methods.addUser(name, target).send({
      from:window.ethereum.selectedAddress, 
      value:0
      });
      console.log(test.status === true)
      console.log(test.status === true)
      if(test.status === true){
        function addImage(userId){
          const imageRef = sRef(storage, "images/" + userId);
          uploadBytes(imageRef,img)
        }
        addImage(window.ethereum.selectedAddress);
       return main()
      }else{

      }
     }catch(e) {
      setErrors(e)
     } 
   }


  return (
    <div>
       <Header/> 
      <div className="hidden">
       <div className="form-section">
        <section>
          <p>Global Community - a decentralized fundraiser</p>
        </section>
        <sections>
          <p></p>
        </sections>
        </div>
        <form className="form" method="post">
          <div className="name">
            <input type="text" placeholder="Name of event in less than 50 words" onChange={(e) => (setName(e.target.value))} required></input>
          </div>
          <div className="target">
            <input type="Number" placeholder="Target Amount" onChange={(e) => (setTarget(e.target.value))} required></input>
          </div>
          <div className="twitter">
          <label for="profile_pic">Choose image to upload</label>
            <input type="file" id="profile_pic" name="profile_pic" accept=".jpg, .jpeg, .png" className="image" onChange={(e)=>(getFile(e))}/>
            <div className="preview">
              <p>No files currently selected for upload</p>
            </div>
          </div>
          <div className="description">
            <textarea type="text" placeholder="description of event" onChange={(e)=>(setDescription(e.target.value))} ></textarea>
          </div>
            <button type="submit" onClick={(e)=>(add(e))}>Submit</button>
          </form>
        </div>
        <Footer/>
    </div>
  )
}

export default Form;