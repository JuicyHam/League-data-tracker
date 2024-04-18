// Import necessary libraries
const express = require('express');
const app = express();

//Routes
const championsRouter = require(`./routes/championsRouter`);

app.use(`/api/champions`, championsRouter);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});