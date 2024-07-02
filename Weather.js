
import React,{useState} from 'react';
import img from '../AllImages/770b805d5c99c7931366c2e84e88f251.png';
import humin from '../AllImages/images.png';
import windspeed from '../AllImages/images1.jpg';
import axios from 'axios';
import faild from'../AllImages/faild-1.png'



const Weather = () => {
    const [data, setData] = useState({});
    const [city, setCity] = useState('');
    const [disCity, setDisCity] = useState('chennai');
    const [temp, setTemp] = useState(0);
    const [citty, setCitty] = useState('city name');
    const [country, setCountry] = useState('IND');
    const [lat, setLat] = useState(0);
    const [lot, setLot] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [speed, setSpeed] = useState(0);
  
    const [errApi, seterrApi] = useState(false)
    // const [loss, setloss] = useState(true)




    const handleChange =()=>{
        setDisCity(city);
        setCity("")
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=64bfeda9064653e59d49d341ff62c2a8&units=Metric`)
        .then((res)=>{
            seterrApi(false)
            console.log(data)
            setData(res.data);
            setTemp(res.data.main.temp);
            setCitty(res.data.name);
            setCountry(res.data.sys.country);
            setSpeed(res.data.wind.speed);
            setLat(res.data.coord.lat);
            setLot(res.data.coord.lon);
            setHumidity(res.data.main.humidity);
        })
        .catch((err) => {
            console.log('Error: Please try again.');
            seterrApi(true)
            // setloss(false)
          });

    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleChange();
        }
      };

  return (
   <div className='weather'>
     <div className='container'>
      <div className='searchContainer'>
        <div className='inp'>
        <input type='text' placeholder='Search City'  onChange={(e) => setCity(e.target.value)} onKeyDown={handleKeyPress} value={city} />
  </div>      {/* Call handleChange directly, not wrapped in an arrow function */}
        <button onClick={handleChange}>Search</button>
      </div>
      <div  className={errApi === true ? 'hidden' : 'visible'}>
        <div className='imageContainer'>
          <img src={img} alt='' />
        </div>
        <div className='cityDetails'>
          <p>{temp}&deg;C</p>
          <p className='cityname'>{citty}</p>
          <p>{country}</p>
        </div>
        <div className='cord-value'>
          <div className='lat'>
            <span>latitude</span>
            <span>{lat}</span>
          </div>
          <div className='log'>
            <span>longitude</span>
            <span>{lot}</span>
          </div>
        </div>
        <div className='datas'>
          <div className='details-1'>
            <div className='huminity'>
              <img src={humin} alt='' />
            </div>
            <p>{humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className='details-2'>
            <div className='huminity'>
              <img src={windspeed} alt='' />
            </div>
            <p>{speed}</p>
            <p>Wind Speed</p>
          </div>
        </div>
       
      </div>
      <div id='msgoferror' className={errApi === false ? 'hidden' : 'visible'}>
          <div className='faild-img'>
          <img src={faild} alt=''></img>
          </div>
          <p>This is wrong name !</p>
          <p>please type correct name</p>
        </div>

    </div>
   </div>
  );
};

export default Weather;
