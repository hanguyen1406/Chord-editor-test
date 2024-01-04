<?php
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

$file = 'chords/'.$data['key'].'/'.$data['suffix'].'.json';
// $file = '../chords1/chords/'.$data['key'].'/'.$data['suffix'].'.json';
$res = file_put_contents($file, json_encode($data));

if($res != false) {
    echo $file;

}else {
   echo "Lỗi!";
}
?>
