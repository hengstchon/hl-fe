const API_BASE = 'http://localhost:5001'

export const getDst = async () => {
  const res = await fetch(`${API_BASE}/get_dst`)
  const data = res.json()
  return data
}

export const getSrc = async () => {
  const res = await fetch(`${API_BASE}/get_src`)
  const data = res.json()
  return data
}

export const getSrcDetails = async src => {
  const res = await fetch(`${API_BASE}/get_src/${src}`)
  const data = res.json()
  return data
}
