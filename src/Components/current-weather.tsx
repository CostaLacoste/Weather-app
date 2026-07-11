import type { GeocodingResponce, WeatherData } from "@/api/types";
import { Card, CardContent } from "@/Components/ui/card";
import React from "react";

interface CurrentWeatherProps {
    data: WeatherData;
    locationName?: GeocodingResponce;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {

    const {
        weather: [currentWeather],
        main: {temp, feels_like, temp_min, temp_max, humidity},
        wind: {speed},
    } = data;

    return (
        <Card>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
        </Card>
    );
}

export default CurrentWeather