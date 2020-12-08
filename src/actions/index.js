import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_RATE_EXCHANGE = "GET_RATE_EXCHANGE";

export function fetchCountries(){
  return function(dispatch){
    axios.get("https://restcountries.eu/rest/v2/all").then(axiosResponse => {
      dispatch({type: "GET_COUNTRIES", payload: axiosResponse.data})

      // we can do several with thunk
      //dispatch({type: "", payload: ""})
      //dispatch({type: "", payload: ""})
    })
  }

}

export function fetchRateExchange(country) {
  return function(dispatch) {
    axios
      .get(
        `https://api.exchangeratesapi.io/history?start_at=${getLastMonth()}&end_at=${formatedDate(new Date())}&base=USD&symbols=${country.currencyCode}`
      )
      .then(axiosResponse => {
        dispatch({
          type: "GET_RATE_EXCHANGE",
          payload: { rates: axiosResponse.data.rates, ...country }  //ca va eclater tout le tableau country et le mettre au meme niveau que les rates
        });
      });
  };
}

function formatedDate(date) {
  return date.toISOString().split("T")[0];
}

function getLastMonth() {
  let now = new Date();
  now.setMonth(now.getMonth() - 1);
  return formatedDate(now);
}
