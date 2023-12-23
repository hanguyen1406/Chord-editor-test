var canClick = true;
const notesClassName = [".low-e", ".a", ".d", ".g", ".b", ".high-e"];
var notes = {
    e: ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"],
    a: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],
    d: ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"],
    g: ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"],
    b: ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"],
};
const hideChord = (i) => {
    $(`#notes-${i} [note-number]`).animate({ opacity: 0 }, 500);
};
const hideFinger = (i) => {
    $(`#red-dots-${i} [dot-number]`).animate({ opacity: 0 }, 500);
};
const hideBarre = (i) => {
    $("#barres").animate({ opacity: 0 }, 500);
};
const renderBarre = (indexVersion, indexBarre) => {
    console.log('version:',indexVersion)
    console.log('barre:',indexBarre)
    $(`#notes-${indexVersion} #barres`).animate(
        { top: `${indexBarre * 78.3}px`, opacity: 1 },
        500
    );
};
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

    console.log(fret);
    var min = 24;
    fret.split("-").forEach((chord, index) => {
        if (chord != "X") {
            $(
                `#notes-${i} ${notesClassName[index]} ul li[note-number="${chord}"]`
            ).animate({ opacity: 1 }, 500);
            min = Math.min(min, parseInt(chord));
        }
    });
    if (capo) renderBarre(i, capo);
    setTimeout(() => {
        canClick = true;
    }, 500);
};
function goToFretI(indexVersion, indexBarre) {
    // console.log(indexVersion, indexBarre);

    if (indexBarre > 0) {
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
    for (let i = 0; i < notes.e.length*2; i++) {
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
    for (let i = 0; i < notes.e.length*2; i++) {
        $(".red-dots .low-e ul").append(
            `<li dot-number="${i}" style="opacity: 0;">.</li>`);
        $(".red-dots .a ul").append(
            `<li dot-number="${i}" style="opacity: 0;">.</li>`);
        $(".red-dots .d ul").append(
            `<li dot-number="${i}" style="opacity: 0;">.</li>`);
        $(".red-dots .g ul").append(
            `<li dot-number="${i}" style="opacity: 0;">.</li>`);
        $(".red-dots .b ul").append(
            `<li dot-number="${i}" style="opacity: 0;">.</li>`);
        $(".red-dots .high-e ul").append(
            `<li dot-number="${i}" style="opacity: 0;">.</li>`);
    }
}
var $goTop = $(".go-top");
$goTop.hide();

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
