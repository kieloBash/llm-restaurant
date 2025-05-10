import type { FoursquarePlace } from "@/types/foursquare-place"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, MapPin, Star } from "lucide-react"

const RestaurantCard = ({ data }: { data: FoursquarePlace }) => {
    const displayTastes = data.tastes?.slice(0, 4) || []

    return (
        <Card className="overflow-hidden transition-all duration-300 group hover:shadow-lg border-0 relative">

            <div className="p-5 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold tracking-tight line-clamp-1 group-hover:text-rose-600 transition-colors">
                            {data.name}
                        </h3>
                        <div className="flex items-center text-muted-foreground text-xs gap-1 mt-1.5 max-w-[250px]">
                            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                            <span className="leading-snug break-words">{data?.location?.formatted_address}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-sm">
                            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                            <span className="font-semibold">{data.rating}</span>
                        </div>

                        <div className="flex">
                            {Array(data.price)
                                .fill(0)
                                .map((_, i) => (
                                    <DollarSign key={i} className="h-3.5 w-3.5 text-emerald-500" />
                                ))}
                            {Array(4 - (data?.price ?? 0))
                                .fill(0)
                                .map((_, i) => (
                                    <DollarSign key={i} className="h-3.5 w-3.5 text-slate-200 dark:text-slate-700" />
                                ))}
                        </div>
                    </div>
                </div>

                <div className="mb-4 bg-slate-50 p-3 rounded-md border border-slate-100">
                    <p className="text-sm text-muted-foreground line-clamp-2 italic">"{data?.description ?? "No description available"}"</p>
                </div>

                <div className="flex flex-1 flex-col justify-end">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-2.5 h-2.5 rounded-full ${data.hours?.open_now ? "bg-emerald-500" : "bg-rose-500"} animate-pulse`}
                            ></div>
                            <span
                                className={`text-sm font-medium ${data.hours?.open_now ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                            >
                                {data.hours?.open_now ? "Open Now" : "Closed"}
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground truncate max-w-[180px]">{data.hours?.display}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                        {displayTastes.map((taste, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="text-[10px] px-2 py-0 h-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-normal rounded-full"
                            >
                                {taste}
                            </Badge>
                        ))}
                        {data.tastes && data.tastes.length > 4 && (
                            <Badge
                                variant="outline"
                                className="text-[10px] px-2 py-0 h-5 bg-transparent hover:bg-slate-100 text-muted-foreground font-normal rounded-full"
                            >
                                +{data.tastes.length - 4} more
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            {/* Initial letter accent in background */}
            <div className="absolute -right-4 -bottom-6 opacity-5 pointer-events-none">
                <span className="text-[120px] font-black text-slate-900">{data.name.charAt(0)}</span>
            </div>
        </Card>
    )
}

export default RestaurantCard
