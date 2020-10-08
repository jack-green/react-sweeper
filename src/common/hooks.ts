import React, { useEffect, useCallback } from 'react';

export const foo = 'bar'; // to prevent 'prefer default export'

export function useClickOutside(ref: React.RefObject<Node>, callback: Function) {
  const callbackWrapper = useCallback(() => {
    callback();
  }, [callback]);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref && ref.current && !ref.current.contains(event.target as Node)) {
        callbackWrapper();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callbackWrapper]);
}
