import { Cell } from './Cell';
import { BoardType, CellClickHandler, SelectionType } from './components.types';

type BoardProps = {
    board: BoardType;
    currentCell: SelectionType;
    onCellClick: CellClickHandler;
};

const Board = ({ board, currentCell, onCellClick }: BoardProps) => {
    return (
        <div
            className='board'
            data-current-col={currentCell.col}
            data-current-row={currentCell.row}
            data-current-box={currentCell.box}
            data-current-value={currentCell.value}
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