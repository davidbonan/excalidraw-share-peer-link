import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ExcalidrawSharePeerLink = ({
  /**
   * Button label
   */
  label = 'Open whiteboard',
  /**
   * Complete link to Excalidraw, custom or created by function generateLink
   */
  link,
  /**
   * Custom room id if you don't pass by function generateLink
   */
  roomId,
  /**
   * Custom encryption key if you don't pass by function generateLink
   */
  encryptionKey,
  ...props
}) => {
  const [href, setHref] = useState('');
  
  useEffect(() => {    
    if (link) {
      setHref(link);
    } else {
      generateLink(roomId, encryptionKey).then(result => {
        setHref(result);
      });
    }
  }, [link, roomId, encryptionKey]);
  return (
    <a target="_blank" data-testid="excalidraw-share-peer-link" href={href} {...props}>
      {label}
    </a>
  );
};
ExcalidrawSharePeerLink.propTypes = {
  label: PropTypes.string,
  link: PropTypes.string,
  roomId: PropTypes.string,
  encryptionKey: PropTypes.string,
};
export default ExcalidrawSharePeerLink;

/**
 * Generate complete link to excalidraw
 *
 * @param {string} pId optional - identifier of room
 * @param {string} pKey optional - encryption key for session
 */
export async function generateLink(pId, pKey) {
  const id = pId || (await generateRandomID());
  const key = pKey || (await generateEncryptionKey());
  return `https://excalidraw.com/#room=${id},${key}`;
}

/**
 * Generate encryption key
 */
export async function generateEncryptionKey() {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 128,
    },
    true, // extractable
    ['encrypt', 'decrypt']
  );
  return (await window.crypto.subtle.exportKey('jwk', key)).k;
}

/**
 * Generate random id used for room id
 */
export function generateRandomID() {
  const arr = new Uint8Array(10);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, byteToHex).join('');
}

function byteToHex(byte) {
  return `0${byte.toString(16)}`.slice(-2);
}
