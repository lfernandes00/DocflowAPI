const express = require('express'); 
const app = express(); 
const port = 3000;
const userRouter = require('./routes/users.routes');
const documentRouter = require('./routes/documents.routes');
const clientRouter = require('./routes/clients.routes');
const folderRouter = require('./routes/folders.routes');
const utilities = require('./utilities/utilities');

app.use(express.json());
app.use('/users', userRouter);
app.use('/documents', documentRouter);
app.use('/clients', clientRouter);
app.use('/folders', folderRouter);

app.listen(port, () => {
    console.log('Server Running')
}) 