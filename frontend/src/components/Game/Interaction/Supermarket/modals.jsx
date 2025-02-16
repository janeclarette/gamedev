// modals.js
import toast from 'react-hot-toast';


let cartItems = []; // Track items added to the cart
// let cartTotal = 0; // Initialize cart total
let cartTotal = 2000; // Initialize cart total

export const createSupermarketModal = () => {
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
      <h2 style="color: #FF0000; font-size: 30px; margin-bottom: 20px;">caution: the cost of items must not exceed PHP2000</h2>
      <h2 style="color: #002F6C; font-size: 30px; margin-bottom: 20px;">Supermarket</h2>
      <h3 style="color: #002F6C; font-size: 24px; margin-bottom: 10px;">Needs</h3>
      <div class="product-list">
        <div class="product-item">
          <div class="icon">🍚</div>
          <h4>Rice (1kg)</h4>
          <p>₱50</p>
          <p>Stocks: <span class="quantity">5</span></p>
          <button class="add-to-cart" data-price="50">Add to Cart</button>
        </div>
        <div class="product-item">
          <div class="icon">🥚</div>
          <h4>Eggs (dozen)</h4>
          <p>₱150</p>
          <p>Stocks: <span class="quantity">3</span></p>
          <button class="add-to-cart" data-price="150">Add to Cart</button>
        </div>
        <div class="product-item">
          <div class="icon">🥫</div>
          <h4>Canned Goods</h4>
          <p>₱70</p>
          <p>Stocks: <span class="quantity">5</span></p>
          <button class="add-to-cart" data-price="70">Add to Cart</button>
        </div>
        <div class="product-item">
          <div class="icon">🥦</div>
          <h4>Fresh Vegetables</h4>
          <p>₱80</p>
          <p>Stocks: <span class="quantity">5</span></p>
          <button class="add-to-cart" data-price="80">Add to Cart</button>
        </div>
        <div class="product-item">
          <div class="icon">🥩</div>
          <h4>Meat (1/2kg)</h4>
          <p>₱200</p>
          <p>Stocks: <span class="quantity">2</span></p>
          <button class="add-to-cart" data-price="200">Add to Cart</button>
        </div>
        <div class="product-item">
          <div class="icon">🥛</div>
          <h4>Milk (1L)</h4>
          <p>₱120</p>
          <p>Stocks: <span class="quantity">3</span></p>
          <button class="add-to-cart" data-price="120">Add to Cart</button>
        </div>
      </div>
      <h3 style="color: #002F6C; font-size: 24px; margin-top: 20px; margin-bottom: 10px;">Wants</h3>
      <div class="product-list">
        <div class="product-item">
          <div class="icon">🍜</div>
          <h4>Instant Noodles</h4>
          <p>₱30</p>
          <p>Stocks: <span class="quantity">10</span></p>
          <button class="add-to-cart" data-price="30">Add to Cart</button>
        </div>
        <div class="product-item">
          <div class="icon">🥤</div>
          <h4>Softdrinks (1L)</h4>
          <p>₱60</p>
          <p>Stocks: <span class="quantity">5</span></p>
          <button class="add-to-cart" data-price="60">Add to Cart</button>
        </div>
        <div class="product-item">
          <div class="icon">🍟</div>
          <h4>Chips</h4>
          <p>₱50</p>
          <p>Stocks: <span class="quantity">5</span></p>
          <button class="add-to-cart" data-price="50">Add to Cart</button>
        </div>
      </div>
      <div class="cart-total">
        Total: ₱<span id="cartTotal">0</span>
      </div>
      <div class="caution" id="cautionMessage">
        Warning: You cannot exceed 2000 pesos.
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
    if (cartTotal <= 2000) {
      alert(`Total cost: ₱${cartTotal}`);
      cartTotal = 0;
      document.getElementById('cartTotal').innerText = cartTotal;
      createCongratulatoryModal();
      document.getElementById('congratulatoryModal').style.display = 'block'; // Show the congratulatory modal

      
    } else {
      toast.error('Cannot exceed 2000 pesos. Please adjust your cart.');
    }
  });

  // Add "Remove from Cart" button to each product item
  const productItems = supermarketModal.querySelectorAll('.product-item');
  productItems.forEach(item => {
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove from Cart';
    removeButton.style.marginTop = '10px';
    removeButton.style.padding = '10px';
    removeButton.style.fontSize = '16px';
    removeButton.style.backgroundColor = '#FF6347'; // Tomato color
    removeButton.style.color = '#FFFFFF';
    removeButton.style.border = 'none';
    removeButton.style.borderRadius = '5px';
    removeButton.style.cursor = 'pointer';
    removeButton.style.transition = 'background-color 0.3s';
    removeButton.style.display = 'none'; // Initially hidden
    removeButton.classList.add('remove-from-cart');
    item.appendChild(removeButton);
  });

  // Event listeners for "Add to Cart" buttons
  const addToCartButtons = supermarketModal.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const price = parseFloat(button.getAttribute('data-price'));
      const productItem = button.closest('.product-item');
      addToCart(productItem, price);
    });
  });

  // Event listeners for "Remove from Cart" buttons
  const removeFromCartButtons = supermarketModal.querySelectorAll('.remove-from-cart');
  removeFromCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productItem = button.closest('.product-item');
      removeFromCart(productItem);
    });
  });
};

export const createCongratulatoryModal = () => {
  const congratulatoryModal = document.createElement('div');
  congratulatoryModal.id = 'congratulatoryModal';
  congratulatoryModal.style.position = 'fixed';
  congratulatoryModal.style.top = '50%';
  congratulatoryModal.style.left = '50%';
  congratulatoryModal.style.transform = 'translate(-50%, -50%)';
  congratulatoryModal.style.width = '50%';
  congratulatoryModal.style.height = '30%';
  congratulatoryModal.style.backgroundColor = '#FFFFFF';
  congratulatoryModal.style.borderRadius = '10px';
  congratulatoryModal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  congratulatoryModal.style.zIndex = '1000';
  congratulatoryModal.style.display = 'none';
  congratulatoryModal.style.textAlign = 'center';
  congratulatoryModal.style.padding = '20px';
  congratulatoryModal.innerHTML = `
    <h2 style="color: #002F6C; font-size: 30px; margin-bottom: 20px;">Congratulations!</h2>
    <p style="color: #002F6C; font-size: 20px;">You have successfully completed your purchase.</p>
    <button id="closeCongratulatoryModal" style="margin-top: 20px; padding: 15px; font-size: 20px; background-color: #C0C0C0; color: #002F6C; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
      Close
    </button>
  `;
  document.body.appendChild(congratulatoryModal);

  // Event listener for closing the congratulatory modal
  congratulatoryModal.querySelector('#closeCongratulatoryModal').addEventListener('click', () => {
    congratulatoryModal.style.display = 'none';
    showConceptExplanationModal(); // Show the concept explanation modal
  });
  
  // Hide the supermarket modal when the congratulatory modal is shown
  document.getElementById('supermarketModal').style.display = 'none';

};

export const showConceptExplanationModal = () => {
  const conceptModal = document.createElement('div');
  conceptModal.id = 'conceptModal';
  conceptModal.style.position = 'fixed';
  conceptModal.style.top = '50%';
  conceptModal.style.left = '50%';
  conceptModal.style.transform = 'translate(-50%, -50%)';
  conceptModal.style.width = '60%';
  conceptModal.style.height = 'auto'; // Adjust height dynamically
  conceptModal.style.backgroundColor = '#FFFFFF';
  conceptModal.style.borderRadius = '10px';
  conceptModal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  conceptModal.style.zIndex = '1000';
  conceptModal.style.display = 'block';
  conceptModal.style.textAlign = 'center';
  conceptModal.style.padding = '20px';
  conceptModal.innerHTML = `
    <h2 style="color: #002F6C; font-size: 30px; margin-bottom: 20px;">Budgeting Game: Key Concepts</h2>
    <div style="text-align: left; margin: 20px 0;">
      <h3 style="color: #002F6C; font-size: 24px;">1. Fixed vs. Variable Expenses</h3>
      <p style="color: #002F6C; font-size: 18px;">
        <strong>Fixed Expenses</strong> are costs that remain the same every month and are essential for daily life. Examples include:
        <ul style="color: #002F6C; font-size: 16px;">
          <li>Rent/Mortgage</li>
          <li>Tuition Fees</li>
          <li>Internet/Utilities</li>
        </ul>
        <strong>Variable Expenses</strong> fluctuate based on usage and lifestyle. Examples include:
        <ul style="color: #002F6C; font-size: 16px;">
          <li>Groceries</li>
          <li>Transportation</li>
          <li>Entertainment</li>
        </ul>
      </p>
      <h3 style="color: #002F6C; font-size: 24px; margin-top: 20px;">2. The 50-30-20 Rule</h3>
      <p style="color: #002F6C; font-size: 18px;">
        A balanced budget allocates income as follows:
        <ul style="color: #002F6C; font-size: 16px;">
          <li><strong>50% Essentials</strong>: Rent, groceries, transportation, utilities.</li>
          <li><strong>30% Discretionary</strong>: Entertainment, dining out, hobbies.</li>
          <li><strong>20% Savings</strong>: Emergency funds, future expenses.</li>
        </ul>
      </p>
      <h3 style="color: #002F6C; font-size: 24px; margin-top: 20px;">3. Setting Budget Caps</h3>
      <p style="color: #002F6C; font-size: 18px;">
        To avoid overspending, set limits for variable expenses. For example:
        <ul style="color: #002F6C; font-size: 16px;">
          <li>Groceries: ₱1,200 per week</li>
          <li>Transportation: ₱500 per week</li>
          <li>Entertainment: ₱150 per week</li>
        </ul>
      </p>
      <h3 style="color: #002F6C; font-size: 24px; margin-top: 20px;">How to Play</h3>
      <p style="color: #002F6C; font-size: 18px;">
        You will have <strong>5 minutes</strong> to allocate your monthly income of ₱10,000 across fixed expenses, variable expenses, and savings. Follow the 50-30-20 rule to succeed!
      </p>
    </div>
    <button id="startGame" style="margin-top: 20px; padding: 15px; font-size: 20px; background-color: #002F6C; color: #FFD700; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
      Start Game
    </button>
    <button id="closeConceptModal" style="margin-top: 20px; padding: 15px; font-size: 20px; background-color: #C0C0C0; color: #002F6C; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
      Close
    </button>
  `;
  document.body.appendChild(conceptModal);

  // Event listener for closing the modal
  conceptModal.querySelector('#closeConceptModal').addEventListener('click', () => {
    conceptModal.style.display = 'none';
  });

  // Event listener for starting the game
  conceptModal.querySelector('#startGame').addEventListener('click', () => {
    conceptModal.style.display = 'none';
    showBudgetingLessonModal(); // Start the budgeting game
  });
};

export const showBudgetingLessonModal = () => {
  const budgetingModal = document.createElement('div');
  budgetingModal.id = 'budgetingModal';
  budgetingModal.style.position = 'fixed';
  budgetingModal.style.top = '50%';
  budgetingModal.style.left = '50%';
  budgetingModal.style.transform = 'translate(-50%, -50%)';
  budgetingModal.style.width = '60%';
  budgetingModal.style.height = 'auto'; // Adjust height dynamically
  budgetingModal.style.backgroundColor = '#FFFFFF';
  budgetingModal.style.borderRadius = '10px';
  budgetingModal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  budgetingModal.style.zIndex = '1000';
  budgetingModal.style.display = 'none';
  budgetingModal.style.textAlign = 'center';
  budgetingModal.style.padding = '20px';
  budgetingModal.innerHTML = `
    <h2 style="color: #002F6C; font-size: 30px; margin-bottom: 20px;">Budgeting Challenge</h2>
    <p style="color: #002F6C; font-size: 20px;">You have <span id="timer">05:00</span> to allocate your monthly budget!</p>
    <p style="color: #002F6C; font-size: 18px;">Monthly Income: ₱10,000</p>
    <div id="expensesList" style="text-align: left; margin: 20px 0;">
      <h3 style="color: #002F6C; font-size: 24px;">Fixed Expenses</h3>
      <p style="color: #002F6C; font-size: 18px;">
        1. Rent: ₱4,000<br>
        2. Tuition: ₱2,000<br>
        3. Internet: ₱1,000
      </p>
      <h3 style="color: #002F6C; font-size: 24px; margin-top: 20px;">Variable Expenses</h3>
      <p style="color: #002F6C; font-size: 18px;">
        4. Groceries: ₱?<br>
        5. Transportation: ₱?<br>
        6. Entertainment: ₱?
      </p>
      <h3 style="color: #002F6C; font-size: 24px; margin-top: 20px;">Savings</h3>
      <p style="color: #002F6C; font-size: 18px;">
        7. Savings: ₱?
      </p>
    </div>
    <div style="margin: 20px 0;">
      <label for="groceriesInput" style="color: #002F6C; font-size: 18px;">Groceries (₱):</label>
      <input type="number" id="groceriesInput" style="padding: 10px; font-size: 16px; margin-left: 10px;" min="0" max="10000"><br>
      <label for="transportationInput" style="color: #002F6C; font-size: 18px;">Transportation (₱):</label>
      <input type="number" id="transportationInput" style="padding: 10px; font-size: 16px; margin-left: 10px;" min="0" max="10000"><br>
      <label for="entertainmentInput" style="color: #002F6C; font-size: 18px;">Entertainment (₱):</label>
      <input type="number" id="entertainmentInput" style="padding: 10px; font-size: 16px; margin-left: 10px;" min="0" max="10000"><br>
      <label for="savingsInput" style="color: #002F6C; font-size: 18px;">Savings (₱):</label>
      <input type="number" id="savingsInput" style="padding: 10px; font-size: 16px; margin-left: 10px;" min="0" max="10000">
    </div>
    <button id="submitBudget" style="margin-top: 20px; padding: 15px; font-size: 20px; background-color: #002F6C; color: #FFD700; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
      Submit Budget
    </button>
    <button id="closeBudgetModal" style="margin-top: 20px; padding: 15px; font-size: 20px; background-color: #C0C0C0; color: #002F6C; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
      Close
    </button>
  `;
  document.body.appendChild(budgetingModal);

  // Timer logic
  let timeLeft = 300; // 5 minutes in seconds
  const timerElement = budgetingModal.querySelector('#timer');
  const timerInterval = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // If time runs out
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert('Time is up! The budgeting challenge will now close.');
      budgetingModal.style.display = 'none';
    }
  }, 1000);

  // Event listener for closing the modal
  budgetingModal.querySelector('#closeBudgetModal').addEventListener('click', () => {
    clearInterval(timerInterval); // Stop the timer
    budgetingModal.style.display = 'none';
  });

  // Event listener for submitting the budget
  budgetingModal.querySelector('#submitBudget').addEventListener('click', () => {
    clearInterval(timerInterval); // Stop the timer

    // Get the player's inputs
    const groceries = parseFloat(budgetingModal.querySelector('#groceriesInput').value) || 0;
    const transportation = parseFloat(budgetingModal.querySelector('#transportationInput').value) || 0;
    const entertainment = parseFloat(budgetingModal.querySelector('#entertainmentInput').value) || 0;
    const savings = parseFloat(budgetingModal.querySelector('#savingsInput').value) || 0;

    // Fixed expenses
    const fixedExpenses = 4000 + 2000 + 1000; // Rent + Tuition + Internet

    // Total expenses
    const totalExpenses = fixedExpenses + groceries + transportation + entertainment + savings;

    // Check if the budget is balanced
    if (totalExpenses > 10000) {
      alert(`You exceeded your monthly income by ₱${totalExpenses - 10000}. Please adjust your budget.`);
    } else if (totalExpenses < 10000) {
      alert(`You have ₱${10000 - totalExpenses} left unallocated. Consider adding to your savings or expenses.`);
    } else {
      // Check if the player followed the 50-30-20 rule
      const essentials = fixedExpenses + groceries + transportation;
      const discretionary = entertainment;
      const savingsPercentage = (savings / 10000) * 100;

      if (essentials <= 5000 && discretionary <= 3000 && savingsPercentage >= 20) {
        alert('Congratulations! You successfully balanced your budget and followed the 50-30-20 rule.');
      } else {
        alert('You balanced your budget, but you did not follow the 50-30-20 rule. Try again!');
      }
    }

    // Close the modal
    budgetingModal.style.display = 'none';
  });
};



const addToCart = (productItem, price) => {
  const quantityElement = productItem.querySelector('.quantity');
  let quantity = parseInt(quantityElement.innerText);

  if (quantity > 0) {
    if (cartTotal + price > 2000) {
      toast.error('Cannot exceed 2000 pesos. Please adjust your cart.');
      return;
    }

    quantity -= 1;
    quantityElement.innerText = quantity;
    cartTotal += price;
    document.getElementById('cartTotal').innerText = cartTotal;

    // Track the item added to the cart
    cartItems.push({ productItem, price });

    // Show the "Remove from Cart" button
    const removeButton = productItem.querySelector('.remove-from-cart');
    removeButton.style.display = 'block';

    toast.success('Item added to cart!');
  } else {
    toast.error('Item is out of stock');
  }
};

const removeFromCart = (productItem) => {
  const quantityElement = productItem.querySelector('.quantity');
  let quantity = parseInt(quantityElement.innerText);

  // Find the last added item of this type in the cart
  const itemIndex = cartItems.findIndex(item => item.productItem === productItem);
  if (itemIndex !== -1) {
    const { price } = cartItems[itemIndex];
    quantity += 1;
    quantityElement.innerText = quantity;
    cartTotal -= price;
    document.getElementById('cartTotal').innerText = cartTotal;

    // Remove the item from the cart tracking
    cartItems.splice(itemIndex, 1);

    // Hide the "Remove from Cart" button if no more items of this type are in the cart
    if (!cartItems.some(item => item.productItem === productItem)) {
      const removeButton = productItem.querySelector('.remove-from-cart');
      removeButton.style.display = 'none';
    }

    toast.success('Item removed from cart!');
  } else {
    toast.error('Item not found in cart');
  }
};