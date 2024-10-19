/*let angka=4;
const number=5;
angka=6;
console.log(angka)*/
/*const a=4;
let b=5;
let d=25
let c=d*a+b;
console.log(c)*/
/*const nama="Ethan";
const umur=14;
console.log(nama,umur);*/

/*function Add_Mie(){
  document.getElementById("keranjang").src="Keranjang_1.png"
}*/
let cart=JSON.parse(localStorage.getItem('cart'))||[];
let cartCount=cart.length>0? cart.reduce((total,item)=>total+item.quantity,0):0;
function updateCartCount(){
  document.getElementById('chart_count').textContent=cartCount;
}
window.onload=updateCartCount;
function addToCart(item,price,image) {
  //Check if the item is already in the cart
  let found=cart.find(cartItem=>cartItem.item ===item);
  if(found){
    found.quantity += 1; //Increase quantity if item exists
  } else{
    cart.push({item, price, quantity: 1, image}); //Add new item to cart if not found
  }
  cartCount ++; //Increment cart count when item is added
  //Save the updated cart to localStorage
  localStorage.setItem('cart',JSON.stringify(cart));
  //Update the cart count on screen
  updateCartCount();
}
function loadCart(){
  const cart=JSON.parse(localStorage.getItem('cart'));
  const cartItemDiv=document.getElementById('Food_Tables');
  cartItemDiv.innerHTML='';//Clear any existing items
  
  let grandTotal=0;

  cart.forEach((item,index) => {
    const t_sm =(item.price*item.quantity).toFixed(2);
    grandTotal += parseFloat(t_sm);

    const row=document.createElement('tr');
    row.innerHTML = `
       <td class="Product_Food">
          <img src=${item.image} alt="Mie" class="Menu_img">
          <div>
            ${item.item}
          </p>
          <h5>
            <p>Harga: Rp.<span id="harga_mie_per_porsi">${item.price}</span></p>
          </h5>
          <a class="remove_button"onclick="removeFromCart(${index})">Remove</a>
          </div>
        </td>
        <td class="quantity">
          <input id="input_mie" name="input_mie" type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index},this.value)">
        </td>
        <td class="subtotal">
          Rp.<span id="total-${index}">${t_sm}</span>
        </td>
    `;
    cartItemDiv.appendChild(row);
});

//Update grand total
document.getElementById('total_semua_number').textContent=grandTotal.toFixed(2);
}
if(document.getElementById('Food_Tables')){
  window.onload=loadCart;
}

function updateQuantity(index, newQuantity) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  // Update the quantity for the item
  cart[index].quantity = parseInt(newQuantity);
  localStorage.setItem('cart', JSON.stringify(cart));
  // Update the total price for this item
  const updatedTotalPrice = (cart[index].price * cart[index].quantity).toFixed(2);
  document.getElementById(`total-${index}`).textContent = updatedTotalPrice;
  // Update the cart count at the top
  cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  updateGrandTotal();
  updateCartCount();
  // Update the grand total

}

function updateGrandTotal() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  let grandTotal = 0;
  cart.forEach(item => {
      grandTotal += item.price * item.quantity;
  });
  document.getElementById('total_semua_number').textContent = grandTotal.toFixed(2);
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  // Remove the item from the cart
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  // Reload the cart to reflect changes
  loadCart();
  // Update the cart count after removing an item
  cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  updateCartCount();
}
/*function remove(element) {
  //Get the row that contains the remove button
  const row= element.parentNode.parentNode.parentNode;
  //Remove the row from the table
  row.parentNode.removeChild(row);
  }*/
/*document.addEventListener('DOMContentLoaded',function() {
    const quantityInputMie = document.getElementById("input_mie");
    const quantityInputKuah =document.getElementById("input_kuah");
    const quantityInputSotoBetawi =document.getElementById("input_sotobetawi");
    
    console.log(quantityInputMie)
    console.log(quantityInputKuah)
    console.log(quantityInputSotoBetawi)
    
    const pricePerMie=parseFloat (document.getElementById("harga_mie_per_porsi").textContent.trim());
    const pricePerKuah= parseFloat(document.getElementById("harga_kuah_per_porsi").textContent.trim());
    const pricePerSotoBetawi=parseFloat(document.getElementById("harga_sotobetawi_per_porsi").textContent.trim());
    
    console.log("the price per mie is" + pricePerMie);
    console.log("the price per kuah is" + pricePerKuah);
    console.log("the price per soto betawi is" + pricePerSotoBetawi);
  
    const total_mie=document.getElementById("subtotal_mie");
    const total_kuah=document.getElementById("subtotal_kuah");
    const total_sotobetawi=document.getElementById("subtotal_sotobetawi")
  
    console.log(subtotal_mie);
    console.log(subtotal_kuah);
    console.log(subtotal_sotobetawi);
  
    quantityInputMie.addEventListener("input",function() {
      const quantityMie= parseInt (quantityInputMie.value);
      console.log("the price is" + quantityInputMie);
  
      const subtotal_mie=pricePerMie*quantityMie;
      total_mie.textContent=subtotal_mie.toFixed(2);
      console.log("the total is" + subtotal_mie);
      subtotalSemuaItem();
    })
  
    quantityInputKuah.addEventListener("input",function() {
      const quantityKuah= parseInt (quantityInputKuah.value);
      console.log("the price is" + quantityInputKuah);
  
      const subtotal_kuah=pricePerKuah*quantityKuah;
      console.log("the total is" + subtotal_kuah);
      total_kuah.textContent=subtotal_kuah.toFixed(2);
      subtotalSemuaItem();
    })
  
    quantityInputSotoBetawi.addEventListener("input",function() {
      const quantitySotoBetawi= parseInt (quantityInputSotoBetawi.value);
      console.log("the price is" + quantityInputSotoBetawi);
  
      const subtotal_sotobetawi=pricePerSotoBetawi*quantitySotoBetawi;
      console.log("the total is" + subtotal_sotobetawi);
      total_sotobetawi.textContent=subtotal_sotobetawi.toFixed(2);
      subtotalSemuaItem();
    })
    
    let st_mie=parseFloat(document.getElementById("subtotal_mie").textContent);
    console.log(st_mie);
    let st_kuah=parseFloat(document.getElementById("subtotal_kuah").textContent);
    console.log(st_kuah);
    let st_sotobetawi=parseFloat(document.getElementById("subtotal_sotobetawi").textContent);
    console.log(st_sotobetawi);
    function subtotalSemuaItem(){
      let perhitunganSemuaItem= st_mie  + st_kuah + st_sotobetawi
      console.log(perhitunganSemuaItem)
  document.getElementById("total_semua_number").textContent=perhitunganSemuaItem
    }
  });
  while(true){
  subtotalSemuaItem()
  }
*/









