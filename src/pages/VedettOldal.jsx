function VedettOldal({ children }) {
  const bejelentkezve = localStorage.getItem('bejelentkezve') === 'true'
  if (!bejelentkezve) return <Navigate to="/bejelentkezes" />
  return children
}