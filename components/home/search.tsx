"use client"
import React, { FormEvent, useState } from 'react'
import { Input } from '../ui/input'
import { useDebounce } from '@/hooks/use-debounce';
import { Button } from '../ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SearchInput = ({ isLoading }: { isLoading: boolean }) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const search = searchParams.get("search") || "";

    const [searchValue, setSearchValue] = useState(search);
    const debouncedValue = useDebounce(searchValue, 500); // for querying without need of pressing enter

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
        currentParams.set("search", debouncedValue);

        router.push(`${pathname}?${currentParams.toString()}`);
    }

    return (
        <form className="flex gap-2 justify-center items-center" onSubmit={handleSubmit}>
            <Input disabled={isLoading} className='min-w-xl' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Find me an affordable steak restaurant near SM Mall of Asia...' />
            <Button disabled={isLoading} type="submit">Search</Button>
        </form>
    )
}

export default SearchInput