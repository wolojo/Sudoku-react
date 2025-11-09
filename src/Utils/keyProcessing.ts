import { KeyboardEvent } from 'react';
import { CellChangeHandler, SelectionType } from '../Components/components.types';

type ProcessNumberKeyFunction = {
    (
        evt: KeyboardEvent<HTMLElement>,
        handleCellChange: (value: number, isHint?: boolean) => void
    ): void;
}
const processNumberKeys: ProcessNumberKeyFunction = (evt, handleCellChange) => {
    switch (evt.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            handleCellChange(+evt.key, evt.ctrlKey || evt.shiftKey);
            break;
        case "Backspace":
        case "Delete":
            handleCellChange(0);
            break;
        default:
            return;
    }
    evt.preventDefault();
}

const handleNumberKey = (evt: KeyboardEvent<HTMLElement>, currentCell: SelectionType, handleCellChange: CellChangeHandler) => {
    if (currentCell.isFixed) return;
    
    const index = currentCell.row * 9 + currentCell.col;
    const cellChangeFunc = (value: number, isHint?: boolean) => handleCellChange(index, value, isHint);

    return processNumberKeys(evt, cellChangeFunc);
}


export function processKeyPress(currentCell: SelectionType, evt: KeyboardEvent<HTMLElement>, setCurrentCell: (setIndex: number) => void, handleCellChange: CellChangeHandler) {
    let { col: currentColumn, row: currentRow } = currentCell;

    switch (evt.key) {
        case "ArrowUp":
            currentRow = (currentRow + 8) % 9;
            break;
        case "ArrowDown":
            currentRow = (currentRow + 1) % 9;
            break;
        case "ArrowLeft":
            currentColumn = (currentColumn + 8) % 9;
            break;
        case "ArrowRight":
            currentColumn = (currentColumn + 1) % 9;
            break;
        default:
            return handleNumberKey(evt, currentCell, handleCellChange);
    }
    setCurrentCell(currentRow * 9 + currentColumn);
    evt.preventDefault();
}
