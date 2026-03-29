/*
const sampleListings = [
  // TRENDING
  {
    title: "Iconic Houseboat in Dal Lake",
    description: "Traditional Kashmiri houseboat with shikhara rides and mountain views. Most booked!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 5500,
    location: "Srinagar",
    country: "India",
    category: "Trending",
    geometry: { type: "Point", coordinates: [74.7973, 34.0837] }
  },
  {
    title: "Palace Stay in Jaipur",
    description: "Royal palace converted to heritage hotel. Experience maharaja lifestyle!",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1661884238187-1c274b3c3413?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 12000,
    location: "Jaipur",
    country: "India",
    category: "Trending",
    geometry: { type: "Point", coordinates: [75.7873, 26.9124] }
  },
  
  // VILLA
  {
    title: "Luxury Beach Villa in Goa",
    description: "Stunning 4-bedroom villa with private pool, direct beach access, and modern amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 8500,
    location: "Candolim, Goa",
    country: "India",
    category: "Villa",
    geometry: { type: "Point", coordinates: [73.7622, 15.5173] }
  },
  {
    title: "Heritage Villa in Jaipur",
    description: "Royal Rajasthani villa with traditional architecture, lush gardens, and 5 spacious bedrooms.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1669043962278-fcf15a3ba5a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 6500,
    location: "Jaipur",
    country: "India",
    category: "Villa",
    geometry: { type: "Point", coordinates: [75.7873, 26.9124] }
  },
  
  // FARM HOUSE
  {
    title: "Organic Farm House in Lonavala",
    description: "Peaceful farmhouse surrounded by greenery, organic farming, and mountain views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "Lonavala",
    country: "India",
    category: "Farm House",
    geometry: { type: "Point", coordinates: [73.4084, 18.7537] }
  },
  {
    title: "Vineyard Farm House in Nashik",
    description: "Beautiful farmhouse in wine country with grape orchards and wine tasting facilities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 5000,
    location: "Nashik",
    country: "India",
    category: "Farm House",
    geometry: { type: "Point", coordinates: [73.7898, 19.9975] }
  },
  
  // POOL HOUSE
  {
    title: "Pool Villa in Alibaug",
    description: "Stunning villa with infinity pool overlooking the sea, perfect for weekend getaways.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 9000,
    location: "Alibaug",
    country: "India",
    category: "Pool House",
    geometry: { type: "Point", coordinates: [72.8717, 18.6414] }
  },
  {
    title: "Luxury Pool House in Gurgaon",
    description: "Modern pool house with jacuzzi, BBQ area, and entertainment room.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 8000,
    location: "Gurgaon",
    country: "India",
    category: "Pool House",
    geometry: { type: "Point", coordinates: [77.0266, 28.4595] }
  },
  
  // ROOMS
  {
    title: "Cozy Room in South Delhi",
    description: "Comfortable private room with attached bathroom in safe South Delhi locality.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "South Delhi",
    country: "India",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [77.2167, 28.5355] }
  },
  {
    title: "Premium Room in Koramangala",
    description: "Fully furnished room in Bangalore's tech hub with AC, WiFi, and housekeeping.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Koramangala, Bangalore",
    country: "India",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [77.6269, 12.9352] }
  },
  
  // FLAT
  {
    title: "2BHK Flat in Powai, Mumbai",
    description: "Modern 2BHK apartment with gym, swimming pool, and lake view.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Powai, Mumbai",
    country: "India",
    category: "Flat",
    geometry: { type: "Point", coordinates: [72.9050, 19.1197] }
  },
  
  // PG
  {
    title: "Girls PG in HSR Layout",
    description: "Safe and secure PG for working women with meals, WiFi, and housekeeping.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "HSR Layout, Bangalore",
    country: "India",
    category: "PG",
    geometry: { type: "Point", coordinates: [77.6387, 12.9082] }
  },
  
  // CABINS
  {
    title: "Mountain Cabin in Shimla",
    description: "Cozy wooden cabin in the Himalayas with fireplace and stunning mountain views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Shimla",
    country: "India",
    category: "Cabins",
    geometry: { type: "Point", coordinates: [77.1734, 31.1048] }
  },
  {
    title: "Forest Cabin in Coorg",
    description: "Secluded cabin in coffee plantations with nature trails and bird watching.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Coorg",
    country: "India",
    category: "Cabins",
    geometry: { type: "Point", coordinates: [75.7382, 12.3375] }
  },
  
  // BEACHFRONT
  {
    title: "Beachfront Villa in Goa",
    description: "Stunning beachfront property with direct beach access, ocean views, and sunset dining.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 7500,
    location: "Palolem Beach, Goa",
    country: "India",
    category: "Beachfront",
    geometry: { type: "Point", coordinates: [74.0233, 15.0100] }
  },
];

module.exports = { data: sampleListings };

*/