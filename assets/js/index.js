function drop(ev) {
    ev.preventDefault();
    var targetElement = ev.target;

    if (targetElement.classList.contains("grid")){
      var mouseX = ev.clientX;
      var mouseY = ev.clientY;

      var changeElement = document.elementFromPoint(mouseX, mouseY);
      if (!changeElement.classList.contains('grid')) {
          changeElement = changeElement.parentNode;
          if (!changeElement.classList.contains('grid')) {
            return;
          }
      }

      if(changeElement.id == ('grid5'))
      {
        return;
      }
      if (targetElement !== changeElement) {
        var tempHTML = targetElement.innerHTML;
        targetElement.innerHTML = changeElement.innerHTML;
        changeElement.innerHTML = tempHTML;
      }
    }
  }

  function addPlay() {
    var elements = document.querySelectorAll(".grid");
    elements.forEach(function(element) {
      element.classList.toggle("play");
      if (element.draggable === true) {
        element.draggable = false;
      } else if(element.id != 'grid5') {
        element.draggable = true;
      }
    });
  }

/*
const cells = document.querySelectorAll('.cell:not(.button)');

cells.forEach(cell => {
  if (Math.random() < 0.5) { 
    const randomNumber = Math.floor(Math.random() * 9) + 1; 
    cell.textContent = randomNumber;
  } else {
    cell.textContent = '';
  }
});*/

var actual = document.getElementById('home');
var actual_play = document.getElementById('grid5');
var viewObj = { key: "view", value: "grid1" };
var homeObj ={ key: "home", value: "grid5" }; 
var aboutObj = { key: "about", value: "grid3" };
var docsObj = { key: "docs", value: "grid7" };
var toolsObj = { key: "tools", value: "grid9" };

function changePage(name)
{
  console.log(name.key);
  console.log(name.value);

  var def = document.getElementById(name.key);
  var def_play = document.getElementById(name.value);

  if(def != actual){
    def.classList.remove("hidden");
    def_play.classList.add("play-hover")
  
    actual.classList.add("hidden");
    actual_play.classList.remove("play-hover")
    actual = def;
    actual_play = def_play;
  }

}














document.addEventListener('DOMContentLoaded', function () {
const cells = document.querySelectorAll('.cell:not(.button)');
    

// Fonction pour résoudre le Sudoku en utilisant la récursivité
function solveSudoku(grid) {
  for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
          if (grid[row][col] === '') {
              for (let num = 1; num <= 9; num++) {
                  if (isValid(grid, row, col, num)) {
                      grid[row][col] = num;
                      if (solveSudoku(grid)) {
                          return true;
                      }
                      grid[row][col] = '';
                  }
              }
              return false;
          }
      }
  }
  return true;
}

    // Fonction pour afficher la grille Sudoku
    function displaySudoku(grid) {
        let index = 0;
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
              if(cells[index] != null)
              {
                cells[index].textContent = grid[row][col];
                index++;
              }
                
            }
        }
    }
    // Fonction pour vérifier si une valeur peut être placée dans une cellule sans violer les règles du Sudoku
    function isValid(grid, row, col, num) {
      // Vérifier la ligne
      for (let x = 0; x < 9; x++) {
          if (grid[row][x] === num) {
              return false;
          }
      }
      
      // Vérifier la colonne
      for (let x = 0; x < 9; x++) {
          if (grid[x][col] === num) {
              return false;
          }
      }
      
      // Vérifier la sous-grille 3x3
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
              if (grid[startRow + i][startCol + j] === num) {
                  return false;
              }
          }
      }
      
      return true;
  }
    
    // Fonction pour générer un Sudoku valide avec des cases préremplies aléatoires
function generateValidSudoku() {
    const grid = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            row.push('');
        }
        grid.push(row);
    }

    // Remplir quelques cases avec des nombres aléatoires valides
    for (let i = 0; i < 45; i++) { // Vous pouvez ajuster le nombre de cases préremplies selon vos besoins
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        const num = Math.floor(Math.random() * 9) + 1;
        if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
        }
    }
    //solveSudoku(grid);
    displaySudoku(grid);
    console.log(grid);
}
    
    // Générer et afficher le Sudoku aléatoire au chargement de la page
    generateValidSudoku();
  });