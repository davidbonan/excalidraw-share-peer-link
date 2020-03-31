import React from 'react';
import { render, screen, cleanup, wait, getByTestId } from '@testing-library/react/pure';

import Component, { generateLink } from '../src/';

const BUTTON_ID = 'excalidraw-share-peer-link';

describe('Component', () => {
  beforeEach(() => {
    window.crypto = {
      getRandomValues: (...args) => new Uint8Array(10),
    };
    window.crypto.subtle = {
      generateKey: data => 'string',
      exportKey: (...args) => ({ k: 'custom-encryption-key' }),
    };
  });

  it('render correctly', () => {
    render(<Component />);
    const Button = screen.getByTestId(BUTTON_ID);
    expect(Button.textContent).toEqual('Open whiteboard');
  });

  it('check label prop', async () => {
    await cleanScreen();
    render(<Component label="My label" />);
    const Button = screen.getByTestId(BUTTON_ID);
    expect(Button.textContent).toEqual('My label');
  });

  it('check link prop', async () => {
    await cleanScreen();
    render(<Component link="https://" />);
    const Button = screen.getByTestId(BUTTON_ID);
    expect(Button).toHaveAttribute('href', 'https://');
  });

  it('check link prop', async () => {
    await cleanScreen();
    render(<Component roomId="customId" encryptionKey="customKey" />);
    await wait();
    const Button = screen.getByTestId(BUTTON_ID);
    expect(Button).toHaveAttribute('href', 'https://excalidraw.com/#room=customId,customKey');
  });

  it('check generate link function', async () => {
    const link = await generateLink();
    expect(link).toEqual('https://excalidraw.com/#room=00000000000000000000,custom-encryption-key');
  });
});

async function cleanScreen() {
  cleanup();
  await wait();
}
