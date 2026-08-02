function generateDailyCode() {

    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const codeNumber = 
        String(day).padStart(2, "0") +
        String(month).padStart(2, "0");

    const code = "VL" + codeNumber;

    const codeBox = document.getElementById("daily-code");

    if (codeBox) {
        codeBox.innerText = code;
    }

}

generateDailyCode();

function updateDate(){

    const today = new Date();

    const options = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    const date = today.toLocaleDateString("en-AU", options);

    const dateBox = document.getElementById("updated-date");

    if(dateBox){
        dateBox.innerText = date.toUpperCase();
    }

}

updateDate();
