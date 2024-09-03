//src/app/components/Loader.js
import { useEffect } from 'react';

export default function Loader() {
  useEffect(() => {
    async function getLoader() {
      const { ring2 } = await import('ldrs');
      ring2.register(); // Register the loader web component
    }
    getLoader();
  }, []);

  return <l-ring2 size="35" speed="1.5" color="black"></l-ring2>; // Render as a web component, not inside Canvas
}