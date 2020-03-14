var randomArray = [];

for(var x=0;x<=500;x++){
	randomArray.push(Math.round(Math.random()*1000));
}

console.log(Math.min.apply(null,randomArray));