/**
 * Created by caoyangkaka on 12/10/15.
 * mm-dd-yyyy, mm/dd/yyyy or dd-mm-yyyy, dd/mm/yyyy
 * Print the current date
 * Main to review the api for the date object
 */

function printDate() {
    var today = new Date();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var day = today.getDate();
    month = (month < 10)? '0' + month: '' + month;
    day = (day < 10)? '0' + day : day;
    return month + '-' + day + '-' + year;
}

document.write(printDate());

