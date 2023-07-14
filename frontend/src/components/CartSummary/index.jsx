import CartContext from '../../context/CartContext'


const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.price * eachCartItem.quantity
      })
      const checkout=()=>{
        console.log(cartList)
        fetch("http://localhost:5123/checkout",{
          method:'POST',
          headers:{
            'Content-Type':"application/json"
          },
          body:JSON.stringify({
            items:[{
              id:1,quantity:3},
              {
                id:2,quantity:4}

            ]
          })
          }).then(res=>{
            if(res.ok) return res.json()
            return res.json().then(json=>Promise.reject(json))
          }).then(({url})=>{
            window.location=url
          }).catch(err=>{
            console.error(err.error)
        })
      }

      return (
        <>
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total:</span> Rs {total}
              /-
            </h1>
            <p className="total-items">{cartList.length} Items in cart</p>
            <button type="button" className="checkout-button d-sm-none" onClick={checkout}>
              Checkout
            </button>
          </div>
          <button type="button" className="checkout-button d-lg-none" onClick={checkout}>
            Checkout
          </button>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
