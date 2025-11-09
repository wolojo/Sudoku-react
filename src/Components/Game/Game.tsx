import { Board } from '../';
import { KeyboardEvent, KeyboardEventHandler, useState } from 'react';
import { BoardType, CellChangeHandler, CellType, Hints, SelectionType, SetSelectionFunctionType } from '../components.types';
import { toggleHint, clearHint } from '../../Utils/hints';
import { processKeyPress } from '../../Utils/keyProcessing';

const initialBoard: BoardType = [
    5, 3, 0, 0, 7, 0, 0, 0, 0,
    6, 0, 0, 1, 9, 5, 0, 0, 0,
    0, 9, 8, 0, 0, 0, 0, 6, 0,
    8, 0, 0, 0, 6, 0, 0, 0, 3,
    4, 0, 0, 8, 0, 3, 0, 0, 1,
    7, 0, 0, 0, 2, 0, 0, 0, 6,
    0, 6, 0, 0, 0, 0, 2, 8, 0,
    0, 0, 0, 4, 1, 9, 0, 0, 5,
    0, 0, 0, 0, 8, 0, 0, 7, 9
].map((value, index) => (
    {
        value,
        isFixed: value !== 0,
        col: index % 9,
        row: Math.floor(index / 9),
        box: Math.floor(index / 27) * 3 + Math.floor((index % 9) / 3),
        hints: [false, false, false, false, false, false, false, false, false] as Hints,
    }
));

function Game() {
    const [board, setBoard] = useState(initialBoard);
    const [currentCell, setCurrentCell]: [SelectionType, SetSelectionFunctionType] = useState([initialBoard[40]]);

    const handleCellChange: CellChangeHandler = (index, value, isHint) => {
        // Update board immutably to avoid accidental shared-state mutations.
        setBoard(prevBoard => {
            const target = prevBoard[index];
            const { col, row, box } = target;

            return prevBoard.map((cell, i) => {
                // If this is the target cell, apply the change
                if (i === index) {
                    if (isHint) {
                        return {
                            ...cell,
                            // hint mode doesn't set a final value
                            value: 0,
                            hints: toggleHint(cell.hints, value - 1),
                        };
                    }

                    // normal value set: overwrite value
                    return {
                        ...cell,
                        value,
                    };
                }

                // For other cells: if we set a normal value, clear that hint from peers
                if (!isHint && value > 0) {
                    if (cell.col === col || cell.row === row || cell.box === box) {
                        return {
                            ...cell,
                            hints: clearHint(cell.hints, value - 1),
                        };
                    }
                }

                // otherwise keep cell as-is
                return cell;
            });
        });
    };

    const handleCellClick = (cell: CellType) => {
        setCurrentCell([cell]);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLElement> = (evt: KeyboardEvent<HTMLElement>) => {
        return processKeyPress(currentCell, evt,
            (index: number) => setCurrentCell([board[index]]),
            handleCellChange);
    }

    return (
        <div tabIndex={0} className="game" onKeyDown={handleKeyDown}>
            <Board
                board={board}
                currentCell={currentCell}
                // onCellChange={handleCellChange}
                onCellClick={handleCellClick}
            />
        </div>
    );
}

export default Game;
