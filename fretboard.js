var canClick = true;
const notesClassName = [".low-e", ".a", ".d", ".g", ".b", ".high-e"];
var barres;
var notes = {
    e: ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"],
    a: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],
    d: ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"],
    g: ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"],
    b: ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"],
};
var noteToShow = "C";
var openNote = ["E", "A", "D", "G", "B", "E"];
const hideChord = (i) => {
    $(`#notes-${i} [note-number]`).animate({ opacity: 0 }, 500);
};
const hideFinger = (i) => {
    $(`#red-dots-${i} [dot-number]`).animate({ opacity: 0 }, 500);
};
const hideBarre = (i) => {
    $(`#notes-${i} #barres`).animate({ opacity: 0 }, 500);
};
const renderBarre = (indexVersion, indexBarre) => {
    // console.log("version:", indexVersion);
    // console.log("barre:", indexBarre);
    $(`#notes-${indexVersion} #barres`).animate(
        { top: `${indexBarre * 78.3}px`, opacity: 1 },
        500
    );
};
function resetOpenNote(i) {
    console.log("reset open note");
    $(`#ver-${i} #indicate .open-notes li`).each((index, li) => {
        // console.log(openNote[index]);
        $(li).text(openNote[index % 6]).css({
            color: "#fff",
            "background-color": "#fa990f",
        });
    });
}
const updateChord = (i) => {
    var fret = $(`#ver-${i} #input-fret`).val(),
        finger = $(`#ver-${i} #input-finger`).val(),
        capo = $(`#ver-${i} #input-capo`).val();

    showChord(fret, i, capo);
    showFinger(fret, finger, i);
};
function renderFret() {
    for (let i = 23; i >= 0; i--) {
        // console.log($(".guitar-neck"));
        if (i == 0) {
            $(".guitar-neck").prepend(
                '<div id="fret0" class="fret first"></div>'
            );
        } else {
            $(".guitar-neck").prepend(`<div id="fret${i}" class="fret"></div>`);
        }
    }
}
const showChord = (fret, i, capo) => {
    canClick = false;
    // $("li[dot-number]").animate({ opacity: 0 }, 500);
    // $("[note-number]").animate({ opacity: 0 }, 500);
    console.log("update chord");
    var min = 24;
    fret.split("-").forEach((chord, index) => {
        if(chord == "X") {
            $(`#ver-${i} #indicate ${notesClassName[index]}`)
                    .text("")
                    .prepend(
                        '<img style="width: 20px; left: 0px; top:-2px; position: relative;" src="./img/x.png"/>'
                    )
                    .css({
                        color: "#f00",
                        "background-color": "rgb(254 244 229)",
                    })
                    .animate(500);
        }
        else if (chord == "0") {
            // console.log(note);
            $(`#ver-${i} #indicate ${notesClassName[index]}`)
                .text(openNote[index])
                .css({
                    color: "#fff",
                    "background-color":
                        note == openNote[index]
                            ? "#007D1D"
                            : "#fa990f",
                })
                .animate(500);
        }
        else if (chord != "X") {
            var noteToShow = $(
                `#notes-${i} ${notesClassName[index]} ul li[note-number="${chord}"]`
            )
            noteToShow.animate({ opacity: 1 }, 500);
            min = Math.min(min, parseInt(chord));
            if (
                note == noteToShow.text()
            ) {
                $(
                    `.notes ${notesClassName[index]} ul li[note-number="${chord}"]`
                ).css({ "background-color": "#007D1D" });
            }
        }
    });
    barres[i] = min - 1;
    if (capo) renderBarre(i, capo);
    else hideBarre(i);
    setTimeout(() => {
        canClick = true;
    }, 500);
};
function goToFretI(indexVersion, indexBarre) {
    // console.log(indexVersion, indexBarre);

    if (indexBarre && indexBarre > 0) {
        var myElement = document.querySelectorAll(
            `#ver-${indexVersion} #fret${indexBarre}`
        );
        // console.log(myElement);
        var topPos = myElement[0].offsetTop;
        document.querySelector(`#ver-${indexVersion} .fretboard`).scrollTop =
            topPos;

        topPos = myElement[1].offsetTop;
        document.querySelectorAll(
            `#ver-${indexVersion} .fretboard`
        )[1].scrollTop = topPos;
    }
}

const showFinger = (fret, finger, i) => {
    canClick = false;
    // $("li[dot-number]").animate({ opacity: 0 }, 500);
    // $("[note-number]").animate({ opacity: 0 }, 500);
    finger = finger.split("-");
    // console.log("fret:",fret);
    // console.log("finger:",finger);
    var min = 24;
    fret.split("-").forEach((chord, index) => {
        if (chord != "X") {
            // console.log(chord);
            min = Math.min(min, parseInt(chord));
            $(
                `#red-dots-${i} ${notesClassName[index]} ul li[dot-number="${chord}"]`
            )
                .text(finger[index])
                .animate({ opacity: 1 }, 500);
        }
    });
    goToFretI(i, min - 1);
    setTimeout(() => {
        canClick = true;
    }, 500);
};
function resetNote() {
    // $(".notes ul").text("");
    for (let i = 0; i < notes.e.length * 2; i++) {
        $(".mask.low-e ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.e[i % 12] +
                " style='opacity: 0;'>" +
                notes.e[i % 12] +
                "</li>"
        );
        $(".mask.a ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.a[i % 12] +
                " style='opacity: 0;'>" +
                notes.a[i % 12] +
                "</li>"
        );
        $(".mask.d ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.d[i % 12] +
                " style='opacity: 0;'>" +
                notes.d[i % 12] +
                "</li>"
        );
        $(".mask.g ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.g[i % 12] +
                " style='opacity: 0;'>" +
                notes.g[i % 12] +
                "</li>"
        );
        $(".mask.b ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.b[i % 12] +
                " style='opacity: 0;'>" +
                notes.b[i % 12] +
                "</li>"
        );
        $(".mask.high-e ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.e[i % 12] +
                " style='opacity: 0;'>" +
                notes.e[i % 12] +
                "</li>"
        );
    }
}
function resetFinger() {
    for (let i = 0; i < notes.e.length * 2; i++) {
        $(".red-dots .low-e ul").append(
            `<li dot-number="${i}" style="opacity: 0;">.</li>`
        );
        $(".red-dots .a ul").append(
            `<li dot-number="${i}" style="opacity: 0;">.</li>`
        );
        $(".red-dots .d ul").append(
            `<li dot-number="${i}" style="opacity: 0;">.</li>`
        );
        $(".red-dots .g ul").append(
            `<li dot-number="${i}" style="opacity: 0;">.</li>`
        );
        $(".red-dots .b ul").append(
            `<li dot-number="${i}" style="opacity: 0;">.</li>`
        );
        $(".red-dots .high-e ul").append(
            `<li dot-number="${i}" style="opacity: 0;">.</li>`
        );
    }
}
var $goTop = $(".go-top");
$goTop.hide();

async function addChord(i) {
    var chord = $(`#ver-${i}`);
    var newChordCode = solve(chord.html(), i, i + 1);
    barres.splice(i + 1, 0, barres[i]);
    for (let j = i + 1; j < noc; j++) {
        await $(`#ver-${j}`).html(solve($(`#ver-${j}`).html(), j, j + 1));
    }
    for (let j = noc - 1; j > i; j--) {
        // console.log(j);
        $(`#ver-${j}`).attr("id", `ver-${j + 1}`);
    }
    chord.after(
        `<div id="ver-${
            i + 1
        }" class="row m-1 p-2 chord-v">${newChordCode}</div>`
    );
    noc++;
    for (let j = 0; j < noc; j++) {
        $(`#ver-${j}`).on("change", async () => {
            await hideChord(j);
            await hideFinger(j);
            updateChord(j);
        });
        goToFretI(j, barres[j]);
    }
}

$(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
        $goTop.fadeIn(500);
    } else {
        $goTop.fadeOut(200);
    }
});

$goTop.on("click", function () {
    $("html, body").animate(
        {
            scrollTop: 0,
        },
        150
    );
});
