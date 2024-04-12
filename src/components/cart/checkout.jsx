import React, { useState } from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { getRequest } from '../../functions/get.req';
import { isEmptyObject } from 'jquery';

function CheckoutForm() {
    const [postOffice, setPostOffice] = useState([])
    const [hidden, setHidden] = useState(true)
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    block: '',
    district: '',
    region: '',
    state: '',
    zip: '',
});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const reqZipCode = (value)=>{
    fetch("https://api.postalpincode.in/pincode/" + value)
        .then((data)=>data.json())
        .then((jsonZipCodeData)=>{
            console.log(jsonZipCodeData)
            if(jsonZipCodeData[0].Status === "Success") {
                return setPostOffice(jsonZipCodeData[0].PostOffice)
            }
            setHidden(true)
            setPostOffice([])
        }).catch(err=>console.log(err))
  }

  const handleZipCode = (po)=> {
    if(!isEmptyObject(po)) {
        setHidden(false)
    }
    setShippingAddress({
            name: po.Name,
            block: po.Block,
            district: po.District,
            region: po.Region,
            state: po.State,
            zip: po.Pincode,
        }
    )
    setPostOffice([])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log('Submitting shipping address:', shippingAddress);
  };

  return (
    <div className='checkout'>
      <h2 className='flex center gap-20'>Shipping Address<FaShippingFast /></h2>
      <form onSubmit={handleSubmit}>
        <div className="address-ar" style={hidden ? {display: "none"} : {display: ""}}>
        <div>
          <label htmlFor="firstName">Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={shippingAddress.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Block:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={shippingAddress.block}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">District:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={shippingAddress.district}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">Region:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingAddress.region}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={shippingAddress.state}
            onChange={handleInputChange}
            required
          />
        </div>
        </div>
        <div className='zip-ar'>
          <label htmlFor="zip">ZIP Code:</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={shippingAddress.zip}
            onChange={handleInputChange}
            onInput={(e)=>reqZipCode(e.target.value)}
            required
          />
          {
            postOffice.length===0 ? null :
            <div className="zip-selection-ar">
                Select Postoffice
                {
                    postOffice.map((p, i)=>{
                        return <div className="post-office" key={i} onClick={()=>handleZipCode(p)}>{p.Name}</div>
                    })
                }
            </div>
          }
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CheckoutForm;