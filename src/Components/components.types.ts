import { Dispatch, SetStateAction } from 'react';

export type CellType = {
    col: number;
    row: number;
    value: number;
    isFixed: boolean;
    box: number;
    // fixed-length 9-tuple of booleans representing hints 1..9
    hints: Hints;
}

export type SelectionType = Array<CellType>;
export type SetSelectionFunctionType = Dispatch<SetStateAction<SelectionType>>;

export type BoardType = Array<CellType>;

export type CellChangeHandler = (index: number, value: number, isHint?: boolean) => void;
export type CellClickHandler = (cell: CellType) => void;

export type Hints = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];
