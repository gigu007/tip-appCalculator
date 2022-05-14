const reqBill = document.querySelector('#bill');
const allPercentage= document.querySelectorAll(".btn-percentage");
const customPercentage=document.querySelector("#custom");
const numberOfPeople= document.querySelector("#number")
const total = document.querySelector(".response-total-amount");;
const resetBtn = document.querySelector(".btn-reset");
const tipAmount = document.querySelector(".response-tip-amount");
const confirm = document.createElement("div");
let savedValue;
let customValue;
// as soon as the form loads focus only on reqBill, all other functions are disabled
reqBill.focus();

allPercentage.forEach(percentage=>{
    percentage.disabled=true;
})

numberOfPeople.disabled=true;
resetBtn.disabled=true;
customPercentage.disabled=true;

//first fill out reqBill, once the input is filled up, buttons are enabled, once the button is clicked..
reqBill.addEventListener("input", isEmptyReqBill);
function isEmptyReqBill(){
    if(reqBill.value=="" || reqBill.value==0){
        confirm.classList.add("confirm");
        confirm.textContent="Can't be zero, or empty"
        confirm.style.color = "red";
        confirm.style.marginTop="5px"
        reqBill.style.borderColor="red";
        // numberOfPeople.style.borderColor="grey";
        reqBill.insertAdjacentElement("afterend",confirm);
        reqBill.value="";
        reqBill.focus();
       
        allPercentage.forEach(percentage=>{
            percentage.disabled=true;
        })
        
        numberOfPeople.disabled=true;
        customPercentage.disabled=true;
        resetBtn.disabled=true;
        total.innerText="$0.00";
        tipAmount.innerText="$0.00";
        return;
    }else{
        
        allPercentage.forEach(percentage=>{
            percentage.disabled=false;
        })
        
        reqBill.style.borderColor="hsl(172,67%,45%)";
        customPercentage.disabled=false;
        resetBtn.disabled=false;
        confirm.classList.remove("confirm");
        confirm.textContent=  "";
        getResponse();
        if(numberOfPeople.value<1){
            total.innerText="$0.00";
            tipAmount.innerText="$0.00";
        }
        reqBill.addEventListener("click",function(){
            reqBill.style.borderColor="hsl(172,67%,45%)";
            reqBill.select();
        })
        return;
    }
}

allPercentage.forEach(percentage=>{
    percentage.addEventListener("click",toggleBtn);
})

//runs when custom percentage input is clicked
customPercentage.addEventListener("click",function(){
    
    allPercentage.forEach(percentage=>{
        percentage.classList.remove("toggle");
    })
    customPercentage.value="";
    customPercentage.focus();
    numberOfPeople.disabled=false;
    customPercentage.addEventListener("input",customPercent);
})

//function that validate custom percentage input
function customPercent(){
    let max = 100;
    let min=0;
    if(this.value<= 100 && this.value >0){
        customValue=Number(this.value);
        getResponse();
    }else if(this.value > max || this.value <=min){
        customPercentage.value="";
        confirm.textContent='input value from 1 to 100'
        confirm.style.color='red'
        customPercentage.insertAdjacentElement("afterend",confirm)
        customPercentage.style.borderColor='red';
        this.select();
    }
}
// function that toggles buttons
function toggleBtn(){
    
    allPercentage.forEach(percentage=>{
        percentage.classList.remove("toggle")
    })
        numberOfPeople.disabled=false;
        numberOfPeople.focus();
        numberOfPeople.addEventListener("input",isEmptyInputNumberOfPeople);
        savedValue=this.value;
        customPercentage.value="";
        getResponse();
        if(numberOfPeople.value<1){
            total.innerText="$0.00";
            tipAmount.innerText="$0.00";
        }
    // }
    this.classList.add("toggle");
}


//function if the input number of people is empty
function isEmptyInputNumberOfPeople(){
    if(numberOfPeople.value==="" || numberOfPeople.value ===0 || numberOfPeople.length<=0){
        confirm.classList.add("confirm");
        confirm.textContent="Can't be zero or empty"
        confirm.style.color="hsl(0,67%,45%)";
        numberOfPeople.style.color="blue";
        numberOfPeople.insertAdjacentElement("afterend",confirm);
        numberOfPeople.style.borderColor='red'
        numberOfPeople.value="";
        numberOfPeople.focus();
        total.innerText="$0.00";
        tipAmount.innerText="$0.00";
        return
    }else{
        numberOfPeople.style.borderColor="hsl(172,67%,45%)";
        confirm.classList.remove("confirm");
        confirm.textContent="";
        getResponse();
    }
}
numberOfPeople.addEventListener("click",function(){
    numberOfPeople.select();
    numberOfPeople.addEventListener("input",getResultCustom)
})

//get the result from percentage buttons
function getResponse(){
    
    let percentageValue =savedValue/100*reqBill.value
    let totalTipAmount=Number(reqBill.value) + percentageValue;
    let totalTipAmountPerPerson=totalTipAmount/numberOfPeople.value;
    total.innerText = `$${(totalTipAmountPerPerson.toFixed(2))}`;
    let tipAmountPerPerson=percentageValue/numberOfPeople.value
    // tipAmount.innerText = `$${(tipAmountPerPerson.toFixed(2))}`;
    tipAmount.innerText=tipAmountPerPerson.toFixed(2);
    if (total.value = 0) {
        total.innerText = "$0.00";
    } else if (tipAmount.value = 0) {
        tipAmount.innerText = "$0.00";
    }
}
// get the result from Custom input
function getResultCustom(){
    
   
    let customNetTip =customValue/100*reqBill.value
    let totalCustomTipAmount=Number(reqBill.value) + customNetTip;
    let totalTipAmountCustom=totalCustomTipAmount/numberOfPeople.value
    total.innerText = `$${(totalTipAmountCustom.toFixed(2))}`;
    let totalCustomTipAmountPerPerson=customNetTip/numberOfPeople.value;
    tipAmount.innerText = `$${(totalCustomTipAmountPerPerson.toFixed(2))}`;
    if (numberOfPeople.value < 1) {
        total.innerText = "$0.00";
        tipAmount.innerText = "$0.00";
    }
}

//reset all
resetBtn.addEventListener("click",reset);
function reset(){
    reqBill.value="";
    reqBill.focus();
   
    allPercentage.forEach(percentage=>{
           percentage.classList.remove("toggle")
             percentage.disabled=true
    
    })
    customPercentage.disabled=true;
    numberOfPeople.disabled=true;
    numberOfPeople.value="";
    total.textContent="$0.00";
    tipAmount.textContent="$0.00"
}