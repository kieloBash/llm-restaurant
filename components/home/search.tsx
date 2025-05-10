"use client"

import React, { FormEvent, useState } from 'react'
import { Input } from '../ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { Button } from '../ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const SearchInput = ({ isLoading }: { isLoading: boolean }) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const search = searchParams.get("search") || ""

    const [searchValue, setSearchValue] = useState(search)
    const debouncedValue = useDebounce(searchValue, 500) // for querying without need of pressing enter

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        const currentParams = new URLSearchParams(Array.from(searchParams.entries()))
        currentParams.set("search", debouncedValue)

        router.push(`${pathname}?${currentParams.toString()}`)
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <form
                className="relative flex gap-2 items-center w-full group"
                onSubmit={handleSubmit}
            >
                <div className="relative flex-1">
                    <Input
                        disabled={isLoading}
                        className={cn(
                            "w-full pl-12 h-12 pr-4 py-6 text-base md:text-lg",
                            "rounded-full border-2 border-gray-200",
                            "shadow-sm transition-all duration-200",
                            "focus-visible:border-orange-300 focus-visible:ring-orange-200",
                            "placeholder:text-gray-400 placeholder:font-light",
                            "disabled:opacity-70"
                        )}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Find me an affordable steak restaurant near SM Mall of Asia...'
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <SearchIcon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                </div>

                <Button
                    disabled={isLoading}
                    type="submit"
                    className={cn(
                        "px-6 h-12 rounded-full",
                        "bg-gradient-to-r from-orange-500 to-red-500",
                        "hover:from-orange-600 hover:to-red-600",
                        "text-white font-medium",
                        "shadow-md hover:shadow-lg",
                        "transition-all duration-200",
                        "disabled:opacity-70"
                    )}
                >
                    <span className="text-lg">Search</span>
                </Button>
            </form>

            {searchValue && (
                <div className="mt-2 text-sm text-gray-500 px-4">
                    Searching for: <span className="font-medium text-orange-600">{searchValue}</span>
                </div>
            )}
        </div>
    )
}

export default SearchInput