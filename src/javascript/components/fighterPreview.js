import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });
    
    // todo: show fighter info (image, name, health, etc.)
    const dataElement = createElement({
        tagName: 'div',
    });

    for (let key in fighter) {
        if (key == 'source') {
            const fighterPreviewImage = createElement({
                tagName: 'img',
                className: 'fighter-preview___img',
                attributes: {
                    src: fighter[key],
                },
            });
            fighterPreviewImage.style.height = '300px';
            fighterElement.append(fighterPreviewImage);
        } else if (key != 'source' && key != '_id') {
            const elem = createElement({
                tagName: 'div',
                className: 'arena___fighter-name',
            })
            elem.innerText = `${key}: ${fighter[key]}`;
            dataElement.append(elem);
        }
    }
    fighterElement.append(dataElement);
    
    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
