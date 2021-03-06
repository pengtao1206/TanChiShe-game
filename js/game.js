/**
 * Created by 彭韬 on 2017/6/13.
 */
/*
    TODO 蛇移动总方法
 */
var t;
var lastSnack = new SNACK();
var delay = 200;
var score = 0;

function move() {
    $.each(snackArr, function(index, elem) {
        if (index == 0) {
            lastSnack.direction = elem.direction;
            lastSnack.leftCoor = elem.leftCoor;
            lastSnack.topCoor = elem.topCoor;
        }
        // 如果蛇头过渡结束，执行 move 函数
        if (index == (snackArr.length - 1) && elem.tsend == 0) {
            elem.snack[0].addEventListener('transitionend', transitionEnd);
            elem.tsend++;
        }
        elem.move();


        if (snackArr[index + 1]) {
            elem.direction = snackArr[index + 1].direction;
        } else {
            if (checkSnackDie(elem)) {
                //alert('game over!!!');
                status = 'die';
                elem.snack[0].removeEventListener('transitionend', transitionEnd);
                gameover();
                return false;
            } else {
                if (checkIsEat(elem)) {
                    play();
                    snackAdd();
                    showFood();
                    while (checkCoorRepeat(food, snackArr)) {
                        showFood();
                    }
                    scoreUpdate();
                }
            }
            updateDelay();
            //t = setTimeout(move, delay);
        }
    });
}

$(document).keydown(function(event) {
    if (status == 'die') {
        return;
    }
    switch (event.keyCode) {
        case 37: //left
        case 65:
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (snackArr[snackArr.length - 1].direction == 'right' || snackArr[snackArr.length - 2].direction == 'right' || status == 'pause') {
                return;
            }
            snackArr[snackArr.length - 1].direction = 'left';
            break;
        case 38: //top
        case 87:
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (snackArr[snackArr.length - 1].direction == 'bottom' || snackArr[snackArr.length - 2].direction == 'bottom' || status == 'pause') {
                return;
            }
            snackArr[snackArr.length - 1].direction = 'top';
            break;
        case 39: //right
        case 68:
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (snackArr[snackArr.length - 1].direction == 'left' || snackArr[snackArr.length - 2].direction == 'left' || status == 'pause') {
                return;
            }
            snackArr[snackArr.length - 1].direction = 'right';
            break;
        case 40: //bottom
        case 83:
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (snackArr[snackArr.length - 1].direction == 'top' || snackArr[snackArr.length - 2].direction == 'top' || status == 'pause') {
                return;
            }
            snackArr[snackArr.length - 1].direction = 'bottom';
            break;
        case 32: //空格键
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (status == 'start') {
                pauseGame();
            } else if (status == 'pause') {
                continueGame();
            }
            break;
    }
    if ([37, 38, 39, 40, 65, 87, 83, 68].indexOf(event.keyCode) >= 0 && status == 'init') {
        status = 'start';
        move();
    }
});

function gameover() {
    alert("gameover!");
    $("#main").append("<div id='gameover' class='gameover'><p>本次得分</p><span>" + score + "</span><a href='javascript:newGame();' id='restartgamebutton'>Restart</a></div>");
    var gameover = $("#gameover");
    gameover.css("width", "300px");
    gameover.css("height", "300px");
    gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
}

function newGame() {
    if (t) {
        clearTimeout(t);
    }
    if ($('#gameover')) {
        $('#gameover').remove();
    }
    initScore();
    initDelay();
    initGame();
    status = 'init';
}