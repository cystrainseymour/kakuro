function constructBoard(event){
	console.log("started");
	let height=event.target.height.value;
	let width=event.target.width.value;
	document.getElementById("board").remove();
	let table = document.createElement("table", {id:"board"});
	let nums = getNums(height, width, 10);
	
	for(var i=0; i<height; i++){
		let row = document.createElement("tr", {id:i});
		for(var j=0; j<width; j++){
			let cell = document.createElement("td", {id:j});
			
			cell.appendChild(
			document.createElement("textarea", 
			{id:"text", maxlength:"1", onkeyup:"checkInput(this)"})
			);
			cell.getElementById("text").value = nums[i][j];
			
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	var board_cont = document.getElementById("board_cont");
	board.appendChild(table);
}

function getNums(height, width, base){
	console.log("started1");
	
	const arr = new Array(height).fill(new Array(width));
	var used = new Array(base).fill(0);
	
	for(var i = 0; i < height; i++){
		for(var j = 0; j < width; j++){
			var num = Math.Random()*base + 1;
			if(used[num]){
				used = new Array(base).fill(0);
			} else{
				used[num] = 1;
			}
			arr[i][j] = num;
		}
	}
	
	for(var j = 0; j < width; j++){
		used = new Array(base).fill(0);
		for(var i = 0; i < height; i++){
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
	
	return arr;
}
