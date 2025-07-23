import { CategoriesSection } from "../components/home/CategoriesSection";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { HeroSection } from "../components/home/HeroSection";
export function Home(){
  const featuredProducts = [
  {
    id: 1,
    name: "Nike Dunk High Retro",
    price: 140.00,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    category: "Basketball"
  },
  {
    id: 2,
    name: "Nike Roshe Run",
    price: 100.00,
    image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    category: "Running"
  },
  {
    id: 3,
    name: "Nike Air Force 1",
    price: 110.00,
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    category: "Lifestyle"
  },
  {
    id: 4,
    name: "Nike Air Max 270",
    price: 150.00,
    image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7,
    category: "Running"
  },
  {
    id: 5,
    name: "Nike Jordan 1 Mid",
    price: 120.00,
    image: "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.5,
    category: "Basketball"
  },
  {
    id: 6,
    name: "Nike Blazer Mid",
    price: 95.00,
    image: "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.4,
    category: "Lifestyle"
  }
];
  return (
    <>
    <HeroSection />
    <FeaturedProducts featuredProducts={featuredProducts} />
    <CategoriesSection />
    <FeaturesSection/>
    </>
  )
}