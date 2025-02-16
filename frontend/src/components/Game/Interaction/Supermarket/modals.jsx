// modals.js
import toast from 'react-hot-toast';
import { addCongratulatoryModalListeners, addEventListeners, addConceptModalListeners } from './eventListeners';



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

  // Add event listeners
  addEventListeners(supermarketModal);

};

export const createOverspendModal = () => {
  const overspendModal = document.createElement('div');
  overspendModal.id = 'overspendModal';
  overspendModal.style.position = 'fixed';
  overspendModal.style.top = '50%';
  overspendModal.style.left = '50%';
  overspendModal.style.transform = 'translate(-50%, -50%)';
  overspendModal.style.width = '50%';
  overspendModal.style.height = '30%';
  overspendModal.style.backgroundColor = '#FFFFFF';
  overspendModal.style.borderRadius = '10px';
  overspendModal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  overspendModal.style.zIndex = '1000';
  overspendModal.style.display = 'none';
  overspendModal.style.textAlign = 'center';
  overspendModal.style.padding = '20px';
  overspendModal.innerHTML = `
    <h2 style="color: #FF0000; font-size: 30px; margin-bottom: 20px;">Warning!</h2>
    <p style="color: #FF0000; font-size: 20px;">You overspend your budget!</p>
    <p style="color: #FF0000; font-size: 20px;">Not enough money left for University Expenses!</p>
    <button id="closeOverspendModal" style="margin-top: 20px; padding: 15px; font-size: 20px; background-color: #C0C0C0; color: #002F6C; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
      Close
    </button>
  `;
  document.body.appendChild(overspendModal);

  // Add event listener to close the modal
  overspendModal.querySelector('#closeOverspendModal').addEventListener('click', () => {
    overspendModal.style.display = 'none';
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
    <p style="color: #002F6C; font-size: 20px;">You have successfully budget wisely.</p>
    <button id="closeCongratulatoryModal" style="margin-top: 20px; padding: 15px; font-size: 20px; background-color: #C0C0C0; color: #002F6C; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
      Close
    </button>
  `;
  document.body.appendChild(congratulatoryModal);

 //Add event listeners
 addCongratulatoryModalListeners(congratulatoryModal);
};

export const createBudgetingTipModal = () => {
  const budgetingTipModal = document.createElement('div');
  budgetingTipModal.id = 'budgetingTipModal';
  budgetingTipModal.style.position = 'fixed';
  budgetingTipModal.style.top = '50%';
  budgetingTipModal.style.left = '50%';
  budgetingTipModal.style.transform = 'translate(-50%, -50%)';
  budgetingTipModal.style.width = '60%';
  budgetingTipModal.style.height = 'auto'; // Adjust height dynamically
  budgetingTipModal.style.backgroundColor = '#FFFFFF';
  budgetingTipModal.style.borderRadius = '10px';
  budgetingTipModal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  budgetingTipModal.style.zIndex = '1000';
  budgetingTipModal.style.display = 'none';
  budgetingTipModal.style.textAlign = 'center';
  budgetingTipModal.style.padding = '20px';
  budgetingTipModal.innerHTML = `
    <h2 style="color: #002F6C; font-size: 30px; margin-bottom: 20px;">Free Budgeting Tips</h2>
    <div style="text-align: left; margin: 20px 0;">
      <button style="color: #002F6C; font-size: 18px; background: none; border: none; cursor: pointer; text-align: left; width: 100%; padding: 10px 0;">Option 1 - Understanding Fixed vs. Variable Expenses</button><br>
      <button style="color: #002F6C; font-size: 18px; background: none; border: none; cursor: pointer; text-align: left; width: 100%; padding: 10px 0;">Option 2 - Allocating Funds for Savings, Essentials, and Discretionary Spending</button><br>
      <button style="color: #002F6C; font-size: 18px; background: none; border: none; cursor: pointer; text-align: left; width: 100%; padding: 10px 0;">Option 3 - Preparing for Future Expenses by Setting a Budget Cap</button>
    </div>
    <button id="closeBudgetingTipModal" style="margin-top: 20px; padding: 15px; font-size: 20px; background-color: #FF6347; color: #FFFFFF; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
      Close
    </button>
  `;
  document.body.appendChild(budgetingTipModal);

  // Add event listener to close the modal
  budgetingTipModal.querySelector('#closeBudgetingTipModal').addEventListener('click', () => {
    budgetingTipModal.style.display = 'none';
  });
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
    <p style="color: #002F6C; font-size: 18px;">After Successful Purchasing you're skills will be tested to a practical application of budgeting</p>
    <p style="color: #002F6C; font-size: 18px;">Budgeting is the process of creating a plan to spend your money. It involves setting limits on your spending and making sure you have enough money to cover your expenses.</p>
    <p style="color: #002F6C; font-size: 18px;">The 50-30-20 rule is a simple budgeting technique that involves dividing your income into three categories:</p>
    <p style="color: #002F6C; font-size: 18px;">1. 50% for needs (e.g., rent, utilities, groceries)<br>
    2. 30% for wants (e.g., dining out, entertainment)<br>
    3. 20% for savings (e.g., emergency fund, retirement savings)</p>
    <p style="color: #002F6C; font-size: 18px;">In this game, you will be given a monthly income of ₱10,000. Your goal is to allocate your budget according to the 50-30-20 rule.</p>
    <p style="color: #002F6C; font-size: 18px;">You will have to balance your fixed expenses (e.g., rent, tuition) and variable expenses (e.g., groceries, transportation) while ensuring that you save at least 20% of your income.</p>
    <p style="color: #002F6C; font-size: 18px;">You will have 5 minutes to complete the budgeting challenge. Good luck!</p>
    <button id="startGame" style="margin-top: 20px; padding: 15px; font-size: 20px; background-color: #002F6C; color: #FFD700; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
      Start Game
    </button>
    <button id="closeConceptModal" style="margin-top: 20px; padding: 15px; font-size: 20px; background-color: #C0C0C0; color: #002F6C; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
      Close
    </button>
  `;
  document.body.appendChild(conceptModal);

//Add event listeners
addConceptModalListeners(conceptModal);
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

  // Function to check if the budget is allocated according to the 50-30-20 rule
  const isBudgetAllocatedCorrectly = () => {
    const groceries = parseFloat(budgetingModal.querySelector('#groceriesInput').value) || 0;
    const transportation = parseFloat(budgetingModal.querySelector('#transportationInput').value) || 0;
    const entertainment = parseFloat(budgetingModal.querySelector('#entertainmentInput').value) || 0;
    const savings = parseFloat(budgetingModal.querySelector('#savingsInput').value) || 0;

    const fixedExpenses = 4000 + 2000 + 1000; // Rent + Tuition + Internet
    const totalExpenses = fixedExpenses + groceries + transportation + entertainment + savings;

    if (totalExpenses !== 10000) {
      return false;
    }

    const essentials = fixedExpenses + groceries + transportation;
    const discretionary = entertainment;
    const savingsPercentage = (savings / 10000) * 100;

    return essentials <= 5000 && discretionary <= 3000 && savingsPercentage >= 20;
  };

  // Event listener for closing the modal
  budgetingModal.querySelector('#closeBudgetModal').addEventListener('click', () => {
    if (isBudgetAllocatedCorrectly()) {
      clearInterval(timerInterval); // Stop the timer
      budgetingModal.style.display = 'none';
    } else {
      alert('You cannot close the modal until you have allocated your budget according to the 50-30-20 rule.');
    }
  });

  budgetingModal.querySelector('#submitBudget').addEventListener('click', () => {
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
    if (totalExpenses !== 10000) {
      alert(`Your total expenses must equal ₱10,000. You have ₱${10000 - totalExpenses} left to allocate.`);
      return;
    }
  
    // Check if the player followed the 50-30-20 rule
    const essentials = fixedExpenses + groceries + transportation;
    const discretionary = entertainment;
    const savingsPercentage = (savings / 10000) * 100;
  
    if (essentials <= 5000 && discretionary <= 3000 && savingsPercentage >= 20) {
      alert('Congratulations! You successfully balanced your budget and followed the 50-30-20 rule.');
      clearInterval(timerInterval); // Stop the timer
      budgetingModal.style.display = 'none'; // Close the modal
    } else {
      alert('You balanced your budget, but you did not follow the 50-30-20 rule. Try again!');
    }
  });
};