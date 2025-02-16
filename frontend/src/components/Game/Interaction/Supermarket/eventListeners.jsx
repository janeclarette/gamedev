import toast from 'react-hot-toast';
import { createCongratulatoryModal, showConceptExplanationModal, showBudgetingLessonModal, createOverspendModal, createBudgetingTipModal } from './modals';

let cartItems = []; // Track items added to the cart
let cartTotal = 0; // Initialize cart total

export const addEventListeners = (supermarketModal) => {
  // Close supermarket modal
  supermarketModal.querySelector('#closesupermarketModal').addEventListener('click', () => {
    supermarketModal.classList.remove('bounce-in');
    supermarketModal.classList.add('transform-out');
    setTimeout(() => {
      supermarketModal.style.display = 'none';
      supermarketModal.classList.remove('transform-out');
    }, 500); // Match the transition duration
  });

  // Pay button
  supermarketModal.querySelector('#payButton').addEventListener('click', () => {
    if (cartTotal > 2000) {
      alert(`Total cost: ₱${cartTotal}`);
      alert('YOU OVERSPEND YOUR budget');
      createOverspendModal();
      document.getElementById('overspendModal').style.display = 'block'; // Show the overspend modal
      supermarketModal.style.display = 'none'; // Close the supermarket modal
    } else {
      alert(`Total cost: ₱${cartTotal}`);
      cartTotal = 0;
      document.getElementById('cartTotal').innerText = cartTotal;
      createCongratulatoryModal();
      document.getElementById('congratulatoryModal').style.display = 'block'; // Show the congratulatory modal
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

const addToCart = (productItem, price) => {
  const quantityElement = productItem.querySelector('.quantity');
  let quantity = parseInt(quantityElement.innerText);

  if (quantity > 0) {
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

export const addCongratulatoryModalListeners = (congratulatoryModal) => {
  // Event listener for closing the congratulatory modal
  congratulatoryModal.querySelector('#closeCongratulatoryModal').addEventListener('click', () => {
    congratulatoryModal.style.display = 'none';
    createBudgetingTipModal(); // Show the budgeting tip modal
    document.getElementById('budgetingTipModal').style.display = 'block';
  });

  // Hide the supermarket modal when the congratulatory modal is shown
  document.getElementById('supermarketModal').style.display = 'none';
};

export const addConceptModalListeners = (conceptModal) => {
  // Event listener for closing the modal
  conceptModal.querySelector('#closeConceptModal').addEventListener('click', () => {
    conceptModal.style.display = 'none';
  });

  // Event listener for starting the game
  conceptModal.querySelector('#startGame').addEventListener('click', () => {
    conceptModal.style.display = 'none';
    showBudgetingLessonModal(); // Start the budgeting game
    document.getElementById('budgetingModal').style.display = 'block';
  });
};