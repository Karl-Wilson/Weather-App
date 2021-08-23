import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
    name: "weather",
    initialState: {isLoading: true, searchHistory: [], initialLoading: true},
    reducers: {
        createLocation(state, action){
            state.locationName = action.payload[0].title;
            state.locationId = action.payload[0].woeid;
        },
        createWeatherData(state, action){
            state.locationData = action.payload.consolidated_weather;
            state.weatherState = action.payload.consolidated_weather[0].weather_state_name
            state.forcastDate = action.payload.consolidated_weather[0].applicable_date
            state.currentTemp = Math.round(action.payload.consolidated_weather[0].the_temp)
            state.currentDisplayTemp = Math.round(action.payload.consolidated_weather[0].the_temp)
            state.minTemp = Math.round(action.payload.consolidated_weather[0].min_temp)
            state.maxTemp = Math.round(action.payload.consolidated_weather[0].max_temp)
            state.windSpeed = Math.round(action.payload.consolidated_weather[0].wind_speed)
            state.windDirection = Math.round(action.payload.consolidated_weather[0].wind_direction)
            state.airPressure = Math.round(action.payload.consolidated_weather[0].air_pressure)
            state.humidity = Math.round(action.payload.consolidated_weather[0].humidity)
            state.visibility = Math.round(action.payload.consolidated_weather[0].visibility) 
            state.currentTempSign = 'C'
        },
        createFutureForcast(state, action){
            state.futureForcast = action.payload
        },
        convertTemp(state, action){
            state.currentDisplayTemp = Math.round(action.payload.finalValue)
            state.currentTempSign = action.payload.finalUnit
        },
        isLoading(state, action){
            state.isLoading  = action.payload
        },
        errorMsg(state, action){
            state.errorMsg = action.payload
        },
        firstError(state, action){
            state.firstError = action.payload
        },
        createSearchHistory(state, action){
            state.searchHistory.push(action.payload)
        },
        createUserLocation(state, action){
            state.currentUserLocation = action.payload.city
        },
        initialLoading(state, action){
            state.initialLoading = action.payload;
        }, 
        addShowClass(state, action){
            state.displayClass = action.payload
        }
    }
})
const reducer = weatherSlice.reducer;
export const actions = weatherSlice.actions
export default reducer;