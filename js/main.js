$(document).ready(function(){

  window.game = {

    board : [
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ],

    players : [
      {
        player: 1,
        name: 'one',
        token: 'x'
      },
      {
        player: 2,
        name: 'two',
        token: 'o'
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
          console.log('THE WINNER IS: ' + player);

        };
      });
    },    //close findWinner

    modifyBoard : function (player, column, row){
      if (this.board[column][row] === null){
        this.board[column][row] = player;
      };
      console.log(game.board[0]);
      console.log(game.board[1]);
      console.log(game.board[2]);
      this.findWinner();
    }

  };  // end of game ////
});   // end of code //
