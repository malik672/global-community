import React from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage} from "firebase/storage";


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
      export const storage = getStorage(app);
