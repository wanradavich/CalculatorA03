import {useEffect, useState} from 'react';
import Display from './Display';
import Button from './Button';
import { calculatorButtons } from '../data/calculator-base-button-data';
import '../assets/styles/App.css';

const calculateResult = (pendingCalculation) => {
    try {
        const calculate = new Function('return ' + pendingCalculation);
        return String(calculate());
    } catch (error) {
        console.error('Calculation error: ', error);
        return 'Error';
    }
};

const Calculator = () => {
    const [input, setInput] = useState('');
    const [pendingCalculation, setPendingCalculation] = useState('');
    const [result, setResult] = useState('');
    // const [memory, setMemory] = useState(null);

    const isOperator = (value) => {
        return ['+', '-', '*', '/'].includes(value);
    }

    const handleButtonClick = (value) => {
        console.log('Button clicked: ', value);

        // Memory Store
        // if(value === "MS"){
        //     setMemory(input || result || null);
            //Memory Recall
        // } else if ( value === "MR"){
        //     if (memory !== null){
        //         setInput(memory);
        //     }
        // }

        // Clear all
        if (value === 'All Clear') {
            console.log('Clearing all...');
            setInput('');
            setPendingCalculation('');
            setResult('');
            // setMemory(null);
            
        // Clear current input
        } else if (value === 'Clear') {
            console.log("clear...")
            setInput((prevInput) => prevInput.slice(0, -1));
        // Perform calculation
        } else if (value === '=') {
            if (isOperator(input.charAt(input.length - 1))) {
                setInput((prevInput) => prevInput.slice(0, -1));
            }
            setPendingCalculation(input);
            setInput('');
            // const newResult = calculateResult();
            // setInput(newResult);
            // setResult('');
        // Append numeric or operator value to input
        } else {
            // Check if the display needs to be cleared (result is currently displayed)
            if (result !== '') {
                if (isOperator(value)) {
                    // If the next button clicked is an operator, start a new calculation
                    setInput(result + value);
                    setResult(''); // Clear the previous result
                } else {
                    setInput(value); // Otherwise start a new equation
                    setResult('');  // Clear the previous result                  
                }
            } else {
                setInput((prevInput) => prevInput + value);
            }
            // setPendingCalculation((prevPending) => prevPending + input + value);
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

    useEffect(() => {
        if (pendingCalculation !== '') {
            const newResult = calculateResult(pendingCalculation);
            setResult(newResult);
            setPendingCalculation('');
        }
    }, [pendingCalculation]);

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