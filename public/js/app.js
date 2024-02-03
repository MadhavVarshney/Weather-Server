// alert('Dekho wo aa gya');

const getForecast = (event) => {
    event.preventDefault();
    document.getElementById('forecast').innerText = 'Loading...';
    const location = document.getElementById('location').value;

    const url = `/weather?location=${location}`;

    fetch(url).then((response) => {
        response.json().then(data => {
            if (data.error) {
                return document.getElementById('forecast').innerText = data?.error;
            }
            document.getElementById('forecast').innerText = data?.forecast;
        })

    });

}


