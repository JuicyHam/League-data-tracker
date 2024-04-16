// Import necessary libraries
const express = require('express');
const app = express();

// Example data for suggestions
const suggestionsData = [
  "Suggestion 1",
  "Suggestion 2",
  "Suggestion 3"
];

// Define route handler for GET /api/search
app.get('/api/search', (req, res) => {
  // Extract the query parameter from the request URL
  const { q } = req.query;

  // Logic to filter suggestions based on the query (you may replace this with your actual logic)
  const filteredSuggestions = suggestionsData.filter(suggestion =>
    suggestion.toLowerCase().includes(q.toLowerCase())
  );

  // Respond with the filtered suggestions
  res.json({ "suggestions": "hellsddfo" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});