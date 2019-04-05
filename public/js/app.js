const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!search.value.length) return;
    
    const url = '/weather?location=' + encodeURIComponent(search.value);
    messageOne.textContent = 'Loading .......';
    messageTwo.textContent = '';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //document.getElementById('forecast').innerHTML = data.error;
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
                //console.error(data.error);
            } else {
                //document.getElementById('forecast').innerHTML = '<p>' + data.location + '</p><p>' +
                //data.forecast + '</p>';
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});