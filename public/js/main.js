// this is where the magic is happening
(function($) {
  var $playfield = $('#playfield');

  // setup heavy duty debugging
  if ($playfield.data('debugging') == true) {
    console.log('===== Debugging started =====');
    $(document).on('newRandomPatternGeneratorInstance', function(e, playfield, sizes) {
      console.log('+ new RandomGeneratorInstance created');
      console.log({
        playfield: playfield,
        maxWidth:  sizes.maxWidth,
        maxHeight: sizes.maxHeight
      });
    });
  }

  // this is where the magic is happening
  var tileHistory = new TileHistory($playfield);
  var tileDebugger = new TileDebugger();
  var randomPatternGenerator = new RandomPatternGenerator($playfield, tileHistory, tileDebugger);

  var randomizer = new Randomizer(randomPatternGenerator, 1);

  var alphabet = new Alphabet();
  var typeWriter = new TypeWriter($playfield, alphabet);
  var walker = new Walker($playfield, 150, randomPatternGenerator, tileHistory, tileDebugger, typeWriter);

  $(document).on('clearGrid', function() {
    walker.stop();
  });

  $('#playfield img.tile').mouseover(function(){
    randomPatternGenerator.replaceTile($(this));
  });

  // Keyboard shortcuts
  $('body').keyup(function(e) {
    switch(e.keyCode) {
      case 67: // C
        randomPatternGenerator.clear();
        break;

      case 82: // R
        randomizer.toggle();
        break;

      case 87: // W
        walker.toggle();
        break;

      case 72: // H
        tileHistory.toggle();
        break;

      case 68: // D
        tileDebugger.toggle();
        break;
    }
  });

  // Buttons
  $('footer li a').click(function() {
    switch($(this).data('action')) {
      case 'clear':
        randomPatternGenerator.clear();
        break;

      case 'randomize':
        randomizer.toggle();
        break;

      case 'walker':
        walker.toggle();
        break;

      case 'history':
        tileHistory.toggle();
        break;

      case 'debug':
        tileDebugger.toggle();
        break;
    }

    return false;
  });
})(jQuery);