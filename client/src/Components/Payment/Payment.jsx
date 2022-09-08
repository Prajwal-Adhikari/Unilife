// import React, {useState} from 'react';
// import './payment.css';
// import StripeCheckout from 'react-stripe-checkout';
// import { render } from '../../../../routes/api/payment';
// import { Component } from 'react';

// function App()
// {
//     const [product, setProduct] = useState({
//         name : "React from FB",
//         price : 10,
//         productBy : "facebook"
//     })

//     //render() {
//         return {
//             <div className="App">
//             <
//             </div>
//         }
        
    
//     //}
    
// }


import React, { useState,Component } from 'react';
import './payment.css';
import StripeCheckout from 'react-stripe-checkout';


// export default class Payment extends Component {
  
//   render() {
//     // const [product, setProduct] = useState({
//     //     name : "React from FB",
//     //     price : 10,
//     //     productBy : "facebook"
//     // })

//     return (
//       <section className="payment">
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               <div className="content">
//                 <h3>
//                   You are in Payment section.
//                 </h3>
//                 <StripeCheckout
//                     stripekey=""
//                     token=""
//                     name = "Buy React">
//                       <button className='btn-large pink'>Buy react</button>
//                   </StripeCheckout>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }
// }


// export default Payment;


function Payment(){
  return (
    <section className="payment">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="content">
              <h3>
                You are in Payment section.
              </h3>
              {/* <StripeCheckout
                  stripekey=""
                  token=""
                  name = "Buy React">
                    <button className='btn-large pink'>Buy react</button>
                </StripeCheckout> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Payment;