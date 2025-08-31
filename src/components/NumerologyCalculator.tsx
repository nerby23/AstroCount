import { useState } from 'react';
import { calculateKarmicNumber, calculateLifeAttitudeNumber, calculateLifePathNumber } from '../utils/numerologyCalculator';

interface Results {
    karmicNumber: { full: number; reduced: number } | null;
    lifeAttitudeNumber: { full: number; reduced: number } | null;
    lifePathNumber: { number: number; isMasterNumber: boolean } | null;
}

const NumerologyCalculator = () => {
    const [birthdate, setBirthdate] = useState('');
    const [results, setResults] = useState<Results>({
        karmicNumber: null,
        lifeAttitudeNumber: null,
        lifePathNumber: null
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Parse the date string directly to avoid timezone issues
        const [year, month, day] = birthdate.split('-').map(Number);

        setResults({
            karmicNumber: calculateKarmicNumber(day),
            lifeAttitudeNumber: calculateLifeAttitudeNumber(month, day),
            lifePathNumber: calculateLifePathNumber(year, month, day)
        });
    };

    return (
        <div className="calculator-container">
            <h1>AstroCount Numerology Calculator</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="birthdate">Enter your birthdate: </label>
                    <input
                        type="date"
                        id="birthdate"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Calculate</button>
            </form>

            {results.karmicNumber && (
                <div className="results">
                    <h2>Your Numbers</h2>
                    <p>Karmic Number: {
                        results.karmicNumber.full === results.karmicNumber.reduced 
                            ? results.karmicNumber.full 
                            : `${results.karmicNumber.full}/${results.karmicNumber.reduced}`
                    }</p>
                    <p>Life Attitude Number: {
                        results.lifeAttitudeNumber && (
                            results.lifeAttitudeNumber.full === results.lifeAttitudeNumber.reduced
                                ? results.lifeAttitudeNumber.full
                                : `${results.lifeAttitudeNumber.full}/${results.lifeAttitudeNumber.reduced}`
                        )
                    }</p>
                    <p>Life Path Number: {results.lifePathNumber?.number}
                        {results.lifePathNumber?.isMasterNumber && 
                            <span className="master-number"> (Master Number)</span>
                        }
                    </p>
                </div>
            )}
        </div>
    );
};

export default NumerologyCalculator;
