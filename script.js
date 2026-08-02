/* =================================
   VELVET LEAF OFFICIAL
   VERIFICATION SYSTEM
================================= */


async function loadVerification(){

    try{

        const response = await fetch(
            "code.txt?v=" + Date.now()
        );


        const data = await response.text();


        const lines = data
        .trim()
        .split("\n");


        const code = lines[0];

        const updated = lines[1];


        document.getElementById("code")
        .innerText = code;


        document.getElementById("updated")
        .innerText = updated;


    }

    catch(error){

        document.getElementById("code")
        .innerText = "ERROR";


        document.getElementById("updated")
        .innerText = "UNAVAILABLE";

    }

}



loadVerification();
