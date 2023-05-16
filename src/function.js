export async function apiCall(input,setApidata,ref){
    const api  = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=133aca6a3bda2d32fd31c9ab64ad4343`); //Requesting To Server For Data.
    const response = await api.json(); //Converting Fetched Data In Text Formate.
    // if(response.length > 0){
        console.log(response);
        if(response.message !== "city not found") {
            ref.current = response.weather[0].main;
            setApidata(response ? response : null)
        }
    
}