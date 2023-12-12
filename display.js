    document.getElementById('audio').addEventListener('change', handleFile);

    function handleFile(event) {
      const file = event.target.files[0];
      if (!file) return;
      let tempURL = URL.createObjectURL(file).split("blob:");
      URL=`blob:${tempURL[1]}`;
      let play = document.querySelector('.play');
          play.innerHTML = `<audio id="selectedAudio" src=${URL.toString()} controls></audio>`;
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioElement = document.getElementById('selectedAudio');
      const reader = new FileReader();

      reader.onload = function (e) {
        const arrayBuffer = e.target.result;

        audioContext.decodeAudioData(arrayBuffer, function (buffer) {
          const duration = buffer.duration;
          const sampleRate = buffer.sampleRate;
          audioElement.play();

          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 2048; // Set the FFT size for frequency analysis

          const source = audioContext.createMediaElementSource(audioElement);
          source.connect(analyser);
          analyser.connect(audioContext.destination);

          visualizeFrequency(analyser);
        });
      };

      reader.readAsArrayBuffer(file);
    }

    const thisColor = {
      r: 0,
      g: 0,
      b: 0,
    }
    function visualizeFrequency(analyser) {
      // console.log("visualizeFrequency");
      const canvas = document.getElementById('frequencyCanvas');
      const ctx = canvas.getContext('2d');
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function draw() {
        // console.log("draw");

        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / bufferLength) * 5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] / 3;
          // console.log(color.current);
          // let colorFill = thisColor.current;
          // colorFill.split(",");
          // let newColor = `rgb,${(Number(barHeight)+100)},'50',${colorFill[2]}`;
          // console.log(newColor, colorFill);


          ctx.fillStyle = `rgb(${thisColor.r+barHeight-10}, ${thisColor.g+barHeight-10}, ${thisColor.b+barHeight-10})`;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          ctx.style = 'border: none';
          x += barWidth + 1;
        }

        requestAnimationFrame(draw);
      }

      draw();
    }

document.querySelector("#myRange").addEventListener('change',(e)=>{
  const color = e.target.value;
  thisColor.r = parseInt(color.substr(1,2), 16)
  thisColor.g = parseInt(color.substr(3,2), 16)
  thisColor.b = parseInt(color.substr(5,2), 16)
})

  