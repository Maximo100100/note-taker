// require express and route .js files 
const express = require('express');
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
// set up app and PORT
const app = express();
const PORT = process.env.PORT || 3001;

// Set up the server and use .static to send webpages
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// .use the routes to get the html pages aswell as api to get json data 
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Have server listen on PORT 
app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}`);
});
