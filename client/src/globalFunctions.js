/**
*Function: timePassed
*Useage: calculates the difference between the current time and the timestamp of an object and returns a message indicating the time difference
*@params time - date
 */

export function timePassed (time){
    // get the current date and time 
    let today = new Date();
    //get the data recorded when a post was made - new date added to accommodates the default values
    let posted = new Date(time);
    
    // find the difference between the time now and the post's timestamp
    let diffTime = today.getTime() - posted.getTime();

    // define the method of reduction for the units array
    const reducer = (accumulator, currentValue) => accumulator*currentValue;
    
    // values used to convert milliseconds to seconds, minutes, hours, days, years, weeks,months and years
    let conversions = [1000,60,60,24,7,4,12];

    // initialize the array to hold the differences in time for each unit [milliseconds --->years]
    var diffTimes = [diffTime];
    
    for (let i=0; i<conversions.length; i++){
        let units = [];
        // for each unit, get the conversion values needed and push it into an array
        units.push(conversions[i]);
        // divide the difference in milliseconds by the multiplication of all the conversion values in the array
        diffTimes.push(diffTimes[i]/units.reduce(reducer));
    }
    // reverse the order of the resulting array [years --> milliseconds]
    diffTimes = diffTimes.reverse();    

    // define an array to hold the units associated with each value of the diffTimes array
    let diffunits = ["year","month", "week", "day", "hour", "minute","< 1 minute","< 1 minute"];

    // Round all the time differences down to the nearest whole number - this will create 0s for the smaller units that we don't want to use
    let convertedDates = diffTimes.map(date=>Math.floor(date));
    
    // find the location of the first value in the diffTimes array that is not 0
    let timeLoc = convertedDates.findIndex(date=>date!==0);
    
    // find the first value in the diffTimes array is not o
    let timediff = timeLoc < 0 ? diffunits[7] : convertedDates.find(date=>date!==0);
    // get the units associated with the time diff value
    let tempunits = timeLoc < 0 ? diffunits[7] : diffunits[timeLoc]; 

    // take into account if the units should present as singular or plural
    let units = (timediff===1 || tempunits==="< 1 minute") ? tempunits : tempunits+"s";

    // determine the message to be returned - if it is anything less than minutes than the value of timeDiff isn't included
    let timeMessage = (units === "< 1 minute") ? `${units} ago` : `${timediff} ${units} ago`
    
    return timeMessage;
}

/**
 * Function: convertToDate
 * Useage: converts a date to mm/dd/yyyy format
 * @param {date} timestamp 
 */
export function convertToDate(timestamp){
    let date = new Date(timestamp);
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
}

