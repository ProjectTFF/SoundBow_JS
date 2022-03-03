const canvas = document.getElementById("SoundBowJS");
// const recordBtn = document.querySelector("button");
const recordBtn = document.getElementById("recordButton");

let recording = false;
let mediaRecorder;
let recordedChunks;

var cStream,
    aStream,
    vid,
    recorder,
    analyser,
    dataArray,
    bufferLength,
    chunks =[];

recordBtn.addEventListener("click", () => {
  recording = !recording;
    if(recording){
            recordBtn.textContent = "Stop";
            const stream = canvas.captureStream(30);
            mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm;codecs=vp9',
                // mimeType: 'video/mp4;codecs=avc1.4d002a',
                ignoreMutedMedia: true
            });
            recordedChunks = [];
            mediaRecorder.ondataavailable = e => {
                if(e.data.size > 0){
                    recordedChunks.push(e.data);
                }
            };
            mediaRecorder.start();
        } else {
            recordBtn.textContent = "Record"
            mediaRecorder.stop();
            setTimeout(() => {
                const blob = new Blob(recordedChunks, {
                    type: "video/webm"
                    // type: "video/mp4"
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "recording.webm";
                a.click();
                URL.revokeObjectURL(url);
            },0);
        }
});