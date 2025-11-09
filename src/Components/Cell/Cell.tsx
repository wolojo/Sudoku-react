import { Hints } from '../';
import { MouseEventHandler } from 'react';
import { CellType } from '../components.types';

import './Cell.css';

type CellProps = {
    cell: CellType;
    onClick: MouseEventHandler<HTMLButtonElement>;
}
const Cell = ({ cell, onClick }: CellProps) => {

    return (
        <button
            type="button"
            className='cell'
            data-value={cell.value}
            data-col={cell.col}
            data-row={cell.row}
            data-box={cell.box}
            onClick={onClick}
            data-fixed={cell.isFixed}
        ><Hints hints={cell.hints} />
        </button>
    );
};

export default Cell;
