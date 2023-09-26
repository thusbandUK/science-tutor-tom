//downloads answers from local storage
       
const selectedAnswers = JSON.parse(localStorage.harvestedData);

//downloads identifier code and whether or not it was passed via a personalised link (ie params)

const codeObject = JSON.parse(localStorage.identifierCode);
const code = codeObject.code ? codeObject.code : "Error: Code not logged";
const params = codeObject.params ? codeObject.params : false;

//writes identifier code to hidden contact form field

document.getElementById("identifier").value = code;

//hides contact form if identification passed via personalised link (ie params)
/*
This is to discourage students I already work with from thinking they need to fill in the contact form when
I will have told them the identifier code already in the personalised link
*/

if (params){          
  document.getElementById("health-check-contact-form-container").hidden = true;
}

//disables all the checks and radios so that users can't change the answers they originally submitted

function disableChecksAndRadios(){

Object.keys(selectedAnswers).forEach((x) => {
[1,2,3,4,5,6].forEach((y) => {
    var element = document.getElementById(`Q${x}-option${y}`);
    if (!element){
        return;
    }
    return element.setAttribute("disabled", "true") ;
})
return;

})

}

//calls function to disable checks and radios (see above);

disableChecksAndRadios()

//harvests their submitted answers to recheck all the radios and checkboxes they checked when they submitted their answers

function checkBox(id) {

var x = document.getElementById(id);
//alert(x.getAttribute("disabled"));
x.setAttribute("checked", "true");
//alert(x.getAttribute("disabled"));
}

function recheckSelectedAnswers(object){
const keysAsArray = Object.keys(object);
//console.log(keysAsArray);
highestNumber = keysAsArray.length;
for (let x = 1; x <= highestNumber; x++){
//console.log(object[x]);
if (typeof object[x] === 'object'){
    //console.log('twas an array');
    object[x].forEach((y) =>{
        //console.log(y);
        checkBox(y);
    })
    
} else {
checkBox(object[x]);
}
}
}

//calls above function with selected answers downloaded from local storage

recheckSelectedAnswers(selectedAnswers);

//This is an object composed of the correct answers for comparision

const correctAnswers = {
1: ['Q1-option2', 'Q1-option3', 'Q1-option4'], //correct
2: 'Q2-option4', //correct
3: 'Q3-option4', //correct
4: 'Q4-option2', //correct
5: ['Q5-option2', 'Q5-option4'], //correct
6: 'Q6-option1', //correct
7: ['Q7-option3', 'Q7-option4'], //correct
8: 'Q8-option4',  //correct
9: ['Q9-option1', 'Q9-option2', 'Q9-option3', 'Q9-option5'], //correct
10: 'Q10-option1',  //correct
11: 'Q11-option3' //correct
};



//This function, used by the one below, puts a red box around incorrect answers and a yellow box around correct answers

function decoration(id, boolean){
element = document.getElementById(id);
//console.log(element);

element.style.padding = "15px";
if (boolean){
element.style.border = "3px solid yellow";
//console.log(`${id} is correct`);
} else {
element.style.border = "3px solid red";
//console.log(`${id} is incorrect`);
}
}

//this object contains the feedback to assign for each question

const comments = {
"question-1": "the meaning of ionic bonding and or understanding of the structure",
"question-2": "how chemical equilibria respond to changes in temperature",
"question-3": "how organic reaction mechanisms work",
"question-4": "calculating enthalpy values using Hess cycles",
"question-5": "identifying intermolecular forces and reasoning about how they affect boiling points",
"question-6": "identifying oxidising agents and reducing agents",
"question-7": "reasoning about covalent bonding and its role in the melting point of giant covalent substances",
"question-8": "oxidation of alcohols and or understanding that more than one part of a molecule may react in the same reaction",
"question-9": "identifying polar molecules and correctly justifying choices",
"question-10": "titration calculations",
"question-11": "naming organic compounds"
}

//This function organises feedback

function feedback(id, boolean){
if (boolean){
document.getElementById(`${id}-positive-feedback`).innerHTML = comments[id];
} else {
document.getElementById(`${id}-negative-feedback`).innerHTML = comments[id];
}
}

//This function compiles correct and incorrect answers and then calls decoration and feedback functions

function compile(id, boolean){
decoration(id, boolean);
feedback(id, boolean);
}

//This function compares the selected answers to the correct answers

function checkAnswers(selectedAnswers){
for (let d=1; d<12; d++){        
if (typeof selectedAnswers[d] === 'object'){
    if (selectedAnswers[d].length !== correctAnswers[d].length){
        
        compile(`question-${d}`, false);
    } else {
        let booleanArray = [];
        for (let e=0; e<selectedAnswers[d].length; e++){
            if (selectedAnswers[d][e] !== correctAnswers[d][e]){
                booleanArray.push('false');                        
            } else {
                booleanArray.push('true');                        
            }                     
        }
        if (booleanArray.every((g) => g !== 'false')){
          compile(`question-${d}`, true);
        } else {
          compile(`question-${d}`, false);
        }
    }
} else {
    if (correctAnswers[d] === selectedAnswers[d]){                
      compile(`question-${d}`, true);
    } else {                
      compile(`question-${d}`, false);
    }
}
}        
}

//this calls the above function with the selected answers

checkAnswers(selectedAnswers);