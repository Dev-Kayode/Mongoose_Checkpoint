import mongoose from "mongoose";

const perSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  favouriteFoods: {
    type: [String],
    required: true,
  },
});

const person = mongoose.model("Person", perSchema);

export default person;
