import { Cell } from '..';
import { BoardType, CellClickHandler, SelectionType } from '../components.types';

type BoardProps = {
    board: BoardType;
    currentCell: SelectionType;
    onCellClick: CellClickHandler;
};

const Board = ({ board, currentCell, onCellClick }: BoardProps) => {
    return (
        <div
            className='board'
            data-current-col={currentCell[0].col}
            data-current-row={currentCell[0].row}
            data-current-box={currentCell[0].box}
            data-current-value={currentCell[0].value}
        >
            {board.map((cell, index) => (
                <Cell
                    key={index}
                    cell={cell}
                    onClick={(e) => {
                        onCellClick(cell);
                        e.preventDefault();
                    }}
                />
            ))}
        </div>
    );
}

export default Board;
