let selectedItem = null;
const lineContainer = document.getElementById('line-container');
const topRow = document.querySelector('.top-row');
const bottomRow = document.querySelector('.bottom-row');
const allImages = document.querySelectorAll('.game-container img');

allImages.forEach(img => {
    img.addEventListener('click', () => {
        if (img.classList.contains('matched')) {
            return; // જો પહેલાથી જ મેચ થયેલું હોય, તો કશું ન કરો.
        }

        if (selectedItem === null) {
            // પ્રથમ વસ્તુ પસંદ કરો
            selectedItem = img;
            img.classList.add('selected');
        } else {
            // બીજી વસ્તુ પસંદ કરો અને મેચ ચેક કરો
            const firstId = selectedItem.id;
            const secondId = img.id;
            const isMatch = selectedItem.dataset.match === secondId || img.dataset.match === firstId;
            
            if (isMatch) {
                // મેચ થયું! રેખા દોરો
                drawLine(selectedItem, img);
                selectedItem.classList.add('matched');
                img.classList.add('matched');
            }

            // પસંદગી રીસેટ કરો
            selectedItem.classList.remove('selected');
            selectedItem = null;
        }
    });
});

function drawLine(startElement, endElement) {
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();

    const startX = startRect.left + startRect.width / 2;
    const startY = startRect.top + startRect.height / 2;
    const endX = endRect.left + endRect.width / 2;
    const endY = endRect.top + endRect.height / 2;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', startX);
    line.setAttribute('y1', startY);
    line.setAttribute('x2', endX);
    line.setAttribute('y2', endY);
    lineContainer.appendChild(line);
}