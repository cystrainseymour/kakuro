function constructBoard(){
	//console.log("started");
	let height = parseInt(document.getElementById("height-inp").value);
	let width = parseInt(document.getElementById("width-inp").value);
	//console.log(height);
	//console.log(width);
	
	//let height=event.target.height.value;
	//let width=event.target.width.value;
	
	document.getElementById("board_cont").children[0].remove();
	
	let table = document.createElement("table", {id:"board"});
	let nums = getNums(height, width, 10);
	
	for(var i=0; i<height + 1; i++){
		let row = document.createElement("tr", {id:i});
		for(var j=0; j<width + 1; j++){
			let cell = document.createElement("td", {id:j});
				
				cell.appendChild(document.createElement("textarea", 
					{id:"text", maxlength:"1", onkeyup:"checkInput(this)"}));
			
			if(nums[i][j] != ""){
					
				cell.classList.add("preset");
				//cell.style.setProperty("--somewidth", (0.6/Math.sqrt(Math.pow(height,2) + Math.pow(width,2)) * 100).toString()+ "%");
				//console.log(0.64/Math.sqrt(Math.pow(height,2) + Math.pow(width,2)));
				var h_px = (575.2 - 1.604 * height)/(height + 1);
				var w_px = (575.2 - 1.604 * width)/(width + 1);
				var ratio = Math.sqrt(Math.pow(w_px/h_px,2) + 1);
				cell.style.setProperty("--somewidth", (ratio * h_px).toString()+ "px");
				cell.style.setProperty("--someangle", Math.atan((width)/(height)).toString()+ "rad");
				cell.children[0].disabled = true;
				
				if(nums[i][j] != 0){
						
					var vals = nums[i][j].split("\\");
					
					if(vals[0] == 0){
						vals[0] = "";
					}
					if(vals[1] == 0){
						vals[1] = "";
					}
					
					cell.children[0].value = " " + vals[0] + "\n" + vals[1] + "  ".repeat(width*2);
					
				}
			}
			//cell.children[0].value = nums[i][j];
			
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	var board_cont = document.getElementById("board_cont");
	board_cont.appendChild(table);
}

function getNums(height, width, base){
	//console.log("started1");
	
	const arr = Array.from({ length: height + 1 }, () => new Array(width + 1).fill(0));
	//console.log(arr.length);
	//console.log(arr[0].length);
	var used;
	
	for(var i=0; i < width + 1; i++){
		arr[0][i] = 0;
	}
	
	for(var i = 1; i < height + 1; i++){
		used = new Array(base).fill(0);
		for(var j = 1; j < width + 1; j++){
			var num = Math.floor(Math.random()*base) + 1;
			if(used[num]){
				used = new Array(base).fill(0);
				arr[i][j] = 0;
			} else{
				used[num] = 1;
				//console.log(i);
				//console.log(j);
				//console.log(arr);
				arr[i][j] = num;
			}
		}
	}
	
	for(var j = 1; j < width + 1; j++){
		used = new Array(base).fill(0);
		for(var i = 1; i < height + 1; i++){
			if(arr[i][j] === 0){
				used = new Array(base).fill(0);
			} else if(used[arr[i][j]]){
				arr[i][j] = 0;
				used = new Array(base).fill(0);
			} else{
				used[arr[i][j]] = 1;
			}
		}
	}
	
	//console.log("done");
	getSums(arr);
	
	return arr;
}

function getSums(arr){
	var height = arr.length;
	var width = arr[0].length;
	var zeroes = arr[0][0];
	
	var prev = 0;
	var sum = 0;
	
	for(var i = 1; i < height; i ++){
		for(var j = 1; j < width; j ++){
			if(typeof arr[i][j] === 'number' && arr[i][j] > 0){
				sum += arr[i][j];
			} else{
				//console.log(i);
				//console.log(j);
				if(prev){
					arr[i][prev] = sum.toString();
				} else{
					arr[i][prev] = sum.toString() + "\\0";
				}
				prev = j;
				sum = 0;
			}
		}
		if(prev){
			arr[i][prev] = sum.toString();
		} else{
			arr[i][prev] = sum.toString() + "\\0";
		}
		prev = 0;
		sum = 0;
	}
	
	prev = 0;
	sum = 0;
	
	for(var i = 1; i < width; i ++){
		for(var j = 1; j < height; j ++){
			//console.log(j,i);
			if(typeof arr[j][i] === 'number' && arr[j][i] > 0){
				sum += arr[j][i];
				arr[j][i] = "";
			} else{
				//console.log(arr[prev][i])
				arr[prev][i] = arr[prev][i] + "\\" + sum.toString();
				prev = j;
				sum = 0;
			}
		}
		
		arr[prev][i] = arr[prev][i] + "\\" + sum.toString();
		prev = 0;
		sum = 0;
	}
	arr[0][0] = "0\\0";
}

document.getElementById("construct_board").addEventListener("click",constructBoard);