$(document).ready(function(){

  $('.selectUser').hide()
  $('.board').hide();
  $('.options2').hide();


  var usersSelected = 0;

  window.game = {

    board : [
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ],

    players : [
      {
        player: 0,
        name: 'Player 1',
        token: 'x',
        image: 'one'
      },
      {
        player: 1,
        name: 'Player 2',
        token: 'o',
        image: 'three'
      }
    ],

    findWinner : function (){
      var winner = null;
      this.players.forEach(function(player){
        player = player.player;
        if ((game.board[0][0]===player) && (game.board[0][1]===player) && (game.board[0][2]===player)||
            (game.board[1][0]===player) && (game.board[1][1]===player) && (game.board[1][2]===player)||
            (game.board[2][0]===player) && (game.board[2][1]===player) && (game.board[2][2]===player)||

            (game.board[0][0]===player) && (game.board[1][0]===player) && (game.board[2][0]===player)||
            (game.board[0][1]===player) && (game.board[1][1]===player) && (game.board[2][1]===player)||
            (game.board[0][2]===player) && (game.board[1][2]===player) && (game.board[2][2]===player)||

            (game.board[0][0]===player) && (game.board[1][1]===player) && (game.board[2][2]===player)||
            (game.board[2][0]===player) && (game.board[1][1]===player) && (game.board[0][2]===player)
        ) {
          winner = game.players[player].name
          console.log('THE WINNER IS: ' + winner);
          alert ('THE WINNER IS: ' + winner);
          window.youWon();

        };
      });
    },    //close findWinner

    modifyBoard : function (player, row, column){
      if (this.board[row][column] === null){
        this.board[row][column] = player;
      };
      console.log(game.board[0]);
      console.log(game.board[1]);
      console.log(game.board[2]);
      this.findWinner();
    }

  };  // end of game ////



////  Events ////

      var player = 0 ;
      $('.board td').on("click", function(){
        var row = $(this).attr('row');
        var col = $(this).attr('column');
        console.log(row + ", " + col);
        game.modifyBoard(player,row,col);
        $(this).addClass(game.players[player].image);

        if (player ===0 ){
          player = 1
        } else {
          player = 0
        };
      });

      window.resetGame = function (){
        window.setTimeout(function () {
          $("td").removeClass( );
        }, 2000);
        usersSelected = 0;

      };


      window.youWon = function () {
        window.game.board = [
          [null,null,null],
          [null,null,null],
          [null,null,null]
        ];
        $("td").removeClass( );
        $("td").addClass("win");
        window.resetGame();
      };

///////// user selection

    $('#playerPlayer').on("click", function() {
        $('.selectUser').show();
        $('.userOptions td').show()
    });

    $('.userOptions td').on("click", function() {
        debugger;
        window.game.players[usersSelected].image =  $(this).attr('class');
        var name = window.prompt("What is your name? "," ");
        window.game.players[usersSelected].name = name;
        $(this).hide();

        usersSelected = usersSelected + 1;

        if (usersSelected >1){  //once both selected
          $('.selectUser').hide();  //hide options
          $('.options').hide();
          $('.options2').show();
          $('.board').show();
        }
    });

    $('#startAgain').click(function() {
      location.reload();
    });




});  // end of code //
