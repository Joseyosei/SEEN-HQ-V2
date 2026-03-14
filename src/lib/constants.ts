import { Building2, Home, UtensilsCrossed, Car, PartyPopper, Wrench, Shirt, HeartPulse, Cpu, GraduationCap } from "lucide-react";

import businessesImg from "@/assets/categories/businesses.jpg";
import propertyImg from "@/assets/categories/property.jpg";
import restaurantsImg from "@/assets/categories/restaurants.jpg";
import carsImg from "@/assets/categories/cars.jpg";
import eventsImg from "@/assets/categories/events.jpg";
import servicesImg from "@/assets/categories/services.jpg";
import fashionImg from "@/assets/categories/fashion.jpg";
import healthImg from "@/assets/categories/health.jpg";
import techImg from "@/assets/categories/tech.jpg";
import educationImg from "@/assets/categories/education.jpg";

export const CATEGORIES = [
  { id: "businesses", label: "Businesses & Brands", icon: Building2, image: businessesImg },
  { id: "property", label: "Property", icon: Home, image: propertyImg },
  { id: "restaurants", label: "Restaurants & Food", icon: UtensilsCrossed, image: restaurantsImg },
  { id: "cars", label: "Cars & Vehicles", icon: Car, image: carsImg },
  { id: "events", label: "Events & Experiences", icon: PartyPopper, image: eventsImg },
  { id: "services", label: "Services & Freelancers", icon: Wrench, image: servicesImg },
  { id: "fashion", label: "Fashion & Retail", icon: Shirt, image: fashionImg },
  { id: "health", label: "Health & Wellness", icon: HeartPulse, image: healthImg },
  { id: "tech", label: "Tech & Gadgets", icon: Cpu, image: techImg },
  { id: "education", label: "Education & Coaching", icon: GraduationCap, image: educationImg },
] as const;

export const PACKAGES = [
  {
    id: "basic",
    name: "Basic Promo",
    tier: "Starter",
    price: 49,
    popular: false,
    features: [
      "1 short-form video post",
      "Filmed on location or remotely",
      "Posted on 1 platform",
      "Professional caption",
    ],
  },
  {
    id: "full",
    name: "Full Promo",
    tier: "Popular",
    price: 99,
    popular: true,
    features: [
      "2 short-form videos",
      "TikTok + Instagram Reels",
      "Captions + hashtags included",
      "Optimised for engagement",
    ],
  },
  {
    id: "mega",
    name: "Mega Promo",
    tier: "Premium",
    price: 199,
    popular: false,
    features: [
      "4 professional videos",
      "All platforms (TikTok, Reels, Shorts, X)",
      "Story posts included",
      "7-day promotion window",
    ],
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "How does Seen HQ work?",
    answer: "Simply choose your category, select a package, fill in your details, and pay the listing fee. We'll then film professional short-form video content for your listing and post it across social media platforms to maximise your exposure.",
  },
  {
    question: "How is the content filmed?",
    answer: "We use Meta AI smart glasses to capture authentic, engaging first-person content. This gives viewers an immersive experience of your product, property, restaurant, or service.",
  },
  {
    question: "How long before my listing goes live?",
    answer: "Most listings are filmed and posted within 5–7 working days of payment. Premium packages with multiple videos may take slightly longer to ensure quality.",
  },
  {
    question: "Which platforms will my listing be posted on?",
    answer: "Depending on your package: Basic covers 1 platform, Full Promo covers TikTok and Instagram Reels, and Mega Promo covers TikTok, Instagram Reels, YouTube Shorts, and X.",
  },
  {
    question: "Can I choose what's featured in the video?",
    answer: "Absolutely! When submitting your listing, you can include key selling points and notes about what you'd like highlighted. We'll work with you to make sure the content represents your offering perfectly.",
  },
  {
    question: "Is this a subscription?",
    answer: "No - all our packages are one-time fees. Pay once, get promoted. You can always come back and book another listing whenever you like.",
  },
  {
    question: "What areas do you cover?",
    answer: "We currently operate across major UK cities and surrounding areas. If you're unsure whether we cover your location, get in touch and we'll let you know.",
  },
];

export const TESTIMONIALS: { name: string; category: string; rating: number; quote: string }[] = [];
