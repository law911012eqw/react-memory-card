import React from 'react';

import Champions from './Champions'
import './Main.css';
function Main() {
    //click to start text
    // true == visible, otherwise its false
    const modalRef = React.useRef();
    const [clickToStart, setClickToStart] = React.useState(true);
    return (
        <div className="main">
            {clickToStart ?
                <div
                    onClick={() => setClickToStart(!clickToStart)}
                    ref={modalRef}
                    className="modal-bg">
                    <div className="modal-start">
                        Click To Start
                    </div>
                </div> 
                : null}

            <Champions />
        </div>
    );
}

export default Main;