const formatTimeSection = (timeVal: number) =>
    timeVal.toString().padStart(2, '0');

export const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${formatTimeSection(h)}:${formatTimeSection(m)}:${formatTimeSection(s)}`;
};