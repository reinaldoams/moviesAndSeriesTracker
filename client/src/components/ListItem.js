import { useState } from "react"
const apiUrl = process.env.REACT_APP_BACKEND_URL

const ListItem = ({ item, type, setIsLoading }) => {
    const [percentage, setPercentage] = useState(item.percentage || 0)
    const [episode, setEpisode] = useState(item.episode || 1)
    const [season, setSeason] = useState(item.season || 1)

    const handleUpdate = async(id) => {
        console.log(`saving ${id}`)
        const fetched = await fetch(`http://${apiUrl}/api/${type}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, percentage, episode, season })
        })
        const data = await fetched.json()
        console.log(data)
        console.log(fetched)
    }

    const handleDelete = async (id) => {
        setIsLoading(true)
        console.log(`deleting ${id}`)
        const fetched = await fetch(`http://${apiUrl}/api/${type}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id})
        })
        const data = await fetched.json()
        console.log(data)
        setIsLoading(false)
    }



    return (
        <>
            <p>{item.name}</p>
            <div className="fields">
            {type === "movies" && <><span>Percentage:</span> <input value={percentage} onChange={(e) => setPercentage(e.target.value)} /></>}
            {type === "series" && <><span>Episode:</span><input value={episode} onChange={(e) => setEpisode(e.target.value)} /></>}
            {type === "series" && <><span>Season:</span><input value={season} onChange={(e) => setSeason(e.target.value)} /></>}
            </div>
            <button onClick={() => handleUpdate(item._id)}>Save</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
        </>
    )
}

export default ListItem