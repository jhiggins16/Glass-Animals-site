window.onload = function(){
	 movepics();
	
}
var img1;
var vis1;
var vis2;

	function movepics(){
	img1 = document.getElementById("homeimg1");
	vis1 = true;
	img1.addEventListener("click", function (){
	if(vis1 == true){
		vis1 = false;
		img1.style.opacity = 0;
	}else{
		vis1 = true;
		img1.style.opacity = 1;
	}
	});
	
	img2 = document.getElementById("homeimg2");
	vis2 = true;
	img2.addEventListener("click", function (){
	if(vis2 == true){
		vis2 = false;
		img2.style.opacity = 0;
	}else{
		vis2 = true;
		img2.style.opacity = 1;
	}
	});
	}