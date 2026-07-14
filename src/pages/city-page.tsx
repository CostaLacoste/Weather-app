import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useWeatherQuery, useForecastQuery } from "@/hooks/use-weather";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from "lucide-react";
import WeatherSkeletion from "@/components/loading-skeleton";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import HourlyTemperature from "@/components/hourly-temperature";
import CurrentWeather from "@/components/current-weather";
import FavoriteButton from "@/components/favorite-button";

const CityPage = () => {
    const [searchParams] = useSearchParams();
    const params = useParams();
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lon = parseFloat(searchParams.get("lon") || "0");

    const coordinates = { lat, lon };

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);

    if (weatherQuery.error || forecastQuery.error){
        return (
            <Alert variant="destructive" className="max-w-md">
                <AlertCircleIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className='flex flex-col gap-4'>
                    <p>Failed to fetch weather data. Please try again.</p>
                </AlertDescription>
            </Alert>
        );
    }

    if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
        return <WeatherSkeletion />
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">{params.cityName}, {weatherQuery.data.sys.country}</h1>
                <div>
                    <FavoriteButton data={{...weatherQuery.data, name: params.cityName}} />
                </div>
            </div>
            <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                    <CurrentWeather data={weatherQuery.data} />
                    <HourlyTemperature data={forecastQuery.data} />
                </div>
                <div className="grid gap-6 md:grid-cols-2 items-start">
                    <WeatherDetails data={weatherQuery.data}/>
                    <WeatherForecast data={forecastQuery.data}/>
                </div>
            </div>
        </div>
    );
}

export default CityPage