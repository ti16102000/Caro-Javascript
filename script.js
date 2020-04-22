$(document).ready(function () {
    $('#valueNumber').keyup(function (e) {
        
        var value = $('#valueNumber').val();
        if (value > 5 && value <= 30) {
            $('#containCaro').attr("data-number","0")
            var caro = value * value;
            $('#containCaro').html("");
            $('#containCaro').css({
                'display': 'grid',
                'grid-template-columns': 'repeat(' + value + ',1fr)'
            });
            var col = 1, row = 1;

            for (let i = 0; i < caro; i++) {
                if (col <= value) {
                    $('#containCaro').append('<div class="square" data-check="0" data-row="' + row + '" data-col="' + col + '"></div>');

                } else {
                    col = 1;
                    row++;
                    $('#containCaro').append('<div class="square" data-check="0" data-row="' + row + '" data-col="' + col + '"></div>');
                }
                col++;
            }
        } else {
            $('#containCaro').html("");
        }
        $('.square').click(function (e) {
            if ($(this).attr('data-check') == 0) {
                if ($('#containCaro').attr('data-number') == 0) {
                    $(this).append('<strong style="color:blue;" >X</strong>');
                    $(this).attr('data-value', 'X');
                    $('#containCaro').attr('data-number', '1');

                    if (checkDiagonalRightWin($(this).attr('data-col'), $(this).attr('data-row'), value, "X") == 4) {
                        noticeWin("X");
                    }
                    if (checkDiagonalLeftWin($(this).attr('data-col'), $(this).attr('data-row'), value, "X") == 4) {
                        noticeWin("X");
                    }
                    if (checkHorizontalWin($(this).attr('data-row'), "X", value) >= 5) {
                        noticeWin("X");
                    }
                    if (checkVerticalWin($(this).attr('data-col'), "X", value) >= 5) {
                        noticeWin("X");
                    }
                } else if ($('#containCaro').attr('data-number') == 1){
                    $(this).append('<strong style="color:red;">O</strong>');
                    $(this).attr('data-value', 'O');
                    $('#containCaro').attr('data-number', '0');
                    if (checkDiagonalRightWin($(this).attr('data-col'), $(this).attr('data-row'), value, "O") == 4) {
                        noticeWin("O");
                    }
                    if (checkDiagonalLeftWin($(this).attr('data-col'), $(this).attr('data-row'), value, "O") == 4) {
                        noticeWin("O");
                    }
                    if (checkHorizontalWin($(this).attr('data-row'), "O", value) >= 5) {
                        noticeWin("O");
                    }
                    if (checkVerticalWin($(this).attr('data-col'), "O", value) >= 5) {
                        noticeWin("O");
                    }
                }
                $(this).attr('data-check', '1')
            }

        });
    });

});
function checkHorizontalWin(numberRow, valueCheck) {
    var count = 0;
    var ls = $('.square[data-row=' + numberRow + '][data-value=' + valueCheck + ']');
    if (ls.length >= 5) {
        for (i = 0; i < ls.length; i++) {
            var nextCol = parseInt($(ls[i + 1]).attr("data-col"));
            var CurrentCol = parseInt($(ls[i]).attr("data-col"));
            if (nextCol == CurrentCol + 1 || i == ls.length - 1) {
                count++;
            } else { count = 0; }
        }
    }
    return count;
}
function checkVerticalWin(numberCol, valueCheck) {
    var count = 0;
    var ls = $('.square[data-col=' + numberCol + '][data-value=' + valueCheck + ']');
    if (ls.length >= 5) {
        for (i = 0; i < ls.length; i++) {
            var nextRow = parseInt($(ls[i + 1]).attr("data-row"));
            var CurrentRow = parseInt($(ls[i]).attr("data-row"));
            if (nextRow == CurrentRow + 1 || i == ls.length - 1) {
                count++;
            } else { count = 0; }
        }
    }
    return count;
}
function checkDiagonalLeftWin(numberCol, numberRow, caro, valueCheck) {
    var row = parseInt(numberRow);
    var col = parseInt(numberCol);
    var totalRow = parseInt(caro);
    var count = 0;
    while (row > 1 && col > 1) {
        row--;
        col--;
    }
    for (i = 0; i < (totalRow-row); i++) {
        var cur = $('.square[data-col=' + (col + i) + '][data-row=' + (row + i) + ']').attr('data-value');
        var next = $('.square[data-col=' + (col + (i + 1)) + '][data-row=' + (row + (i + 1)) + ']').attr('data-value');
        if (cur == valueCheck && next == valueCheck) {
            count++;
        } else { count = 0; }
        if (count == 4) {
            return count;
        }
    }
    return count;
}
function checkDiagonalRightWin(numberCol, numberRow, caro, valueCheck) {
    var row = parseInt(numberRow);
    var col = parseInt(numberCol);
    var totalRow = parseInt(caro);
    var count = 0;
    while (row > 1 && col < totalRow) {
        row--;
        col++;
    }
    for (i = 0; i < (totalRow-row); i++) {
        var cur = $('.square[data-col=' + (col - i) + '][data-row=' + (row + i) + ']').attr('data-value');
        var next = $('.square[data-col=' + (col - (i + 1)) + '][data-row=' + (row + (i + 1)) + ']').attr('data-value');
        if (cur == valueCheck && next == valueCheck) {
            count++;
        } else { count = 0; }
        if (count == 4) {
            return count;
        }
    }
    return count;
}

function noticeWin(valueCheck) {
    alert(valueCheck + " WIN!");
    $('#containCaro').removeAttr('data-number');
}