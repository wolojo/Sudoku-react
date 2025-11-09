/* eslint-disable testing-library/no-node-access */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Game from './Game';

describe('Game integration', () => {
    test('initial selection is centered', () => {
        render(<Game />);
        // current selection should be the center cell at row 4, col 4
        const boardEl = document.querySelector('.board');
        expect(boardEl).not.toBeNull();
        expect(boardEl?.getAttribute('data-current-row')).toBe('4');
        expect(boardEl?.getAttribute('data-current-col')).toBe('4');
    });

    test('clicking a cell updates current selection', () => {
        render(<Game />);
        const buttons = screen.getAllByRole('button');
        // click first cell
        const first = buttons[0] as HTMLButtonElement;
        fireEvent.click(first);

        const boardEl = document.querySelector('.board');
        expect(boardEl?.getAttribute('data-current-row')).toBe('0');
        expect(boardEl?.getAttribute('data-current-col')).toBe('0');
    });

    test('pressing a number sets the current cell value', async () => {
        render(<Game />);
        const gameDiv = document.querySelector('.game') as HTMLElement;
        // focus and press '1'
        gameDiv?.focus();
        fireEvent.keyDown(gameDiv, { key: '1' });

        // wait for state update on the actual center cell button
        await waitFor(() => {
            const center = document.querySelector('.cell[data-row="4"][data-col="4"]');
            expect(center?.getAttribute('data-value')).toBe('1');
        });
    });
});
