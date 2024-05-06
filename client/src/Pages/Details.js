import React from "react";
import axios from "axios";
import queryString from "query-string";
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import '../Style/detailsPage.css';
const BASE_URL = window.env.REACT_APP_BASE_URL;

const customStyles = {
    overlay:{
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

class Details extends React.Component{
    
    constructor(){
        super();
        this.state = {
            restaurant: [],
            restId: undefined,
            galleryModal: false,
            menuModal: false,
            menu:[],
            formModal: false
        }
    }


    componentDidMount(){
        const q = queryString.parse(window.location.search);
        const { restaurant } = q;
        //console.log(restaurant);

        axios({
            //url: `http://localhost:5500/restaurant/${restaurant}`,
            url: `${BASE_URL}/restaurant/${restaurant}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then( res => {
            this.setState({ restaurant: res.data.restaurant, restId: restaurant })
        })
        .catch((err => console.log(err)))
    }

    // For Modal
    handleModal = (state, value) => {
        const {restId} = this.state;

        if(state === "menuModal" && value === true ){
            axios({
                //url: `http://localhost:5500/menu/${restId}`,
                url: `${BASE_URL}/menu/${restId}`,
                method: 'GET',
                headers: { 'Content-Type': 'application/JSON'}
            })
            .then( res => {
                this.setState({ menu: res.data.menuItem })
            })
            .catch((err => console.log(err)))
        }
        this.setState({ [state]: value });
    }

    //ADding number of elements
    addItems = (index, operationType) => {
        var total = 0;
        const items = [...this.state.menu];
        const item = items[index];

        if(operationType === 'add'){
            item.qty += 1;
        } else {
            item.qty -= 1;
        }

        items[index] = item;

        items.map((x) => {
            total += x.qty * x.price
        })
        this.setState({ menu: items, subtotal: total })
    }
    
    //Payment 
    initPayment = (data) => {
        const options = {
            key:"rzp_test_DLyA95nWlhVn1u",
            amount: data.amount,
            currency: data.currency,
            description: " Test Transaction ",
            order_id: data.id,

            handler: async(response) => {
                try{
                    //const verifyLink =" http://localhost:5500/api/payment/verify";
                    const verifyLink = `${BASE_URL}/api/payment/verify`;
                    const { data } = await axios.post(verifyLink, response);

                } catch (error){
                    console.log(error);
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }
    razorpayPayment = async() => {
        const { subtotal } = this.state;

        try{
            //const orderLink = "http://localhost:5500/api/payment/orders";
            const orderLink = `${BASE_URL}/api/payment/orders`;
            const { data } = await axios.post(orderLink, { amount: subtotal });

            this.initPayment(data.data);
        }catch (error){
            console.log(error);
        }
    }


    render(){
      const { restaurant, galleryModal, menuModal, menu, subtotal, formModal } = this.state;
        return(
            <div>
                 {/* <!--Navbar-->*/}
                        <nav class="navbar bg-danger" data-bs-theme="">
                            <div class="container">
                                <div class="navbar-brand text-danger circle">
                                    <h2 class="logo">e!</h2>
                                </div>
                                {/* <form class="d-flex nav-form">
                                    <button type="button" class="btn btn-danger">Login</button>
                                    <button type="button" class="btn btn-outline-light">Create an account</button>
                                </form> */}
                            </div>
                        </nav>

                        <div className="container">
                        <div className="bannerCover">
                            <img src={restaurant.thumb} className="banner" alt="" />
                            <input type="button" value="Click to see Image Gallery" className="gallery_button" onClick={() => this.handleModal('galleryModal', true)} />
                        </div>

                         <h2 className="heading mt-4">{restaurant.name}</h2>

                         <div>
                            <input type="button" className="btn  btn-danger order_button" value="place Online Order" onClick={() => this.handleModal('menuModal', true)} />
                         </div>

                        {/* TABS */}
                        <div className="tabs">
                            <div className="tab"> 
                                <input type="radio" className="" id="tab-1" name="tab-group" checked />
                                <label htmlFor="tab-1">Overview</label>

                                <div className="content">
                                    <div className="about">About this place</div>
                                    <div className="head">Cuisine</div>
                                    <div className="value">{restaurant && restaurant.Cuisine && restaurant.Cuisine.map(cu => `${cu.name}, `)}</div>
                                   
                                    <div className="head">Average Cost</div>
                                    <div className="value">₹{restaurant.cost} for two people (approx.)</div>
                                </div>

                            </div>

                            <div className="tab ms-4"> 
                            <input type="radio" className="" id="tab-2" name="tab-group" />
                            <label htmlFor="tab-2">Contact</label>
                            

                            <div className="content">
                                    <div className="about">About this place</div>
                                    
                                    <div className="value">Phone Number</div>
                                    <div className="value-red">+91 {restaurant.contact_number}</div>
                                   
                                    <div className="head">{restaurant.name}</div>
                                    <div className="value">Shop 1, Plot D, Samruddhi Complex, Chincholi, Mumbai-400002, Maharashtra</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Modal
                        isOpen={galleryModal}
                        style={customStyles}
                       
                    >
                       <div className="close" onClick={() => this.handleModal('galleryModal', false)}>
                            <i class="bi bi-x-lg"></i>
                       </div>
                       <div>
                            <Carousel showIndicators= {false} showThumbs= {false} showStatus={false} >
                                <div>
                                    <img src={restaurant.thumb} className="galley_img" alt="" />
                                </div>

                            </Carousel>
                       </div>
                    </Modal>

                    <Modal
                        isOpen={menuModal}
                        style={customStyles}
                       
                    >
                       <div className="close" onClick={() => this.handleModal('menuModal', false)}>
                            <i class="bi bi-x-lg"></i>
                       </div>
                       <div>
                       <h3 className="menu_restaurant_name">{restaurant.name}</h3>

                       {/* MEnu Item*/}
                       {
                            menu?.map((item, index) => {
                                console.log(item);
                                return(
                                    
                                    <div className="menu">
                                        <div className="menu_body">
                                            <h5 className="item_name">{item.name}</h5>
                                            <h5 className="item_price">{item.price}</h5>
                                            <p className="item_details">{item.description}</p>
                                        </div>
                                        <div className="menu_image">
                                            <img className="item_image" src={`./Images/${item.image}`} alt="food" />

                                           {
                                            item.qty === 0 ?  <div className="item_quantity_button" onClick={() => this.addItems(index, 'add')}>
                                                ADD
                                            </div> :
                                             <div className="item_quantity_button">
                                             <button  onClick={() => this.addItems(index, 'sub')}> - </button>
                                             <span className="qty">{item.qty}</span>
                                             <button onClick={() => this.addItems(index, 'add')}> + </button>
                                         </div>

                                           }

                                        </div>
                               </div>
                                )
                            })}
                      

                       {/* Payment Details */}
                       <div className="payment">
                            {/* <h4 className="total"> Subtotal: ₹ {subtotal} </h4> */}
                            { 
                                subtotal === undefined ? 
                                    <h4 className="total font_weight">Subtotal: ₹ 0 </h4>
                                    : <h4 className="total font_weight">Subtotal: ₹ {subtotal}</h4>

                            }
                            <button className="btn btn-danger payment_button"  onClick={() => {this.handleModal('menuModal', false); this.handleModal('formModal', true)}}>Pay Now</button>
                       </div>
                       </div>
                    </Modal>

                    <Modal
                        isOpen={formModal}
                        style={customStyles}
                       
                    >
                       <div className="close" onClick={() => this.handleModal('formModal', false)}>
                            <i class="bi bi-x-lg"></i>
                       </div>
                       <div style={{
                        width: '20em'
                       }}>
                          <h3 className="menu_restaurant_name">{restaurant.name}</h3>

                          <label htmlFor="name" style={{ marginTop: '10px' }}> Name </label>
                          <input type="text" placeholder="Enter your name" style={{width: '100%'}} className="form-control" id="name" />

                          <label htmlFor="mobile" style={{ marginTop: '10px' }}> Mobile Number </label>
                          <input type="text" placeholder="Enter mobile number" style={{width: '100%'}} className="form-control" id="mobile" />

                          <label htmlFor="address" style={{ marginTop: '10px' }}> Address </label>
                          <textarea type="text" rows="4" placeholder="Enter your address" style={{width: '100%'}} className="form-control" id="address"></textarea>

                        
                        <button className="btn btn-success" style={{ float: "right", marginTop: "18px" }} onClick={this.razorpayPayment}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="razorpay" style={{ height: '25px'}} />
                        </button>

                       </div>
                    </Modal>
            </div>
        )
    }
}

export default Details;