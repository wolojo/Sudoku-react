import { processKeyPress } from './keyProcessing';
import { CellType } from '../Components/components.types';

// Helper to create a minimal cell
function makeCell(row: number, col: number): CellType {
    return {
        row,
        col,
        box: Math.floor(row / 3) * 3 + Math.floor(col / 3),
        value: 0,
        isFixed: false,
        hints: [false, false, false, false, false, false, false, false, false],
    };
}

describe('processKeyPress', () => {
    test('ArrowUp moves selection up one row', () => {
        const cell = makeCell(4, 4);
        let setIndexCalled = -1;
        const setCurrentCell = (i: number) => { setIndexCalled = i; };

        const evtUp = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        processKeyPress(cell, evtUp as any, setCurrentCell, jest.fn());
        expect(setIndexCalled).toBe(3 * 9 + 4);
    });

    test('ArrowLeft moves selection left one column', () => {
        const cell = makeCell(4, 4);
        let setIndexCalled = -1;
        const setCurrentCell = (i: number) => { setIndexCalled = i; };

        const evtLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
        processKeyPress(cell, evtLeft as any, setCurrentCell, jest.fn());
        expect(setIndexCalled).toBe(4 * 9 + 3);
    });

    test('ArrowUp wraps from row 0 to row 8', () => {
        const cell = makeCell(0, 0);
        let setIndexCalled = -1;
        const setCurrentCell = (i: number) => { setIndexCalled = i; };

        const evtUpWrap = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        processKeyPress(cell, evtUpWrap as any, setCurrentCell, jest.fn());
        expect(setIndexCalled).toBe(8 * 9 + 0);
    });

    test('Number key calls handleCellChange with index', () => {
        const cell = makeCell(0, 0);
        const mockHandle = jest.fn();
        const setCurrentCell = jest.fn();

        const evt1 = new KeyboardEvent('keydown', { key: '1' });
        processKeyPress(cell, evt1 as any, setCurrentCell as any, mockHandle as any);
        expect(mockHandle).toHaveBeenCalled();
        const firstCallArgs = mockHandle.mock.calls[0];
        expect(firstCallArgs[0]).toBe(0);
    });

    test('Backspace calls handleCellChange with index (delete)', () => {
        const cell = makeCell(0, 0);
        const mockHandle = jest.fn();
        const setCurrentCell = jest.fn();

        const evtDel = new KeyboardEvent('keydown', { key: 'Backspace' });
        processKeyPress(cell, evtDel as any, setCurrentCell as any, mockHandle as any);
        expect(mockHandle).toHaveBeenCalled();
        const delArgs = mockHandle.mock.calls[0];
        expect(delArgs[0]).toBe(0);
    });
});
