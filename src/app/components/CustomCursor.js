import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        const scrubSpeed = 0.1; // Adjust for smoothness

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleLinkHover = () => {
            cursor.classList.add(styles.hover);
        };

        const handleLinkUnhover = () => {
            cursor.classList.remove(styles.hover);
        };

        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * scrubSpeed;
            cursorY += (mouseY - cursorY) * scrubSpeed;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(animateCursor);
        };

        const links = document.querySelectorAll("a");
        links.forEach((link) => {
            link.addEventListener("mouseenter", handleLinkHover);
            link.addEventListener("mouseleave", handleLinkUnhover);
        });

        document.addEventListener("mousemove", handleMouseMove);
        animateCursor();

        return () => {
            links.forEach((link) => {
                link.removeEventListener("mouseenter", handleLinkHover);
                link.removeEventListener("mouseleave", handleLinkUnhover);
            });
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return <div ref={cursorRef} className={styles.cursor}></div>;
};

export default CustomCursor;
