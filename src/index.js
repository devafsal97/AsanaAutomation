const express =  require('express');
const app = express();

const webhookRoutes = require('./routes/webhookroutes')
const apiRoutes = require('./routes/apiroutes')


app.use(
    express.urlencoded({
      extended: true
    })
  );
app.use(express.json());



app.use('/webhook', webhookRoutes);
app.use('/api',apiRoutes);

// app.get("/gettask", async (req,res) => {
//     const usersColl = db.collection('Tasks')
//     usersColl.where('name', '==', 'dowmload').limit(1).get()
//     .then(snapshot => {
//         if (snapshot.empty) {
//           console.log('No matching documents.');
//           return;
//         }
//         snapshot.forEach(doc => {
//           console.log(doc.id, '=>', doc.data());
//         });
//       })
//       .catch(error => {
//         console.error('Error getting documents: ', error);
//       })
// })

const server = app.listen(8000,() => {
    console.log("listening to port",server.address());
})