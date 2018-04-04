let counter = 1;
let current = 'timer1';
let timers = {
    timer1: { hour:0, min:5, sec:0, dir: 'down', state: 'stop'}
};

function start(timer){
    if(timers[timer].state == 'stop'){
        timers[timer].state = 'run';
        $(`#${timer} .start-btn`).empty().removeClass('start-btn').append('Stop').addClass('stop-btn');
        timers[timer].interval = setInterval(()=>{
        if(timers[timer].dir == 'down')
            countDown(timer)
        else countUp(timer)
        },1000);
    } else stop(timer);
}

function stop(timer){
    $(`#${timer} .stop-btn`).empty().addClass('start-btn').append('Start').removeClass('stop-btn');
    timers[timer].state = 'stop';
    clearInterval(timers[timer].interval);
}

function countDown(timer){
    if(timers[timer].sec == 0){
        if(timers[timer].min == 0){
            if(timers[timer].hour == 0){
                $(`#${timer} li`).css('color','red');
                timers[timer].dir = 'up';
                return countUp(timer);
            }
            else timers[timer].hour--;
            timers[timer].min = 59;
        }else timers[timer].min--;
        timers[timer].sec = 59;
    } else timers[timer].sec--;
    setTimer(timer)
}

function countUp(timer){
    if(timers[timer].sec == 59){
        timers[timer].sec = 0;
        if(timers[timer].min == 59){
            timers[timer].min = 0;
            timers[timer].hour++;
        }else timers[timer].min++;
    } else timers[timer].sec++;
    setTimer(timer)
}

function setTimer(timer){
    $(`#${timer} li.hour`).empty().append(timers[timer].hour);
    $(`#${timer} li.min`).empty().append(timers[timer].min);
    $(`#${timer} li.sec`).empty().append(timers[timer].sec);
}

function addCounter() {
    timers['timer'+ (++counter)] = { hour:0, min:5, sec:0, dir: 'down', state: 'stop' };
    $('body').append(`
    <div class="wrapper" id="timer${counter}">
        <input type="text" class="timer-title" placeholder="TITLE">
        <ul class="time">
            <li class="hour">0</li>
            <li>:</li>
            <li class="min">5</li>
            <li>:</li>
            <li class="sec">0</li>
        </ul>

        <button class="start-btn" onclick="start('timer${counter}')">
            Start
        </button>
        <button class="setting-btn" onclick="setting('timer${counter}')">
            Setting
        </button>
    </div>
    `);
}

function setting(timer){
    current = timer;
    stop(timer);
    $('.dimmer').css('display', 'inherit');
    $('.setting').css('display', 'inherit');
}

function cancle(){
    $('#hour').val('');
    $('#min').val('');
    $('#sec').val('');
    $('.dimmer').css('display', 'none');
    $('.setting').css('display', 'none');

}

function set(){
    timers[current].hour = $('#hour').val() || 0;
    timers[current].min = $('#min').val() || 0;
    timers[current].sec = $('#sec').val() || 0;

    $(`#${current} li`).css('color','black');
    timers[current].dir = 'down';
    
    $(`#${current} li.hour`).empty().append(timers[current].hour);
    $(`#${current} li.min`).empty().append(timers[current].min);
    $(`#${current} li.sec`).empty().append(timers[current].sec);
    cancle();
}