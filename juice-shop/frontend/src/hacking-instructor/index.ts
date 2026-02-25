function loadHint(hint: ChallengeHint): HTMLElement {
  const target = document.querySelector(hint.fixture);

  if (!target) {
    return null as unknown as HTMLElement;
  }

  const wrapper = createElement('div', { position: 'absolute' });

  const elemStyles = {
    position: 'absolute',
    zIndex: '20000',
    backgroundColor: 'rgba(50, 115, 220, 0.9)',
    maxWidth: '400px',
    minWidth: hint.text.length > 100 ? '350px' : '250px',
    padding: '16px',
    borderRadius: '8px',
    whiteSpace: 'initial',
    lineHeight: '1.3',
    top: '24px',
    fontFamily: 'Roboto,Helvetica Neue,sans-serif',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    cursor: hint.unskippable ? 'default' : 'pointer',
    animation: 'flash 0.2s'
  };

  const elem = createElement('div', elemStyles, { id: 'hacking-instructor', title: hint.unskippable ? '' : 'Double-click to skip' });

  const pictureStyles = {
    minWidth: '64px',
    minHeight: '64px',
    width: '64px',
    height: '64px',
    marginRight: '8px'
  };

  const picture = createElement('img', pictureStyles, { src: '/assets/public/images/hackingInstructor.png' });

  const textBox = createElement('span', { flexGrow: '2' });
  textBox.innerHTML = snarkdown(hint.text); // FIX: Ensure that hint.text is sanitized before being set as innerHTML.

  const cancelButtonStyles = {
    textDecoration: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: 'large',
    position: 'relative',
    zIndex: '20001',
    top: '32px',
    left: '5px',
    cursor: 'pointer'
  };

  const cancelButton = createElement('button', cancelButtonStyles, { id: 'cancelButton', title: 'Cancel the tutorial' });
  cancelButton.innerHTML = '&lt;div>&times;&lt;/div>';

  elem.appendChild(picture);
  elem.appendChild(textBox);

  const relAnchor = createElement('div', { position: 'relative', display: 'inline' });
  relAnchor.appendChild(elem);
  relAnchor.appendChild(cancelButton);

  wrapper.appendChild(relAnchor);

  if (hint.fixtureAfter) {
    target.parentElement.insertBefore(wrapper, target.nextSibling);
  } else {
    target.parentElement.insertBefore(wrapper, target);
  }

  return wrapper;
}
