/*function makeBoard(base, height, width, difficulty){
	const rows=[];
	for(let i=0; i<height; i+=1){
		rows[i]=[];
		preventBigBlocksRow(base, rows, i);
	}
	for(let i=0; i<width; i+=1){
		preventBigBlocksCol(base, rows, i);
	}
}
		
function preventBigBlocksRow(base, rows, r){
	let width=rows[0].length;
	let cur=0;
	while(width-cur >= base){
		cur += Math.random()*base;
		rows[r][cur]=[-1,-1];
	}
}

function preventBigBlocksCol(base, rows, c){
	let height=rows.length;
	let cur=0;
	while(height-cur >= base){
		cur += Math.random()*base;
		rows[cur][c]=[-1,-1];
	}
}

function makeRandom(row, left, right, base){
	let max= 
}

function shuffle(array) {
  let cur = array.length;

  // While there remain elements to shuffle...
  while (cur != 0) {
    let r = Math.floor(Math.random() * cur);
    cur--;

    [array[cur], array[r]] = [
      array[r], array[cur]];
  }
}
	
function getNFromAToB(nums, n, a, b){
	
	let c=0;
	for(let i=a; i<=b && c<n; i++){
		if(Math.floor(Math.random())){
			nums.append(i);
			c++;
		}
	}
}*/

function constructBoard(event){
	let height=event.target.height.value;
	let width=event.target.width.value;
	document.getElementById("board").remove();
	let table = document.createElement("table", {id:"board"});
	
	for(var i=0; i<height; i++){
		let row = document.createElement("tr", {id:i});
		for(var j=0; j<width; j++){
			let cell = document.createElement("td", {id:j});
			
			cell.appendChild(
			document.createElement("textarea", 
			{maxlength:"1", onkeyup:"checkInput(this)"})
			);
			
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	var board_cont = document.getElementById("board_cont");
	board.appendChild(table);
}
