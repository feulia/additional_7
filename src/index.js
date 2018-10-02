module.exports = function solveSudoku(matrix) {
  var mainArray = [];
  var tempNumber = 0;

  while (tempNumber < 9 * 9) {
    var x = tempNumber / 9 | 0;
    var y = tempNumber % 9;
    var tempObject = { a: tempNumber, b: null, index: 0 };
    matrix[x][y] === 0 && mainArray.push(tempObject);
    tempNumber++;
  }

  function getPos(x, y, scheme) {

    var table = new Object();
    var currentPos = 0;
    var side = 3;

    while (currentPos < 9) {
      table[scheme[y][currentPos]] = 1;
      table[scheme[currentPos][x]] = 1;
      var posX = side * (y / side | 0) + (currentPos / side | 0);
      var posY = side * (x / side | 0) + currentPos % side;
      table[scheme[posX][posY]] = 1;
      currentPos++;
    }

    var position = [];
    var isIn = function isIn(number) {
      return number in table;
    };
    var i = 0;

    while (i <= 9) {
      if (!isIn(i)) {
        position.push(i);
      }
      i++;
    }

    return position;
  }

  var i = 0;

  while (i < mainArray.length) {

    var cell = mainArray[i];
    var _y = cell.a / 9 | 0;
    var _x = cell.a % 9;
    var isToBeToggled = false;

    cell.b = cell.b || getPos(_x, _y, matrix);

    if (cell.index >= cell.b.length) {
      cell.b = null;
      cell.index = 0;
      matrix[_y][_x] = 0;
      isToBeToggled = false;
    } else {
      matrix[_y][_x] = cell.b[cell.index++];
      isToBeToggled = true;
    }

    isToBeToggled ? i++ : i--;
  }
  
  return matrix;
}
