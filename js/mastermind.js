function mastermind(spec) {
    const BLACK = 1;
    const WHITE = 2;

    const COLORS = spec.colors.split('');
    const CODE_LENGTH = spec.codeLength;
    const MAX_USAGE = spec.maxUsage;
    const BLANKS = spec.blanks;

    // Generate code - color sequence to guess
    var code = (function() {
        var code = [];
        var index, randomColorIndex, usages = COLORS.map(function(item, index) {
            return {colorIndex : index, usages : MAX_USAGE};
        });

        for (index = 0; index < CODE_LENGTH; index++) {
            randomColorIndex = Math.floor(Math.random() * 100) % usages.length;
            code.push(usages[randomColorIndex].colorIndex);

            usages[randomColorIndex].usages -= 1;
            if (usages[randomColorIndex].usages === 0) {
                usages.splice(randomColorIndex, 1);
            }
        }

        return code;
    })();

    var game = {};
    game.getCode = function() {
        return code.reduce(function(code, item) {
            return code + COLORS[item];
        }, '');
    };
    game.evaluate = function(guess) {
        var guessColorIndices = guess.split('').map(function(guess) {
            return COLORS.findIndex(function(color) {
                return color === guess;
            });
        });

        return code.map(function(item) {
            return {code : item, used : false};
        }).reduce(function(hints, item, index) {
            if (item.code === guessColorIndices[index]) {
                hints.push(BLACK);
                item.used = true;
            } else if (!item.used && guessColorIndices.includes(item.code)) {
                hints.push(WHITE);
                item.used = true;
            }
            return hints;
        }, []);
    };
    return game;
}