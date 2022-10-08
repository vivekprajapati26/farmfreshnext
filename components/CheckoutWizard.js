import React from 'react'

const CheckoutWizard = ({activeStep = 0}) => {
  return (
    <div className='mb-5 flex flex-wrap '>
      {
        ['User Login ', 'Shipping Address' , 'Payment Method' , 'Place Order'].map((step, index) => (  
        <div
         key ={step} className ={ `flex-1 border-b-2 text-center 
        
         ${
            index<= activeStep 
            ? 'border-green-700 text-green-700': 'border-blue-400 text-blue-400' 
         }`
        
        }> {step}
        
        </div> 
        )
        )}
      
    </div>
  )
    
}

export default CheckoutWizard
