const bigText = document.querySelector('.bigText').innerHTML;
console.log(bigText);
const regExp = new RegExp("( \')|(\' )|(\')$", "gm");
let result = bigText.replace(regExp, '"');
console.log(result);
document.querySelector('.bigText').innerHTML = result;
