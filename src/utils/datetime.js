export default class DateTime {

    /**
    * Gets formatted datetime.
    *
    * @static
    * @returns {String} Returns the current datetime.
    */
    static getCurrentDateTime() {
        const now = new Date();

        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = now.getDate().toString().padStart(2, '0');

        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

        // Generate 6-digit microseconds (this is just mock data because JS doesn't support microseconds natively)
        const microseconds = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}${microseconds}`;
    }

}