export default function convertHourToMinute(time: string) : number{
   const [hour,minute] = time.split(':').map(Number);
   const timeInMinute = (hour*60) + minute;
   return timeInMinute;
}