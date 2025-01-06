Directory structure:
category - the "use case"
   audio - wav files we want toget metrics for. ".wav" suffix
   transcript - the ground truth transcripts for the audio - matching basename, with ".txt" suffix
   metrics - contains the metrics for the directory as a single .yaml file
      transcript - the generated transcripts, one per audio, when the metric was calculated


