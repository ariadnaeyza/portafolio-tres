'use strict';

(function () {
    var words = ['FRONT-END DEVELOPER'],
        text = document.getElementById('text'),
        count = 0;

    function displayWord(word) {
        var charCount = 0,
            charInterval = setInterval(function () {

                text.textContent += word[charCount];

                charCount++;

                if (charCount >= word.length) {

                    if (count < words.length) {
                        setTimeout(function () {
                            deleteWord(word);
                        }, 300);
                    }
                    clearInterval(charInterval);
                }
            }, 150);
    }

    function deleteWord() {
        var deleteCount = text.textContent.length,
            deleteInterval = setInterval(function () {

                text.textContent = text.textContent.slice(0, -1);

                deleteCount--;

                if (deleteCount <= 0) {
                    clearInterval(deleteInterval);
                }
            }, 150);
    }

    setTimeout(function () {
        displayInterval = setInterval(function () {
            displayWord(words[count]);

            count++;

            if (count >= word.length) {
                clearInterval(charInterval);
            }
        }, 1500);
    }, 2750);

    function init() {
        displayWord(words[count]);
        count++;
    }

    init();
})();
