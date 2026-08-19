$(document).ready(function () {
    $('.res-link').attr('target', '_blank');
    // $('.res-link').eq(2).attr('target', '_blank');
    $('.authors a').attr('target', '_blank');
    $('h1 a').attr('target', '_blank');
    $('h2 a').attr('target', '_blank');

    $('.section.citation').each(function () {
        var citation = $(this);
        var bibtex = citation.find('.bibtex pre').first();
        var bibtexBox = bibtex.parent();

        if (!bibtex.length || citation.find('.citation-copy-button').length) {
            return;
        }

        var button = $('<button>', {
            'class': 'citation-copy-button',
            type: 'button',
            'html': '<span class="citation-copy-icon" aria-hidden="true"></span><span class="citation-copy-label">Copy</span>',
            'aria-label': 'Copy citation to clipboard'
        });
        var buttonLabel = button.find('.citation-copy-label');

        bibtexBox.append(button);

        button.on('click', function () {
            var citationText = bibtex.text().trim();
            var fallbackCopy = function () {
                var textarea = $('<textarea>').val(citationText).appendTo('body');
                textarea.css({ position: 'fixed', opacity: 0 });
                textarea[0].select();
                var copied = document.execCommand('copy');
                textarea.remove();
                return copied;
            };
            var showResult = function (copied) {
                buttonLabel.text(copied ? 'Copied' : 'Copy failed');
                window.setTimeout(function () {
                    buttonLabel.text('Copy');
                }, 1800);
            };

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(citationText).then(function () {
                    showResult(true);
                }, function () {
                    showResult(fallbackCopy());
                });
            } else {
                showResult(fallbackCopy());
            }
        });
    });
});
