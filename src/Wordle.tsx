import { useState } from 'react'

function Guess() {
    return (
        // updated row for guess when ENTER is pressed
        <></>
    )
}

function Wordle() {
    const [guessCount, setGuessCount] = useState(0)
    const [value, setValue] = useState('');
    const [pointer, setPointer] = useState([guessCount, 0]); // [row, column]
    const [status, setStatus] = useState('play');

    function handleKeyDown(e) {
        console.log(`(Code: ${e.code})`);        
        const newValue = e.target.value;
        if (/^[a-zA-Z]*$/.test(newValue)) {
            setValue(newValue.toUpperCase());
        }
        if (e.code === 'Enter') {
            console.log(`Guess: ${guessCount+1}`);        
            setGuessCount(guessCount + 1);
            if (value === 'SECRET') {
                setStatus('win');
            } 
            else if (guessCount >= 6) {
                setStatus('lose');
            }
            else if (guessCount < 6) {
                // Move to the next row, game CONTINUE
                setPointer([guessCount + 1, 0]); 
            }
        }
        else if (e.code === 'Backspace') {
            // Handle BACKSPACE key press
        }
    }

    return(
        <>
            <div>Wordle</div>
            <div className="grid grid-flow-col grid-rows-6 gap-4">
                {/* when ENTER is pressed, call function that updates each row */}
                {Array.from({ length: 36 }, (_, index) => (
                    <div id={`cell-${index}`} key={index}>{index}</div>
                ))}
            </div>
            <input 
                type="text" 
                value={value} 
                onKeyDown={handleKeyDown} 
                placeholder="Type only letters..." 
            />
        </>
    )
}

export default Wordle
