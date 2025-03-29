/**
 * Due Date Calculator
 * Author: Gavin Sun
 * Date: 2025-03-28
 * 
 * Description: Implement a due date calculator method in an issue tracking system
 * 
 * 1. Working hours are from 9AM to 5PM on every working day, Monday to Friday.  
 * 2. Holidays should be ignored (e.g. A holiday on a Thursday is considered as a working day. 
 *    A working Saturday counts as a non-working day.)
 * 3. The turnaround time is defined in working hours (e.g. 2 days equal 16 hours).  
 *    If a problem was reported at 2:12PM on Tuesday and the turnaround time is 16 hours, 
 *    then it is due by 2:12PM on Thursday. 
 * 4. A problem can only be reported during working hours. (e.g. All submit date values are set between 9AM to 5PM.)
 */

class DueDateCalculator {
    // Define working days and hours
    private readonly WORKING_DAYS = [1, 2, 3, 4, 5];
    private readonly WORKING_START_HOUR = 9;
    private readonly WORKING_END_HOUR = 17;

    /**
     * @param submitDate Date - The date when the problem was reported
     * @param turnaroundHours number - The turnaround time in working hours
     * @returns Date - The calculated due date
     */
    calculateDueDate(submitDate: Date, turnaroundHours: number): Date {
        // Validate the submit date and turnaround time
        this.validateSubmitDate(submitDate, turnaroundHours);

        // Initialize due date as submit date
        const dueDate = new Date(submitDate);
        // keep track of the remaining turnaround time. Convert to minutes to preserve minutes in calculation
        let turnaroundMinutesLeft = turnaroundHours * 60;

        // Calculate working days and hours
        while (turnaroundMinutesLeft > 0) {
            if (this.isWorkingDay(dueDate)){
                // Calculate the time left in the current day, preserving the minutes
                const minutesLeftCurrentDay = this.getMinutesLeftCurrentDay(dueDate);
                // If the time left in the current day are enough to cover the turnaround hours left
                if (minutesLeftCurrentDay >= turnaroundMinutesLeft){
                    dueDate.setMinutes(dueDate.getMinutes() + turnaroundMinutesLeft);
                    turnaroundMinutesLeft = 0;
                }else {
                    // reset to the next working day
                    turnaroundMinutesLeft -= minutesLeftCurrentDay;
                    this.setToNextDay(dueDate);
                }
            }else {
                // If not a working day, skip
                this.setToNextDay(dueDate);
            }
        }

        return dueDate;
    }

    /**
     * Check if the submit date is within working days
     * @param currentDate Date - The date to check
     * @return boolean - True if the date is a working day, false otherwise
     */
    private isWorkingDay(currentDate: Date): boolean {
        const day = currentDate.getDay();
        return this.WORKING_DAYS.includes(day);
    }

    /**
     * Check if the submit date is within working hours
     * @param currentDate Date - The date to check
     * @return boolean - True if the date is within working hours, false otherwise
     */

    private isWithinWorkingHours(currentDate: Date): boolean {
        const hours = currentDate.getHours();
        return hours >= this.WORKING_START_HOUR && hours <= this.WORKING_END_HOUR;
    }

    /**
     * Validate the submit date and turnaround time
     * @param submitDate Date - The date when the problem was reported
     * @param turnaroundHours number - The turnaround time in working hours
     */
    private validateSubmitDate(submitDate: Date, turnaroundHours: number): void {
        if (!this.isWorkingDay(submitDate)) {
            throw new Error('Submit date is outside working days (Monday to Friday). A problem can only be reported during working days.');
        }

        if (!this.isWithinWorkingHours(submitDate)) {
            throw new Error('Submit date is outside working hours (9AM-5PM). A problem can only be reported during working hours.');
        }

        if (turnaroundHours <= 0) {
            throw new Error('Turnaround time must be greater than 0.');
        }
    }

    /**
     * Calculate the time left in the current day in minutes
     * @param currentDate Date - The date to check
     * @returns number - The time left in the current working day in minutes
     */
    private getMinutesLeftCurrentDay(currentDate: Date): number {
        return this.WORKING_END_HOUR * 60 - (currentDate.getHours() * 60 + currentDate.getMinutes());
    }

    /**
     * Skip to next day
     * @param currentDate Date - The date to check
     */
    private setToNextDay(currentDate: Date): void {
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate.setHours(this.WORKING_START_HOUR, 0, 0, 0);
    }
}

export default DueDateCalculator;
