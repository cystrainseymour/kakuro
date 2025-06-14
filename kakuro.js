var row_model;
var col_model;
var height;
var width;
var base;
var difficulty;

function setUp(){
	let defaults = [5, 5, 10, 1];	
	
	document.getElementById("height-inp").value = defaults[0];
	document.getElementById("width-inp").value = defaults[1];
	document.getElementById("base-inp").value = defaults[2];
	document.getElementById("diff-inp").value = defaults[3];
	
	constructBoard(defaults[0], defaults[1], defaults[2], defaults[3]);
}

function constructBoard(h, w, b, d){
	//console.log("started");
	if(!h || !w || !d || b < 3 || b > 36){
		return;
	}
	
	document.getElementById("result").style["visibility"] = "hidden";
	document.getElementById("check").addEventListener("click",checkHandler);
	document.getElementById("check").disabled = false;
	
	height = h;
	width = w;
	base = b;
	difficulty = d;
	
	//console.log(height);
	//console.log(width);
	row_model = Array.from({ length: height + 1 }, () => new Array(width + 1).fill(0));
	col_model = Array.from({ length: height + 1 }, () => new Array(width + 1).fill(0));
	
	//let height=event.target.height.value;
	//let width=event.target.width.value;
	
	getNums();
	
	render_table();
	
	//console.log(row_model);
	//console.log(col_model);
}

function getNums(){
	//console.log("started1");
	
	const arr = Array.from({ length: height + 1 }, () => new Array(width + 1).fill(0));
	//console.log(arr.length);
	//console.log(arr[0].length);
	var used = new Array(base).fill(0);
	
	for(var i=0; i < width + 1; i++){
		arr[0][i] = 0;
	}
	
	for(var i = 1; i < height + 1; i++){
		used.fill(0);
		let k = difficulty;
		for(var j = 1; j < width + 1; j++){
			let num = Math.floor(Math.random()*base - 1) + 1;
			if(k<0){
				k = difficulty;
			}
			if(used[num]){
				if(k) {
					j --;
				} else {
					used.fill(0);
					arr[i][j] = 0;
				}
				k--;
			} else {
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
				used.fill(0);
			} else if(used[arr[i][j]]){
				arr[i][j] = 0;
				used.fill(0);
			} else{
				used[arr[i][j]] = 1;
			}
		}
	}
	
	//console.log("done");
	getSums(arr);
	//console.log(arr);
}

function getSums(arr){
	//console.log("started2");
	var prev = 0;
	var sum = 0;
	
	for(var i = 1; i < height + 1; i ++){
		for(var j = 1; j < width + 1; j ++){
			if(arr[i][j]){
				//console.log("done1");
				sum += arr[i][j];
			} else{
				//console.log(i);
				//console.log(j);
				//console.log("done2");
				if(!sum){
					sum = -1;
				}
				row_model[i][prev] -= sum;
				prev = j;
				sum = 0;
			}
		}
		if(!sum){
			sum = -1;
		}
		row_model[i][prev] -= sum;
		prev = 0;
		sum = 0;
	}
	
	prev = 0;
	sum = 0;
	
	for(var i = 1; i < width + 1; i ++){
		for(var j = 1; j < height + 1; j ++){
			//console.log("done3");
			if(arr[j][i]){
				sum += arr[j][i];
			} else{
				//console.log(arr[prev][i])
				//console.log("done4");
				if(!sum){
					sum = -1;
				}
				col_model[prev][i] -= sum;
				prev = j;
				sum = 0;
			}
		}
		if(!sum){
			sum = -1;
		}
		col_model[prev][i] -= sum;
		prev = 0;
		sum = 0;
	}
	col_model[0][0] = 1;
}

function add_up(){
	//console.log(row_model);
	//console.log(col_model);
	let exp = 0;
	let used = new Array(base).fill(0);
	
	for(var i = 1; i < height + 1; i ++){
		exp = row_model[i][0];
		for(var j = 1; j < width + 1; j ++){
			if(row_model[i][j] < 0){
				//console.log("a");
				if(exp < 0){
					//console.log("1", i, j, exp);
					return false;
				}
				used.fill(0);
				exp = row_model[i][j];
			} else if(row_model[i][j] >= 1 && used[row_model[i][j]]){
				//console.log("b");
				//console.log("2", i, j, exp);
				//console.log(used);
				return false;
			} else{
				//console.log("c");
				if(row_model[i][j] >= 1){
					used[row_model[i][j]] = 1;
				}
				exp += row_model[i][j];
				//console.log(i, j, exp);
			}
		}
		if(exp < 0){
			//console.log("3", i, j, exp);
			return false;
		}
		used.fill(0);
	}
	
	exp = 0
	
	for(var i = 1; i < width + 1; i ++){
		exp = col_model[0][i];
		for(var j = 1; j < height + 1; j ++){
			if(col_model[j][i] < 0){
				if(exp < 0){
					//console.log("4", j, i, exp);
					return false;
				}
				used.fill(0);
				exp = col_model[j][i];
			} else if(col_model[j][i] >= 1 && used[col_model[j][i]]){
					//console.log("5", j, i, exp);
					//console.log(used);
					return false;
			} else{
				if(col_model[j][i] >= 1){
					used[col_model[j][i]] = 1;
				}
				exp += col_model[j][i];
				//console.log(i, j, exp);
			}
		}
		if(exp < 0){
			//console.log("6", i, j, exp);
			return false;
		}
		used.fill(0);
	}
	
	return true;
}

function check(){
	if(add_up()){
		document.getElementById("check").removeEventListener("click", checkHandler);
		document.getElementById("check").disabled = true;
		document.getElementById("result").children[0].textContent = "Congrats";
		let rows = document.getElementById("board").children;
		for(let i = 1; i < height + 1; i ++){
			let cells = rows[i].children;
			for(let j = 1; j < width + 1; j ++){
				cells[j].children[0].disabled = true;
			}
		}
	} else{
		document.getElementById("result").children[0].textContent = "Whoops";
	}
	document.getElementById("result").style["visibility"] = "visible";
}

function checkHandler(){
	check();
}

function updateModel(ta){
	let value = ta.value;
	let r = ta.parentElement.getAttribute("id");
	let c = ta.getAttribute("id");
	//console.log(value, r, c);
	row_model[r][c] = col_model[r][c] = parseInt(value, base);
}

function erase(){
	
	document.getElementById("result").style["visibility"] = "hidden";
	document.getElementById("check").addEventListener("click",checkHandler);
	document.getElementById("check").disabled = false;
	
	for(let i = 0; i < height + 1; i ++){
		for(let j = 0; j < width + 1; j ++){
			if(row_model[i][j] >= 1){
				row_model[i][j] = 0;
			}
			if(col_model[i][j] >= 1){
				col_model[i][j] = 0;
			}
		}
	}
	render_table();
	
	document.getElementById("result").style["visibility"] = "hidden";
	document.getElementById("check").addEventListener("click",checkHandler);
}

function render_table(){
	//console.log(row_model);
	//console.log(col_model);
	document.getElementById("board_cont").children[0].remove();
	
	let table = document.createElement("table");
	table.id = "board";
	
	for(var i=0; i<height + 1; i++){
		let row = document.createElement("tr");
		for(var j=0; j<width + 1; j++){
			let cell = document.createElement("td");
			cell.id = i;
			let ta = document.createElement("textarea", 
				{maxlength:"1", onkeyup:"checkInput(this)"})
			ta.id = j;
				
			cell.appendChild(ta);
			
			if(row_model[i][j] || col_model[i][j]){
					
				cell.classList.add("preset");
				//cell.style.setProperty("--somewidth", (0.6/Math.sqrt(Math.pow(height,2) + Math.pow(width,2)) * 100).toString()+ "%");
				//console.log(0.64/Math.sqrt(Math.pow(height,2) + Math.pow(width,2)));
				let h_px = (575.2 - 1.604 * height)/(height + 1);
				let w_px = (575.2 - 1.604 * width)/(width + 1);
				let ratio = Math.sqrt(Math.pow(w_px/h_px,2) + 1);
				cell.style.setProperty("--somewidth", (ratio * h_px).toString()+ "px");
				cell.style.setProperty("--someangle", Math.atan((width)/(height)).toString()+ "rad");
				ta.disabled = true;
				
				let my_str = "";
				
				if(row_model[i][j]){
					if(row_model[i][j] > 0){
						row_model[i][j] = 0.5;
					} else{
						//console.log(row_model[i][j], i, j);
						my_str = (row_model[i][j] * -1).toString(base) + "\n";
					}
				}
				if(col_model[i][j]){
					if(col_model[i][j] > 0){
						col_model[i][j] = 0.5;
					} else{
						my_str = my_str + (col_model[i][j] * -1).toString(base) + "  ".repeat(width*2);
					}
				}
				
				ta.value = my_str;
				
			} else{
				ta.addEventListener("keyup",function(){updateModel(ta)} );
				ta.setAttribute("maxlength", 1);
				ta.style["text-align"] = "center";
				ta.classList.add("editable");
			}
			//cell.children[0].value = nums[i][j];
			
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	var board_cont = document.getElementById("board_cont");
	board_cont.insertBefore(table,board_cont.children[0]);
}

function helpHandler(){
	if(document.getElementById("instructions").style["display"] == "block"){
		document.getElementById("instructions").style["display"] = "none";
	} else{
		document.getElementById("instructions").style["display"] = "block";
	}
}

function printHandler(){
	window.print();
}

document.getElementById("construct_board").addEventListener("click",
function(){constructBoard(
parseInt(document.getElementById("height-inp").value), 
parseInt(document.getElementById("width-inp").value), 
parseInt(document.getElementById("base-inp").value), 
parseInt(document.getElementById("diff-inp").value) )});

document.getElementById("check").addEventListener("click",checkHandler);
document.getElementById("reset").addEventListener("click",erase);
document.getElementById("new").addEventListener("click",function(){constructBoard(height, width, base, difficulty)});
document.getElementById("print").addEventListener("click",printHandler);

document.getElementById("help").addEventListener("click",helpHandler);

setUp();