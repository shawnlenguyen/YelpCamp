const Campground = require("../models/campground");
const { descriptors, places } = require("./seedNames");
const cities = require("./cities");
const loremIpsum = require("lorem-ipsum").loremIpsum;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    // mongoose 6 by default has the options below set to true
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "61e799a0fca10e9621555e28",
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: "https://res.cloudinary.com/dmxiwi1ms/image/upload/v1643563556/YelpCamp/caleb-fisher-eZiTbYKgDSs-unsplash_lwm7uu.jpg",
                  filename: 'YelpCamp/caleb-fisher-eZiTbYKgDSs-unsplash_lwm7uu',
                },
                {
                  url: "https://res.cloudinary.com/dmxiwi1ms/image/upload/v1643563554/YelpCamp/tegan-mierle-fDostElVhN8-unsplash_adcgto.jpg",
                  filename: "YelpCamp/tegan-mierle-fDostElVhN8-unsplash_adcgto",
                },
                {
                  url: "https://res.cloudinary.com/dmxiwi1ms/image/upload/v1643563556/YelpCamp/jimmy-conover-J_XuXX9m0KM-unsplash_tb7kfe.jpg",
                  filename: "YelpCamp/jimmy-conover-J_XuXX9m0KM-unsplash_tb7kfe",
                },
                {
                  url: "https://res.cloudinary.com/dmxiwi1ms/image/upload/v1643563557/YelpCamp/blake-wisz-TcgASSD5G04-unsplash_cp0wez.jpg",
                  filename: "YelpCamp/blake-wisz-TcgASSD5G04-unsplash_cp0wez",
                },
                {
                  url: "https://res.cloudinary.com/dmxiwi1ms/image/upload/v1643563556/YelpCamp/hanson-lu--Avc2AiE1_Q-unsplash_djtenb.jpg",
                  filename: "YelpCamp/hanson-lu--Avc2AiE1_Q-unsplash_djtenb",
                }
              ],
            description: loremIpsum(),
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})