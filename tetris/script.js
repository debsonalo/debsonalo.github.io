document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    
    /*the array.from selects all the divs under 
    the class name of div and puts them into an array*/
    let squares = Array.from(document.querySelectorAll('.grid div'))

    /*THe const ScoreDisplay selects the element with
    the id of score*/
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10
    let timerId
    let score = 0
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
       ]

    //The Tetrominos

    const lTetromino = [
        [1, 11, 21, 22],
        [10, 11, 12, 22],
        [1, 11, 21, 20],
        [10, 20, 21, 22],
    ]

    const zTetromino = [
        [0, 10, 11, 21],
        [10, 11, 21, 22],
        [2, 11, 12, 21],
        [11, 12, 20, 21]
    ]

    const tTetromino = [
        [1,10,11,12],
        [1,11,12,21],
        [10,11,12,21],
        [1,10,11,21]
    ]

    const oTetromino = [
        [0,1,10,11],
        [1,2,11,12],
        [0,1,10,11],
        [1,2,11,12]
    ]

    const iTetromino = [
        [1,11,21,31],
        [10,11,12,13],
        [1,11,21,31],
        [10,11,12,13]
    ]


    const theTetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]


let currentPosition = 4;
let currentRotation = 0;
//selecting one of the tetrominos randomly with its first rotation
let random = Math.floor(Math.random()*theTetrominos.length)
//the random picks any of the 5 tetrominos in the array and i think the 0 is for their first rotation
//starts at the first rotation of any random tetromino--

let current = theTetrominos[random][currentRotation]

//drawing the tetromino--
/*i accessed the css stylesheet by using classList.add() to add
the style of Tetromino to the squares in the tetrominos*/


function draw() {
    current.forEach(index =>{
        squares[currentPosition + index].classList.add('tetromino')
        squares[currentPosition + index].style.backgroundColor = colors[random]
    })
}

//undrawing the tetromino--

function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor = ''
    })
}


//assigning functions to keycodes--
function control(e) {
    if(e.keyCode === 37) {
        moveLeft()
    }  else if (e.keyCode === 38){
        rotate()
    } else if (e.keyCode === 39){
       moveRight()
    } else if (e.keyCode === 40) {
        moveDown()
    }
}
document.addEventListener('keyup', control)

//move down function--
function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
}


//freeze function--
function freeze() {
if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    //start a new tetromino falling--
    random = nextRandom
    nextRandom = Math.floor(Math.random() * theTetrominos.length)
    current = theTetrominos[random][currentRotation]
    currentPosition = 4
    draw()
    displayShape()
    addScore()
    gameOver()
 }
}

//moving the tetromino left, unless it is at the edge or there is a blockage--
function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

    if(!isAtLeftEdge) currentPosition -=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        currentPosition +=1
    }

    draw()
}

function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

    if(!isAtRightEdge) currentPosition +=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        currentPosition -=1
    }

    draw()
}

function rotate() {
    undraw()
    currentRotation ++
    if(currentRotation === current.length) { //if the current rotation gets to 4, make it go back to 0
    currentRotation = 0
}
current = theTetrominos[random][currentRotation]
draw()
}


//show up-next tetromino in mini-grid display
const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
const displayIndex = 0
let nextRandom = 0

//the Tetrominos without rotations
const upNextTetrominos = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
]


//display the shape in the mini-grid display
function displayShape() {
    //remove any trace of a tetromino form the entire grid
    displaySquares.forEach(square => {
        square.classList.remove('tetromino')
        square.style.backgroundColor = ''
    })
    upNextTetrominos[nextRandom].forEach( index => {
        displaySquares[displayIndex + index].classList.add('tetromino')
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
}


//adding functionality to the button
startBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        timerId = null
    } else {
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random()*theTetrominos.length)
        displayShape()
    }
})

//add score
function addScore() {
    for (let i = 0; i < 199; i +=width) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

        if(row.every(index => squares[index].classList.contains('taken'))) {
            score += 10
            scoreDisplay.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetromino')
                squares[index].style.backgroundColor = ''
            })
                 const squaresRemoved= squares.splice(i, width)
                 squares = squaresRemoved.concat(squares)
                 squares.forEach(cell => grid.appendChild(cell))
        }
    }
}

//game over--
function gameOver () {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
       scoreDisplay.innerHTML = ' Game Over' 
        clearInterval(timerId)
    }
}












})