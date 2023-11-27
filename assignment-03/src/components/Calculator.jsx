import {useEffect, useState} from 'react';
import Display from './Display';
import Button from './Button';
import { calculatorButtons } from '../data/calculator-bonus-03-button-data';
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
    const [memory, setMemory] = useState(null);
   

    const isOperator = (value) => {
        return ['+', '-', '*', '/'].includes(value);
    }

    const handleButtonClick = (value) => {
        console.log('Button clicked: ', value);

        let hasDecimal = false; // Flag to track if the current operand contains a decimal point
        for (let i = input.length - 1; i >= 0; i--) {
            const char = input[i];
            if (['+', '-', '*', '/'].includes(char)) {
                // When an operator is reached, break the loop
                break;
            } else if (char === '.') {
                hasDecimal = true;
                break;
            }
        }

        switch (value) {
            case 'Memory Save': {
                // Memory save
                const memoryValueToSave = input || result || null;
                console.log('Memory saved check: ', memoryValueToSave); // MS console check
                setMemory(input || result || null);
                setInput('');
                break;
            }
            case 'Memory Recall':
                // Memory recall
                if (memory !== null) {
                    console.log('Memory recalled check: ', memory); // MR console check
                    setInput(memory);
                }
                break;
            case 'Memory Clear':
                // Memory clear
                setMemory(null);
                setInput('');
                setResult('');
                break;
            case 'Memory Addition':
                // Memory addition - to be added
                console.log('Memory Addition to be added');
                break;
            case 'Memory Subtract':
                // Memory subtraction - to be added
                console.log('Memory Subtract to be added');
                break;
            case 'All Clear':
                // Clear all
                console.log('Clearing all...');
                setInput('');
                setPendingCalculation('');
                setResult('');
                break;
            case 'Clear':
                // Clear current input
                console.log('Clear...');
                setInput((prevInput) => prevInput.slice(0, -1));
                break;
            case '=': 
                // Perform calculation
                if (isOperator(input.charAt(input.length - 1))) {
                    setInput((prevInput) => prevInput.slice(0, -1));
                }
                setPendingCalculation(input);
                setInput('');
                break;
            case '.': 
                // Decimal point
                if (!hasDecimal) {
                    setInput((prevInput) => prevInput + value);
                }
                break;
            
            case "+/-":
                // Sign key
                setInput((prevInput) =>{
                    const firstChar = prevInput.charAt(0);
                    if(firstChar === '-'){
                        console.log('this hit a negative number')
                        return prevInput.slice(1)
                    } else if (firstChar !== '0' && !isNaN(firstChar)){
                        console.log('this hit a non negative number')
                        return '-' + prevInput;
                    }
                    return prevInput;
                });
                break;
            case "Percent":
                //percent sign operation
                if (!isNaN(input) && input !== ''){
                    setInput(String(parseFloat(input)/100));
                } else {
                    setInput('Error: Percent sign operation');
                }
                break;
            case "Square Root":
                //square root sign operation
                if (parseFloat(input) >= 0){
                    setInput(String(Math.sqrt(parseFloat(input))));
                } else {
                    setInput('Error');
                }
                break;
            
            default:
                // Append numeric or operator value to input
                if (result !== '') {
                    if (isOperator(value)) {
                        setInput(result + value);
                        setResult('');
                    } else {
                        setInput(value);
                        setResult('');
                    }
                } else {
                    setInput((prevInput) => prevInput + value);
                }
                break;
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