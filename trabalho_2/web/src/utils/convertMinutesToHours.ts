export default function convertMinutesToHours(minutesString: string): string {
  const minutes = parseInt(minutesString, 10);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(remainingMinutes).padStart(2, '0');
  
  return `${formattedHours}:${formattedMinutes}`;
}
