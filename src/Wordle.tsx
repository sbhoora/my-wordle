import { useState, useEffect } from 'react';

function Wordle() {
    const [letters, setLetters] = useState(Array(36).fill(''));
    const [letterStatus, setLetterStatus] = useState(Array(36).fill(0)); // 0 = not guessed, 1 = correct, 2 = misplaced, 3 = incorrect
    const [guessCount, setGuessCount] = useState(0);

    // dictionary api to get random secretWord, and check if guess is a real word
    const secretWord = 'CREATE';

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Enter') {
                const startIndex = guessCount * 6;
                const currentGuess = letters.slice(startIndex, startIndex + 6).join('');
                console.log('Current guess:', currentGuess);

                if (currentGuess.length === 6) {
                    if (currentGuess === secretWord) {
                        alert('You guessed the word!');
                        setLetterStatus(prev => {
                            const newStatus = [...prev];
                            for (let i = 0; i < 6; i++) newStatus[startIndex + i] = 1;
                            return newStatus;
                        });
                        setGuessCount(6);
                        return;
                    } else if (guessCount >= 5) {
                        alert('Game over. The secret word was: ' + secretWord);
                    } else {
                        console.log('Incorrect guess. Try again.');

                        const rowStatuses = Array(6).fill(3);
                        const wordPool = [...secretWord];

                        for (let i = 0; i < 6; i++) {
                            if (currentGuess[i] === secretWord[i]) {
                                rowStatuses[i] = 1; 

                                const poolIndex = wordPool.indexOf(currentGuess[i]);
                                if (poolIndex !== -1) {
                                    wordPool.splice(poolIndex, 1);
                                }
                            }
                        }

                        for (let i = 0; i < 6; i++) {
                            if (rowStatuses[i] === 1) continue;

                            const poolIndex = wordPool.indexOf(currentGuess[i]);
                            if (poolIndex !== -1) {
                                rowStatuses[i] = 2; 
                                wordPool.splice(poolIndex, 1);
                            }
                        }

                        setLetterStatus(prev => {
                            const newStatus = [...prev];
                            for (let i = 0; i < 6; i++) {
                                newStatus[startIndex + i] = rowStatuses[i];
                            }
                            return newStatus;
                        });
                        setGuessCount(prev => prev + 1);
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
                        <div id={`cell-${index}`} key={index} className={`h-15 w-15 border-2 border-white/15  ${letterStatus[index] === 1 ? 'bg-green-500' : letterStatus[index] === 2 ? 'bg-yellow-500' : letterStatus[index] === 3 ? 'bg-gray-500' : 'bg-white/5'} text-white flex items-center justify-center font-bold text-2xl select-none`}>
                            {letter}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Wordle