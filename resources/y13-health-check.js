//generates six-letter caps code if none entered
function generateSixLetterCode(){
    const alphabet  = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let nascentCode = [];
    for (let j=0; j<6; j++){
        let randomNumber = Math.floor(Math.random()*26);
        nascentCode.push(alphabet[randomNumber]);
    }    
    return nascentCode.join("");
}

//generates identifier object to be uploaded to localStorage

var identifierObject = {
  code: null,
  params: null
}

//autopopulates hidden identifier form field, either w query params or randomly generated

var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get("identifier");
if (c){
  //assigns form field value to be parse by Netlify
  document.getElementById('identifier').value = c;
    //configures object to be filed in local storage    
    identifierObject = {code: c, params: true};
} else {
  //assigns form field value to be parse by Netlify
  var generatedCode = generateSixLetterCode();
  document.getElementById('identifier').value = generatedCode;
  //configures object to be filed in local storage
  identifierObject = {code: generatedCode, params: false};
}

//uploads identifier code object to localStorage
//including code and whether or not the code was passed from personalised link (ie params)
localStorage.setItem("identifierCode", JSON.stringify(identifierObject));

//classifies questions as radio or check

const arrayRadio = [2,3,4,6,8,10,11];

const arrayCheck = [1,5,7,9];

//object to store all answers
let object = {1: "", 2: "", 3: "", 4: "", 5: ""};

//harvests answers from single option (radio) questions and stores in object
const radioHarvest = (inputArray) => {
    inputArray.forEach((x) => {
        var selectedRadio = document.querySelectorAll(`input[name=question-${x}]:checked`);
        var selectedRadioAnswer = selectedRadio[0] ? selectedRadio[0].id : 'no answer selected';        
        return object[x] = selectedRadioAnswer;
    })
}

//harvests answers from multi option (checkbox) questions and stores in object
const checkHarvest = (inputArray) => {
    inputArray.forEach((y) => {
        var selectedCheck = document.querySelectorAll(`input[name=question-${y}]:checked`);
        var selectedCheckLabels = [];        
        selectedCheck.forEach((z) => {            
            return selectedCheckLabels.push(z.id);
        })        
        return object[y] = (selectedCheckLabels.length === 0) ?  "No answers selected" : selectedCheckLabels;
    })
}

//When the user clicks submit, two thing happens, 1) the netlify host parses form data and saves in netlify console
//2) the below function uploads all the selected answers to localStorage, so that on the custom form accepted page,
//users can see which questions they got right or wrong

addEventListener("submit", (event) => {
  radioHarvest(arrayRadio);
checkHarvest(arrayCheck);
const identifierCode = document.getElementById('identifier').value;
localStorage.setItem("harvestedData", JSON.stringify(object));        
       });


