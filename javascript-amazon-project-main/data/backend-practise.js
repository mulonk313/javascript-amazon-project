const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.respone);
});

xhr.open('GET', 'https://supersimplebackend.dev/hello=3');
xhr.send();

