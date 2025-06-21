
export const WORDPRESS_API_URL = "http://realestate.local"; // local WordPress adresiniz

export const getProjects = async () => {
  const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/projects`);
  if (!response.ok) {
    throw new Error("Projeler alınamadı.");
  }
  return response.json();
};