import React from "react";
import { Component } from "react";
import './About.css';


class About extends Component{
    render(){
        return(
            <div>
              <div class="bg-white py-5">
  <div class="container py-5">
    <div class="row align-items-center mb-5">
      <div class="col-lg-6 order-2 order-lg-1"><i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
        <h2 class="font-weight-light">UNILIFE</h2>
        <p class="font-italic text-muted mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><a href="#" class="btn btn-light px-5 rounded-pill shadow-sm">Learn More</a>
      </div>
      <div class="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src="https://bootstrapious.com/i/snippets/sn-about/img-1.jpg" alt="" class="img-fluid mb-4 mb-lg-0" /></div>
    </div>
    <div class="row align-items-center">
      <div class="col-lg-5 px-5 mx-auto"><img src="https://bootstrapious.com/i/snippets/sn-about/img-2.jpg" alt="" class="img-fluid mb-4 mb-lg-0" /></div>
      <div class="col-lg-6"><i class="fa fa-leaf fa-2x mb-3 text-primary"></i>
        <h2 class="font-weight-light">Lorem ipsum dolor sit amet</h2>
        <p class="font-italic text-muted mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><a href="#" class="btn btn-light px-5 rounded-pill shadow-sm">Learn More</a>
      </div>
    </div>
  </div>
</div>

<div class="bg-light py-5">
  <div class="container py-5">
    <div class="row mb-4">
      <div class="col-lg-5">
        <h2 class="display-4 font-weight-light">Our team</h2>
        <p class="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>
    </div>

    <div class="row text-center">

      <div class="col-xl-3 col-sm-6 mb-5">
        <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://avatars.githubusercontent.com/u/66841209?s=400&u=2b65abc7c9fa86682885d7715237a84cb7946f62&v=4" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
        <a href="https://github.com/Prajwal-Adhikari" target="_blank">
          <h5 class="mb-0">Prajwal Adhikari</h5>
          </a>
          <span class="small text-uppercase text-muted">CS Undergrad</span>
        </div>
      </div>
      
      <div class="col-xl-3 col-sm-6 mb-5">
        <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://avatars.githubusercontent.com/u/95164065?v=4" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
          <h5 class="mb-0">Prashant Shrestha</h5><span class="small text-uppercase text-muted">CS Undergrad</span>
        </div>
      </div>
   
      <div class="col-xl-3 col-sm-6 mb-5">
        <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://scontent.fktm8-1.fna.fbcdn.net/v/t1.6435-9/120840913_1264520923911314_1162707340508317434_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=_NN6Z3E93_MAX8P9WqP&tn=s58EuNq3zMis2Yr2&_nc_ht=scontent.fktm8-1.fna&oh=00_AfDKZz21ePf0Zf4qYQLfObncZ5ZJU90gF7Opz-cmmtyngw&oe=639194DD" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
          <h5 class="mb-0">Shishir Tamrakar</h5><span class="small text-uppercase text-muted">CS Undergrad</span>
          
        </div>
      </div>
     
      <div class="col-xl-3 col-sm-6 mb-5">
        <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/240836376_957824414777405_6181756299089137021_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=ad2b24&_nc_ohc=SnlkHo36ev8AX84ihk5&_nc_ht=scontent.fktm8-1.fna&oh=00_AfAwnd18eCF3_3oYNA6SFIaAeSQqVBlpzcInhwB7uHKvig&oe=636EC71D" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
          <h5 class="mb-0">Ankit Rimal</h5><span class="small text-uppercase text-muted">CS Undergrad</span>
         
        </div>
      </div>
  

    </div>
  </div>
</div>

            </div>
        )
    }
        
}

export default About;