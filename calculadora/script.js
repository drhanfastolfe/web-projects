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
        //this.operation = undefined;
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
        switch (operator)
        {
            case '+':
                if (this.prevOperand !== '' && this.currOperand !== '')
                {
                    this.operation = parseFloat(this.prevOperand) + parseFloat(this.currOperand);
                    this.prevOperand = this.operation.toString();
                    this.currOperand = '';
                }
                else
                {
                    if (this.currOperand !=='')
                    {
                        this.prevOperand = this.currOperand;
                        this.currOperand = '';    
                    }
                }
                break;
        
            default:
                break;
        }
    }

    updateDisplay()
    {
        this.prevOperandEl.textContent = this.prevOperand;
        this.currOperandEl.textContent = this.currOperand;
    }
}


const numbers = document.querySelectorAll('[data-num]');
const operators = document.querySelectorAll('[data-operators]');
const del = document.querySelector('[data-del]');
const ac = document.querySelector('[data-ac]');
const equals = document.querySelector('[data-equal]');
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