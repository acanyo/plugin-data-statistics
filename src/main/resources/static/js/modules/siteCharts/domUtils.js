export function createSection(container, title, subtitle) {
    const section = document.createElement('section');
    section.className = 'xhhaocom-chartboard-section';

    const header = document.createElement('header');
    header.className = 'xhhaocom-chartboard-section__header';
    header.innerHTML = `
        <div class="xhhaocom-chartboard-section__title">${title}</div>
        ${subtitle ? `<div class="xhhaocom-chartboard-section__subtitle">${subtitle}</div>` : ''}
    `;
    section.appendChild(header);

    const body = document.createElement('div');
    body.className = 'xhhaocom-chartboard-section__body';
    section.appendChild(body);

    container.appendChild(section);
    return body;
}

export function buildCanvasCard(body, hint) {
    const card = document.createElement('div');
    card.className = 'xhhaocom-chartboard-card';

    const canvasWrapper = document.createElement('div');
    canvasWrapper.className = 'xhhaocom-chartboard-card__canvas';
    const canvas = document.createElement('canvas');
    canvasWrapper.appendChild(canvas);

    card.appendChild(canvasWrapper);

    if (hint) {
        const footer = document.createElement('footer');
        footer.className = 'xhhaocom-chartboard-card__footer';
        footer.textContent = hint;
        card.appendChild(footer);
    }

    body.appendChild(card);
    return canvas;
}
