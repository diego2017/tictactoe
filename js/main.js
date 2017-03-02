$(document).ready(function(){

  $('.selectUser').hide()
  $('.board').hide();
  $('.options2').hide();
  $('h2#points').hide();
  $('h2#round').hide();
  window.activeAi = false;
  var counter = 0;
  var aiLevel = 'hard';
  var usersSelected = 0;
  window.round = 1;
  window.winsPlayer0 = 0;
  window.winsPlayer1 = 0;

  window.gameOver = false;


  window.player = 0;

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
          if (player===0){
            window.winsPlayer0 +=1;
          } else {
            window.winsPlayer1 +=1;
          };
          game.players[player].timeWon += 1;
          console.log('THE WINNER IS: ' + winner);
          alert ('THE WINNER IS: ' + winner);
          console.log('player 1 won: '+ window.winsPlayer0  + ' times. Player 2: ' + window.winsPlayer1  + ' times.');
          window.player = 0;
          window.gameOver = true;

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
  };  // end of game object ////



////  Events ////

      $('.board td').on("click", function(){
        var row = $(this).attr('row');
        var col = $(this).attr('column');
        console.log(row + ", " + col);
        game.modifyBoard(player,row,col);
        $(this).addClass(game.players[player].image);

        // var gameOver = game.findWinner();

        if( gameOver ){

          window.youWon(); // also resetGame
          // debugger;

          return;
        }

      /// delete this, just for testing
        counter = counter + 1;
        console.log(counter);
      ///

        if (window.player === 0 ){
          window.player = 1
        } else {
          window.player = 0
          if (activeAi === true) {
            window.aI();
          }
        }


      });

      window.resetGame = function (){
        window.game.board = [
          [null,null,null],
          [null,null,null],
          [null,null,null]
        ];
        window.round += 1;
        window.setTimeout(function () {
          $("td").removeClass( );
          // continue new game
          if (activeAi === true) {
            console.log('playing first AI move in new game');
            window.aI();
          }
        }, 2000);
        window.player= 0;
        window.gameOver = false;
        $('h2#round').html('Round ' + window.round)
        $('h2#points').html(game.players[0].name + ': ' +  window.winsPlayer0 + '  -  ' + game.players[1].name + ': ' + window.winsPlayer1 );
        // debugger;
      };


      window.youWon = function () {
        $("td").removeClass( );
        $("td").addClass("win");
        window.resetGame();
      };

///////// user selection

    $('#playerPlayer').on("click", function() {
        $('.selectUser').show();
        $('.userOptions td').show()
    });

    $('.userOptions td').on("click", function() {    //select players

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
          $('h2#points').show();
          $('h2#round').show();
          $('h2#points').html(game.players[0].name + ': 0  -  ' + game.players[1].name + ': 0');
          if (window.activeAi === true){
            window.aI();
          };
        }
    });

    $('#startAgain').click(function() {
      location.reload();
    });

    $('#playerRobot').click(function() {
      activeAi = true;
      $('.selectUser').show();
      $('.userOptions td').show()
      window.game.players[0].image =  'robot';
      window.game.players[0].name = 'Robot';
      usersSelected = 1;

    });      // btn playerRobot

/// AI section - Robot vs Player
  window.createMove = function(){

    if (aiLevel === 'easy'){
      var row = (Math.round(Math.random() * 2)).toString();
      var col = (Math.round(Math.random() * 2)).toString();
      if (window.game.board[row][col] == null){
        var selected = row+col;
        return selected;
      }else{
        return createMove();
      }
    }          // aiLevel: easy
    //
    if (aiLevel === 'hard'){
      var boardSummary = window.game.board.toString();
      if (boardSummary === ",,,,,,,,"){
        $('td#00').trigger( "click" );
      }
      else if ( ((game.board[0][0] === 0 )&&(game.board[0][2] === 0 )&&(game.board[0][1]===null)) ||
                ((game.board[1][1] === 0 )&&(game.board[2][1] === 0 )&&(game.board[0][1]===null)) ){
        $('td#01').trigger( "click" );
      }
      else if ( ((game.board[0][0] === 0 )&&(game.board[0][1] === 0 )&&(game.board[0][2]===null)) ||
                ((game.board[1][2] === 0 )&&(game.board[2][2] === 0 )&&(game.board[0][2]===null)) ||
                ((game.board[2][0] === 0 )&&(game.board[1][1] === 0 )&&(game.board[0][2]===null)) ){
        $('td#02').trigger( "click" );
      }
      else if ( ((game.board[0][0] === 0 )&&(game.board[2][0] === 0 )&&(game.board[1][0]===null)) ||
                ((game.board[1][1] === 0 )&&(game.board[1][2] === 0 )&&(game.board[1][0]===null)) ){
        $('td#10').trigger( "click" );
      }
      else if ( ((game.board[1][0] === 0 )&&(game.board[1][2] === 0 )&&(game.board[1][1]===null)) ||
                ((game.board[0][1] === 0 )&&(game.board[2][1] === 0 )&&(game.board[1][1]===null)) ||
                ((game.board[2][0] === 0 )&&(game.board[0][2] === 0 )&&(game.board[1][1]===null)) ||
                ((game.board[0][2] === 0 )&&(game.board[2][2] === 0 )&&(game.board[1][1]===null)) ){
        $('td#11').trigger( "click" );
      }
      else if ( ((game.board[0][2] === 0 )&&(game.board[2][2] === 0 )&&(game.board[1][2]===null)) ||
                ((game.board[1][0] === 0 )&&(game.board[1][1] === 0 )&&(game.board[1][2]===null)) ){
        $('td#12').trigger( "click" );
      }
      else if ( ((game.board[0][0] === 0 )&&(game.board[1][0] === 0 )&&(game.board[2][0]===null)) ||
                ((game.board[2][1] === 0 )&&(game.board[2][2] === 0 )&&(game.board[2][0]===null)) ||
                ((game.board[0][2] === 0 )&&(game.board[1][1] === 0 )&&(game.board[2][0]===null)) ){
        $('td#20').trigger( "click" );
      }
      else if ( ((game.board[2][0] === 0 )&&(game.board[2][2] === 0 )&&(game.board[2][1]===null)) ||
                ((game.board[0][1] === 0 )&&(game.board[1][1] === 0 )&&(game.board[2][1]===null)) ){
        $('td#21').trigger( "click" );
      }
      else if ( ((game.board[2][0] === 0 )&&(game.board[2][1] === 0 )&&(game.board[2][2]===null)) ||
                ((game.board[0][2] === 0 )&&(game.board[0][1] === 0 )&&(game.board[2][2]===null)) ||
                ((game.board[0][0] === 0 )&&(game.board[1][1] === 0 )&&(game.board[2][2]===null)) ){
        $('td#22').trigger( "click" );
      }
      else if ( (boardSummary === "0,1,,,,,,,") ||
                (boardSummary === "0,,,1,,,,,") ||
                (boardSummary === "0,,,,,1,,,") ||
                (boardSummary === "0,,,,,,,1,") ){
        $('td#11').trigger( "click" );
      }
      else if ( (boardSummary === "0,1,,,0,,,,1") ||
                (boardSummary === "0,,,1,0,,,,1") ||
                (boardSummary === "0,,,,0,1,,,1") ||
                (boardSummary === "0,,,,0,,,1,1") ){
        $('td#20').trigger( "click" );
      }
      else if ( (boardSummary === "0,,1,,,,,,") ||
                (boardSummary === "0,,,,,,,,1")){
        $('td#20').trigger( "click" );
      }
      else if ( (boardSummary === "0,,,,,,1,,")){
        $('td#22').trigger( "click" );
      }
      else if ( (boardSummary === "0,,1,1,,,0,,")){
        $('td#22').trigger( "click" );
      }
      else if ( (boardSummary === "0,,,1,,,0,,1")){
        $('td#02').trigger( "click" );
      }
      else if ( (boardSummary === "0,,,,1,,,,")){
        $('td#22').trigger( "click" );
      }
      else if ( (boardSummary === "0,,1,,1,,,,0")){
        $('td#20').trigger( "click" );
      }  //"0,,,,1,,1,,0"
      else if ( (boardSummary === "0,,,,1,,1,,0")){
        $('td#02').trigger( "click" );
      }
      else {
        aiLevel = 'easy';
        return createMove();
      };
    }         // aiLevel hard
  };       // createMove

  window.aI = function (){
    window.setTimeout(function () {
      var selection = createMove();
      $('td#' + selection).trigger( "click" );  // this clicks
    }, 500);
  };      // aI



});  // end of code //
