import dueDateCalculator from '../src/dueDateCalculator';

describe('dueDateCalculator', () => {
    let calculator: dueDateCalculator;

    beforeEach(() => {
        calculator = new dueDateCalculator();
    });

    test('should calculate correct due date within same day working hours', () => {
        const submitTime = new Date('2025-03-28 09:00:00');
        const turnaroundTime = 8;
        const dueDate = calculator.calculateDueDate(submitTime, turnaroundTime);
        expect(dueDate.getDate()).toBe(28);
        expect(dueDate.getHours()).toBe(17);
    });

    test('should calculate correct due date across multiple working days within working hours', () => {
        const submitTime = new Date('2025-03-25 14:12:00');
        const turnaroundTime = 16;
        const dueDate = calculator.calculateDueDate(submitTime, turnaroundTime);
        expect(dueDate.getDate()).toBe(27);
        expect(dueDate.getHours()).toBe(14);
        expect(dueDate.getMinutes()).toBe(12);
    });
})