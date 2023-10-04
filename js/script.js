const questions = [
    {
      "question": "Essa bandeira é de qual País?",
      "answers": [
        {
          "img": "./images/argentina.jpg",
          "answer": "Argentina",
          "correct": true
        },
        {
          "answer": "Uruguai",
          "correct": false
        },
        {
          "answer": "França",
          "correct": false
        },
        {
          "answer": "Suíça",
          "correct": false
        },
      ]
    },
    {
        "question": "Qual Páis é o único penta Campeão Mundial?",
        "answers": [
          {            
            "answer": "Camarões",
            "correct": false
          },
          {
            "img": "./images/brasil.jpg",
            "answer": "Brasil",
            "correct": true
          },
          {
            "answer": "Chile",
            "correct": false
          },
          {
            "answer": "Lituania",
            "correct": false
          },
        ]
    },
    {
    "question": "Qual páis ganhou a Copa do Mundo no Brasil?",
    "answers": [
        {
        "answer": "Brasil",
        "correct": false
        },
        {
        "answer": "Bulgaria",
        "correct": false
        },
        {
        "answer": "Espanha",
        "correct": false
        },
        {
        "img": "./images/alemanha.png",
        "answer": "Alemanha",
        "correct": true
        },
    ]
    }
];

const answer = document.querySelector('#answer');
const containerCountry = document.querySelector('#container-country');
const scoreContainer = document.querySelector('.score-container');
const choiceCountry = document.querySelector('#choiceCountry');
const answerTemplate = document.querySelector('.answer-template');

let actual = 0;
let points = 0;
let errors = 0;

function init(){
    createQuestion(0);
}

function createQuestion(i){

    //Limmpa as perguntas anteriores
    const buttons = choiceCountry.querySelectorAll('button');
    buttons.forEach(function(btn){
        btn.remove();
    });

    //alterar o titulo da pergunta.
    const title = answer.querySelector('#title');
    title.textContent = questions[i].question;

    //insere as perguntas na tela.

    questions[i].answers.forEach(function(resposta){

        const respostaTemplate = answerTemplate.cloneNode('true');
        const respostaText = respostaTemplate.querySelector('.question-answer');
        respostaText.textContent = resposta['answer'];

        respostaTemplate.setAttribute('resposta-correta', resposta['correct']); 
        
        //Lista imagens        
        if( respostaTemplate.getAttribute('resposta-correta') === 'true' ){
            const brand = containerCountry.querySelector('#brand-country img');
            brand.setAttribute('src', resposta['img']);
        }

        respostaTemplate.classList.remove('hide');

        choiceCountry.appendChild(respostaTemplate);

        respostaTemplate.addEventListener('click', function(){
            checarResposta(this);
        });

    });

    actual++;

}

function checarResposta(btn){

    const buttons = choiceCountry.querySelectorAll('.answer-template');

    buttons.forEach(function(button){
        //Valida se for a resposta correta e add uma class   
        if( button.getAttribute('resposta-correta') === 'true' ){
            button.classList.add('correct-answer');
            
            if( btn === button ){    
                //se for correta            
                points++;
                const hits = containerCountry.querySelector('#hits span');
                hits.textContent = points;
            }else{
                //se for errada
                errors++;
                const mistakes = containerCountry.querySelector('#mistakes span');
                mistakes.textContent = errors;
            }
        }else{
            button.classList.add('wrong-answer');
        }

    });

    showRespostas();
}

function showRespostas(){

    setTimeout( () => {

        if( actual >= questions.length ){
            showSucessMessage();
            return false;
        }
        //Pula para a proxima pergunta
        createQuestion(actual);
    },1000);

}

function showSucessMessage(){
    
    scoreContainer.classList.toggle('hide');   

    //calcular a porcentagem de acertos
    const score = ((points / questions.length) * 100).toFixed(2);
    const percent = document.querySelector('#display-score span');
    percent.textContent = `${score}%`;
 
    
    //mensagem para cada resposta acertada
    let finish = document.querySelector('#finish');

    if( score > 50 ){
        finish.textContent = 'Parabéns!!!';
        percent.classList.add('nivel-alto');
    }else if( score <= 0 ){
        finish.textContent = 'Você não acertou nenhuma, tente novamente!';
        percent.classList.add('nivel-baixo');
    }else{
        finish.textContent = 'Seu aproveitamento foi abaixo de 50%';
        percent.classList.add('nivel-medio');
    }

    //Altera o texto da quantidade de acertos
    const correctAnswers = scoreContainer.querySelector('#correct-answers');
    correctAnswers.textContent = points;

    //Altera o texto da quantidade total de perguntas
    const questionsQty = scoreContainer.querySelector('#questions-qty');
    questionsQty.textContent = questions.length;
}

const restart = document.querySelector('#restart');
let acertos = document.querySelector('#hits .number');
let erros = document.querySelector('#mistakes .number');

restart.addEventListener('click', () => {
    actual = 0;
    points = 0;
    errors = 0;
    erros.textContent = 0;
    acertos.textContent = 0;
    scoreContainer.classList.toggle('hide'); 
    init();
});

init();