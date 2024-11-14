document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inputForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the form from refreshing the page

        // Get input values from the form
        const feature1 = parseFloat(document.getElementById('input1').value);
        const feature2 = parseFloat(document.getElementById('input2').value);
        const feature3 = parseFloat(document.getElementById('input3').value);
        const feature4 = parseFloat(document.getElementById('input4').value);
        const feature5 = parseFloat(document.getElementById('input5').value);

        // Create an object with the input values
        const inputData = {
            inputs: [feature1, feature2, feature3, feature4, feature5]
        };

        // Send the input data to the Flask backend using fetch API
        fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                // Display the error message if any
                document.getElementById('result').textContent = `Error: ${data.error}`;
            } else {
                // Display the prediction result
                document.getElementById('result').textContent = `Prediction: ${data.prediction}`;
            }
        })
        .catch(error => {
            // Handle any network or server errors
            console.error('Error:', error);
            document.getElementById('result').textContent = 'An error occurred during the prediction.';
        });
    });
});
