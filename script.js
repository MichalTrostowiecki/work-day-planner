
//Function to display current day
$(function () {
    let timeNow = dayjs();

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


