const search = (e) => {
    const value = e.target.value;
    if (value.length === 0) return;

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == xhttp.DONE && xhttp.status == 200) {
            const countries = Array.from(xhttp.responseXML.documentElement.getElementsByTagName('country'));
            const countriesList = countries.map(country => `<option value="${country.childNodes[0].nodeValue}">`);
            document.getElementById("countries").innerHTML = countriesList.join('\n');
        }
    };

    xhttp.open("GET", `api/search?query=${value}`, true);
    xhttp.send();
};

window.onload = () => {
    document.getElementById('country').addEventListener('input', search);
}