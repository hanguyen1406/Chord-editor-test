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
const showChord = (fret, i) => {
    canClick = false;
    // $("li[dot-number]").animate({ opacity: 0 }, 500);
    // $("[note-number]").animate({ opacity: 0 }, 500);

    // console.log(fret);
    fret.split("-").forEach((chord, index) => {
        if (chord != "x") {
            $(
                `#notes-${i} ${notesClassName[index]} ul li[note-number="${chord}"]`
            ).animate({ opacity: 1 }, 500);
        }
    });

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
        document.querySelectorAll(`#ver-${indexVersion} .fretboard`)[1].scrollTop =
            topPos;
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

    for (let i = 0; i < notes.e.length; i++) {
        $(".mask.low-e ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.e[i] +
                " style='opacity: 0;'>" +
                notes.e[i] +
                "</li>"
        );
        $(".mask.a ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.a[i] +
                " style='opacity: 0;'>" +
                notes.a[i] +
                "</li>"
        );
        $(".mask.d ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.d[i] +
                " style='opacity: 0;'>" +
                notes.d[i] +
                "</li>"
        );
        $(".mask.g ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.g[i] +
                " style='opacity: 0;'>" +
                notes.g[i] +
                "</li>"
        );
        $(".mask.b ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.b[i] +
                " style='opacity: 0;'>" +
                notes.b[i] +
                "</li>"
        );
        $(".mask.high-e ul").append(
            "<li note-number=" +
                i +
                " note=" +
                notes.e[i] +
                " style='opacity: 0;'>" +
                notes.e[i] +
                "</li>"
        );
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

