'use client'
import RestaurantList from "@/components/home/restaurant-list";
import SearchInput from "@/components/home/search";
import { useRestaurants } from "@/hooks/use-restaurants";
import { useSearchParams } from "next/navigation";

export default function Home() {

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const restaurants = useRestaurants(searchTerm);

  return (
    <main className="min-h-screen flex flex-col justify-start items-center w-full py-4 px-16">
      <SearchInput isLoading={restaurants.isFetching || restaurants.isLoading}/>
      <RestaurantList restaurants={restaurants} />
    </main>
  );
}
