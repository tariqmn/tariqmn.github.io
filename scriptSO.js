
var questionsCounter = 1;
var result; // quiz result
var correctAnswerCounter = 0;
var isCorrectSwitch = false; // to decide if isCorrect() working or not. Used mainly to prevent enable it more than once in each quiz.


var firstOpMin;
var firstOpMax;
var secondOpMin;
var secondOpMax;


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }



String.prototype.toIndiaDigits= function(){
var id= ['۰','۱','۲','۳','٤','٥','٦','۷','۸','۹'];
return this.replace(/[0-9]/g, function(w){
    return id[+w]
});
}


function shuffle(array) {
let currentIndex = array.length,  randomIndex;

// While there remain elements to shuffle.
while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
    array[randomIndex], array[currentIndex]];
}

return array;
}




function equationGenerator(firstOp = getRndInteger(firstOpMin, firstOpMax),
                            secondOp = getRndInteger(secondOpMin, firstOp),
                             result = getRndInteger(0, secondOpMax)){  
 while (firstOp - secondOp != result){
    firstOp = getRndInteger(firstOpMin, firstOpMax);
    secondOp = getRndInteger(secondOpMin, firstOp);
 }

 return [firstOp, secondOp, result]
}



function choicesGenerator(result, 
                        firstC = getRndInteger(result - 5, result + 5),
                        secondC = getRndInteger(result - 5, result + 5)){  
    while (firstC == result || firstC < 0){
       firstC = getRndInteger(result - 5, result + 5);
    }
   
    while (secondC == result || secondC < 0 || secondC == firstC){
       secondC = getRndInteger(result - 5, result + 5);
    }

    return [firstC, secondC]
   
   }




function quiz(){

    document.getElementById("C1").style.backgroundColor = "#ddd";
    document.getElementById("C2").style.backgroundColor = "#ddd";
    document.getElementById("C3").style.backgroundColor = "#ddd";
    document.getElementById("next").style.visibility = "hidden";


    if (questionsCounter == 1){
        firstOpMin = 0;
        firstOpMax = 5;
        secondOpMin = 0;
        secondOpMax = 5;
    }

    if (questionsCounter == 5){
        firstOpMin = 0;
        firstOpMax = 9;
        secondOpMin = 0;
        secondOpMax = 9;
    }


    isCorrectSwitch = true;
    var [_firstOp, _secondOp, _result] = equationGenerator()
    /*document.getElementById("questions").innerHTML = (_firstOp +  "-" + _secondOp).toIndiaDigits();*/
    
    document.getElementById("num1").innerHTML = (_firstOp + "").toIndiaDigits();;
    document.getElementById("OP").innerHTML = "-"
    document.getElementById("num2").innerHTML = (_secondOp + "").toIndiaDigits();

    resultAssigner(result)
    var [_firstC, _secondC] = choicesGenerator(result = _result)
    let answers = [_result, _firstC, _secondC]
    answers = shuffle(answers)

    document.getElementById("C1").innerHTML = (answers[0] + "").toIndiaDigits();
    document.getElementById("C1").value = answers[0];

    document.getElementById("C2").innerHTML = (answers[1] + "").toIndiaDigits();
    document.getElementById("C2").value = answers[1];

    document.getElementById("C3").innerHTML = (answers[2] + "").toIndiaDigits();
    document.getElementById("C3").value = answers[2];

    questionsCounter++;
}


function resultAssigner(res){
    result = res;
}



function isCorrect(choice){

    if (isCorrectSwitch == true){
        a = document.getElementById(choice).value;
        if (a == result){
            document.getElementById(choice).style.backgroundColor = "green";
            correctAnswerCounter++;
        }

        else{
            document.getElementById(choice).style.backgroundColor = "red";

            if(document.getElementById("C1").value == result){
                document.getElementById("C1").style.backgroundColor = "green";
            }

            if(document.getElementById("C2").value == result){
                document.getElementById("C2").style.backgroundColor = "green";
            }

            if(document.getElementById("C3").value == result){
                document.getElementById("C3").style.backgroundColor = "green";
            }
        }

        isCorrectSwitch = false;
    }

    document.getElementById("next").style.visibility = "visible";


}


function popup(){
    document.getElementById("score").innerHTML = ("لقد أحرزت " + correctAnswerCounter + " من " + (questionsCounter - 1)).toIndiaDigits();
    document.getElementById("myForm").style.display = "block";
    saveResult();
}



function next(){
    if(questionsCounter <= 10){
        quiz()
    }
    else{
        popup()
    }
}



function saveResult(){
    const storedSubOnesRes = localStorage.getItem("subOnesArray");
    let subOnesRes = JSON.parse(storedSubOnesRes) || [];
    subOnesRes[subOnesRes.length - 1] = correctAnswerCounter;
    updatedStoredSubOnesRes = JSON.stringify(subOnesRes);
    localStorage.setItem("subOnesArray", updatedStoredSubOnesRes);
}

document.getElementById("C1").style.color = "black";
document.getElementById("C2").style.color = "black";
document.getElementById("C3").style.color = "black";

quiz()

