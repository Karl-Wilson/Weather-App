export const locationUrl = 'https://www.metaweather.com/api/location/';
export const locationSearch = 'search/?query=';
export const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
export const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
/*export const dayName = (current, given) => {
    let difference = current - given
    if(current == given){
        return 'Today'
    }else if(difference == 1){
        return 'Yesterday'
    }else if(difference == -1){
        return 'Tomorrow'
    }
    else{ return null}
}*/

export const dayName = (forcastDate, days=null, months=null) => {
    let newDate = new Date(forcastDate)
    let current = new Date().getDate()
    let given = new Date(newDate).getDate()
    let difference = current - given
    if(current == given){
        return 'Today'
    }else if(difference == 1){
        return 'Yesterday'
    }else if(difference == -1){
        return 'Tomorrow'
    }
    else{ return `${days[(newDate.getDay())]}, ${newDate.getDate()} ${months[newDate.getMonth()]}`}
}

export const tempConverter = (value, unit=false) => {
    let finalValue, finalUnit
    if(unit == 'C'){
        finalValue = (value * 1.8) + 32
        finalUnit = 'F'
        return {finalValue, finalUnit}
       }else if(unit == 'F'){
        finalValue = (value - 32) * 0.5556
        finalUnit = 'C'
        return {finalValue, finalUnit}
       }else if(unit){
           finalValue = value;
           finalUnit = 'C'
           return {finalValue, finalUnit}
       }
}
export const windDirectionDetector = (degree) =>{
    if(degree >= 346.75 && degree <= 11.25){
        return 'N'
    }else if(degree <= 33.75 && degree >= 11.25){
        return 'NNE'
    }else if(degree <= 56.25 && degree >= 33.75){
        return 'NE'
    }else if(degree <= 78.75 && degree >= 56.25){
        return 'ENE'
    }else if(degree <= 33.75 && degree >= 11.25){
        return 'NNE'
    }else if(degree <= 101.25 && degree >= 78.75){
        return 'E'
    }else if(degree <= 123.75 && degree >= 101.25){
        return 'ESE'
    }else if(degree <= 146.25 && degree >= 123.75){
        return 'SE'
    }else if(degree <= 168.75 && degree >= 146.25){
        return 'SSE'
    }else if(degree <= 191.25 && degree >= 168.75){
        return 'S'
    }else if(degree <= 213.75 && degree >= 191.25){
        return 'SSW'
    }else if(degree <= 236.25 && degree >= 213.75){
        return 'SW'
    }else if(degree <= 258.75 && degree >= 236.25){
        return 'WSW'
    }else if(degree <= 281.25 && degree >= 258.75){
        return 'W'
    }else if(degree <= 303.75 && degree >= 281.25){
        return 'WNW'
    }else if(degree <= 326.25 && degree >= 303.75){
        return 'NW'
    }else if(degree <= 348.75 && degree >= 326.75){
        return 'NNW'
    }
}
export const compassDirectionDisplay = (reading) => {
    let result
    if(reading > 270){
        result = (reading * 90)/360
    }else{
        result = reading + 90
    }
    return result;
}

export  const futureForcastTempConverter = (info, unit=null, defaults=false) =>{
    let dataArray = []
    let minTemp, maxTemp; /* eslint-disable-next-line array-callback-return*/
    info.map(temp=>{
        if(defaults){
            minTemp = tempConverter(temp.min_temp, unit)
            maxTemp = tempConverter(temp.max_temp, unit)
        }else{
            minTemp = tempConverter(temp.max.finalValue, unit)
            maxTemp = tempConverter(temp.min.finalValue, unit)
        }        
        dataArray.push({max:maxTemp, min:minTemp})
    })
    return dataArray;
}