import * as THREE from 'three';
import toast from 'react-hot-toast';

const supermarketCoordinates = new THREE.Vector3(-4.753375371950036, 0.6999999999999995, -21.946643547283124);
const proximityThreshold = 5;

let cartTotal = 0; // Initialize cart total

const initializeSupermarketInteraction = () => {
  // Add CSS styles
  const style = document.createElement('style');
  style.innerHTML = `
     @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700,400italic);

    /* Global */
    body {
      font-family: 'Open Sans';
      line-height: 200%;
    }

    .main {
      width: 800px;
      margin: 160px auto;
      text-align: center;
    }

    h1, h2, h3 {
      color: #fff;
    }

    h1 {
      margin-bottom: 30px;
      font-size: 44px;
    }

    h2 {
      margin-bottom: 20px;
      font-size: 32px;
    }

    h3 {
      font-size: 21px;
    }

    p {
      font-size: 18px;
      color: #ffd5df;
    }

    .btn {
      margin-top: 30px;
      padding: 2.2% 5.5%;
      display: inline-block;
      transition: all linear 0.15s;
      border-radius: 3px;
      background: #fff;
      font-size: 22px;
      font-weight: bold;
      text-decoration: none;
      text-transform: uppercase;
      color: #333;
    }

    .btn:hover {
      opacity: 0.75;
    }

    /* Popup */
    .popup-wrap {
      width: 100%;
      height: 100%;
      display: none;
      position: absolute;
      top: 0px;
      left: 0px;
      content: '';
      background: rgba(0, 0, 0, 0.85);
    }

    .popup-box {
      width: 600px;
      padding: 20px;
      transform: translate(-50%, -50%) scale(0.5);
      position: absolute;
      top: 50%;
      left: 50%;
      box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.5);
      border-radius: 3px;
      background: #fff;
      text-align: center;
    }

    .popup-box h2 {
      color: #1a1a1a;
    }

    .popup-box h3 {
      color: #888;
    }

    .popup-box .close-btn {
      width: 35px;
      height: 35px;
      display: inline-block;
      position: absolute;
      top: 10px;
      right: 10px;
      transition: all ease 0.5s;
      border-radius: 1000px;
      font-weight: bold;
      text-decoration: none;
      color: #fff;
      line-height: 190%;
    }

    .popup-box .close-btn:hover {
      transform: rotate(180deg);
    }

    .transform-in, .transform-out {
      display: block;
      transition: all ease 0.5s;
    }

    .transform-in {
      transform: translate(-50%, -50%) scale(1);
    }

    .transform-out {
      transform: translate(-50%, -50%) scale(0.5);
    }

    /* Bouncing effect */
    @keyframes bounceIn {
      0%, 20%, 50%, 80%, 100% {
        transform: translate(-50%, -50%) scale(0.5);
      }
      40% {
        transform: translate(-50%, -50%) scale(1.2);
      }
      60% {
        transform: translate(-50%, -50%) scale(1);
      }
    }

    .bounce-in {
      animation: bounceIn 0.5s ease;
    }

    /* E-commerce theme */
    .product-list {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
    }

    .product-item {
      width: 150px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background: #f9f9f9;
      text-align: center;
    }

    .product-item .icon {
      font-size: 50px;
      margin-bottom: 10px;
    }

    .product-item h4 {
      margin: 10px 0;
      font-size: 18px;
      color: #333;
    }

    .product-item p {
      margin: 5px 0;
      font-size: 16px;
      color: #666;
    }

    .product-item button {
      padding: 10px;
      font-size: 16px;
      background-color: #002F6C;
      color: #FFD700;
      border: 2px solid #FFD700;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .product-item button:hover {
      background-color: #FFD700;
      color: #002F6C;
    }

    .cart-total {
      margin-top: 20px;
      font-size: 20px;
      color: #002F6C;
    }
  `;
  document.head.appendChild(style);

 // Create a modal for the supermarket pop-up
const supermarketModal = document.createElement('div');
supermarketModal.id = 'supermarketModal';
supermarketModal.style.position = 'fixed';
supermarketModal.style.top = '50%';
supermarketModal.style.left = '50%';
supermarketModal.style.transform = 'translate(-50%, -50%)';
supermarketModal.style.width = '80%';
supermarketModal.style.height = '80%';
supermarketModal.style.backgroundColor = '#FFFFFF';
supermarketModal.style.borderRadius = '10px';
supermarketModal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
supermarketModal.style.zIndex = '1000';
supermarketModal.style.display = 'none';
supermarketModal.style.overflow = 'auto';
supermarketModal.classList.add('supermarket-modal');
supermarketModal.innerHTML = `
  <div style="position: relative; z-index: 1; text-align: center; padding: 20px;">
    <h2 style="color: #002F6C; font-size: 30px; margin-bottom: 20px;">Supermarket</h2>
    <h3 style="color: #002F6C; font-size: 24px; margin-bottom: 10px;">Needs</h3>
    <div class="product-list">
      <div class="product-item">
        <div class="icon">🍚</div>
        <h4>Rice (1kg)</h4>
        <p>₱50</p>
        <p>Quantity: <span class="quantity">5</span></p>
        <button class="add-to-cart" data-price="50">Add to Cart</button>
      </div>
      <div class="product-item">
        <div class="icon">🥚</div>
        <h4>Eggs (dozen)</h4>
        <p>₱150</p>
        <p>Quantity: <span class="quantity">3</span></p>
        <button class="add-to-cart" data-price="150">Add to Cart</button>
      </div>
      <div class="product-item">
        <div class="icon">🥫</div>
        <h4>Canned Goods</h4>
        <p>₱70</p>
        <p>Quantity: <span class="quantity">5</span></p>
        <button class="add-to-cart" data-price="70">Add to Cart</button>
      </div>
      <div class="product-item">
        <div class="icon">🥦</div>
        <h4>Fresh Vegetables</h4>
        <p>₱80</p>
        <p>Quantity: <span class="quantity">5</span></p>
        <button class="add-to-cart" data-price="80">Add to Cart</button>
      </div>
      <div class="product-item">
        <div class="icon">🥩</div>
        <h4>Meat (1/2kg)</h4>
        <p>₱200</p>
        <p>Quantity: <span class="quantity">2</span></p>
        <button class="add-to-cart" data-price="200">Add to Cart</button>
      </div>
      <div class="product-item">
        <div class="icon">🥛</div>
        <h4>Milk (1L)</h4>
        <p>₱120</p>
        <p>Quantity: <span class="quantity">3</span></p>
        <button class="add-to-cart" data-price="120">Add to Cart</button>
      </div>
    </div>
    <h3 style="color: #002F6C; font-size: 24px; margin-top: 20px; margin-bottom: 10px;">Wants</h3>
    <div class="product-list">
      <div class="product-item">
        <div class="icon">🍜</div>
        <h4>Instant Noodles</h4>
        <p>₱30</p>
        <p>Quantity: <span class="quantity">10</span></p>
        <button class="add-to-cart" data-price="30">Add to Cart</button>
      </div>
      <div class="product-item">
        <div class="icon">🥤</div>
        <h4>Softdrinks (1L)</h4>
        <p>₱60</p>
        <p>Quantity: <span class="quantity">5</span></p>
        <button class="add-to-cart" data-price="60">Add to Cart</button>
      </div>
      <div class="product-item">
        <div class="icon">🍟</div>
        <h4>Chips</h4>
        <p>₱50</p>
        <p>Quantity: <span class="quantity">5</span></p>
        <button class="add-to-cart" data-price="50">Add to Cart</button>
      </div>
    </div>
    <div class="cart-total">
      Total: ₱<span id="cartTotal">0</span>
    </div>
    <button id="payButton" style="margin-top: 20px; padding: 15px; font-size: 20px; background-color: #FFD700; color: #002F6C; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
      Pay
    </button>
    <button id="closesupermarketModal" style="margin-top: 20px; padding: 15px; font-size: 20px; background-color: #C0C0C0; color: #002F6C; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
      Exit Supermarket
    </button>
  </div>
`;
document.body.appendChild(supermarketModal);

  // Event listeners for supermarket modal buttons
  supermarketModal.querySelector('#closesupermarketModal').addEventListener('click', () => {
    supermarketModal.classList.remove('bounce-in');
    supermarketModal.classList.add('transform-out');
    setTimeout(() => {
      supermarketModal.style.display = 'none';
      supermarketModal.classList.remove('transform-out');
    }, 500); // Match the transition duration
  });

  supermarketModal.querySelector('#payButton').addEventListener('click', () => {
    alert(`Total cost: ₱${cartTotal}`);
    cartTotal = 0;
    document.getElementById('cartTotal').innerText = cartTotal;
  });
  // Add event listeners to all "Add to Cart" buttons
  const addToCartButtons = supermarketModal.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const price = parseFloat(button.getAttribute('data-price'));
      addToCart(button, price);
    });
  });
};

const addToCart = (button, price) => {
  const productItem = button.closest('.product-item');
  const quantityElement = productItem.querySelector('.quantity');
  let quantity = parseInt(quantityElement.innerText);

  if (quantity > 0) {
    quantity -= 1;
    quantityElement.innerText = quantity;
    cartTotal += price;
    document.getElementById('cartTotal').innerText = cartTotal;
    toast.success('Item added to cart!');
  } else {
    toast.error('Item is out of stock');
  }
};

const updateSupermarketInteractionButton = (characterPosition, interactionButton) => {
  const distanceToSupermarket = characterPosition.distanceTo(supermarketCoordinates);

  if (distanceToSupermarket <= proximityThreshold) {
    interactionButton.innerText = 'Go to Supermarket';
    interactionButton.style.display = 'block';
    return true;
  }
  return false;
};

const handleSupermarketInteractionClick = () => {
  const supermarketModal = document.getElementById('supermarketModal');
  supermarketModal.style.display = 'block';
  supermarketModal.classList.add('bounce-in');

  // Remove the bounce-in class after the animation ends
  supermarketModal.addEventListener('animationend', () => {
    supermarketModal.classList.remove('bounce-in');
  }, { once: true });
};

export { initializeSupermarketInteraction, updateSupermarketInteractionButton, handleSupermarketInteractionClick };