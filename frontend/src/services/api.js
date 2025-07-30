export async function envoyerReponses(data) {
  const response = await fetch('http://localhost:5088/api/soumettre', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response.json();
}

