import { useState, useEffect } from 'react';

function Wordle() {
    const [letters, setLetters] = useState(Array(36).fill(''));
    const [guessCount, setGuessCount] = useState(0);

    // dictionary api to get random secretWord, and check if guess is a real word
    const secretWord = 'SHUBHI';

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Enter') {
                const currentGuess = letters.slice(guessCount * 6, guessCount * 6 + 6).join('');
                console.log('Current guess:', currentGuess);
                if (currentGuess.length === 6) {
                    if (currentGuess === secretWord) {
                        // end game early if the guess is correct
                        alert('You guessed the word!');
                        setGuessCount(() => {
                            const nextGuess = 6;
                            return nextGuess;
                        });
                    } else {
                        if (guessCount >= 5) {
                            alert('Game over. The secret word was: ' + secretWord);
                        } else {
                            console.log('Incorrect guess. Try again.');
                            // keep track of correctly placed, misplaced, and incorrect letters
                        }
                        setGuessCount(prev => {
                            const nextGuess = prev + 1;
                            return nextGuess;
                        });
                    }
                }
            } else if (guessCount < 6) {
                setLetters((prevLetters) => {
                    const newLetters = [...prevLetters];
                    const index = newLetters.findIndex(item => item === '');
                    if (e.key === 'Backspace' && index > guessCount * 6 && index <= guessCount * 6 + 6) {
                        newLetters[index - 1] = '';
                    } else if (index <= guessCount * 6 + 5 && e.key.match(/^[a-z]$/i)) {
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
    }, [guessCount, letters]); // Dependancy Array to re-run useEffect when guessCount or letters change

    return (
        <>
            <div className="text-4xl text-sky-400 font-bold mb-4 pt-4">Wordle</div>
            <div className="items-center flex flex-col">
                {/* add tile effects when ENTER is pressed and when a letter is typed */}
                <div className="grid grid-cols-6 gap-x-1 gap-y-3 w-full max-w-sm">
                    {letters.map((letter, index) => (
                        <div id={`cell-${index}`} key={index} className="h-15 w-15 border-2 border-white/15  bg-white/5 text-white flex items-center justify-center font-bold text-2xl select-none">
                            {letter}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Wordle