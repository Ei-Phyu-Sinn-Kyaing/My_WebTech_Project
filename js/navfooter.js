async function loadHTML(id, filename)
{
    try{
        const response = await fetch(filename);
        if (!response.ok) throw new Error (`${filename}not found`);   //to prevent if file is not found
    
        const data  = await response.text();
        document.getElementById(id).innerHTML = data;
    }
    catch(error){
        console.error('Error',error);  //to describe the thrown error
    }
    
}

loadHTML("navbar", "navbar.html");
loadHTML("footer", "footer.html")

