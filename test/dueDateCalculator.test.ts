import DueDateCalculator from '../src/DueDateCalculator';

describe('DueDateCalculator', () => {
    let calculator: DueDateCalculator;

    beforeEach(() => {
        calculator = new DueDateCalculator();
    });
        
    test('should calculate correct due date within same day working hours', () => {
        const submitDate = new Date('2025-03-28 09:00:00');
        const turnaroundHours = 8;
        const dueDate = calculator.calculateDueDate(submitDate, turnaroundHours);
        expect(dueDate.getDate()).toBe(28);
        expect(dueDate.getHours()).toBe(17);
    });

    test('should calculate correct due date across multiple working days within working hours', () => {
        const submitDate = new Date('2025-03-25 14:12:00');
        const turnaroundHours = 16;
        const dueDate = calculator.calculateDueDate(submitDate, turnaroundHours);
        expect(dueDate.getDate()).toBe(27);
        expect(dueDate.getHours()).toBe(14);
        expect(dueDate.getMinutes()).toBe(12);
    });

    test('should calculate correct due date across multiple working days within working hours', () => {
        const submitDate = new Date('2025-03-25 12:15:00');
        const turnaroundHours = 5;
        const dueDate = calculator.calculateDueDate(submitDate, turnaroundHours);
        expect(dueDate.getDate()).toBe(26);
        expect(dueDate.getHours()).toBe(9);
        expect(dueDate.getMinutes()).toBe(15);
    });

    test('should calculate correct due date when due date falls on a weekend', () => {
        const submitDate = new Date('2025-03-28 15:00:00');
        const turnaroundHours = 16;
        const dueDate = calculator.calculateDueDate(submitDate, turnaroundHours);
        expect(dueDate.getMonth()).toBe(3); // April 1st: getMonth() is 0-indexed
        expect(dueDate.getDate()).toBe(1);
        expect(dueDate.getHours()).toBe(15);
    });

    test('should throw error when submit date is outside working days', () => {
        const submitDate = new Date('2025-03-29 09:00:00');
        const turnaroundHours = 8;
        expect(() => {
            calculator.calculateDueDate(submitDate, turnaroundHours);
        }).toThrow('Submit date is outside working days (Monday to Friday). A problem can only be reported during working days.');
    });

    test('should throw error when submit date is outside working hours', () => {
        const submitDate = new Date('2025-03-28 08:00:00');
        const turnaroundHours = 8;
        expect(() => {
            calculator.calculateDueDate(submitDate, turnaroundHours);
        }).toThrow('Submit date is outside working hours (9AM-5PM). A problem can only be reported during working hours.');
    });

    test('should throw error when turnaround hours is negative', () => {
        const submitDate = new Date('2025-03-28 09:00:00');
        const turnaroundHours = -8;
        expect(() => {
            calculator.calculateDueDate(submitDate, turnaroundHours);
        }).toThrow('Turnaround time must be greater than 0.');
    });

    test('should throw error when turnaround hours is less than or equal to 0', () => {
        const submitDate = new Date('2025-03-28 09:00:00');
        const turnaroundHours = 0;
        expect(() => {
            calculator.calculateDueDate(submitDate, turnaroundHours);
        }).toThrow('Turnaround time must be greater than 0.');
    });
})