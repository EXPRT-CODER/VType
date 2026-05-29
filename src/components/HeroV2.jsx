import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import paragraphs from '../data/paragraphs.js';

const HeroV2 = () => {


        const text = paragraphs;
  


    const [typed, setTyped] = useState("");
    const [caretStyle, setCaretStyle] = useState({ left: 0, top: 0, height: 0 });

    const caretWidthClass = 'w-1';
    const caretHeightRatio = 0.9;
    const caretColorClass = 'bg-gray-400';

    const inputRef = useRef(null);
    const scrollRef = useRef(null);
    const currentCharRef = useRef(null);

    const textSegments = [];
    let charIndex = 0;
    const caretIndex = Math.min(typed.length, text.length - 1);

    text.split(/(\s+)/).forEach((segment) => {
        const isSpace = /^\s+$/.test(segment);

        textSegments.push({
            isSpace,
            chars: segment.split("").map((char) => {
                const index = charIndex++;
                let color = "text-gray-500";

                if (index < typed.length) {
                    color = typed[index] === char ? "text-white" : "text-red-500";

                    if (typed[index] !== char && char === " ") {
                        color = "bg-gray-500 rounded-sm";
                    }
                }

                const finalChar = char === " " ? "\u00A0" : char;

                return (
                    <span
                        key={index}
                        ref={index === caretIndex ? currentCharRef : null}
                        className={`${color} relative inline-flex h-[1.25em] w-[0.5em] sm:w-[0.63em] items-center justify-center align-middle leading-none tracking-normal`}
                    >
                        {finalChar}
                    </span>
                );
            }),
        });
    });

    useEffect(() => {

        const setScreenHeight = () => {
            document.documentElement.style.setProperty(
                "--screen-height",
                `${window.innerHeight}px`
            );
        };

        setScreenHeight();

        window.addEventListener("resize", setScreenHeight);

        return () => {
            window.removeEventListener("resize", setScreenHeight);
        };

    }, []);

    useEffect(() => {
        if (!scrollRef.current || !currentCharRef.current) return;

        const scrollElement = scrollRef.current;
        const caretElement = currentCharRef.current;
        const blurAreaHeight = 112; // same as h-28

        const caretTop = caretElement.offsetTop;
        const caretBottom = caretTop + caretElement.offsetHeight;
        const visibleTop = scrollElement.scrollTop;
        const visibleBottom = visibleTop + scrollElement.clientHeight;
        const thresholdBottom = visibleBottom - blurAreaHeight;

        if (caretBottom > thresholdBottom) {
            const targetScrollTop = Math.max(0, caretBottom - scrollElement.clientHeight + blurAreaHeight + 8);
            scrollElement.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
        } else if (caretTop < visibleTop) {
            scrollElement.scrollTo({ top: caretTop, behavior: 'smooth' });
        }
    }, [typed]);

    useLayoutEffect(() => {
        if (!scrollRef.current || !currentCharRef.current) return;

        const scrollElement = scrollRef.current;
        const scrollRect = scrollElement.getBoundingClientRect();
        const charRect = currentCharRef.current.getBoundingClientRect();

        setCaretStyle({
            left: charRect.left - scrollRect.left + scrollElement.scrollLeft,
            top: charRect.top - scrollRect.top + scrollElement.scrollTop,
            height: charRect.height,
        });
    }, [typed]);

    return (

        <div className='h-(--screen-height) md:h-[calc(var(--screen-height)-4rem)] md:mt-16 w-full overflow-hidden flex justify-center items-center bg-black'>

            <div
                onClick={() => inputRef.current.focus()}
                className='relative mt-20 md:mt-0 sm:mt-10 h-[74vh] w-[80%] overflow-hidden cursor-text'
            >

                {/* Hidden Input */}
                <input
                    ref={inputRef}
                    type="text"
                    value={typed}
                    onChange={(e) => setTyped(e.target.value)}
                    autoFocus
                    spellCheck={false}
                    className='absolute inset-0 opacity-0 caret-transparent text-transparent outline-none'
                />

                <div
                    ref={scrollRef}
                    style={{ scrollBehavior: 'smooth' }}
                    className='relative no-scrollbar h-full overflow-y-scroll p-4 font-mono text-3xl leading-relaxed'
                >
                    {/* Text */}
                    {textSegments.map((segment, segmentIndex) => (
                        <span
                            key={segmentIndex}
                            className={segment.isSpace ? 'inline-flex whitespace-pre' : 'inline-flex flex-nowrap'}
                        >
                            {segment.chars}
                        </span>
                    ))}
                    <span
                        className={`absolute left-0 top-0 ${caretWidthClass} rounded-sm ${caretColorClass} transition-all duration-150 ease-out animate-pulse`}
                        style={{
                            transform: `translate3d(${caretStyle.left}px, ${caretStyle.top}px, 0)`,
                            height: `${caretStyle.height * caretHeightRatio}px`,
                        }}
                    />
                </div>

                <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-black via-black/80 to-transparent backdrop-blur-[1px]' />

            </div>

        </div>
    )
}

export default HeroV2;
