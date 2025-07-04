"use client"

import type React from "react"

import { useState } from "react"
import { Search, Cloud, CloudRain, Sun, CloudDrizzle, Haze, Wind, Droplets, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface WeatherData {
  name: string
  main: {
    temp: number
    humidity: number
  }
  wind: {
    speed: number
  }
  weather: Array<{
    main: string
    description: string
  }>
}

export default function WeatherApp() {
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const weatherDescriptionPT: Record<string, string> = {
    "clear sky": "céu limpo",
    "few clouds": "poucas nuvens",
    "scattered clouds": "nuvens dispersas",
    "broken clouds": "nuvens fragmentadas",
    "overcast clouds": "nublado",
    "shower rain": "chuva de banho",
    "rain": "chuva",
    "light rain": "chuva leve",
    "moderate rain": "chuva moderada",
    "heavy intensity rain": "chuva forte",
    "thunderstorm": "trovoada",
    "snow": "neve",
    "mist": "névoa",
    "drizzle": "garoa",
  }

  const getWeatherDescriptionPT = (desc: string) => {
    return weatherDescriptionPT[desc.toLowerCase()] || desc
  }

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain) {
      case "Clouds":
        return <Cloud className="w-24 h-24 text-gray-600" />
      case "Rain":
        return <CloudRain className="w-24 h-24 text-blue-600" />
      case "Clear":
        return <Sun className="w-24 h-24 text-yellow-500" />
      case "Drizzle":
        return <CloudDrizzle className="w-24 h-24 text-blue-400" />
      case "Mist":
        return <Haze className="w-24 h-24 text-gray-500" />
      default:
        return <Cloud className="w-24 h-24 text-gray-600" />
    }
  }

  const checkWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      setError("Por favor, digite o nome de uma cidade")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`)

      if (response.status === 404) {
        setError("Cidade não encontrada. Verifique a ortografia e tente novamente.")
        setWeatherData(null)
      } else if (!response.ok) {
        throw new Error("Dados do clima não disponíveis")
      } else {
        const data: WeatherData = await response.json()
        setWeatherData(data)
        setError("")
      }
    } catch (error) {
      console.error(error)
      setError("Cidade não encontrada ou dados ausentes")
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    checkWeather(city)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Clima Agora</h1>
            <p className="text-gray-600">Veja informações atuais do clima</p>
          </div>

          {/* Search Section */}
          <div className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder="Digite o nome da cidade..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              disabled={loading}
            />
            <Button onClick={handleSearch} disabled={loading} size="icon">
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Carregando dados do clima...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Weather Data */}
          {weatherData && !loading && (
            <div className="text-center space-y-6">
              {/* City Name */}
              <h2 className="text-2xl font-bold text-gray-800">{weatherData.name}</h2>

              {/* Weather Icon */}
              <div className="flex justify-center">{getWeatherIcon(weatherData.weather[0].main)}</div>

              {/* Temperature */}
              <div className="text-5xl font-bold text-gray-800">{Math.round(weatherData.main.temp)}°C</div>

              {/* Weather Description */}
              <p className="text-lg text-gray-600 capitalize">
                {getWeatherDescriptionPT(weatherData.weather[0].description)}
              </p>

              {/* Weather Details */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Droplets className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">Umidade</span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{weatherData.main.humidity}%</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Wind className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-600">Vento</span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{weatherData.wind.speed} km/h</p>
                </div>
              </div>
            </div>
          )}

          {/* Initial State */}
          {!weatherData && !loading && !error && (
            <div className="text-center py-8">
              <Cloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Digite o nome de uma cidade para ver o clima</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
