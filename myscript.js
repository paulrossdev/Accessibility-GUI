// Function for the "alt-text" page
function applyAltTextChanges() {
    var htmlInput = document.getElementById('html-input').value;
    var elementId = document.getElementById('element-id').value;
    var altText = document.getElementById('alt-text').value;

    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlInput, 'text/html');
    var element = doc.getElementById(elementId);

    if (element) {
        var altElement = doc.createElement('p');
        altElement.innerText = altText;
        altElement.style.position = 'absolute';
        altElement.style.top = '-1000px';
        altElement.style.left = '-1000px';
        element.appendChild(altElement);

        document.getElementById('html-output').innerText = htmlInput;
        document.getElementById('render-output').innerHTML = htmlInput;

        var updatedHtml = element.outerHTML;
        document.getElementById('updated-html').innerText = updatedHtml;
        document.getElementById('rendered-updated-html').innerHTML = updatedHtml;
    } else {
        alert('Element with provided ID not found in the HTML.');
    }
}

// Function for the "table to flexbox" page
function convertTableToFlexbox() {
    var htmlInput = document.getElementById('table-html-input').value;
    var paddingSliderValue = document.getElementById('padding-slider').value;
    var marginSliderValue = document.getElementById('margin-slider').value;

    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlInput, 'text/html');
    var table = doc.querySelector('table');

    if (table) {
        var flexContainer = doc.createElement('div');
        flexContainer.style.display = 'flex';
        flexContainer.style.flexWrap = 'wrap';

        var tableRows = Array.from(table.rows);
        tableRows.forEach(function(row) {
            var flexRow = doc.createElement('div');
            flexRow.style.display = 'flex';
            flexRow.style.width = '100%';

            var tableCells = Array.from(row.cells);
            tableCells.forEach(function(cell) {
                var flexCell = doc.createElement('div');
                flexCell.style.flex = '1 0 auto';
                flexCell.style.padding = paddingSliderValue + 'px';
                flexCell.style.margin = marginSliderValue + 'px';
                flexCell.style.textAlign = 'center';
                flexCell.innerHTML = cell.innerHTML;
                flexRow.appendChild(flexCell);
            });

            flexContainer.appendChild(flexRow);
        });

        table.parentNode.replaceChild(flexContainer, table);

        var updatedHtml = doc.body.innerHTML;

        document.getElementById('table-html-output').innerText = htmlInput
        document.getElementById('table-render-output').innerHTML = htmlInput;
        document.getElementById('table-updated-html').innerText = updatedHtml;
        document.getElementById('table-rendered-updated-html').innerHTML = updatedHtml;
    } else {
        alert('Invalid input. Please enter a valid table.');
    }
}


function resetAltTextPage() {
    // Reset the textarea and output fields
    document.getElementById('html-input').value = '<div id="sample">This is a sample element.</div>';
    document.getElementById('html-output').innerText = '';
    document.getElementById('render-output').innerHTML = '';
    document.getElementById('updated-html').innerText = '';
    document.getElementById('rendered-updated-html').innerHTML = '';

    // Clear any error messages or styles
    var errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }

    // Scroll to the top of the page
    window.scrollTo(0, 0);
}
// Function to reset the page
function resetTableFlexbox() {
    document.getElementById('table-html-input').value = '';
    document.getElementById('table-html-output').innerText = '';
    document.getElementById('table-render-output').innerHTML = '';
    document.getElementById('table-updated-html').innerText = '';
    document.getElementById('table-rendered-updated-html').innerHTML = '';
}

// Attach the functions to the respective buttons on the page
window.onload = function() {
    document.getElementById('apply-changes-table-flexbox').onclick = convertTableToFlexbox;
    document.getElementById('reset-table-flexbox').onclick = resetTableFlexbox;
};

// Attach the resetPage function to the "Reset" button
document.getElementById('reset-page').onclick = resetAltTextPage;



// Attach the functions to the respective buttons on each page
window.onload = function() {
    document.getElementById('apply-changes-alt-text').onclick = applyAltTextChanges;
    document.getElementById('apply-changes-table-flexbox').onclick = convertTableToFlexbox;
};

