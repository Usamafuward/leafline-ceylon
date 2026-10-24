export interface Review {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  tourName: string;
  travelDate: string;
  rating: number;
  avatar: string;
  headline: string;
  reviewText: string;
  verified: boolean;
}

export const REVIEWS_DATA: Review[] = [
  {
    id: "rev-1",
    name: "David & Sarah Jenkins",
    country: "United Kingdom",
    countryCode: "GB",
    tourName: "Grand Sri Lanka Tour (12 Days)",
    travelDate: "February 2026",
    rating: 5,
    avatar: "/images/avatar_1.webp",
    headline: "Unforgettable 12-day tour with the best private driver!",
    reviewText: "From the moment we arrived at Colombo airport to our last sunset in Galle Fort, everything was perfectly organized. Our private chauffeur-guide, Ruwan, was friendly, knowledgeable, and always on time. The scenic train ride to Ella and the tea estate in Hatton were highlights of our trip. Highly recommend Leafline Ceylon!",
    verified: true
  },
  {
    id: "rev-2",
    name: "Marcus & Elena Schneider",
    country: "Germany",
    countryCode: "DE",
    tourName: "Sri Lanka Wildlife Safari Tour (7 Days)",
    travelDate: "January 2026",
    rating: 5,
    avatar: "/images/avatar_2.webp",
    headline: "Saw three leopards in Yala! Outstanding safari experience",
    reviewText: "We booked the 7-day wildlife package and were blown away. Our safari jeep driver and naturalist in Yala was exceptional. We spotted three leopards, wild elephants, and countless birds. Hotels were clean and comfortable with delicious Sri Lankan curries. 10/10 experience.",
    verified: true
  },
  {
    id: "rev-3",
    name: "James & Emily Watson",
    country: "Australia",
    countryCode: "AU",
    tourName: "Romantic Sri Lanka Honeymoon (10 Days)",
    travelDate: "March 2026",
    rating: 5,
    avatar: "/images/avatar_3.webp",
    headline: "The perfect honeymoon trip - completely stress-free",
    reviewText: "The sunrise hot air balloon over Sigiriya followed by a beach stay in Mirissa was pure magic. Leafline handled all our hotels, tickets, and private transfers smoothly. We never had to worry about a thing. Thank you for making our honeymoon so special!",
    verified: true
  },
  {
    id: "rev-4",
    name: "Michael & Rachel Chang",
    country: "Singapore",
    countryCode: "SG",
    tourName: "Highlands, Tea Country & Scenic Train (8 Days)",
    travelDate: "December 2025",
    rating: 5,
    avatar: "/images/avatar_4.webp",
    headline: "Breathtaking mountain train and peaceful tea plantations",
    reviewText: "The Kandy to Ella train ride was the most scenic train journey we have ever taken. Our driver took all our heavy luggage by car and met us directly at the station platform with cold drinks. Traveling around Sri Lanka was so easy and comfortable with this team.",
    verified: true
  }
];
