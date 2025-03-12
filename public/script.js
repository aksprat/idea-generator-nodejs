document.getElementById('generate').addEventListener('click', async () => {
    const domain = document.getElementById('domain').value;
    const context = document.getElementById('context').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.textContent = 'Generating...';

    const requestData = {
        domain: domain,
        context: context,
        // Add any other relevant data you want to send to your agent.
    };

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // resultsDiv.textContent = data.response; // Assuming your agent returns a 'response' field.
        if (data && data.response) {
            resultsDiv.textContent = data.response;
        } else {
            resultsDiv.textContent = "Unexpected response from server.";
            console.error("Unexpected response format:", data);
        }
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.textContent = 'An error occurred. Please try again.';
    }
});
