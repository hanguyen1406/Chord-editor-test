var noc = 0;

function showmenu(i) {
    $(`#selector #drop-${i}-content`).show();
}
function chordsChooser(i) {
    if (i == "major" || i == "minor") $("#dropbtn-minor").text(i);
    else $("#dropbtn-note").text(i);
    changeNewData();
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
        if (s != "X" && s != "O") res[i] = convToDec(s);
    });

    return res.join("-");
}
function getData(note, tone) {
    $("#list-chord").text("");
    var a = "";
    if (note[1] == "#") a = "sharp";
    fetch(`./chords/${note[0] + a}/${tone}.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            // console.log(data['positions']);
            noc = data["positions"].length;
            $("#nov").text(
                `Hiện có tất cả ${noc} version hợp âm ${note} ${tone}`
            );
            data["positions"].forEach((e, i) => {
                var checked = "",
                    capo = e["capo"];
                if (capo) {
                    checked = 'checked = ""';
                    capo = e["barres"];
                }
                var frets = convert(e["frets"]),
                    fingers = convert(e["fingers"]);
                var chordName = tone == "minor" ? note + "minor" : note;
                chordName = chordName.replace("#", "%23");
                console.log(chordName);
                $("#list-chord").append(`
                <div id="chord-${i}" class="row mt-3">
                <b>${i + 1}.</b>
                <div onchange="onChangeData(${i})" class="col-4 offset-2">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Frets</span>
                        <input type="text" class="form-control fret" value="${frets}">
                    </div>
                    <div class="input-group mt-1 flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Finger</span>
                        <input type="text" class="form-control finger" value="${fingers}">
                    </div>
                    <div class="input-group mt-1">
                        <div class="input-group-text">
                            Capo:
                            <input class="form-check-input mt-0" ${checked} type="checkbox" value="">
                        </div>
                        <input type="number" value="${capo}" class="form-control">
                    </div>
                </div>
                <div class="col-3">
                    <img id="chord" src='https://chordgenerator.net/${chordName}.png?p=${frets}&s=3'/>
                </div>
                <div id="control" class="col-1">
                    <a onclick="swUp(${i})"><img src="./img/up-arrow.png"/></a>
                    <a onclick="swDown(${i})"><img src="./img/down-arrow.png"/></a>
                    <a onclick="deleteChord(${i})"><img src="./img/delete.png"/></a>
                </div>
            </div>
            `);
                // console.log(e)
            });
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
}

function onChangeData(i) {
    var fret = $(`#chord-${i} #fret`).val();
    var src = $(`#chord-${i} #chord`).attr("src").split("p=");
    src[1] = "p=" + fret + "&s=3";
    console.log(src.join(""));
    $(`#chord-${i} #chord`).attr("src", src.join(""));
}
function solve(str, i, j) {
    res = "";
    str.split('"').forEach((e) => {
        // console.log(e);
        res += e.replace(`(${i})`, `(${j})`) + '"';
    });
    return res.slice(0, -1);
}

function swUp(i) {
    if (i > 0) {
        var chord0 = $(`#chord-${i - 1}`).html();
        chord0 = solve(chord0, i - 1, i);
        $(`#chord-${i - 1}`).html(solve($(`#chord-${i}`).html(), i, i - 1));
        $(`#chord-${i}`).html(chord0);
    }
}
function swDown(i) {
    if (i < noc - 1) {
        var chord0 = $(`#chord-${i + 1}`).html();
        chord0 = solve(chord0, i + 1, i);
        $(`#chord-${i + 1}`).html(solve($(`#chord-${i}`).html(), i, i + 1));
        $(`#chord-${i}`).html(chord0);
    }
}
function deleteChord(i) {
    // console.log(i);
    alert(`Chắn chắn xóa version: ${i + 1}`);
    $(`#chord-${i}`).remove();
}
function changeNewData() {
    getData($("#dropbtn-note").text().replace(/\s+/g, ' ').trim(), $("#dropbtn-minor").text().replace(/\s+/g, ' ').trim());
}
changeNewData();

function save() {
    console.log($('.fret'))
}
