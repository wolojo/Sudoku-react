import './Hints.css'

import { Hints as HintsType } from '../components.types';

type HintsProps = {
    hints: HintsType;
}

const  Hints = ({hints}: HintsProps) => {
    return (
        <div className="hints">
            {[0,1,2,3,4,5,6,7,8].map(num => (
                <div key={num} className={`hint-${num} ${hints[num] ? '' : 'hidden'}`}>
                    {num+1}
                </div>
                    
            ))}
        </div>
    )
}

export default Hints;
