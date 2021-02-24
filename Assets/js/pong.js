$("#btnMover").unbind().click(function () {
    Init();
});

window.addEventListener('mousemove', function() {
    mousePosX = event.clientX;
    if (mousePosX >= 445)
        mousePosX = 445;
});

function Init() {
    $("#btnMover").attr('disabled', true);
    move($("#elemento"), $("#paddle"), $("#score span"), $("#win"), 0.1);
};

function move(elem, barra, score, win, duracao) {
    // Contador do placar
    var countScore = 0;
    // Sinal da soma x
    var signLeft = 1;
    // Sinal da y
    var signTop = 1;
    // Sinal da x
    var signBarra = 1;
    // valor da posição a esquerda do elemento
    var left = 326;
    // valor da posição topo do elemento
    var top = 238;
    // função a ser chamada até chegar a posição informada
    function deslocamento() {
        // mudar o lado x
        if (left <= 0) {
            signLeft = 1;
        }
        if (left >= 575) {
            signLeft = 0;
        }
        // mudar o lado y
        if (top <= 0) {
            signTop = 1;
        }
        if (top >= 397 && mousePosX <= left && (mousePosX + 180) >= left) {
            signTop = 0;
            countScore++;
            score.text(countScore);
        }       
        // incrementando contador
        if (signLeft == 1 && signTop == 1) {
            left++;
            top++;
        } else if (signLeft == 1 && signTop == 0) {
            left++;
            top--;
        } else if (signLeft == 0 && signTop == 1) {
            left--;
            top++;
        } else if (signLeft == 0 && signTop == 0) {
            left--;
            top--;
        }
        // aplicando estilo no elemento
        elem.css("left", left + 'px');
        elem.css("top", top + 'px');
        barra.css("left", mousePosX + 'px');        
        // interrompe o processo de deslocamento 
        // You win
        if (countScore >= 10) {
            win.show();
            $("#btnMover").attr('disabled', false);
            clearInterval(id);
        }
        // Game over
        if (top >= 426) {
            $("#btnMover").attr('disabled', false);
            clearInterval(id);
        }
    }    
    // desloca o elemento até 10 segundos
    // aumentando o valor, vai demorar mais para chegar
    var id = setInterval(deslocamento, duracao);
}

      