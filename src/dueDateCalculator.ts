/**
 * Due Date Calculator
 * Author: Gavin Sun
 * Date: 2025-03-28
 * 
 * Description: Implement a due date calculator method in an issue tracking system
 * 1. Working hours are from 9AM to 5PM on every working day, Monday to Friday.  
 * 2. Holidays should be ignored (e.g. A holiday on a Thursday is considered as a working day. 
 *    A working Saturday counts as a non-working day.)
 * 3. The turnaround time is defined in working hours (e.g. 2 days equal 16 hours).  
 *    If a problem was reported at 2:12PM on Tuesday and the turnaround time is 16 hours, 
 *    then it is due by 2:12PM on Thursday. 
 * 4. A problem can only be reported during working hours. (e.g. All submit date values are set between 9AM to 5PM.)
 */

class dueDateCalculator {
    // Define working days and hours
    private readonly WORKING_DAYS = [1, 2, 3, 4, 5];
    private readonly WORKING_HOURS_PER_DAY = 8;
    private readonly WORKING_START_HOUR = 9;
    private readonly WORKING_END_HOUR = 17;

    calculateDueDate(submitDate: Date, turnaroundHours: number): Date {
        let dueDate = new Date(submitDate); // Initialize due date as submit date
        let turnaroundHoursLeft = turnaroundHours;

        // Calculate working days and hours
        while (turnaroundHoursLeft > 0) {
            // Check current day working hours left
            const hoursLeftCurrentDay = this.WORKING_END_HOUR - dueDate.getHours();
            // If the current day working hours left are enough to cover the turnaround hours left  
            if (hoursLeftCurrentDay >= turnaroundHoursLeft) {
                dueDate.setHours(dueDate.getHours() + turnaroundHoursLeft);
                turnaroundHoursLeft = 0;
            }else{
                // If not, update to the next working day
                turnaroundHoursLeft -= hoursLeftCurrentDay;
                dueDate.setDate(dueDate.getDate() + 1);
                dueDate.setHours(this.WORKING_START_HOUR);
            }
        }

        return dueDate;
    }
}

export default dueDateCalculator;