var noc = 0,
    note = "C",
    minor = "major";
var sort = true;
function showmenu(i) {
    $(document).click();
    $(`#selector #drop-${i}-content`).show();
}
function chordsChooser(i) {
    if (i == "major" || i == "minor") {
        $("#dropbtn-minor").text(i);
        minor = i;
    } else {
        $("#dropbtn-note").text(i);
        note = i;
    }
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
    // console.log(`chords/${note[0] + a}/${tone}.json`);
    fetch(`chords/${note[0] + a}/${tone}.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(async (data) => {
            // console.log(data['positions']);
            noc = data["positions"].length;
            barres = Array.from({ length: noc }).fill(0);
            $("#nov").text(
                `Hiện có tất cả ${noc} version hợp âm ${note} ${tone}`
            );
            // console.log(data);
            data["positions"].forEach(async (e, i) => {
                var capo = e["capo"] ? e["barres"] : "";

                await $("#list-chord").append(`
                    <div id="ver-${i}" class="row m-1 p-2 chord-v">
                        <div class="col-1">
                            <b class="num">${i + 1}</b>
                        </div>
                        <div class="col-3">
                            <div style="margin-top: 30px">
                                <div class="input-group flex-nowrap">
                                <span class="input-group-text" id="addon-wrapping"><b>Frets:</b></span>
                                <input id="input-fret" type="text" value="${convert(
                                    e.frets
                                )}" class="form-control">
                                </div>
                                <div class="input-group flex-nowrap">
                                    <span class="input-group-text" id="addon-wrapping"><b>Fingers:</b></span>
                                    <input id="input-finger" type="text" value="${convert(
                                        e.fingers
                                    )}" class="form-control">
                                </div>
                                <div class="input-group flex-nowrap">
                                    <span class="input-group-text" id="addon-wrapping"><b>Capo:</b></span>
                                    <input id="input-capo" type="number" value="${capo}" class="form-control">
                                </div>
                                <div class="d-grid gap-2 mt-2">
                                    <button onclick="swUp(${i})" class="btn btn-primary" type="button">Move up <img style="width:20px" src="img/up-arrow.png"/></button>
                                    <button onclick="swDown(${i})" class="btn btn-primary" type="button">Move down <img style="width:20px" src="img/down-arrow.png"/></button>
                                    <button onclick="deleteChord(${i})" class="btn btn-danger" type="button">Delete <img style="width:20px" src="img/delete.png"/></button>
                                    <button onclick="addChord(${i})" class="btn btn-success" type="button">Add chord <img style="width:20px" src="img/add.png"/></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div style="padding-left:50px; width: 307px" class="fretboard">
                                <div class="guitar-neck">
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
                                    <div id="notes-${i}" class="notes">
                                        <div id="barres"></div>
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
                                    <ul class="compartment-number"><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li><li>13</li><li>14</li><li>15</li><li>16</li><li>17</li><li>18</li><li>19</li><li>20</li><li>21</li><li>22</li><li>23</li><li>24</li></ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-3">
                        <div class="fretboard">
                                <div class="guitar-neck">
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
                                    <div id="red-dots-${i}" class="red-dots">
                                        <div class="red-dot low-e">
                                            <ul></ul>
                                        </div>
                                        <div class="red-dot a">
                                            <ul></ul>
                                        </div>
                                        <div class="red-dot d">
                                            <ul></ul>
                                        </div>
                                        <div class="red-dot g">
                                            <ul></ul>
                                        </div>
                                        <div class="red-dot b">
                                            <ul></ul>
                                        </div>
                                        <div class="red-dot high-e">
                                            <ul></ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
                // console.log(convert(e.fingers));
                $(`#ver-${i}`).on("change", async () => {
                    await hideChord(i);
                    await hideFinger(i);
                    updateChord(i);
                });
            });
            renderFret();
            await resetNote();
            await resetFinger();
            data["positions"].forEach(async (e, i) => {
                showChord(convert(e.frets), i, e.barres);
                showFinger(convert(e.frets), convert(e.fingers), i);
            });
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
}

function solve(str, i, j) {
    str = str.replace(`#ver-${i}`, `#ver-${j}`);
    str = str.replace(`swUp(${i})`, `swUp(${j})`);
    str = str.replace(`swDown(${i})`, `swDown(${j})`);
    str = str.replace(`notes-${i}`, `notes-${j}`);
    str = str.replace(`red-dots-${i}`, `red-dots-${j}`);

    str = str.replace(`deleteChord(${i})`, `deleteChord(${j})`);
    str = str.replace(`addChord(${i})`, `addChord(${j})`);

    // console.log("i:", i, ", j:", j);
    str = str.replace(`"num">${i + 1}`, `"num">${j + 1}`);
    //update current barres if have
    return str;
}

function swUp(i) {
    if (i > 0) {
        var chord0 = solve($(`#ver-${i}`).html(), i, i - 1);
        var chord1 = solve($(`#ver-${i - 1}`).html(), i - 1, i);
        $(`#ver-${i - 1}`).html(chord0);
        $(`#ver-${i}`).html(chord1);
        // console.log(chord0);
        [barres[i], barres[i - 1]] = [barres[i - 1], barres[i]];
        goToFretI(i, parseInt(barres[i]));
        goToFretI(i - 1, parseInt(barres[i - 1]));

        sort = false;
    }
}
function swDown(i) {
    if (i < noc - 1) {
        var chord0 = solve($(`#ver-${i}`).html(), i, i + 1);
        var chord1 = solve($(`#ver-${i + 1}`).html(), i + 1, i);
        $(`#ver-${i + 1}`).html(chord0);
        $(`#ver-${i}`).html(chord1);
        [barres[i], barres[i + 1]] = [barres[i + 1], barres[i]];
        goToFretI(i, parseInt(barres[i]));
        goToFretI(i + 1, parseInt(barres[i + 1]));
        sort = false;
    }
}
function deleteChord(i) {
    // console.log(noc);
    if (sort && i < noc - 1) alert("Chỉ xóa được hợp âm cuối!");
    else if (sort && i == noc - 1) {
        var result = window.confirm(`Chắn chắn xóa version: ${i + 1}`);
        if (result === true) {
            $(`#ver-${i}`).remove();
            noc--;
        } else {
        }
    } else {
        alert("Cần lưu lại thứ tự mới để xóa!");
        $(".save").click();
    }
}
function changeNewData() {
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
async function save() {
    if (confirm("Chắn chắn lưu version hợp âm hiện tại!")) {
        var res = {
            key: note,
            suffix: minor,
            positions: [],
        };
        for (let i = 0; i < noc; i++) {
            var p = { frets: "", fingers: "" };
            $(`#ver-${i} #input-fret`)
                .val()
                .split("-")
                .forEach((i) => {
                    if (i != "X") p.frets += convToHex(Number(i)).toLowerCase();
                    else p.frets += "x";
                });
            $(`#ver-${i} #input-finger`)
                .val()
                .split("-")
                .forEach((i) => {
                    p.fingers += convToHex(Number(i));
                });
            var capo = $(`#ver-${i} #input-capo`).val();
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
        // console.log(res);

        await fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text(); // Parse the response body as JSON
            })
            .then((data) => {
                if (data) {
                    alert("Lưu thành công, reload lại trang");
                    console.log(data);
                    location.href =
                        location.href.split("?")[0] + "?v=" + Date.now();
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
}
