
//Function to display current day
$(function () {

    function getDaySuffix(day) {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    const day = dayjs().date();
    const suffix = getDaySuffix(day);
    const formattedDate = dayjs().format(`dddd, MMMM D`);

    $("#currentDay").text(formattedDate + suffix)
})

// function to highlight past, future, current  events
$(function () {

    // Get current hour in 24-hour format
    let timeNow = dayjs().hour();
    
    

    $(".time-block").each(function () {

        let timeBlockHour = $(this).find(".hour").text();
        let formattedTime = timeBlockHour.slice(0, -2) + " " + timeBlockHour.slice(-2);
        
        // Convert formattedTime (eg. "9 AM") to 24-hour format
        let hour = convertTo24Hour(formattedTime);
        let textArea = $(this).find(".form-control");
        // Apply the appropriate class based on comparison
        if (hour < timeNow) {
            $(textArea).addClass('past');
        } else if (hour === timeNow) {
            $(textArea).addClass('present');
        } else {
            $(textArea).addClass('future');
        }
    });
});


function convertTo24Hour(timeStr) {
    // Break timeStr to to time (eg. 9 and AM)
    let [hours, modifier] = timeStr.split(' ');
    
    if (hours === '12') {
        hours = '00';
    }

    if (modifier.toUpperCase() === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
    }

    return parseInt(hours);
}


