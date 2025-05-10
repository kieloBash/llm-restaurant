
import React from 'react'
import RestaurantCard from './card';
import { LoaderIcon } from 'lucide-react';
import { FoursquarePlace } from '@/types/foursquare-place';

const RestaurantList = ({ restaurants, searchTerm }: {
    restaurants: {
        data: FoursquarePlace[] | undefined;
        error: Error | null;
        isLoading: boolean;
        isFetching: boolean;
        isError: boolean;
    },
    searchTerm: string
}) => {
    if (restaurants.isLoading || restaurants.isFetching) {
        return (
            <div className='flex gap-4 justify-center items-center w-full h-[80vh]'>
                <LoaderIcon className='animate-spin' />
                <p className="text-lg font-medium">Finding restaurants just for you...</p>
            </div>
        )
    }

    if (restaurants.data?.length == 0) {
        return (
            <div className='flex gap-4 flex-col justify-center items-center w-full h-[80vh]'>
                <p className="text-lg font-medium">No restaurants found!</p>
                <p className="text-xl font-bold text-red-400 italic">"{searchTerm}"</p>
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