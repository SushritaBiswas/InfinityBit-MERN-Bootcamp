const express = require("express"); // Importing Express framework to manage the web server
const application = express(); // Calling the express function 

application.use(express.json());

// Using GET route
application.get("/api/msg", (req, res) => {
    res.json({ message: "GET ROUTE MIL GYA" });
});

// Using POST route
application.post("/api/msg", (req, res) => {
    const { name, msg } = req.body;
    res.json({ message: `Hello ${name}! ${msg}` });
});

// Checking the server and starting it
const port = 3001;
application.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
