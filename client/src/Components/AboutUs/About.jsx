import React from "react";
import { Component } from "react";
import aboutlogo from '../../static/about_logo.png';
import abouthostel from "../../static/about_hostel.png";
import aboutproducts from "../../static/about_products.png";
import './About.css';


class About extends Component{
    render(){
        return(
            <div>
              <div class="bg-whitabout_hostele py-5">
  <div class="container py-5">
    <div class="row align-items-center mb-5">
      <div class="col-lg-6 order-2 order-lg-1"><i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
        <h2 class="font-weight-light">UNILIFE</h2>
        <p class="font-italic text-muted mb-4">Unilife is an all-in-one e-commerce website for university students and businesses targeting such customers, which both parties can benefit from. We have developed a website that is easy to use and also productive and effective. It can work as a platform where students and businesses meet each other to view, find, and buy/sell different products and services that a university student requires and businesses can provide.</p>
      </div>
      <div class="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src={aboutlogo} alt="" class="img-fluid mb-4 mb-lg-0" /></div>
    </div>
    <div class="row align-items-center">
      <div class="col-lg-5 px-5 mx-auto"><img src={abouthostel}alt="" class="img-fluid mb-4 mb-lg-0" /></div>
      <div class="col-lg-6"><i class="fa fa-leaf fa-2x mb-3 text-primary"></i>
        <h2 class="font-weight-light">Hostels and Rooms</h2>
        <p class="font-italic text-muted mb-4">Unilife – a simpler and easier way to find hostels and rooms near your schools and colleges. A website developed by Team Unilife with the hope of a new start. Explore and find cozy accomodations at resonable price. List your hostels and rooms to find potential tenants.</p>
      </div>
    </div>

    <div class="row align-items-center mb-5">
      <div class="col-lg-6 order-2 order-lg-1"><i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
        <h2 class="font-weight-light">Products</h2>
        <p class="font-italic text-muted mb-4">Explore, buy, review, and sell variety of items both new and second hand all in one place. Experience hassle-free Online Shopping with a wide and assorted range of products including educational,electronics,home and living, and much more. </p>
      </div>
      <div class="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src={aboutproducts} alt="" class="img-fluid mb-4 mb-lg-0" /></div>
    </div>


  </div>
</div>

<div class="bg-light py-5">
  <div class="container py-5">
    <div class="row mb-4">
      <div class="col-lg-5">
        <h2 class="display-4 font-weight-light">Our team</h2>
      </div>
    </div>

    <div class="row text-center">

      <div class="col-xl-3 col-sm-6 mb-5">
        <div class="bg-white rounded shadow-sm py-5 px-4"><a href="https://github.com/Prajwal-Adhikari" target="_blank"><img src="https://avatars.githubusercontent.com/u/66841209?s=400&u=2b65abc7c9fa86682885d7715237a84cb7946f62&v=4" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
        
          <h5 class="mb-0">Prajwal Adhikari</h5>
          </a>
          <span class="small text-uppercase text-muted">Frontend Developer</span>
        </div>
      </div>
      
      <div class="col-xl-3 col-sm-6 mb-5">
        <div class="bg-white rounded shadow-sm py-5 px-4"><a href="https://github.com/Panda315" target="_blank"><img src="https://avatars.githubusercontent.com/u/95164065?v=4" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
          <h5 class="mb-0">Prashant Shrestha</h5>
          </a><span class="small text-uppercase text-muted">Backend Developer</span>
        </div>
      </div>
   
      <div class="col-xl-3 col-sm-6 mb-5">
        <div class="bg-white rounded shadow-sm py-5 px-4"><a href="https://github.com/MythicSTR" target="_blank"><img src="https://scontent.fktm8-1.fna.fbcdn.net/v/t1.6435-9/120840913_1264520923911314_1162707340508317434_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=_NN6Z3E93_MAX8P9WqP&tn=s58EuNq3zMis2Yr2&_nc_ht=scontent.fktm8-1.fna&oh=00_AfDKZz21ePf0Zf4qYQLfObncZ5ZJU90gF7Opz-cmmtyngw&oe=639194DD" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
        </a>
          <h5 class="mb-0">Shishir Tamrakar</h5><span class="small text-uppercase text-muted">UI/UX Designer</span>
          
        </div>
      </div>
      <div class="col-xl-3 col-sm-6 mb-5">
        <div class="bg-white rounded shadow-sm py-5 px-4"><a href="https://github.com/ankeet779" target="_blank"><img src="https://scontent.fktm3-1.fna.fbcdn.net/v/t1.6435-9/31662172_1993472334237823_7931233848862441472_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=wmmez4LMBLsAX8AB_jf&_nc_ht=scontent.fktm3-1.fna&oh=00_AfD7qOFPSZiVl00FZAEM6-1QC9DPMsmcOqtPw8ogc5gFHQ&oe=63B044FE" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
        </a>
          <h5 class="mb-0">Ankit Rimal</h5><span class="small text-uppercase text-muted">Frontend Developer</span>
          
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