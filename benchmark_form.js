// Add a category dropdown to the benchmark form. Use pure JS to add the dropdown.
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('benchmark_form');
    const categoryDropdown = document.createElement('select');
    const fileDropdown = document.createElement('select');
    categoryDropdown.name = 'category';
    categoryDropdown.id = 'category';
    fileDropdown.name = 'file';
    fileDropdown.id = 'file';

    categories.forEach(function(category) {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });
// When a category is selected, the file dropdown should be populated with the files in that category.
    categoryDropdown.addEventListener('change', function() {
        const category = categoryDropdown.value;
        fileDropdown.innerHTML = '';
        categoryDict[category].forEach(function(file) {
            const option = document.createElement('option');
            option.value = file;
            option.textContent = file;
            fileDropdown.appendChild(option);
        });
        updateAudioFiles();
    });
    // When a file is selected, the audio elements should be updated
    fileDropdown.addEventListener('change', updateAudioFiles);
    form.appendChild(categoryDropdown);
    form.appendChild(fileDropdown);
    updateAudioFiles();


});

function updateAudioFiles() {
    const fileDropdown = document.getElementById('file');
    const file = fileDropdown.value;
    const audioDiv = document.getElementById('audio_files');
    // remove all children
    audioDiv.innerHTML = '';

    for (const benchmark in masterDict[file]) {
        const d = document.createElement('div');
        const audio = document.createElement('audio');
        const label = document.createElement('label');
        label.textContent = benchmark;
        label.htmlFor = benchmark;
        d.appendChild(label);

        audio.id = benchmark;
        audio.controls = true;
        audio.src = getAudioFilePath(benchmark, file);


        // vertically align the label and audio element in the div
        d.style.display = 'flex';
        d.style.alignItems = 'center';


        d.appendChild(audio);
        // get the Wacc score from the masterDict
        const wacc = masterDict[file][benchmark]['WAcc'];
        // change to a percentage, with no decimal places
        const waccPercent = Math.round(wacc * 100);

        // add the WAcc score to the div, formatted as percentage
        const wAcc = document.createElement('p');
        wAcc.textContent = `WAcc: ${waccPercent}%`;
        d.appendChild(wAcc);

        // Add the transcript to the div
        const transcript = document.createElement('p');
        transcript.textContent = masterDict[file][benchmark]['transcript'];
        d.appendChild(transcript);

        // set the width of the label to 300px
        label.style.width = '400px';
        // set the width of the audio element to 300px
        audio.style.width = '300px';
        // set the width of the Transcript to 100%
        transcript.style.width = '100%';
        // set the transcript to word-wrap
        transcript.style.wordWrap = 'break-word';

        // set the margin of all elements to 5px
        d.style.margin = '5px';
        // set the padding of all elements to 5px
        d.style.padding = '5px';
        // set the border of the div 1px solid black
        d.style.border = '1px solid black';

        audioDiv.appendChild(d);

    }
}
function getAudioFilePath(benchmark, file) {
    const dictEntry = masterDict[file][benchmark];
    const category = dictEntry['category'];
    return `benchmark/output_files/${benchmark}/${category}/audio/${file}`;
    // e.g. benchmark/output_files/demucs_340/crowd/audio/cambridge_pub_recording_060723_183053.wav

}
