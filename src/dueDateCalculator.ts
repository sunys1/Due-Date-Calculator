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
    calculateDueDate(submitTime: Date, turnaroundTime: number): Date {
        const dueDate = new Date(submitTime);
        dueDate.setHours(dueDate.getHours() + turnaroundTime);
        
        return dueDate;
    }
}

export default dueDateCalculator;