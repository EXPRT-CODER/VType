import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import paragraphs from '../data/paragraphs.js';

const HeroV3 = () => {

    const text =  paragraphs;
    const [typed, setTyped] = useState("");
    const [mistakes, setMistakes] = useState(0);
    const [keystrokes, setKeystrokes] = useState(0);
    let currentWrong = 0;
    let accuracy = 100;

    //for wpm

    const [currentTime, setCurrentTime] = useState(Date.now());
    const startTime = useRef(null);

    useEffect(() => {
    if (!startTime.current) return;

    const interval = setInterval(() => {
        setCurrentTime(Date.now());
    }, 500);

    return () => clearInterval(interval);
    }, [startTime.current]); 

    const elapsedSeconds = startTime.current ? (currentTime - startTime.current) / 1000 : 0;
    const wpm =
        elapsedSeconds > 0
            ? Math.round((typed.length / 5) / (elapsedSeconds / 60))
            : 0;



//following bhasad for caret rendering

    //handle krega value of view on every screen resize
    const [view, setView] = useState(0);
    useEffect(() => {
        const handleResize = () => setView(prev => prev + 1);

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
  
    
    //this ref have all character pointers
    const charRefs = useRef([]);
    //this ref have contaner pointer for caret position calculation inside container
    const containerRef = useRef(null);
    const prevTopRef = useRef(0);
    //created a state for caret position and height
    const [caretPos, setCaretPos] = useState({
        left: 0,
        top: 0,
        height: 0,
    });

    useLayoutEffect(() => {

        //took current char reference and container reference(pointers)
        const currentChar = charRefs.current[typed.length];
        const container = containerRef.current;

        if (!currentChar || !container) return;

        const rect = currentChar.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const caretY =
                    rect.top - containerRect.top + container.scrollTop;
        setCaretPos({
            left: rect.left - containerRect.left,
            top: caretY,
            height: rect.height,
        });

        const trigger = container.scrollTop + container.clientHeight * 0.6;

        if (caretY > trigger) {
            container.scrollTo({
                top: caretY - container.clientHeight * 0.6,
                behavior: "smooth",
            });
        }

    }, [typed , view]);
    
                 
    // hanle function of hidden input tag for onchange
    const handleChange = (e) => {

        //setting time for wpm here and setting values
        if (!startTime.current) {
            startTime.current = Date.now();
        }

        const value = e.target.value;
            // jab bhi new cahr type hoga to check krega ki wo sahi hai ya nahi and accordingly increase keystrokes and mistakes
            if (value.length > typed.length) {
                const index = value.length - 1;
                setKeystrokes(prev => prev + 1);
                if (value[index] !== text[index]) {
                    setMistakes(prev => prev + 1);
                }
            }
            setTyped(value);
    }
 
    return (
        <div className='h-screen w-full flex justify-center items-center bg-black'>
            <div
                ref={containerRef} 
                className=' leading-11 whitespace-pre-wrap  relative mt-10 md:mt-20 sm:mt-10 h-[74vh] w-[87%] md:w-[80%] overflow-y-scroll px-2 py-5 md:py-0 scrollbar-hide'
            >
                {/* hidden input  */}
                <input
                    type="text"
                    value={typed}
                    onChange={handleChange}
                    autoFocus
                    spellCheck={false}
                    className='fixed inset-0 opacity-0 pointer-none'
                />
                {/* our curte carrot */}
               <div
                    className='absolute w-1 rounded-2xl -ml-1 bg-gray-400 animate-pulse pointer-events-none transition-[left,top] duration-300 ease-out'
                    style={{
                        left: caretPos.left,
                        top: caretPos.top,
                        height: caretPos.height,
                    }}
                />
                {/* text characters */}
                {text.split("").map((char, index) => {
                    
                    let color = "text-gray-500";
                    if (index < typed.length) {
                        color = char === typed[index] ? "text-white" : "text-red-500";
                        if (char !== typed[index]) currentWrong++;                 
                        accuracy =  ((keystrokes-mistakes)/keystrokes)*100
                    
                        if(char===' ' && typed[index] !==' '){
                            color = "bg-gray-500 rounded-sm";
                        }
                    }
                    return(
                        <span
                            className= {`text-3xl font-mono mx-px ${color}`}
                            ref={(el) => (charRefs.current[index] = el)}
                            key={index}
                            >
                            {char}
                        </span>
                    )
                })}
                
                {/* this div is for bottom spacing so that last line can be visible properly */}
                <div className='h-[30%]'></div>
            </div>
            {/* bottom gradient */}
                <div className='fixed bottom-0 w-full flex items-center justify-center  h-[35%] bg-linear-to-t from-black via-black/70 to-transparent'>
                    <div className='text-white text-xl font-mono bg-white/10 backdrop-blur-xl border-3 border-white/20 rounded-2xl px-4 py-2'>
                        wpm:{wpm.toFixed(0)} accuracy:{accuracy.toFixed(0)}% wrong:{currentWrong}
                    </div>
                </div>
        </div>
    )
}

export default HeroV3;