class Calculator {
    constructor(previousTextEle , currentTextEle)
    {
        this.previousTextEle=previousTextEle;
        this.currentTextEle= currentTextEle;
        this.clear();
    }

clear(){
  this.currentOperand = '';
  this.previousOperand = '';
  this.operation = undefined;
}

delete(){
 this.currentOperand = this.currentOperand.toString().slice(0,-1);
}


appendNumber(number){
    if(number==='.' && this.currentOperand.includes('.')) return ;
  this.currentOperand += number.toString();
}

chooseOperation(operation){
    if(this.currentOperand==='') return;
    if(this.previousOperand!==''){
        this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
}

compute(){
  let computation;
  const prev = parseFloat(this.previousOperand);
  const current = parseFloat(this.currentOperand);
  if(isNaN(prev) || isNaN(current)) return;
  if(this.operation == '+')
  {
    computation = prev + current;
  }
  else if(this.operation == '-')
  {
    computation = prev - current;
  }
  else if(this.operation == '*')
  {
    computation = prev * current;
  }
  else if(this.operation == '÷')
  {
    computation = prev / current;
  }
  else{
    return;
  }

  this.currentOperand=computation;
  this.operation=undefined;
  this.previousOperand='';

}

updateDisplay(){
  this.currentTextEle.innerText = this.currentOperand;
  if(this.operation!= null)
  {
    this.previousTextEle.innerText=`${this.previousOperand} ${this.operation} ${this.currentOperand}`
  }
  else
  this.previousTextEle.innerText ='';
}





}



// here storing the value of respective classes
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousTextEle = document.querySelector("[data-previous-operand]");
const currentTextEle = document.querySelector("[data-current-operand]");


const calculator = new Calculator(previousTextEle , currentTextEle);


// for buttons
numberButtons.forEach((button)=>{

    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })

})

// for operations
operationButtons.forEach((button)=>{

    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })

})

// equal to button
equalsButton.addEventListener("click",(button)=>{
    calculator.compute();
    calculator.updateDisplay();
})


//clear button
allClearButton.addEventListener("click",(button)=>{
    calculator.clear();
    calculator.updateDisplay();
})



// delete button   (last element got deleted)
deleteButton.addEventListener("click",(button)=>{
    calculator.delete();
    calculator.updateDisplay();
})
