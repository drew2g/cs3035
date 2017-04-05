//Andrew James Padilla 2/8/2017~
//Web Browsers tested on: Google Chrome, Microsoft Edge
let gameOver = false

const declarationOfIndependence = {
	name: "Declaration of Independence",
	statement : "YOU HAVE OBTAINED THE DECLARATION OF INDEPENDENCE! You now have +5 armor" , 
	power : "armor",
	increment : 5
}

const nuclearRayGun = {
	name: "Nuclear Ray Gun",
	statement: "YOU HAVE OBTAINED THE NUCLEAR RAY GUN! Your hands tingle as you wield the most powerful weapon in the game! You now have +100 Attack Damage",
	power : "ad",
	increment : 100
}

const proteinPowder = {
	name: "Protein Powder",
	statement: "LOOKS LIKE ARNEY DROPPED HIS BOTTLE OF HIS PROTEIN POWDER. It's a special blend. All yours now. x2 Attack Damage! AUGHAGHAGH",
	power: "ad",
	multiplication : 2
}

const oil = {
	name: "Oil",
	statement: "YOU HAVE OBTAINED A JAR OF OIL! You are rich! This is worth 200 rupees!...for now (sell it while you can)",
	power : "money",
	increment : 200
}

const goldenWig = {
	name: "Trump's Golden Wig",
	statement: "YOU HAVE OBTAINED TRUMP'S GOLDEN WIG! You look younger already... You feel younger too... Hey, this thing has healing powers! +100 HP",
	power : "health",
	increment : 100
}

const axe = {
	name: "Axe",
	statement: "You start the game with this axe, it grants you 50 Attack Damage.",
	power: "ad",
	increment : 30
}

//=======================================================CREATING CHALLENGE OBJECTS
const checkHP = (n) => {
	player.hp -= n.ad
	n.hp -= player.ad

	if(player.hp === 0)
	{
		alert("You lost all your health. Game Over")
		gameOver = true
	}
	else if(n.hp === 0)
	{
		alert("You have defeated " + n.toString + "!")

		for(let i = 0; i < n.items.length; i++)
			{
				alert(n.items[i].statement)
				player.prizes.push(n.items[i])
			}
		alert("Your remaining HP is " + player.hp)

	}
}
const arnold = {
		toString: "Arnold",
		items : [proteinPowder],
		statement : "ARNOLD SCHWARZENEGGER is here to TERMINATE YOU!! BOW DOWN BEFORE THE GOVERNATOR",
		hp : 30,
		ad : 100,
		function : function() {
					alert(this.statement)
					checkHP(this)
					}
}

const dwight = {
		toString: "Dwight",
		items : [nuclearRayGun, oil],
		statement: "The name is DWIGHT D. EISENHOWER, step aside before I split your atoms with my radioactive isotopes...",
		hp : 40,
		ad : 80,
		function : function() {
					alert(this.statement)
					checkHP(this)
					}
}	

const donald = {
		toString: "Donald",
		items: [goldenWig, declarationOfIndependence],
		statement : "What??? The walls haven't stopped you yet??? Gah... DONALD TRUMP WILL NOT BE MADE A FOOL OF!",
		hp : 10,
		ad: 5,
		function : function() {
					alert(this.statement)
					checkHP(this)
					}
}

//=======================================================CREATING OTHER OBJECTS

let wall = {
	toString : "Wall",
	statement : "You've hit a wall! Move some other direction..."
}

let empty = {
	toString : "Empty" ,
	statement : "This space is empty",
	locationx : 0,
	locationy : 0
}

let goal = {
	toString : "Goal",
	statement : "You have reached the goal! You win!",
	locationx : 0,
	locationy : 0
}

let prize = {
	toString : "Prize",
	statement: "You win a prize!",
	locationx : 0,
	locationy : 0
}
 let start = {
 	toString : "Start",
 	statement: "This is where the player starts the game",
 	locationx : 0,
 	locationy : 0
 }

function newFrame(obj) {
  this.toString = obj.toString;
  this.statement = obj.statement;
  this.locationx = obj.locationx;
  this.locationy = obj.locationy;
}

//=======================================================CREATING PLAYER OBJECT

let player = {
		toString: "Player",
		hp: 100,
		ad: 10,
		adMultplier: 1,
		locationx : 0,
		locationy : 0,
		prizes : []
}

//=====================================================CREATING THE 8x8 ARRAY STRUCTURE
let a1 = new Array() //create the empty array



//create an array X of n starts, o goals, p players, q challengers, r walls
//choose a random space (0,0 to 64,64) to insert the X[i] to be in
//if this space is taken, boolean = true, random again
//if not taken, boolean = false, continue

let full = {
	startCount: 1,
	goalCount: 1,
	playerCount:1,
	challengerCount: 3,
	wallCount: 10,
	challengers : [arnold,dwight,donald],
	challenge: function(n) {
		return this.challengers[n]
	}

}
let fullArray = []
for(let i = 0; i < full.startCount; i++)
{
	fullArray.push(start) //S
}
for(let i = 0; i < full.goalCount; i++)
{
	fullArray.push(goal) //G
}
for(let i = 0; i < full.playerCount; i++)
{
	fullArray.push(prize) //P1
}
for(let i = 0; i < full.challengerCount; i++)
{
	fullArray.push(full.challenge(i)) //C
}
for(let i = 0; i < full.wallCount; i++)
{
	fullArray.push(wall) //W
}

console.log(fullArray)




//initialize empty matrix
for(let i = 0; i < 8; i++)
{
	a1[i] = new Array() //put an array in the array, so that a1 is the array of arrays

	for(let j = 0; j < 8; j++)
	{
		let temp = new newFrame(empty)
		temp.locationx = i
		temp.locationy = j
		a1[i][j] = temp
	}
}

//set objects into matrix
for(let i = 0; i < fullArray.length; i++)
{
	let hit = false
	while(!hit){
		let x = Math.floor((Math.random() * 8) )
		let y = Math.floor((Math.random() * 8) )

		if(a1[x][y].toString === "Empty")
		{
			if(fullArray[i].toString === "Start")
			{
				player.locationx = x
				player.locationy = y
			}

			let temp = new newFrame(fullArray[i])
			temp.locationx = x
			temp.locationy = y

			a1[x][y] = temp
			hit = true
		}
		
		
	}
}



console.log(a1)
console.log(player)

//=====================================================Initialize Instructions and outcomes strings

let instructions = " "
let outcome = " "


//=====================================================CREATING THE 8x8 ARRAY TABLE
document.write("<table class = \"table table-striped table-hover\" style = \"border: 1px solid black; border-collapse:collapse; float:left; margin:auto\">")

for(let i = 0; i < 8; i++)
{
	document.write("<tr>")

	for(let j = 0; j < 8; j++)
	{
		if(a1[i][j].toString === "Start"){
			document.write("<td id = \""+a1[i][j].locationx+a1[i][j].locationy+"\" class = \"success\"style = \"border: 1px solid black; padding: 10px\">")
		}
		else{ 
			document.write("<td id = \""+a1[i][j].locationx + a1[i][j].locationy+"\" style = \"border: 1px solid black; padding: 10px\">")
		}
		document.write(a1[i][j].toString)
		document.write("</td>")
	}

	document.write("</tr>")
}

document.write("</table>")

$( document ).ready(function() {

	document.getElementById("locationStat").innerHTML = ("{" + (player.locationy + 1) + ", "+ (player.locationx + 1) +"}")
	document.getElementById("hpStat").innerHTML = player.hp



	if(!player.prizes.length === 0)
	{
		document.getElementById("prizesStat").innerHTML = player.prizes
	}
	else{
		document.getElementById("prizesStat").innerHTML = "You have no prizes yet"
	}

});
//=======================================================CREATING ITEM OBJECTS

//XX Write a while loop that ends when the user chooses not to continue the game
//in the while loop...
//XX create a prompt that asks the user if he/she wants to continue
// if the user wants to continue
//prompt for direction, up, down, left, right

$( document ).ready(function() {

let quit = false

outcome += a1[player.locationx][player.locationy].statement + "\n"

			instructions += "Type \"up\" to move up, \"left\" for left, \"down\" for down, \"right\" for right\n"
			document.getElementById("UpBtn").onclick = function () { 

				if(player.locationx !== 0)
					{
						if(a1[player.locationx -1][player.locationy ].toString === "Wall")
						{
								outcome += "You have hit a wall!\n"
						}
						else
							{
								if(a1[player.locationx][player.locationy].function !== undefined)
								{
									a1[player.locationx][player.locationy].function
								}
								player.locationx--
							}

					}
					else{
						outcome += "You have hit the top of the map!\n"
					}
					refreshStats()
					changeColors()	
				}
			 
			document.getElementById("DownBtn").onclick = function () { 
				if(player.locationx !== 7)
					{
						if(a1[player.locationx +1][player.locationy ].toString === "Wall")
						{
								outcome += "You have hit a wall!\n"
						}
						else
						{
							if(a1[player.locationx][player.locationy].function !== undefined)
							{
								a1[player.locationx][player.locationy].function
							}
							player.locationx++
						}

					}
					else{
						outcome += "You have hit the bottom of the map\n"
					}
					refreshStats()
					changeColors()					
				}
			 
			document.getElementById("LeftBtn").onclick = function () { 
				if(player.locationy !== 0)
					{
						if(a1[player.locationx][player.locationy -1].toString === "Wall")
						{
								outcome += "You have hit a wall!\n"
						}
						else
						{
							if(a1[player.locationx][player.locationy].function !== undefined)
								{
									a1[player.locationx][player.locationy].function
								}
							player.locationy--
						}

					}
					else{
						outcome += "You have hit the left of the map\n"
					}
					refreshStats()
					changeColors()					
				}
			
			document.getElementById("RightBtn").onclick = function () { 
				if(player.locationy !== 7)
					{
						if(a1[player.locationx][player.locationy +1].toString === "Wall")
						{
								outcome += "You have hit a wall!\n"
						}
						else
						{
							if(a1[player.locationx][player.locationy].function !== undefined)
								{
									a1[player.locationx][player.locationy].function
								}
							player.locationy++
						}

					}
					else{
						outcome += "You have hit the right of the map\n"
					}
					refreshStats()
					changeColors()			
				}

			});

			let refreshStats = function() {
				document.getElementById("locationStat").innerHTML = ("{" + (player.locationy + 1) + ", "+ (player.locationx + 1) +"}")
				document.getElementById("instructionsStat").innerHTML = instructions
				document.getElementById("outcomeStat").innerHTML = outcome
			}

			let changeColors = function() {
				//document.getElementById(player.locationx+","+player.locationy).className = "success"
				$("#"+player.locationx+player.locationy).attr("class","success")
			}

			

			




		// } 
		// else {
	 //    	quit = true
		// }
	


	

