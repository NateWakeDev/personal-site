import { useEffect } from 'react';

export default function Loader() {
  useEffect(() => {
    async function getLoader() {
      const { ring2 } = await import('ldrs'); // Adjust based on your loader (e.g., spiral, orbit)
      orbit.register(); // Register the loader
    }
    getLoader();
  }, []);
  
  return <l-ring2 size="35" speed="1.5" color="black"></l-ring2>; // Use the loader component
}