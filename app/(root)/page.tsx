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
    <main className="min-h-screen flex flex-col justify-start items-center w-full pb-4 relative">
      <div className="bg-white z-10 sticky top-0 lg:h-40 h-32 flex flex-col justify-center items-center w-full px-16 shadow">
        <SearchInput isLoading={restaurants.isFetching || restaurants.isLoading} />
      </div>
      <div className="px-16 bg-muted h-full w-full">
        <RestaurantList restaurants={restaurants} searchTerm={searchTerm} />
      </div>
    </main>
  );
}
