import React from 'react';
import { Outlet,Link } from "react-router-dom";



const body = () => {
  return (
    <div className="content">
          <section className="section-1">
             <div className="section-part-1">
               <img src="https://images.pexels.com/photos/401213/pexels-photo-401213.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="" />
               <p>Help the world grow, be a part of the global community</p>
             </div>
             <div className="section-part-2">
                 <ul>
                     <li>Decentralized</li>
                     <li>Non-Profit</li>
                     <li>Trust & Safety</li>
                 </ul>
                 <div>
                     <p className="part">The first Decentralize Fundraising platform, Global community is built with the aim to allow fundraisers and donors to be in control of their funds, its also non-profit which means all funds goes to you and none to us</p>
                 </div>
             </div>
          </section>
          <section className="section-2">
            <div className="container-3">
              <p>A place for friends, families and charaties, welcome to the global community</p>
            </div>
            <div className="container-2">
              <Link to="/about">
                 <button className="btn">How it Works</button>
              </Link>
            </div>
          </section>
    </div>
  )
}
export default body