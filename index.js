import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

import person from "./models/person.models.js";

const user_1 = new person({
  name: "Oshoba Kayode",
  age: 23,
  favouriteFoods: ["Rice with Ofada Stew", "Pounded Yam and Egusi"],
});

user_1
  .save()
  .then((person) => console.log("User Saved", person))
  .catch((error) => console.log("Error saving User", error));

const arrayOfPeople = [
  {
    name: "Woody",
    age: 20,
    favouriteFoods: ["Peppersoup", "Spaghetti and sauce"],
  },
  { name: "Emma", age: 17, favouriteFoods: ["Peanut", "Anime"] },
  { name: "Gabriel", age: 22, favouriteFoods: ["Rice", "Yam"] },
];

person
  .create(arrayOfPeople)
  .then((data) => {
    console.log("People created:", data);
  })
  .catch((err) => {
    console.error("Error creating people:", err);
  });

person
  .find({ name: "Woody" })
  .then((data) => {
    console.log("Person Found:", data);
  })
  .catch((error) => {
    console.error("Error Finding User:", error);
  });

person
  .findOne({ favouriteFoods: "Peppersoup" })
  .then((data) => console.log("Person found:", data))
  .catch((err) => console.error("Error finding person:", err));

person
  .findById("66d825709a12d27c598b7f3a")
  .then((data) => console.log("Person found by ID:", data))
  .catch((err) => console.error("Error finding person by ID:", err));

person
  .findById("66d825709a12d27c598b7f38")
  .then((person) => {
    if (!person) throw new Error("person not found");

    // Add "hamburger" to the favouriteFoods array
    person.favouriteFoods.push("hamburger");

    // Save the updated document
    return person.save();
  })
  .then((updatedPerson) => console.log("Updated Person:", updatedPerson))
  .catch((err) => console.error("Error updating person:", err));

person
  .findOneAndUpdate(
    { name: "Gabriel" }, // Search by name
    { age: 20 }, // Update age to 20
    { new: true } // Return the updated document
  )
  .then((updatedPerson) => console.log("Person updated:", updatedPerson))
  .catch((err) => console.error("Error updating person:", err));

person
  .findByIdAndDelete("66d825709a12d27c598b7f39")
  .then((removedPerson) => console.log("Person Removed:", removedPerson))
  .catch((error) => console.log("Person Removed:", error));

person
  .deleteMany({ name: "Woody" })
  .then((remove) => console.log("Person Deleted:", remove));

person
  .find({ favouriteFoods: "Rice with Ofada Stew" })
  .sort({ createdAt: -1 }) // Sort by name
  .limit(2) // Limit to 2 results
  .select("-age") // Exclude age from the results
  .exec()
  .then((data) => console.log("People found:", data))
  .catch((err) => console.error("Error finding people:", err));
