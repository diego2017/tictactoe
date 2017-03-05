$(document).ready(function(){
  // preparing the page to be shown to user. It hides sections not shown when the page is loaded
  $('.selectUser').hide()
  $('.board').hide();
  $('.options2').hide();
  $('h2#points').hide();
  $('h2#round').hide();
  // declaration of variables
  window.activeAi = false;    // Computer player is inactive when the page is loaded
  window.counter = 0;         // Counts the moves done by players. Used to reset after draw
  window.round = 1;
  window.winsPlayer0 = 0;     // Times player0 has won
  window.winsPlayer1 = 0;     // Times player1 has won
  window.gameOver = false;
  window.draw = false;
  window.player = 0;          // Player 0 always starts playing
  var aiLevel = 'hard';       // Setting AI level to hard
  var usersSelected = 0;      // Used to determine when both players are selected, or 1 player with AI

  // Object window.game
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
        if (
          (game.board[0][0]===player) && (game.board[0][1]===player) && (game.board[0][2]===player)||
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
          $('#messages').html(winner + ' wins !')
          window.setTimeout(function () {
            $('#messages').html('')
          }, 2000);
          console.log('THE WINNER IS: ' + winner);
          window.player = 0;
          window.gameOver = true;
        } else if (counter >7){
          window.draw = true;
        };
      }); // closing this.players.forEach function
    },    //close findWinner
    modifyBoard : function (player, row, column){
      if (this.board[row][column] === null){
        this.board[row][column] = player;
      };
      console.log(game.board[0]);
      console.log(game.board[1]);
      console.log(game.board[2]);
      this.findWinner();   // to check if anybody has won
    }
  };  // end of game object ////

  // This section includes the event listener for the squares to be selected by players,
  $('.board td').on("click", function(){
    var row = $(this).attr('row');
    var col = $(this).attr('column');
    console.log(row + ", " + col);
    if (window.game.board[row][col] === null){     // checks that the square hasn't been selected
      $(this).addClass(window.game.players[player].image);  //square shows player's image
      window.game.modifyBoard(player,row,col);  //modify the board inside game.board
      window.counter +=1;
      console.log(window.counter);
      if (window.player === 0 ){
        window.player = 1
      } else {
        window.player = 0
        if (activeAi === true) {  // If Player vs Robot is selected, aI will play
          window.aI();
        }
      }
    };
    if( gameOver ){
      window.youWon(); // also function resetGame which is called from youWon
      return;
    };
    if( draw ){   // when nobody has won but all squares have been selected
      window.draw = false;
      $('#messages').html(' Draw ')
      window.setTimeout(function () {
        $('#messages').html('')
      }, 2000);
      resetGame();
      return;
    }
  });       // closing $('.board td').on("click"...

  // Functions. Includes resetGame & youWon
  window.resetGame = function (){
    window.game.board = [
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ];
    window.round += 1;
    var aiLevel = 'hard';
    window.setTimeout(function () {
      $("td").removeClass( );
      // continue new game
      if (activeAi === true) {
        window.aI();  //playing first AI move in new game'
      }
    }, 2000);
    window.player= 0;
    window.counter=0;
    window.gameOver = false;
    // Info displayed to players: round number and games won by each player
    $('h2#round').html('Round ' + window.round)
    $('h2#points').html(game.players[0].name + ': ' +  window.winsPlayer0 + '  -  ' + game.players[1].name + ': ' + window.winsPlayer1 );
  };
  window.youWon = function () {
    $("td").removeClass( );
    $("td").addClass("win");
    window.resetGame();
  };

 //Event listeners for 4 buttons selected by players: playerPlayer, userOptions, startAgain and playerRobot
  $('#playerPlayer').on("click", function() {
      $('.selectUser').show();
      $('.userOptions td').show();
      $('.options').hide();
  });   // close playerPlayer
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
  });   // close userOptions
  $('#startAgain').click(function() {
    location.reload();
  });
  $('#playerRobot').click(function() {
    activeAi = true;
    $('.selectUser').show();
    $('.options').hide();
    $('.userOptions td').show()
    window.game.players[0].image =  'robot';
    window.game.players[0].name = 'Robot';
    usersSelected = 1;

  });      // close playerRobot

  //AI section - When Robot vs Player is selected
  window.createMove = function(){   // function to create positions on board. options: easy and hard
    if (aiLevel === 'easy'){
      var row = (Math.round(Math.random() * 2)).toString();
      var col = (Math.round(Math.random() * 2)).toString();
      if (window.game.board[row][col] == null){
        var selected = row+col;
        aiLevel = 'hard';
        return selected;
      }else{
        return createMove();
      }
    };  // close aiLevel: easy
    if (aiLevel === 'hard'){
      var boardSummary = window.game.board.toString();
      if (boardSummary === ",,,,,,,,"){
        $('td#00').trigger( "click" );
      }
      // square to select when winning is possible
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
      //// moves to prevent that player wins
      else if ( ((game.board[0][0] === 1 )&&(game.board[0][2] === 1 )&&(game.board[0][1]===null)) ||
                ((game.board[1][1] === 1 )&&(game.board[2][1] === 1 )&&(game.board[0][1]===null)) ){
        $('td#01').trigger( "click" );
      }
      else if ( ((game.board[0][0] === 1 )&&(game.board[0][1] === 1 )&&(game.board[0][2]===null)) ||
                ((game.board[1][2] === 1 )&&(game.board[2][2] === 1 )&&(game.board[0][2]===null)) ||
                ((game.board[2][0] === 1 )&&(game.board[1][1] === 1 )&&(game.board[0][2]===null)) ){
        $('td#02').trigger( "click" );
      }
      else if ( ((game.board[0][0] === 1 )&&(game.board[2][0] === 1 )&&(game.board[1][0]===null)) ||
                ((game.board[1][1] === 1 )&&(game.board[1][2] === 1 )&&(game.board[1][0]===null)) ){
        $('td#10').trigger( "click" );
      }
      else if ( ((game.board[1][0] === 1 )&&(game.board[1][2] === 1 )&&(game.board[1][1]===null)) ||
                ((game.board[0][1] === 1 )&&(game.board[2][1] === 1 )&&(game.board[1][1]===null)) ||
                ((game.board[2][0] === 1 )&&(game.board[0][2] === 1 )&&(game.board[1][1]===null)) ||
                ((game.board[0][2] === 1 )&&(game.board[2][2] === 1 )&&(game.board[1][1]===null)) ){
        $('td#11').trigger( "click" );
      }
      else if ( ((game.board[0][2] === 1 )&&(game.board[2][2] === 1 )&&(game.board[1][2]===null)) ||
                ((game.board[1][0] === 1 )&&(game.board[1][1] === 1 )&&(game.board[1][2]===null)) ){
        $('td#12').trigger( "click" );
      }
      else if ( ((game.board[0][0] === 1 )&&(game.board[1][0] === 1 )&&(game.board[2][0]===null)) ||
                ((game.board[2][1] === 1 )&&(game.board[2][2] === 1 )&&(game.board[2][0]===null)) ||
                ((game.board[0][2] === 1 )&&(game.board[1][1] === 1 )&&(game.board[2][0]===null)) ){
        $('td#20').trigger( "click" );
      }
      else if ( ((game.board[2][0] === 1 )&&(game.board[2][2] === 1 )&&(game.board[2][1]===null)) ||
                ((game.board[0][1] === 1 )&&(game.board[1][1] === 1 )&&(game.board[2][1]===null)) ){
        $('td#21').trigger( "click" );
      }
      else if ( ((game.board[2][0] === 1 )&&(game.board[2][1] === 1 )&&(game.board[2][2]===null)) ||
                ((game.board[0][2] === 1 )&&(game.board[0][1] === 1 )&&(game.board[2][2]===null)) ||
                ((game.board[0][0] === 1 )&&(game.board[1][1] === 1 )&&(game.board[2][2]===null)) ){
        $('td#22').trigger( "click" );
      }
      // specific moves to win
      else if ( (boardSummary === "0,1,,,,,,,") ||
                (boardSummary === "0,,,1,,,,,") ||
                (boardSummary === "0,,,,,1,,,") ||
                (boardSummary === "0,,,,,,,1,") ){
        $('td#11').trigger( "click" );
      }
      else if ( (boardSummary === "0,,,,1,,,1,0")){
        $('td#02').trigger( "click" );
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
      }
      else if ( (boardSummary === "0,,,,1,,1,,0")){
        $('td#02').trigger( "click" );
      }
      else {
        // if there are no moves to suggest, swift to easy mode
        console.log('moving to easy mode');
        aiLevel = 'easy';
        return createMove();
      };
    }         // aiLevel hard
  };       // close createMove
 // a timer to delay the time the computer takes to select a sqaure
 window.aI = function (){
   window.setTimeout(function () {
   var selection = createMove();
   $('td#' + selection).trigger( "click" );  // this clicks
   }, 500);
 };  // close aI

});  // end of code //
