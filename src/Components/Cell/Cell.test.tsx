import { render, screen, fireEvent } from '@testing-library/react';
import { CellType } from '..';
import Cell from './Cell';

function makeCell(overrides: Partial<CellType> = {}): CellType {
    return {
        row: 0,
        col: 0,
        box: 0,
        value: 5,
        isFixed: true,
        hints: [false, false, false, false, false, false, false, false, false],
        ...overrides,
    } as CellType;
}

describe('Cell component', () => {
    test('renders button with correct data attributes', () => {
        const cell = makeCell({ row: 2, col: 3, box: 1, value: 7, isFixed: false });
        const mockClick = jest.fn();
        render(<Cell cell={cell} onClick={mockClick} />);

        const btn = screen.getByRole('button');
        expect(btn).toHaveAttribute('data-row', '2');
        expect(btn).toHaveAttribute('data-col', '3');
        expect(btn).toHaveAttribute('data-box', '1');
        expect(btn).toHaveAttribute('data-value', '7');
        expect(btn).toHaveAttribute('data-fixed', 'false');
    });

    test('calls onClick when button is clicked', () => {
        const cell = makeCell();
        const mockClick = jest.fn((e) => e.preventDefault());
        render(<Cell cell={cell} onClick={mockClick} />);

        const btn = screen.getByRole('button');
        fireEvent.click(btn);
        expect(mockClick).toHaveBeenCalledTimes(1);
    });
});
