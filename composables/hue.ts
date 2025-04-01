export const applyHue = () => {
    const storedHue = localStorage.getItem("hue");
    let hue = -1;
    if (storedHue) {
        hue = parseInt(storedHue);
    }

    const style = document.documentElement.style;

    if (hue === -1) {
        style.removeProperty("--background-color");
        style.removeProperty("--foreground-color");
        style.removeProperty("--sub-background-color");
        style.removeProperty("--border-color");
        return;
    }

    style.setProperty("--background-color", `hsl(${hue}, 100%, 97%)`);
    style.setProperty("--foreground-color", `hsl(${hue}, 50%, 20%)`);
    style.setProperty("--sub-background-color", `hsl(${hue}, 100%, 85%)`);
    style.setProperty("--border-color", `hsl(${hue}, 50%, 50%)`);
};
