import DueDateCalculator from '../src/DueDateCalculator';

describe('DueDateCalculator', () => {
    let calculator: DueDateCalculator;

    beforeEach(() => {
        calculator = new DueDateCalculator();
    });
        
    test('should calculate correct due date within same day working hours', () => {
        const submitDate = new Date('2025-03-28T09:00:00Z');
        const turnaroundHours = 8;
        const dueDate = calculator.calculateDueDate(submitDate, turnaroundHours);
        expect(dueDate.getUTCDate()).toBe(28);
        expect(dueDate.getUTCHours()).toBe(17);
    });

    test('should calculate correct due date across multiple working days within working hours', () => {
        const submitDate = new Date('2025-03-25T14:12:00Z');
        const turnaroundHours = 16;
        const dueDate = calculator.calculateDueDate(submitDate, turnaroundHours);
        expect(dueDate.getUTCDate()).toBe(27);
        expect(dueDate.getUTCHours()).toBe(14);
        expect(dueDate.getMinutes()).toBe(12);
    });

    test('should calculate correct due date across multiple working days within working hours', () => {
        const submitDate = new Date('2025-03-25T12:15:00Z');
        const turnaroundHours = 5;
        const dueDate = calculator.calculateDueDate(submitDate, turnaroundHours);
        expect(dueDate.getUTCDate()).toBe(26);
        expect(dueDate.getUTCHours()).toBe(9);
        expect(dueDate.getMinutes()).toBe(15);
    });

    test('should calculate correct due date when due date falls on a weekend', () => {
        const submitDate = new Date('2025-03-28T15:00:00Z');
        const turnaroundHours = 16;
        const dueDate = calculator.calculateDueDate(submitDate, turnaroundHours);
        expect(dueDate.getMonth()).toBe(3); // April 1st: getMonth() is 0-indexed
        expect(dueDate.getUTCDate()).toBe(1);
        expect(dueDate.getUTCHours()).toBe(15);
    });

    test('should throw error when submit date is outside working days', () => {
        const submitDate = new Date('2025-03-29T09:00:00Z');
        const turnaroundHours = 8;
        expect(() => {
            calculator.calculateDueDate(submitDate, turnaroundHours);
        }).toThrow('Submit date is outside working days (Monday to Friday). A problem can only be reported during working days.');
    });

    test('should throw error when submit date is outside working hours', () => {
        const submitDate = new Date('2025-03-28T08:00:00Z');
        const turnaroundHours = 8;
        expect(() => {
            calculator.calculateDueDate(submitDate, turnaroundHours);
        }).toThrow('Submit date is outside working hours (9AM-5PM). A problem can only be reported during working hours.');
    });

    test('should throw error when submit date is not a valid date', () => {
        const submitDate = new Date('invalid date');
        const turnaroundHours = 8;
        expect(() => {
            calculator.calculateDueDate(submitDate, turnaroundHours);
        }).toThrow('Submit date must be a valid Date object.');
    });

    test('should throw error when turnaround hours is negative', () => {
        const submitDate = new Date('2025-03-28T09:00:00Z');
        const turnaroundHours = -8;
        expect(() => {
            calculator.calculateDueDate(submitDate, turnaroundHours);
        }).toThrow('Turnaround time must be a valid number greater than 0.');
    });

    test('should throw error when turnaround hours is equal to 0', () => {
        const submitDate = new Date('2025-03-28T09:00:00Z');
        const turnaroundHours = 0;
        expect(() => {
            calculator.calculateDueDate(submitDate, turnaroundHours);
        }).toThrow('Turnaround time must be a valid number greater than 0.');
    });

    test('should throw error when turnaround hours is NaN', () => {
        const submitDate = new Date('2025-03-28T09:00:00Z');
        const turnaroundHours = NaN;
        expect(() => {
            calculator.calculateDueDate(submitDate, turnaroundHours);
        }).toThrow('Turnaround time must be a valid number greater than 0.');
    });
})
