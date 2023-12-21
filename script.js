var noc = 0,
    note = "C",
    minor = "major";
var sort = true;
function showmenu(i) {
    $(document).click();
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
        if (s != "X" && s != "0") res[i] = convToDec(s);
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
                $("#list-chord").append(`
                    <div class="row m-1 p-2 chord-v">
                        <div class="col-1">
                            <b class="num">${i+1}</b>
                        </div>
                        <div class="col-3">
                            <div class="input-group flex-nowrap">
                                <span class="input-group-text" id="addon-wrapping"><b>Frets:</b></span>
                                <input type="text" class="form-control">
                            </div>
                            <div class="input-group flex-nowrap">
                                <span class="input-group-text" id="addon-wrapping"><b>Fingers:</b></span>
                                <input type="text" class="form-control">
                            </div>
                            <div class="input-group flex-nowrap">
                                <span class="input-group-text" id="addon-wrapping"><b>Capo:</b></span>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="fretboard">
                                <div class="guitar-neck">
                                    <div class="fret first"></div>
                                    <div class="fret"></div>
                                    <div class="fret"></div>
                                    <div class="fret"></div>
                                    <div class="fret"></div>
                                    
                                    <ul class="strings">
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul>
                
                                    <ul class="open-notes">
                                        <li class="low-e">E</li>
                                        <li class="b">B</li>
                                        <li class="g">G</li>
                                        <li class="d">D</li>
                                        <li class="a">A</li>
                                        <li class="high-e">E</li>
                                    </ul>
                                    <div class="notes">
                                        <div class="mask low-e">
                                            <ul></ul>
                                        </div>
                                        <div class="mask a">
                                            <ul></ul>
                                        </div>
                                        <div class="mask d">
                                            <ul></ul>
                                        </div>
                                        <div class="mask g">
                                            <ul></ul>
                                        </div>
                                        <div class="mask b">
                                            <ul></ul>
                                        </div>
                                        <div class="mask high-e">
                                            <ul></ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-3">
                        <div class="fretboard">
                                <div class="guitar-neck">
                                    <div class="fret first"></div>
                                    <div class="fret"></div>
                                    <div class="fret"></div>
                                    <div class="fret"></div>
                                    <div class="fret"></div>
                                    
                                    <ul class="strings">
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul>
                
                                    <ul class="open-notes">
                                        <li class="low-e">E</li>
                                        <li class="b">B</li>
                                        <li class="g">G</li>
                                        <li class="d">D</li>
                                        <li class="a">A</li>
                                        <li class="high-e">E</li>
                                    </ul>
                                    <div class="notes">
                                        <div class="mask low-e">
                                            <ul></ul>
                                        </div>
                                        <div class="mask a">
                                            <ul></ul>
                                        </div>
                                        <div class="mask d">
                                            <ul></ul>
                                        </div>
                                        <div class="mask g">
                                            <ul></ul>
                                        </div>
                                        <div class="mask b">
                                            <ul></ul>
                                        </div>
                                        <div class="mask high-e">
                                            <ul></ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                                        
                    
                    </div>
                `);
                console.log(e);
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
    var fret = $(`#chord-${i} #fret-${i}`).val();
    var src = $(`#chord-${i} #chord-img`).attr("src").split("p=");
    src[1] = "p=" + fret + "&s=3";
    console.log(src.join(""));
    $(`#chord-${i} #chord-img`).attr("src", src.join(""));
}
function solve(str, i, j) {
    res = "";
    str.split('"').forEach((e) => {
        // console.log(e);
        res +=
            e
                .replace(`(${i})`, `(${j})`)
                .replace(`t-${i}`, `t-${j}`)
                .replace(`r-${i}`, `r-${j}`)
                .replace(`o-${i}`, `o-${j}`) + '"';
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
    sort = false;
}
function swDown(i) {
    if (i < noc - 1) {
        var chord0 = $(`#chord-${i + 1}`).html();
        chord0 = solve(chord0, i + 1, i);
        $(`#chord-${i + 1}`).html(solve($(`#chord-${i}`).html(), i, i + 1));
        $(`#chord-${i}`).html(chord0);
    }
    sort = false;
}
function deleteChord(i) {
    // console.log(i);
    if (i < noc - 1) alert("Chỉ xóa được hợp âm cuối!");
    else if (sort) {
        var result = window.confirm(`Chắn chắn xóa version: ${i + 1}`);
        if (result === true) {
            $(`#chord-${i}`).remove();
        }
        noc--;
    } else {
        alert("Cần reload lại trang để xóa!");
        $("#save").click();
    }
}
function changeNewData() {
    note = $("#dropbtn-note").text().replace(/\s+/g, " ").trim();
    minor = $("#dropbtn-minor").text().replace(/\s+/g, " ").trim();
    getData(note, minor);
}
changeNewData();

function convToHex(decimal) {
    if (decimal >= 0 && decimal <= 9) {
        return decimal.toString();
    } else {
        return String.fromCharCode(decimal + 55);
    }
}
// for (var i = 0; i < 25; i++) {
//     console.log(convToHex(i));
// }
function save() {
    // console.log($('.fret')[0])
    var res = {
        key: note,
        suffix: minor,
        positions: [],
    };
    for (let i = 0; i < noc; i++) {
        var p = { frets: "", fingers: "" };
        $("#fret-" + i)
            .val()
            .split("-")
            .forEach((i) => {
                if (i != "X") p.frets += convToHex(Number(i)).toLowerCase();
                else p.frets += "x";
            });
        $("#finger-" + i)
            .val()
            .split("-")
            .forEach((i) => {
                p.fingers += convToHex(Number(i));
            });
        var capo = $("#capo-" + i).val();
        if (capo) {
            p.capo = "true";
            p.barres = capo;
        }
        res.positions.push(p);
    }
    // console.log(res);
    //save to sever
    // URL of the PHP script
    var url = "saveChord.php";

    // Fetch request configuration
    var requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(res),
    };
    // Send the data to the server using fetch
    fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text(); // Parse the response body as JSON
        })
        .then((data) => {
            if (data == "1") {
                alert("Lưu thành công, reload lại trang");
                location.reload(true);
            }
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
            // Handle errors here
        });
}
