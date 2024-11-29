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

        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * scrubSpeed;
            cursorY += (mouseY - cursorY) * scrubSpeed;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(animateCursor);
        };

        // Function to move links slightly along with the cursor
        const handleLinkHover = (e) => {
            cursor.classList.add(styles.cursorHidden); // Hide cursor on link hover
            e.target.classList.add(styles.linkHover); // Change link color to red

            // Get the link's current position
            const link = e.target;
            const linkRect = link.getBoundingClientRect();
            
            // Calculate the offset between the mouse and the link's center
            const offsetX = mouseX - (linkRect.left + linkRect.width / 2);
            const offsetY = mouseY - (linkRect.top + linkRect.height / 2);

            // Apply the offset to the link's position
            link.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            link.style.transition = "transform 0.1s ease-out"; // Smooth movement
        };

        const handleLinkLeave = (e) => {
            cursor.classList.remove(styles.cursorHidden); // Show cursor when leaving link
            e.target.classList.remove(styles.linkHover); // Reset the link color
            e.target.style.transform = ""; // Reset link position
        };

        // Select all links and add event listeners
        const links = document.querySelectorAll("a");
        links.forEach((link) => {
            link.addEventListener("mouseenter", handleLinkHover);
            link.addEventListener("mouseleave", handleLinkLeave);
        });

        document.addEventListener("mousemove", handleMouseMove);
        animateCursor();

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            links.forEach((link) => {
                link.removeEventListener("mouseenter", handleLinkHover);
                link.removeEventListener("mouseleave", handleLinkLeave);
            });
        };
    }, []);

    return <div ref={cursorRef} className={styles.cursor}></div>;
};

export default CustomCursor;
