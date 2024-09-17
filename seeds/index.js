const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/CampGrounds')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});


const sample = (array) => array[Math.floor(Math.random() * array.length)];




const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '66d4625bf6c4a2b41e096e18',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, optio a asperiores quibusdam corporis saepe dignissimos quo obcaecati ipsa illo facere et suscipit dolores animi enim sit architecto aperiam molestias!',
      price: price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dt2svrtjp/image/upload/v1725728457/YelpCamp/afs0kli4vx9rrae6miuu.jpg',
          filename: 'YelpCamp/afs0kli4vx9rrae6miuu',
        },
        {
          url: 'https://res.cloudinary.com/dt2svrtjp/image/upload/v1725728457/YelpCamp/mgwscpgyh6ayronska33.jpg',
          filename: 'YelpCamp/mgwscpgyh6ayronska33',
        }
      ]
    })
    await camp.save();
  }
}


seedDB().then(() => {
  mongoose.connection.close();
})