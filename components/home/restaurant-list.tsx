'use client'
import { useRestaurants } from '@/hooks/use-restaurants';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import RestaurantCard from './card';
import { LoaderIcon } from 'lucide-react';

// const restaurants = {
//     data: [
//         {
//             "fsq_id": "4b7b1c2cf964a520f7512fe3",
//             "hours": {
//                 "display": "Open Daily 00:00-3:00",
//                 "is_local_holiday": false,
//                 "open_now": true,
//                 "regular": [
//                     {
//                         "close": "0300",
//                         "day": 1,
//                         "open": "0000"
//                     },
//                     {
//                         "close": "2359",
//                         "day": 1,
//                         "open": "1100"
//                     },
//                     {
//                         "close": "0300",
//                         "day": 2,
//                         "open": "0000"
//                     },
//                     {
//                         "close": "2359",
//                         "day": 2,
//                         "open": "1100"
//                     },
//                     {
//                         "close": "0300",
//                         "day": 3,
//                         "open": "0000"
//                     },
//                     {
//                         "close": "2359",
//                         "day": 3,
//                         "open": "1100"
//                     },
//                     {
//                         "close": "0300",
//                         "day": 4,
//                         "open": "0000"
//                     },
//                     {
//                         "close": "2359",
//                         "day": 4,
//                         "open": "1100"
//                     },
//                     {
//                         "close": "0300",
//                         "day": 5,
//                         "open": "0000"
//                     },
//                     {
//                         "close": "2359",
//                         "day": 5,
//                         "open": "1100"
//                     },
//                     {
//                         "close": "0300",
//                         "day": 6,
//                         "open": "0000"
//                     },
//                     {
//                         "close": "2359",
//                         "day": 6,
//                         "open": "1100"
//                     },
//                     {
//                         "close": "0300",
//                         "day": 7,
//                         "open": "0000"
//                     },
//                     {
//                         "close": "2359",
//                         "day": 7,
//                         "open": "1100"
//                     }
//                 ]
//             },
//             "location": {
//                 "address": "Glorietta 4 Ayala Center",
//                 "address_extended": "G/F",
//                 "country": "PH",
//                 "cross_street": "at East Dr.",
//                 "formatted_address": "Glorietta 4 Ayala Center (at East Dr.), 1224 Makati, Makati City",
//                 "locality": "Makati City",
//                 "postcode": "1224",
//                 "region": "Makati City"
//             },
//             "name": "Outback Steakhouse",
//             "price": 4,
//             "rating": 7.8,
//             "tastes": [
//                 "meats",
//                 "chicken",
//                 "friendly staff",
//                 "beer",
//                 "lunch",
//                 "steak",
//                 "bread",
//                 "dinner",
//                 "free stuff",
//                 "casual",
//                 "great value",
//                 "milkshakes",
//                 "events",
//                 "garlic",
//                 "gifts",
//                 "appetizers",
//                 "Christmas",
//                 "brownies",
//                 "pesto",
//                 "Caesar salad",
//                 "prime rib",
//                 "lychee",
//                 "good for business meetings",
//                 "good for special occasions",
//                 "Tuscany",
//                 "baby back ribs",
//                 "Chocolate Thunder"
//             ]
//         },
//         {
//             "fsq_id": "4b77df3ff964a5201aad2ee3",
//             "description": "A quaint, intimate and luxurious little steak restaurant that specializes in USDA Prime Grade beef.",
//             "hours": {
//                 "display": "Mon-Fri 11:30-14:30, 18:30-22:00; Sat 18:30-22:00",
//                 "is_local_holiday": false,
//                 "open_now": true,
//                 "regular": [
//                     {
//                         "close": "1430",
//                         "day": 1,
//                         "open": "1130"
//                     },
//                     {
//                         "close": "2200",
//                         "day": 1,
//                         "open": "1830"
//                     },
//                     {
//                         "close": "1430",
//                         "day": 2,
//                         "open": "1130"
//                     },
//                     {
//                         "close": "2200",
//                         "day": 2,
//                         "open": "1830"
//                     },
//                     {
//                         "close": "1430",
//                         "day": 3,
//                         "open": "1130"
//                     },
//                     {
//                         "close": "2200",
//                         "day": 3,
//                         "open": "1830"
//                     },
//                     {
//                         "close": "1430",
//                         "day": 4,
//                         "open": "1130"
//                     },
//                     {
//                         "close": "2200",
//                         "day": 4,
//                         "open": "1830"
//                     },
//                     {
//                         "close": "1430",
//                         "day": 5,
//                         "open": "1130"
//                     },
//                     {
//                         "close": "2200",
//                         "day": 5,
//                         "open": "1830"
//                     },
//                     {
//                         "close": "2200",
//                         "day": 6,
//                         "open": "1830"
//                     }
//                 ]
//             },
//             "location": {
//                 "address": "111 H. V. Dela Costa Street",
//                 "address_extended": "Third Floor, Sagittarius Building",
//                 "country": "PH",
//                 "cross_street": "at H V dela Costa St & L P Leviste St",
//                 "formatted_address": "111 H. V. Dela Costa Street (at H V dela Costa St & L P Leviste St), 1227 Makati, Makati City",
//                 "locality": "Makati City",
//                 "postcode": "1227",
//                 "region": "Makati City"
//             },
//             "name": "Elbert's Steak Room",
//             "price": 4,
//             "rating": 8.7,
//             "tastes": [
//                 "burgers",
//                 "lunch",
//                 "town",
//                 "chocolate",
//                 "steak",
//                 "dinner",
//                 "chefs",
//                 "trendy",
//                 "good for dates",
//                 "truffles",
//                 "mousse",
//                 "filet mignon",
//                 "good for business meetings",
//                 "good for special occasions",
//                 "bone marrow",
//                 "double gold"
//             ]
//         }
//     ],
//     isLoading: false,
// }

const RestaurantList = () => {

    const searchParams = useSearchParams();
    const searchTerm = searchParams.get("search") || "";

    const restaurants = useRestaurants(searchTerm);

    if (restaurants.isLoading || restaurants.isFetching) {
        return (
            <div className='flex gap-4 justify-center items-center w-full h-[80vh]'>
                <LoaderIcon className='animate-spin' />
                <p className="text-lg font-medium">Finding restaurants just for you...</p>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-3 gap-4 w-full py-8'>
            {restaurants?.data?.map((restaurant) => (
                <RestaurantCard key={restaurant.fsq_id} data={restaurant} />
            ))}
        </div>
    )
}

export default RestaurantList