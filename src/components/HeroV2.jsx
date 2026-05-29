import React, { useEffect, useRef, useState } from 'react'

const HeroV2 = () => {

    const text =
        "The quick brown fox. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.";

    const [typed, setTyped] = useState("");

    const inputRef = useRef(null);
    const scrollRef = useRef(null);
    const caretRef = useRef(null);

    const textSegments = [];
    let charIndex = 0;

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
                        ref={index === typed.length ? caretRef : null}
                        className={`${color} relative inline-flex h-[1.35em] w-[0.5em] sm:w-[0.6em] items-center justify-center align-middle leading-none tracking-normal`}
                    >
                        {finalChar}
                        {index === typed.length && (
                            <span className="absolute -left-3 top-4.5 -translate-y-1/2 animate-pulse text-gray-300">
                                |
                            </span>
                        )}
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
        if (!scrollRef.current || !caretRef.current) return;

        const scrollElement = scrollRef.current;
        const caretElement = caretRef.current;
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
                    className='no-scrollbar h-full overflow-y-scroll p-4 font-mono text-3xl leading-relaxed'
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
                </div>

                <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-black via-black/80 to-transparent backdrop-blur-[1px]' />

            </div>

        </div>
    )
}

export default HeroV2;
