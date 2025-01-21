import { useEffect } from "react";


function handleMouseMove(e) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    const x = e.clientX;
    const y = e.clientY;


    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;

    // cursorOutline.style.left = `${x}px`;
    // cursorOutline.style.top = `${y}px`;

    cursorOutline.animate({
        left: `${x}px`,
        top: `${y}px`
    }, { duration: 500, fill: 'forwards' })
}

function Cursor() {
    const dotRef =
        useEffect(() => {
            document.addEventListener('mousemove', handleMouseMove);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
            }
        }, [])

    return (
        <>
            <div className="cursor-dot"></div>
            <div className="cursor-outline"></div>
        </>
    )
}

export default Cursor;