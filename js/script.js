const reqBill = document.querySelector('#bill');
const allPercentage= document.querySelectorAll(".btn-percentage");
const customPercentage=document.querySelector("#custom");
const numberOfPeople= document.querySelector("#number")
const total = document.querySelector(".response-total-amount");;
const resetBtn = document.querySelector(".btn-reset");
const tipAmount = document.querySelector(".response-tip-amount");
const alert = document.createElement("div");
let savedValue;
let customValue;
// as soon as the form loads focus only on reqBill, all other functions are disabled
reqBill.focus();
for(let percentage of allPercentage){
    percentage.disabled =true;
}
numberOfPeople.disabled=true;
resetBtn.disabled=true;
customPercentage.disabled=true;

//first fill out reqBill, once the input is filled up, buttons are enabled, once the button is clicked..
reqBill.addEventListener("input", isEmptyReqBill);
function isEmptyReqBill(){
    if(reqBill.value=="" || reqBill.value==0){
        alert.classList.add("alert");
        alert.textContent="Can't be zero or empty"
        alert.style.color = "red";
        reqBill.style.borderColor="hsl(0,67%,45)";
        numberOfPeople.style.borderColor="grey";
        reqBill.insertAdjacentElement("beforebegin",alert);
        reqBill.value="";
        reqBill.focus();
        for(let percentage of allPercentage){
            percentage.disabled=true;
        }
        numberOfPeople.disabled=true;
        customPercentage.disabled=true;
        resetBtn.disabled=true;
        total.innerText="$0.00";
        tipAmount.innerText="$0.00";
        return;
    }else{
        for(let percentage of allPercentage){
            percentage.disabled=false;
        }
        reqBill.style.borderColor="hsl(172,67%,45%)";
        customPercentage.disabled=false;
        resetBtn.disabled=false;
        alert.classList.remove("alert");
        alert.textContent=  "";
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
//... this function runs, enables input numberOfPeople and runs function isEmptyInputNumberOfPeople
for(let percentage of allPercentage){
    percentage.addEventListener("click",toggleBtn);
}
//runs when custom percentage input is clicked
customPercentage.addEventListener("click",function(){
    for(let percentage of allPercentage){
        percentage.classList.remove("toggle");
    }
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
        this.select();
    }
}
// function that toggles buttons
function toggleBtn(){
    for(let percentage of allPercentage){
        percentage.classList.remove("toggle");
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
    }
    this.classList.add("toggle");
}


//function if the input number of people is empty
function isEmptyInputNumberOfPeople(){
    if(numberOfPeople.value==="" || numberOfPeople.value ===0 || numberOfPeople.length<=0){
        alert.classList.add("alert");
        alert.textContent="Can't be zero "
        // alert.textContent="hsl(0,67%,45%)";
        numberOfPeople.style.color="red";
        numberOfPeople.insertAdjacentElement("beforebegin",alert);
        numberOfPeople.value="";
        numberOfPeople.focus();
        total.innerText="$0.00";
        tipAmount.innerText="$0.00";
        return
    }else{
        numberOfPeople.style.borderColor="hsl(172,67%,45%)";
        alert.classList.remove("alert");
        alert.textContent="";
        getResponse();
    }
}
numberOfPeople.addEventListener("click",function(){
    numberOfPeople.select();
    numberOfPeople.addEventListener("input",getResultCustom)
})

//get the result from percentage buttons
function getResponse(){
    let totalPerson = ((Number(reqBill.value) + ((reqBill.value * Number(savedValue)) / 100)) / numberOfPeople.value);
    total.innerText = `$${(totalPerson.toFixed(2))}`;
    let totalTipAmount = ((reqBill.value * savedValue) / 100) / numberOfPeople.value;
    tipAmount.innerText = `$${(totalTipAmount.toFixed(2))}`;
    if (total.value = 0) {
        total.innerText = "$0.00";
    } else if (tipAmount.value = 0) {
        tipAmount.innerText = "$0.00";
    }
}
// get the result from Custom input
function getResultCustom(){
    let totalPersonCustom = ((Number(inputBill.value) + ((reqBill.value * customValue) / 100)) / Number(numberOfPeople.value));
    total.innerText = `$${(Number(totalPersonCustom.toFixed(2)))}`;

    let totalTipAmountCustom = ((reqBill.value * customValue) / 100) / Number(numberOfPeople.value);
    tipAmount.innerText = `$${(Number(totalTipAmountCustom.toFixed(2)))}`;
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
    for(let percentage of allPercentage){
        percentage.classList.remove("toggle");
        percentage.disabled=true;
    }
    customPercentage.disabled=true;
    numberOfPeople.disabled=true;
    numberOfPeople.value="";
    total.textContent="$0.00";
    tipAmount.textContent="$0.00"
}