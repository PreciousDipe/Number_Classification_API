# Number_Classification_API

An API that classifies numbers and returns mathematical properties with fun facts.

## Technical Architecture
![Architecture](https://github.com/PreciousDipe/Number_Classification_API/blob/main/numberapi.jpg)


## Features
- Number Classification: Classifies numbers as prime, perfect, or Armstrong.
- Digit Sum Calculation: Calculates the sum of the digits of the number.
- Fun Facts Integration: Fetches fun facts about the number from the Numbers API.
- CORS Support: Ensures that the API is accessible from any domain.

## Technologies Used
- Frontend: HTML, JavaScript
- Backend: AWS Lambda (Node.js 22)
- API Gateway: AWS API Gateway for creating the REST API and enabling CORS
- Fun Fact Source: Numbers API for fun facts

## Endpoint
https://zlbxetulrh.execute-api.us-east-1.amazonaws.com/prod/classify-number?number=45

You can check the API app [here](https://preciousdipe.github.io/Number_Classification_API/frontend/number.html)

