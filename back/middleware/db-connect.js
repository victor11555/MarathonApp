const mongoose = require('mongoose');

const dbConnect = () => {
  // mongoose.connect('mongodb+srv://user:110783Qwerta83@elbrus.q9tvq.mongodb.net/marathon?retryWrites=true&w=majority', {
  mongoose.connect('mongodb://localhost:27017/MARATHONAPP' ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};
module.exports = dbConnect;
