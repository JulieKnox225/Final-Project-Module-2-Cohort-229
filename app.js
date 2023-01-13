const quote = document.getElementById('test').innerText;

for(let i = 0; i < quote.length; i++) {
    //Event listener for when a key is pressed
    document.addEventListener('keyup', 
    function(e) {
        //Compare if the correct key is pressed
        if(e.key === quote[i]) {
           console.log('correct');
        } else {
           console.log('incorrect');
        }
        e.preventDefault();
    });
}
