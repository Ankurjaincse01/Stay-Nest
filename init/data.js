const sampleListings = [
  {
    title: "Peaceful Mountain Cabin",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's the perfect escape from the city.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "Aspen",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-106.8175, 39.1911] // Aspen, Colorado
    }
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    geometry: {
      type: "Point",
      coordinates: [11.2558, 43.7696] // Florence, Italy
    }
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's dream.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Oakhurst",
    country: "United States",
  },
  {
    title: "Modern Loft in Tokyo",
    description: "Stay in the heart of Tokyo in this stylish loft with stunning city views. Close to all major attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Shibuya, Tokyo",
    country: "Japan",
  },
  {
    title: "Beachfront Bungalow in Bali",
    description: "Wake up to the sound of waves in this beautiful bungalow right on the beach. Perfect for a tropical escape.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Canggu, Bali",
    country: "Indonesia",
  },
  {
    title: "Luxury Parisian Apartment",
    description: "A chic apartment in Paris with a view of the Eiffel Tower. Experience the city of lights in style.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFyaXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "Paris",
    country: "France",
  },
  {
    title: "Cozy Cottage in the Cotswolds",
    description: "A charming, traditional cottage in the beautiful English countryside. Perfect for a quiet, relaxing holiday.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505916349660-8d91a99c3e23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvdHRhZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Cotswolds",
    country: "United Kingdom",
  },
  {
    title: "Sydney Harbour View Penthouse",
    description: "Enjoy breathtaking views of the Sydney Opera House and Harbour Bridge from this modern penthouse.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3lkbmV5fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 5000,
    location: "Sydney",
    country: "Australia",
  },
  {
    title: "Rustic Log Cabin in Banff",
    description: "Escape to the Canadian Rockies in this cozy log cabin. Ideal for hiking, skiing, and wildlife watching.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Banff",
    country: "Canada",
  },
  {
    title: "Santorini Cave House",
    description: "A unique stay in a traditional cave house in Oia, with stunning views of the caldera.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FudG9yaW5pfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Oia, Santorini",
    country: "Greece",
  },
  {
    title: "Riad in Marrakech",
    description: "Experience authentic Moroccan hospitality in this beautiful Riad with a central courtyard and pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1300,
    location: "Marrakech",
    country: "Morocco",
  },
  {
    title: "Swiss Alps Chalet",
    description: "A luxurious chalet in the Swiss Alps, perfect for a ski holiday with family and friends.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 6000,
    location: "Zermatt",
    country: "Switzerland",
  },
  {
    title: "Floating House in Amsterdam",
    description: "Live like a local on the canals of Amsterdam in this modern and comfortable floating house.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Desert Oasis Villa in Dubai",
    description: "A stunning villa in the desert with a private pool. The ultimate luxury getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbb563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 7000,
    location: "Dubai",
    country: "United Arab Emirates",
  },
  {
    title: "Jungle Villa in Costa Rica",
    description: "Immerse yourself in nature in this eco-friendly villa in the Costa Rican jungle. Monkeys and toucans are your neighbors!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464890452159-a142111b4637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1900,
    location: "La Fortuna",
    country: "Costa Rica",
  },
  {
    title: "Historic Brownstone in NYC",
    description: "Live the quintessential New York experience in this classic brownstone apartment in Brooklyn.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1550581190-78c6a67998e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 3800,
    location: "Brooklyn, New York",
    country: "United States",
  },
  {
    title: "Lakeside Cabin in Finland",
    description: "A traditional Finnish cabin by a lake, complete with a private sauna. The perfect place for peace and quiet.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1585544473333-565405a4194e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1400,
    location: "Lapland",
    country: "Finland",
  },
  {
    title: "Ipanema Beachfront Condo",
    description: "A stylish condo with direct access to the famous Ipanema beach in Rio de Janeiro.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1625244724120-13d8b4c0b4d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Rio de Janeiro",
    country: "Brazil",
  },
  {
    title: "Tranquil Pagoda in Kyoto",
    description: "Find your zen in this beautifully restored pagoda surrounded by traditional Japanese gardens.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Kyoto",
    country: "Japan",
  },
  {
    title: "Cape Town Villa with Ocean View",
    description: "A modern villa with an infinity pool overlooking the Atlantic Ocean. The best of Cape Town luxury.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 4800,
    location: "Cape Town",
    country: "South Africa",
  },
  {
    title: "Berlin Industrial Loft",
    description: "A spacious and trendy loft apartment in the creative heart of Berlin, Kreuzberg.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1700,
    location: "Berlin",
    country: "Germany",
  },
  {
    title: "Scottish Highlands Castle",
    description: "Live like royalty in your own private room in a historic Scottish castle. An unforgettable experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FzdGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 5500,
    location: "Scottish Highlands",
    country: "United Kingdom",
  },
  {
    title: "Farmhouse in Provence",
    description: "A charming farmhouse surrounded by lavender fields in the south of France. Includes a large garden and pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Provence",
    country: "France",
  },
  {
    title: "Eco-Lodge in the Amazon",
    description: "Stay deep in the Amazon rainforest in a sustainable eco-lodge. Guided tours and wildlife spotting included.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8am90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2100,
    location: "Manaus",
    country: "Brazil",
  },
  {
    title: "Minimalist Studio in Seoul",
    description: "A clean, modern, and minimalist studio in the bustling Gangnam district of Seoul.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1550581190-78c6a67998e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Seoul",
    country: "South Korea",
  },
  {
    title: "Viking-inspired Longhouse in Iceland",
    description: "Stay in a unique, modern longhouse inspired by Viking history, with incredible views of the Icelandic landscape.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1585544473333-565405a4194e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "Hella",
    country: "Iceland",
  },
  {
    title: "Haunted Mansion in New Orleans",
    description: "A spooky but charming stay in a historic, and allegedly haunted, mansion in the Garden District.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1625244724120-13d8b4c0b4d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1666,
    location: "New Orleans",
    country: "United States",
  },
  {
    title: "Safari Tent in Serengeti",
    description: "A luxury safari tent in the heart of the Serengeti. Experience the Great Migration up close.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 4200,
    location: "Serengeti National Park",
    country: "Tanzania",
  },
  {
    title: "Bohemian Apartment in Prague",
    description: "An artsy and colorful apartment in the historic center of Prague, full of character and charm.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 950,
    location: "Prague",
    country: "Czech Republic",
  },
  {
    title: "Mountain View Retreat in Nepal",
    description: "A simple, peaceful retreat with stunning views of the Himalayas. The perfect base for trekking.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 700,
    location: "Pokhara",
    country: "Nepal",
  },
];

module.exports = {data:sampleListings}