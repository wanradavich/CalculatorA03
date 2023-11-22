import React, {useState} from 'react';
import Display from './Display';
import Button from './Button';
import calculatorButtons from '../data/calculator-base-button-data';
import '../assets/styles/App.css';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [pendingCalculation, setPendingCalculation] = useState('');
    const [result, setResult] = useState('');

    const handleButtonClick = (value) => {
        // Clear all
        if (value === 'AC') {
            setInput('');
            setPendingCalculation('');
            setResult('');
        // Clear current input
        } else if (value === 'C') {
            setInput('');
        // Perform calculation
        } else if (value === '=') {
            const newResult = eval(pendingCalculation + input);
            setInput('');
            setPendingCalculation('');
            setResult(newResult);
        // Append numeric or operator value to input
        } else {
            setInput((prevInput) => prevInput + value);
            setPendingCalculation((prevPending) => prevPending + input + value);
        }
    };

    return (
        <div className="calculator">
            <Display input={input} result={result} />
            {calculatorButtons.map((button) => (
                <Button key={button.id} label={button.label} onClick={() => handleButtonClick(button.value)} />
            ))}
        </div>
    );
};

export default Calculator;