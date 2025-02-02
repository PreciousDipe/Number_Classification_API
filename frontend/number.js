document.getElementById('numberForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get the number from the input and trim any extra spaces
    const numberInput = document.getElementById('numberInput').value.trim();

    // Clear previous result and hide the result container
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    resultDiv.style.display = 'none';

    // Basic client-side validation: Ensure that input is not empty and is a number
    if (!numberInput || isNaN(numberInput)) {
      resultDiv.innerHTML = '<p class="error">Please enter a valid number.</p>';
      resultDiv.style.display = 'block';
      return;
    }

    // Replace with your actual API endpoint URL (ensure there are no extra slashes)
    const API_URL = 'https://zlbxetulrh.execute-api.us-east-1.amazonaws.com/prod/classify-number';

    try {
      const response = await fetch(`${API_URL}?number=${encodeURIComponent(numberInput)}`);

      if (!response.ok) {
        // Handle errors from the backend (like 400 Bad Request)
        const errorData = await response.json();
        console.error('Error response:', errorData);  // Log the error response
        resultDiv.innerHTML = `<p class="error">Error: Invalid input "${errorData.number}"</p>`;
        resultDiv.style.display = 'block';
        return;
      }

      const data = await response.json();
      console.log('API Response:', data);  // Log the successful response

      // Render the results in a clean format
      resultDiv.innerHTML = `
        <h2>Results for ${data.number}</h2>
        <p><strong>Prime:</strong> ${data.is_prime}</p>
        <p><strong>Perfect:</strong> ${data.is_perfect}</p>
        <p><strong>Properties:</strong> ${data.properties.join(', ')}</p>
        <p><strong>Digit Sum:</strong> ${data.digit_sum}</p>
        <p><strong>Fun Fact:</strong> ${data.fun_fact}</p>
      `;
      resultDiv.style.display = 'block';
    } catch (error) {
      console.error('Error:', error);
      resultDiv.innerHTML = '<p class="error">An unexpected error occurred. Please try again later.</p>';
      resultDiv.style.display = 'block';
    }
});
