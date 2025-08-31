// tourLib.js
const tours = [
  {
    id: 1,
    name: "Best of Paris in 7 Days Tour",
    info: "Paris is synonymous with the finest things that culture can offer — in art, fashion, food, literature, and ideas. On this tour, your Paris-savvy Rick Steves guide will immerse you in the very best of the City of Light: the masterpiece-packed Louvre and Orsay museums, resilient Notre-Dame Cathedral, exquisite Sainte-Chapelle, and extravagant Palace of Versailles. You'll also enjoy guided neighborhood walks through the city's historic heart as well as quieter moments to slow down and savor the city's intimate cafés, colorful markets, and joie de vivre. Join us for the Best of Paris in 7 Days!",
    image: "https://www.course-api.com/images/tours/tour-1.jpeg",
    price: "1,995",
  },
  {
    id: 2,
    name: "The Best of Italy",
    info: "This tour is designed to immerse you in the rich culture and history of Italy. Explore ancient Roman ruins, marvel at Renaissance art in Florence, and enjoy the beautiful canals of Venice. Our expert guides will ensure you experience the very best of what Italy has to offer.",
    image: "https://www.course-api.com/images/tours/tour-2.jpeg",
    price: "2,500",
  },
  {
    id: 3,
    name: "New York City: The Ultimate Guide",
    info: "Discover the city that never sleeps with our comprehensive tour of New York. Visit iconic landmarks like the Statue of Liberty, the Empire State Building, and Times Square. Enjoy a Broadway show and explore the unique neighborhoods that make NYC so special.",
    image: "https://www.course-api.com/images/tours/tour-3.jpeg",
    price: "1,850",
  },
  {
    id: 4,
    name: "Japan: Tradition Meets Technology",
    info: "Experience the unique blend of ancient traditions and modern innovation in Japan. Tour historic temples and shrines in Kyoto, see the bustling metropolis of Tokyo, and enjoy a ride on a high-speed bullet train. A truly unforgettable journey.",
    image: "https://www.course-api.com/images/tours/tour-4.jpeg",
    price: "3,100",
  },
  {
    id: 5,
    name: "Exploring the Wonders of Egypt",
    info: "Journey back in time to the land of pharaohs and pyramids. This tour will take you to the Great Pyramids of Giza, the Sphinx, the Valley of the Kings, and the majestic temples along the Nile River. An adventure filled with history and mystery.",
    image: "https://www.course-api.com/images/tours/tour-5.jpeg",
    price: "2,750",
  },
];

let nextId = tours.length + 1;

const getAll = () => {
  return tours;
};

const findById = (id) => {
  return tours.find((tour) => tour.id === parseInt(id));
};

const addOne = (name, info, image, price) => {
  const newTour = {
    id: nextId++,
    name,
    info,
    image,
    price,
  };
  tours.push(newTour);
  return newTour;
};

const updateById = (id, name, info, image, price) => {
  const tour = findById(id);
  if (tour) {
    tour.name = name;
    tour.info = info;
    tour.image = image;
    tour.price = price;
  }
  return tour;
};

const removeById = (id) => {
  const index = tours.findIndex((tour) => tour.id === parseInt(id));
  if (index !== -1) {
    return tours.splice(index, 1);
  }
  return null;
};

// This block allows you to test the functions independently
if (require.main === module) {
  console.log("getAll called:", getAll());
  console.log("findById called:", findById(1));
  console.log("addOne called:", addOne("Test Tour", "Test Info", "test.jpeg", "100"));
  console.log("getAll after add:", getAll());
  console.log("updateById called:", updateById(6, "Updated Test Tour", "Updated Info", "test-updated.jpeg", "150"));
  console.log("getAll after update:", getAll());
  console.log("removeById called:", removeById(6));
  console.log("getAll after delete:", getAll());
}

module.exports = { getAll, findById, addOne, updateById, removeById };