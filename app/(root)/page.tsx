import RestaurantList from "@/components/home/restaurant-list";
import SearchInput from "@/components/home/search";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-start items-center w-full py-4 px-16">
      <SearchInput />
      <RestaurantList />
    </main>
  );
}
