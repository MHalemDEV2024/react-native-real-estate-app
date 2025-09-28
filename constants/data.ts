import icons from "./icons";
import images from "./images";

export const cards = [
  {
    title: "Card 1",
    location: "Location 1",
    price: "$100",
    rating: 4.8,
    category: "house",
    image: images.newYork,
  },
  {
    title: "Card 2",
    location: "Location 2",
    price: "$200",
    rating: 3,
    category: "house",
    image: images.japan,
  },
  {
    title: "Card 3",
    location: "Location 3",
    price: "$300",
    rating: 2,
    category: "flat",
    image: images.newYork,
  },
  {
    title: "Card 4",
    location: "Location 4",
    price: "$400",
    rating: 5,
    category: "villa",
    image: images.japan,
  },
];

export const featuredCards = [
  {
    title: "Featured 1",
    location: "Location 1",
    price: "$100",
    rating: 4.8,
    image: images.newYork,
    category: "house",
  },
  {
    title: "Featured 2",
    location: "Location 2",
    price: "$200",
    rating: 3,
    image: images.japan,
    category: "flat",
  },
];

export const categories = [
  { title: "All", category: "All" },
  { title: "Houses", category: "House" },
  { title: "Condos", category: "Condos" },
  { title: "Duplexes", category: "Duplexes" },
  { title: "Studios", category: "Studios" },
  { title: "Villas", category: "Villa" },
  { title: "Apartments", category: "Apartments" },
  { title: "Townhomes", category: "Townhomes" },
  { title: "Others", category: "Others" },
];

export const settings = [
  {
    title: "My Bookings",
    icon: icons.calendar,
    path: "settings/bookings",
  },
  {
    title: "Payments",
    icon: icons.wallet,
    path: "settings/payments",
  },
  {
    title: "Notifications",
    icon: icons.bell,
    path: "settings/notifications",
  },
  {
    title: "Security",
    icon: icons.shield,
    path: "settings/security",
  },
  {
    title: "Language",
    icon: icons.language,
    path: "settings/language",
  },
  {
    title: "Help Center",
    icon: icons.info,
    path: "/settings/help",
  },
  {
    title: "Invite Friends",
    icon: icons.people,
    path: "/settings/invite",
  },
];

export const facilities = [
  { title: "Laundry", icon: icons.laundry },
  { title: "Parking", icon: icons.carPark },       
  { title: "Sport", icon: icons.run },             
  { title: "Gym", icon: icons.dumbell },
  { title: "Swimming", icon: icons.swim },         
  { title: "Wifi", icon: icons.wifi },
  { title: "Pet", icon: icons.dog },               
  { title: "Cutlery", icon: icons.cutlery },
  { title: "Restaurant", icon: icons.cutlery },     
];
export const gallery = [
  {
    id: 1,
    image: images.newYork,
  },
  {
    id: 2,
    image: images.japan,
  },
  {
    id: 3,
    image: images.newYork,
  },
  {
    id: 4,
    image: images.japan,
  },
  {
    id: 5,
    image: images.newYork,
  },
  {
    id: 6,
    image: images.japan,
  },
];
