import React, {useRef , useState , useEffect} from 'react';
import axios from 'axios';

const Hero = () => {

  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras=1');
        setData(response.data[0]);  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const inputRefs = useRef([]);
  const handleInput = (e , index) => {
    if(e.target.value !== data[index] && e.target.value !== '') {
      e.target.classList.remove("text-white");
      e.target.classList.add("text-red-500");
    } 

    if(e.target.value === '') {
      e.target.classList.remove("text-red-500");
      e.target.classList.add("text-white");
    }

    if(e.target.value.length === 1 && index < data.length - 1 ) {
      inputRefs.current[index +1].focus();
    }
  };
   const handleKeyDown = (e, index) =>{
    if (e.key ==='Backspace' && e.target.value ==='' && index>0){
      inputRefs.current[index -1].focus();
    }
   }

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='p-5 overflow-hidden border-3 border-gray-500 rounded-2xl h-90 w-[80%] mx-20'>
        {data.split('').map((char, index) => (
          <input 
          autoFocus={index === 0}
            type="text"
            placeholder={char} 

            key={index}
            className='w-2.5 text-start bg-transparent  rounded-lg  
              focus:outline-none focus:border-blue-500
              transition duration-300 text-white'
              

            maxLength={1}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleInput(e , index)}
            onKeyDown={(e) => handleKeyDown(e , index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero;