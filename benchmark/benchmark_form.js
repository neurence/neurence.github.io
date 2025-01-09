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
    // Add audio elements for every audio file


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

        audioDiv.appendChild(d);

    }
}
function getAudioFilePath(benchmark, file) {
    const dictEntry = masterDict[file][benchmark];
    const category = dictEntry['category'];
    return `output_files/${benchmark}/${category}/audio/${file}`;
    // e.g. benchmark/output_files/demucs_340/crowd/audio/cambridge_pub_recording_060723_183053.wav

}
