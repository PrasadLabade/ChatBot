const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());


app.get('/alive', (req, res) => {
    res.send("Server is alive");
});

app.post('/getresponse', (req, res) => {
    console.log("Endpoint hit")
    const { input } = req.query;

    console.log("Input : ", input);

    if (!input) {
        return res.status(400).json({ error: 'Input string is required' });
    }

    const pythonProcess = spawn('python', ['bot.py', input]);

    pythonProcess.stdout.on('data', (data) => {
        console.log("Script Output: ", data.toString());
        const response = parseInt(data.toString().trim());
        console.log("Response : ", response);
        res.json({ response });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('error', (error) => {
        console.error(`Failed to start subprocess: ${error}`);
        res.sendStatus(500).json({ error: 'Internal server error' });
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
