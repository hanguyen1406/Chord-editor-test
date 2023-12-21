
const COMMON_NOTES = {
    e: ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
    a: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', "A"],
    d: ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
    g: ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
    b: ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
};

const ACTIVE_NOTE_FEATURE = () => {
    // Rerender Base body
    // $("body .content").html(COMMON_CONTENT_HTML_BASE);
    // Render Notes
    for (let i = 0; i < COMMON_NOTES.e.length; i++) {
        $(".mask.low-e ul").append(
            "<li note-number=" +
                i +
                " note=" +
                COMMON_NOTES.e[i] +
                ">" +
                COMMON_NOTES.e[i] +
                "</li>"
        );
        $(".mask.a ul").append(
            "<li note-number=" +
                i +
                " note=" +
                COMMON_NOTES.a[i] +
                ">" +
                COMMON_NOTES.a[i] +
                "</li>"
        );
        $(".mask.d ul").append(
            "<li note-number=" +
                i +
                " note=" +
                COMMON_NOTES.d[i] +
                ">" +
                COMMON_NOTES.d[i] +
                "</li>"
        );
        $(".mask.g ul").append(
            "<li note-number=" +
                i +
                " note=" +
                COMMON_NOTES.g[i] +
                ">" +
                COMMON_NOTES.g[i] +
                "</li>"
        );
        $(".mask.b ul").append(
            "<li note-number=" +
                i +
                " note=" +
                COMMON_NOTES.b[i] +
                ">" +
                COMMON_NOTES.b[i] +
                "</li>"
        );
        $(".mask.high-e ul").append(
            "<li note-number=" +
                i +
                " note=" +
                COMMON_NOTES.e[i] +
                ">" +
                COMMON_NOTES.e[i] +
                "</li>"
        );
    }
   


};

ACTIVE_NOTE_FEATURE();
