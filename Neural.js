enemyData = {x:0, vx:0 , y:0, vy:0};
time = Date();
d_time = Date(0);
input_n = [0,0,0];
output_n = [0,0,0];
neurons = [];
n_rows = 3;
n_colums = 2;
currentNeuron = [];
size = 50;
d_size = Math.sqrt((2 * (size * size)));
max_speed = 1000000;
max_turn = 1;
sound = null;
window.onload = load;
var song = new Audio("Song.mp3");
song.loop = true;
scale = 5;
var particles = [];
var e = 0;
song.volume = 0;
var best_vel = 0;
var mult_x = 1;
var mult_y = 1;

function load(){
    sound = document.getElementById("hit");

}

function start() {
    setInterval(Tick,1);
    song.play();
}


function createNeurons() {
    for(c = 0; c < n_colums; n++){
        for(r = 0; r < n_rows; r++){
            if(c == 0){
                for(i = 0; i < 3; i++){
                }
            }else{

            }
        }
    }
}

function Tick(){
    time = Date.UTC;
    enemyAI();
}


function enemyAI(){

    enemyData.vx += ((Math.random() - 0.5) * max_turn);
    enemyData.vy += ((Math.random() - 0.5) * max_turn);
    var total_vel = Math.floor(Math.abs(enemyData.vx) + Math.abs(enemyData.vy))


    if (Math.abs(enemyData.vx) > max_speed) {
        enemyData.vx = (enemyData.vx / enemyData.vx) * max_speed;
    }

    if (Math.abs(enemyData.vy) > max_speed) {
        enemyData.vy = (enemyData.vy / enemyData.vy) * max_speed;
    }

    if (Math.abs(enemyData.x + enemyData.vx) + (d_size / scale) < (window.innerWidth / 2) * scale) {
        enemyData.x += enemyData.vx * mult_x;
    } else {
        mult_x = -mult_x;
        enemyData.x += enemyData.vx * mult_x;
        var audio = new Audio("Wine Glass Shatter.mp3")
        audio.volume = 0.2;
        audio.currentTime = 0.2;
        audio.play();
    }

    if (Math.abs(enemyData.y + enemyData.vy) + (d_size / scale) < (window.innerHeight / 2) * scale) {
        enemyData.y += enemyData.vy * mult_y;
    } else {
        mult_y = -mult_y;
        enemyData.y += enemyData.vy * mult_y;
        var audio = new Audio("Wine Glass Shatter.mp3")
        audio.volume = 0.2;
        audio.currentTime = 0.2;
        audio.play();
    }



    if(total_vel > 10){
        song.volume = Math.min((total_vel - 10) / 100, 1);
        e += 1;
        if(e > 20){
            document.getElementById(String(e - 20)).remove();
        }

        particles[e] = document.createElement("div");
        particles[e].setAttribute("id", String(e));
        particles[e].setAttribute("class", "trail");
        particles[e].style.position = "absolute"
        particles[e].style.bottom = "calc(" + String((enemyData.y - size) / scale) + "px" + " +" + " 50vh)";
        particles[e].style.left = "calc(" + String((enemyData.x - size) / scale) + "px" + " +" + " 50vw)";
        particles[e].style.backgroundColor = "blue";
        particles[e].style.width = String(50 / scale) + "px";
        particles[e].style.height = String(100 / scale) + "px";
        document.getElementById("velocity").innerHTML = String(Math.floor(total_vel)) + " mph";
        document.body.appendChild(particles[e]);
    }
    


    if(Math.floor(total_vel) > best_vel){
        best_vel = total_vel;
        document.getElementById("best").innerHTML = "best: " + String(Math.floor(total_vel)) + " mph";
    }
    document.getElementById("enemy").style.bottom = "calc(" + String((enemyData.y - size) / scale) + "px" + " +" + " 50vh)";
    document.getElementById("enemy").style.left = "calc(" + String((enemyData.x - size) / scale) + "px" + " +" + " 50vw)";
    document.getElementById("enemy").style.rotate = String(Math.atan((enemyData.vx * mult_x) / (enemyData.vy * mult_y)) * 57.2958) + "deg";
    document.getElementById("enemy").style.width = String(100 / scale) + "px";
    document.getElementById("enemy").style.height = String(100 / scale) + "px";
    document.getElementById("enemy").style.backgroundSize = String(100 / scale) + "px " + String(100 / scale) + "px"
}