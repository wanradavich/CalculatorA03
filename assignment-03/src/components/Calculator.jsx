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
            handleClearAll();
        // Clear current input
        } else if (value === 'C') {
            handleClear();
            // setInput((prevInput) => prevInput.slice(0, -1));
        // Perform calculation
        } else if (value === '=') {
            handleEqual();
            // if (isOperator(input.charAt(input.length - 1))) {
            //     setInput((prevInput) => prevInput.slice(0, -1));
            // }
            // const newResult = calculateResult();
            // setInput(newResult);
            // setPendingCalculation('');
            // setResult('');
        // Append numeric or operator value to input
        } else {
            setInput((prevInput) => prevInput + value);
            setPendingCalculation((prevPending) => prevPending + value);
        }
        
        console.log('Input after handling click: ', input);
        console.log('Pending Calculation: ', pendingCalculation);
        console.log('Result: ', result);
    };

    // const handleClear = () => {
    //     setInput((prevInput) => {
    //         const newInput = prevInput.slice(0, -1);
    //         if (isOperator(input.charAt(input.length - 1))) {
    //             setPendingCalculation((prevPending) => prevPending.slice(0, -1));
    //         }
    //         setResult('');
    //         return newInput;
    //     });
    // };

    const handleClear = () => {
        setInput((prevInput) => prevInput.slice(0, -1));
    };

    const handleClearAll = () => {
        setInput('');
        setPendingCalculation('');
        setResult('');
    };

    const handleEqual = () => {
        if (isOperator(input.charAt(input.length - 1))) {
            setInput((prevInput) => prevInput.slice(0, -1));
        }
        const newResult = calculateResult();
        setInput(newResult);
        setPendingCalculation('');
        setResult('');
    }

    useEffect(() => {
        if (isOperator(input.charAt(input.length - 1))) {
            setPendingCalculation((prevPending) => prevPending.slice(0, -1));
        }
        setResult('');
    }, [input]);

    const calculateResult = () => {
        try {
            const calculate = new Function('return ' + input);
            return String(calculate());       
        } catch (error) {
            // Handle any calculation errors here
            console.error('Calculation error: ', error);
            return 'Error';
        }
    };

    return (
        <div className="calculator">
            <Display input={input} result={result} />
            <div className="button-grid">
                {calculatorButtons.map((button) => (
                    <Button
                        key={button.className}
                        label={button.text}
                        onClick={() => handleButtonClick(button.value)}
                        style={button.style}
                    />
                ))}
            </div>
        </div>
    );
};

export default Calculator;