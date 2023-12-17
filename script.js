function showmenu(i) {
    $(`#selector #drop-${i}-content`).show();
}
function chordsChooser(i) {
    if (i == "Major" || i == "Minor") $("#dropbtn-minor").text(i);
    else $("#dropbtn-note").text(i);
}
$(function () {
    var $win = $(window),
        $box = $("#selector button"),
        $menu = $("#selector .dropdown-content");

    $win.on("click", function (event) {
        if (!$box.is(event.target)) {
            $menu.hide();
        }
    });
});
function convToDec(char) {
    if (!isNaN(char)) return char;

    var charCodeOfG = "G".charCodeAt(0);
    var charCode = char.charCodeAt(0);

    var decimalValue = charCode - charCodeOfG + 16;
    return decimalValue;
}
function convert(str) {
    var res = str.toUpperCase().split("");
    res.forEach((s, i) => {
        if(s != "X" && s != "O") res[i] = convToDec(s);
    })
    
    return res.join("-");
}
fetch("./chords/C/major.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        // console.log(data['positions']);
        $("#nov").text(
            `Hiện có tất cả ${data["positions"].length} version hợp âm C Major`
        );
        data["positions"].forEach((e, i) => {
            var checked = "",
                capo = e["capo"];
            if (capo) {
                checked = 'checked = ""';
                capo = e["barres"];
            }
            var frets = convert(e["frets"]), fingers = convert(e["fingers"]);
            $("#list-chord").append(`
            <div class="row mt-3">
                <b>${i + 1}.</b><hr>
                <div class="col-4 offset-2">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Frets</span>
                        <input type="text" class="form-control" value="${
                            frets
                        }" aria-label="Username" aria-describedby="addon-wrapping">
                        
                    </div>
                    <div class="input-group mt-1 flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Finger</span>
                        <input type="text" class="form-control" value="${
                            fingers
                        }" aria-label="Username" aria-describedby="addon-wrapping">
                    </div>
                    <div class="input-group mt-1">
                        <div class="input-group-text">
                            Capo:
                            <input class="form-check-input mt-0" ${checked} type="checkbox" value="" aria-label="Checkbox for following text input">
                        </div>
                        <input type="number" value="${capo}" class="form-control" aria-label="Text input with checkbox">
                    </div>
                </div>
                <div class="col-3">
                    <img src="https://chordgenerator.net/C.png?p=${frets}&s=3"/>
                </div>
                <div id="control" class="col-1">
                    <a href="#"><img src="./img/up-arrow.png"/></a>
                    <a href="#"><img src="./img/down-arrow.png"/></a>
                    <a href="#"><img src="./img/delete.png"/></a>
                </div>
            </div>
            `);
            // console.log(e)
        });
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
    });
