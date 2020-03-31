# Excalidraw share peer link

[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/excalidraw-share-peer-link

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/davidbonan/excalidraw-share-peer-link

Excalidraw share peer link is a lib for React 16+, he provide a simple `<a>` link and function for generate the href to open new tab of Excalidraw with peer session.

## Installation

#### npm
```bash
npm install --save excalidraw-share-peer-link
```

#### yarn
```bash
yarn add excalidraw-share-peer-link
```

## Usage

Just add the Widget component and generate the link with the generateLink function

```js
import React, { useState, useEffect } from 'react';
import ExcalidrawLink, { generateLink } from 'excalidraw-share-peer-link';

function App() {
  const [link, setLink] = useState('');

  useEffect(() => {
    generateLink().then(result => {
      setLink(result);
    })
  }, [])

  return (
      <div className="App">
        <ExcalidrawLink link={link} label="Go to whiteboard" />
      </div>
    );
}

export default App;
```

You can bypass the complete link generation and import generateRandomID and generateEncryptionKey and insert those in arguments of generateLink for custom id and key.