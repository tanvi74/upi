const mongoose = require('mongoose');

const dbUrl =
  'mongodb+srv://tanvi74:tanvi74%40%23@cluster0-ezxkf.mongodb.net/UPI?retryWrites=true&w=majority';

const connectDb = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('database running.....');
  } catch (err) {
    console.log(err.message, "cann't connect to database");
    process.exit(1);
  }
};

mongoose.set('useFindAndModify', false);

module.exports = connectDb;