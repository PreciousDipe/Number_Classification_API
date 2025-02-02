// Utility function: Check if a number is prime
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
  }
  return true;
}

// Utility function: Check if a number is perfect
function isPerfect(num) {
  if (num < 1) return false;
  let sum = 0;
  for (let i = 1; i <= num / 2; i++) {
      if (num % i === 0) sum += i;
  }
  return sum === num;
}

// Utility function: Check if a number is an Armstrong number
function isArmstrong(num) {
  const digits = num.toString().split('').map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
  return sum === num;
}

// Utility function: Calculate the sum of digits
function digitSum(num) {
  // Handle negative numbers by using the absolute value
  num = Math.abs(num);
  return num.toString().split('').reduce((acc, digit) => acc + Number(digit), 0);
}

// AWS Lambda handler function
export const handler = async (event) => {
  const query = event.queryStringParameters || {};
  const numberParam = query.number;
  const parsedNumber = parseInt(numberParam, 10);

  const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
  };

  // Validate input: if not a valid integer, return 400 with error JSON
  if (isNaN(parsedNumber)) {
      return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ number: numberParam, error: true })
      };
  }

  const prime = isPrime(parsedNumber);
  const perfect = isPerfect(parsedNumber);
  const armstrong = isArmstrong(parsedNumber);
  const parity = (parsedNumber % 2 === 0) ? "even" : "odd";

  let properties = [];
  if (prime) {
      properties.push("prime");
  }
  if (perfect) {
      properties.push("perfect");
  }
  if (armstrong) {
      properties.push("armstrong");
  }

  // Add parity (odd/even)
  properties.push(parity);

  const sum = digitSum(parsedNumber);

  let fun_fact = "";
  try {
      const response = await fetch(`http://numbersapi.com/${parsedNumber}/math`);
      fun_fact = await response.text();
  } catch (error) {
      fun_fact = "Fun fact unavailable at this time.";
  }

  const result = {
      number: parsedNumber,
      is_prime: prime,
      is_perfect: perfect,
      properties: properties,
      digit_sum: sum,
      fun_fact: fun_fact
  };

  return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
  };
};