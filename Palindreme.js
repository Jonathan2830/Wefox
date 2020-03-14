function verifyPalindromeSentence(str) {

  var regex =  /[^A-Za-z0–9]/g;
  var strLowerCase = str.toLowerCase().replace(regex, '');
  var strReverse = strLowerCase.split('').reverse().join(''); 
  
  console.log(strLowerCase === strReverse);

}

verifyPalindromeSentence("Race Car");