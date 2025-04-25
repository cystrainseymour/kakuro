=function constructBoard(event){
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
