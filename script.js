// Load any existing data from the local storage
$(function () {
    let oldData = localStorage.getItem("data");
    oldData = JSON.parse(oldData);

    // Set data-hour attribute to each element
    $(".hour").each(function () {
        let hourText = $(this).text();
        $(this).attr("data-hour", hourText);
    })
    
    if (oldData) {
        // Iterate over the oldData
        for (let key in oldData) {
            // Find the span with the matching data-hour attribute
            let timeBlockHour = $('[data-hour="' + oldData[key].hour + '"]');

            // Check if the element exists
            if (timeBlockHour.length) {
                // Set the text of the associated textarea element
                timeBlockHour.closest('.input-group').find('textarea').val(oldData[key].text);
            }
        }
    }
    
})



// Function to display current day
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

// Function to highlight past, future, current  events
$(function () {

    // Get current hour in 24-hour format
    let timeNow = dayjs().hour();
    
    

    $(".time-block").each(function () {

        let timeBlockHour = $(this).find(".hour").text();
        let formattedTime = timeBlockHour.slice(0, -2) + " " + timeBlockHour.slice(-2);
        
        
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

// Convert formattedTime (eg. "9 AM") to 24-hour format
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



// Save task to a local storage on a click of a button 'save'.
$(".saveBtn").on("click", function () {
    let data = {};
    
    let textAreaValue = $(this).siblings(".form-control").val();
    let timeBlockHour = $(this).siblings(".hour").text();
    data.hour = timeBlockHour;
    data.text = textAreaValue;
    
    let localData = localStorage.getItem("data");
    if (localData) {
        localData = JSON.parse(localData);
    } else {
        localData = [];
    }

    // Find the index of the existing object with the same hour
    // If not found .findIndex returns -1
    let existingIndex = localData.findIndex(function(item) {
        return item.hour === data.hour;
    });
    console.log(existingIndex);

    if (existingIndex !== -1) {
        // If found, update the text property of the existing object
        localData[existingIndex].text = data.text;
    } else {
        // If not found, push the new data as a new object
        localData.push(data);
    }

    localStorage.setItem("data", JSON.stringify(localData));
});


