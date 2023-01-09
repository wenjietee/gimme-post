const express = require("express");
const app = express()

// CONFIG
const PORT= process.env.PORT || 3000;

// LISTEN
app.listen(PORT, () => {
	console.log(`Gimme-Post listening on port: ${PORT}`);
});

