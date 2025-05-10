'use client'
import RestaurantList from "@/components/home/restaurant-list";
import SearchInput from "@/components/home/search";
import { useRestaurants } from "@/hooks/use-restaurants";
import { useSearchParams } from "next/navigation";

const restaurants = {
  data: [
    {
      "fsq_id": "54981fe7498e34ab348ee577",
      "description": "The world's most recognized Japanese restaurant, known for its innovative new style cuisine paired with a hip crowd and celebrity following.",
      "hours": {
        "is_local_holiday": false,
        "open_now": false
      },
      "location": {
        "address": "Level 1 Nobu North Tower. Asean Avenue",
        "country": "PH",
        "cross_street": "Macapagal Ave",
        "formatted_address": "Level 1 Nobu North Tower. Asean Avenue (Macapagal Ave), 1701 Paranaque, Rizal",
        "locality": "Paranaque City",
        "postcode": "1701",
        "region": "Rizal"
      },
      "name": "Nobu Restaurant",
      "price": 4,
      "rating": 8,
      "tastes": [
        "bar",
        "desserts",
        "breakfast food",
        "Japanese food",
        "hotel",
        "brunch food",
        "chocolate",
        "parking",
        "dinner",
        "homemade food",
        "trendy",
        "green tea",
        "jalapeños",
        "wagyu beef",
        "gyoza",
        "granola",
        "good for business meetings",
        "teriyaki sauce",
        "blueberry yogurt"
      ]
    }
  ],
  isLoading: false,
  isFetching: false,
}

export default function Home() {

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  // const restaurants = useRestaurants(searchTerm);

  return (
    <main className="min-h-screen flex flex-col justify-start items-center w-full pb-4 relative">
      <div className="bg-white z-10 sticky top-0 lg:h-40 h-32 flex flex-col justify-center items-center w-full px-16 shadow">
        <SearchInput isLoading={restaurants.isFetching || restaurants.isLoading} />
      </div>
      <div className="px-16 bg-muted h-full">
        <RestaurantList restaurants={restaurants} searchTerm={searchTerm} />
      </div>
    </main>
  );
}
