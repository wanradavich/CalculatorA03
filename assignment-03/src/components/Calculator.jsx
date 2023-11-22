import {useEffect, useState} from 'react';
import Display from './Display';
import Button from './Button';
import { calculatorButtons } from '../data/calculator-base-button-data';
import '../assets/styles/App.css';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [pendingCalculation, setPendingCalculation] = useState('');
    const [result, setResult] = useState('');

    const isOperator = (value) => {
        return ['+', '-', '*', '/'].includes(value);
    }

    const handleButtonClick = (value) => {
        console.log('Button clicked: ', value);

        // Clear all
        if (value === 'AC') {
            setInput('');
            setPendingCalculation('');
            setResult('');
        // Clear current input
        } else if (value === 'C') {
            setInput((prevInput) => prevInput.slice(0, -1));
        // Perform calculation
        } else if (value === '=') {
            if (isOperator(input.charAt(input.length - 1))) {
                setInput((prevInput) => prevInput.slice(0, -1));
            }
            const newResult = calculateResult();
            setInput(newResult);
            setPendingCalculation('');
            setResult('');
        // Append numeric or operator value to input
        } else {
            setInput((prevInput) => prevInput + value);
            setPendingCalculation((prevPending) => prevPending + input + value);
        }
        console.log('Input after handling click: ', input);
        console.log('Pending Calculation: ', pendingCalculation);
        console.log('Result: ', result);
    };

    useEffect(() => {
        // Logic to run after input state is updated
        if (input === 'Error') {
            // Handle error state if needed
            console.error('Calculation error: Input is in an error state');
            // Reset the error state
            setInput('');
        }
    }, [input]);

    const calculateResult = () => {
        try {
            const calculate = new Function('return ' + pendingCalculation + input);
            return String(calculate())        
        } catch (error) {
            // Handle any calculation errors here
            console.error('Calculation error: ', error);
            return 'Error';
        }
    };

    return (
        <div className="calculator">
            <Display input={input} result={result} />
            {calculatorButtons.map((button) => (
                <Button key={button.className} label={button.text} onClick={() => handleButtonClick(button.value)} />
            ))}
        </div>
    );
};

export default Calculator;