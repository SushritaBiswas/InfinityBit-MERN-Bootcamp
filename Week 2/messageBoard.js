const express = require("express");  // Importing Express framework to manage the web server
const fs = require("fs");            // Importing file system module to work with files
const path = require("path");        // Importing path module to work with different paths

const application = express();
const PORT = 3001;                   // Defining the port number
const filePath = path.join(__dirname, "messages.json");

application.use(express.json());

// Function to read from JSON file 
const readData = () => {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];  // Returning an empty array if file read fails
    }
};

// Function to write in JSON file
const writeData = (messages) => {
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), "utf8");
};

// POST route 
application.post("/messages", (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    const messages = readData();
    messages.push({ id: messages.length + 1, message, timestamp: new Date() });
    writeData(messages);

    res.status(201).json({ success: true, message: "Message added!" });
});

// GET route
application.get("/messages", (req, res) => {
    const messages = readData();
    res.json({ messages });
});

// Starting server
application.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
