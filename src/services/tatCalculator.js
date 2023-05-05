exports.tatCaculator =(inProgressTime,CompletedTime) => {

const date1 = new Date(inProgressTime);
const date2 = new Date(CompletedTime);

const timeDiff = date2.getTime() - date1.getTime();
const minutesDiff = Math.floor(timeDiff / (1000 * 60));
const time = minutesDiff + "min";

return time ;
}