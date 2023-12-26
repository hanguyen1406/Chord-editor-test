<?php
// Get the JSON data sent from JavaScript
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// Save data to a JSON file (for example, chords.json)
$file = 'chords/'.$data['key'].'/'.$data['suffix'].'.json';
// $file = 'chords/'.$data['key'].'/'.$data['suffix'].'.json';
file_put_contents($file, json_encode($data));

echo $file;
?>
