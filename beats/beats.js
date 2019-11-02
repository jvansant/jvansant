var hh, bass, sd, crash, floor;
var hhp, bassp, sdp, crashp, floorp;
var h = false,
    b = false,
    s = false,
    c = false,
    f = false;


var keya; //to find keycode

var recorder, mic, soundFile, recording, testRecording, recordText;

var osc;
var playing = false;

var menu = true,
    record = false,
    piano = false,
    drums = false;


function preload() {

    //loadSounds
    hh = loadSound("sounds/HH.mp3");
    bass = loadSound("sounds/BDS.mp3");
    sd = loadSound("sounds/SD.mp3");
    crash = loadSound("sounds/HH.mp3");
    floor = loadSound("sounds/BDL.mp3");


    //loadPics
    hhp = loadImage("pics/hihat.png");
    bassp = loadImage("pics/bass.png");
    sdp = loadImage("pics/snare.png");
    floorp = loadImage("pics/floor.png");
    crashp = loadImage("pics/crash.png");

    keya = "Key Code Here";
    recordText = "click to start recording";
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    //sound stuff
    mic = new p5.AudioIn();
    mic.start();
    mic.connect(); //enables playback of sound/mic input
    recorder = new p5.SoundRecorder();
    recorder.setInput();
    recording = false;
    testRecording = new p5.SoundFile();


    osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(329.628);
    osc.amp(0);
    osc.start();

    //notes.append(5);
}

function draw() {

    if (menu) {

        textAlign(CENTER);
        textSize(40);
        fill(0);
        text("Beat Maker 3000", windowWidth / 2, windowHeight / 2);




    }


    if (drums) {
        background(0, 255, 0);
        textSize(32);
        fill(0);
        text(keya, 200, 30);

        var vol = mic.getLevel(); //Draws audio/mic level
        ellipse(windowWidth / 2, windowHeight / 2, windowWidth, vol * 400);

        text(recordText, (windowWidth / 2) - 50, 200);

        if (h) {
            image(hhp, 200, 100);
        }
        if (b) {
            image(bassp, 200, 400);
        }
        if (s) {
            image(sdp, 700, 350);
        }
        if (f) {
            image(floorp, 400, 500)
        }
        if (c) {
            image(crashp, 400, 500)
        }

    }



}

function mousePressed() {


    if (drums) {
        if (!recording && mic.enabled) {
            recordText = "*recording*";
            recorder.record(testRecording);
            recording = true;

        } else if (recording) {
            recordText = "recording stopped";
            recorder.stop();
            recording = false;
        }
    }


}


function keyPressed() {
    //Function To find keyCode


    keya = "key: |" + key + "| (" + keyCode + ")";

    if (drums) {

        if (keyCode == 80) { //Must use keyCodes for specific keys
            hh.play();
            h = true;

        }
        if (keyCode == 79) {
            bass.play();
            b = true;

        }
        if (keyCode == 73) {
            sd.play();
            s = true;
        }
        if (keyCode == 85) {
            floor.play();
            f = true;
        }
        if (keyCode == 89) {
            crash.play();
            c = true;
        }

        if (keyCode == 76) {
            save(testRecording, 'recording.wav');
        }

        if (keyCode == 70) {
            if (!playing) {
                // ramp amplitude to 0.5 over 0.1 seconds
                osc.amp(0.5, 0.05);
                playing = true;
                backgroundColor = color(0, 255, 255);
            } else {
                // ramp amplitude to 0 over 0.5 seconds
                osc.amp(0, 0.5);
                playing = false;
                backgroundColor = color(255, 0, 255);
            }

        }
    }

    if (menu) {
        if (keyCode == 80) {
            menu = false;
            drums = true;
        }
    }

    if (piano) {
        if (!playing) {
            // ramp amplitude to 0.5 over 0.1 seconds
            osc.amp(0.5, 0.05);
            playing = true;
            backgroundColor = color(0, 255, 255);
        } else {
            // ramp amplitude to 0 over 0.5 seconds
            osc.amp(0, 0.5);
            playing = false;
            backgroundColor = color(255, 0, 255);
        }

    }




}


function keyReleased() {
    if (h) {
        h = false;
    }
    if (s) {
        s = false;
    }
    if (b) {
        b = false;
    }
    if (c) {
        c = false;
    }
    if (f) {
        f = false;
    }

}
