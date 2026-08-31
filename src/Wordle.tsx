import { useState, useEffect } from 'react';

function Wordle() {
    // keep track of correctly placed, misplaced, and incorrect letters
    const [letters, setLetters] = useState(Array(36).fill(''));
    const [guessCount, setGuessCount] = useState(0);
    const secretWord = 'SHUBHI';

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Enter') {
                const currentGuess = letters.slice(guessCount * 6, guessCount * 6 + 6).join('');
                console.log('Current guess:', currentGuess);
                if (currentGuess.length === 6) {
                    if (currentGuess === secretWord) {
                        console.log('You guessed the word!');
                    } else {
                        console.log('Incorrect guess. Try again.');
                    }
                    setGuessCount(prev => {
                        const nextGuess = prev + 1;
                        return nextGuess;
                    }); 
                }
            } else {
                setLetters((prevLetters) => {
                    const newLetters = [...prevLetters];
                    const index = newLetters.findIndex(item => item === '');
                    if (e.key === 'Backspace' && index > guessCount * 6 && index <= guessCount * 6 + 6) {
                        newLetters[index-1] = '';
                    } else if (index <= guessCount * 6 + 5 && e.key.match(/[a-z]/i)) {
                        newLetters[index] = e.key.toUpperCase();
                    }
                    return newLetters;
                }); 
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [guessCount, letters]);

    return(
        <>
            <div>Wordle</div>
            <div className="grid grid-cols-6 gap-4">
                {letters.map((letter, index) => (
                    <div id={`cell-${index}`} key={index}>{letter}</div>
                ))}
            </div>
        </>
    )
}

export default Wordle