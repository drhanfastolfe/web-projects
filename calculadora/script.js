class Calculator
{
    constructor(prevOperand, currOperand)
    {
        this.prevOperandEl = prevOperand;
        this.currOperandEl = currOperand;
        this.clear();
    }

    clear()
    {
        this.prevOperand = '';
        this.currOperand = '';
        this.operation = undefined;
    }

    delete()
    {
        this.currOperand = this.currOperand.slice(0, -1);
    }

    appendNumber(number)
    {
        if (!(number === '.' && this.currOperand.includes('.')))
        {
            this.currOperand += number;
        }
    }

    chooseOperation(operator)
    {
        if (this.currOperand != '')
        {
            if (this.prevOperand != '' && this.currOperand != '')
            {
                this.compute();    
            }
            else
            {
                this.prevOperand = this.currOperand;
                this.currOperand = '';
            }
        }
        this.operation = operator;
    }

    compute(equals=false)
    {
        let result;
        let prev = parseFloat(this.prevOperand);
        let curr = parseFloat(this.currOperand);

        if (this.prevOperand != '' && this.currOperand != '')
        {    
            switch (this.operation)
            {
                case '+':
                    result = prev + curr;
                    break;
                case '-':
                    result = prev - curr;
                    break;
                case '*':
                    result = prev * curr;
                    break;
                case '÷':
                    result = prev / curr;
                    break;
                default:
                    break;
            }
        }

        if (equals)
        {
            this.currOperand = result.toString();
            this.prevOperand = '';    
        }
        else
        {
            this.prevOperand =  result.toString();
            this.currOperand = '';
        }
    }

    betterDisplay()
    {
        let stringOperator = '';
        
        if (this.prevOperand != '' && this.operation != undefined)
        {
            stringOperator = ' ' + this.operation;
        }

        return stringOperator;
    }

    updateDisplay()
    {
        this.prevOperandEl.textContent = this.prevOperand + this.betterDisplay();
        this.currOperandEl.textContent = this.currOperand;
    }
}


const numbers = document.querySelectorAll('[data-num]');
const operators = document.querySelectorAll('[data-operators]');
const del = document.querySelector('[data-del]');
const ac = document.querySelector('[data-ac]');
const equals = document.querySelector('[data-equals]');
const prevOperand = document.querySelector('[data-last]');
const currOperand = document.querySelector('[data-actual]');

const calculator = new Calculator(prevOperand, currOperand);

numbers.forEach(number =>
{
    number.addEventListener('click', () =>
    {
        calculator.appendNumber(number.textContent);
        calculator.updateDisplay();
    })
})

ac.addEventListener('click', () =>
{
    calculator.clear();
    calculator.updateDisplay();
});

del.addEventListener('click', () =>
{
    calculator.delete();
    calculator.updateDisplay();
})

operators.forEach(operator =>
{
    operator.addEventListener('click', () =>
    {
        calculator.chooseOperation(operator.textContent);
        calculator.updateDisplay();
    })
})

equals.addEventListener('click', () =>
{
    calculator.compute(true);
    calculator.updateDisplay();
})