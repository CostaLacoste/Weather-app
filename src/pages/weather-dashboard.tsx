import { MapPin, RefreshCw } from "lucide-react";
import { Button } from "@/Components/ui/button";
import React from "react";
import { useGeoLocation } from "@/hooks/use-gelolocation";
import WeatherSkeletion from "@/Components/loading-skeleton";
import { AlertCircleIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";

const WeatherDashboard = () => {
    const { coordinates, error: locationError, getLocation, isLoading: locationLoading, } = useGeoLocation();

    const locationQuery = useReverseGeocodeQuery(coordinates);
    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);

    const handleRefresh = () => {
        getLocation()
        if (coordinates) {
            weatherQuery.refetch()
            forecastQuery.refetch()
            locationQuery.refetch()
        }
    }

    if (locationLoading) {
        return <WeatherSkeletion />
    }

    if (locationError) {
        return (
            <Alert variant="destructive" className="max-w-md">
                <AlertCircleIcon />
                <AlertTitle>Location error</AlertTitle>
                <AlertDescription className='flex flex-col gap-4'>
                    <p>{locationError}</p>
                    <Button onClick={getLocation} variant={"outline"} className='w-fit'>
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (!coordinates) {
        return (
            <Alert variant="destructive" className="max-w-md">
                <AlertTitle>Location requred</AlertTitle>
                <AlertDescription className='flex flex-col gap-4'>
                    <p>Please enable location access to see your local weather.</p>
                    <Button onClick={getLocation} variant={"outline"} className='w-fit'>
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    const locationName = locationQuery.data?.[0];

    if (weatherQuery.error || forecastQuery.error){
        return (
            <Alert variant="destructive" className="max-w-md">
                <AlertCircleIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className='flex flex-col gap-4'>
                    <p>Failed to fetch weather data. Please try again.</p>
                    <Button onClick={handleRefresh} variant={"outline"} className='w-fit'>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Retry
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (!weatherQuery.data || !forecastQuery.data) {
        return <WeatherSkeletion />
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">My location</h1>
                <Button variant={"outline"} size={"icon"} onClick={handleRefresh} disabled={weatherQuery.isFetching || forecastQuery.isFetching}>
                    <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`}/>
                </Button>
            </div>
            <div className="grid gap-6">
                <div>
                    <CurrentWeather data={weatherQuery.data} location={locationName} />
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default WeatherDashboard