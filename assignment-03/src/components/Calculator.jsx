import {useEffect, useState} from 'react';
import Display from './Display';
import Button from './Button';
import { calculatorButtons } from '../data/calculator-bonus-03-button-data';
import '../assets/styles/App.css';

const calculateResult = (pendingCalculation) => {
    try {
        const adjustedCalculation = pendingCalculation.replace(/--/g, '+');
        const calculate = new Function('return ' + adjustedCalculation);
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
                if(memory !== null){
                    const memoryValue = parseFloat(memory);
                    const inputValue = parseFloat(input);
                    if (!isNaN(inputValue)){
                        const newInput = memoryValue + inputValue;
                        setInput(String(newInput));
                    }
                }
                break;
                case 'Memory Subtract':
                    if (memory !== null) {
                        const memoryValue = parseFloat(memory);
                        const inputValue = parseFloat(input);
                        console.log('Memory:', memoryValue, 'Input:', inputValue);
                        if (!isNaN(inputValue)) {
                            const newInput = inputValue -memoryValue;
                         
                            setInput(String(newInput));
                        }
                    }
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
                setResult('');
               
                break;
            case '.': 
                // Decimal point
                if (!hasDecimal) {
                    setInput((prevInput) => prevInput + value);
                }
                break;
            
            case "+/-":
                // Sign key
                setInput((prevInput) => {
                    if (prevInput === '' || prevInput === '-') {
                        // If input is empty or already negative, just add a minus sign
                        return '-';
                    }
            
                    // Split the input by operator signs
                    const inputParts = prevInput.split(/([+\-*/])/);
            
                    // Find the last numeric part in the input
                    let lastNumericPartIndex = -1;
                    for (let i = inputParts.length - 1; i >= 0; i--) {
                        if (!isNaN(parseFloat(inputParts[i]))) {
                            lastNumericPartIndex = i;
                            break;
                        }
                    }
            
                    // Toggle the sign of the last numeric part
                    if (lastNumericPartIndex !== -1) {
                        const lastNumericPart = inputParts[lastNumericPartIndex];
                        const toggledNumericPart = lastNumericPart[0] === '-' ? lastNumericPart.slice(1) : '-' + lastNumericPart;
                        inputParts[lastNumericPartIndex] = toggledNumericPart;
                    }
            
                    // Join the parts back into a single string
                    const updatedInput = inputParts.join('');
            
                    return updatedInput;
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
               if (pendingCalculation === ''){
                setInput((prevInput) => prevInput + value);
               } else {
                setInput(value);
                setPendingCalculation('');
               }
               setResult('');
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