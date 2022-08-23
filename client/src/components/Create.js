import { useState } from "react"
const apiUrl = process.env.REACT_APP_BACKEND_URL

const Create = ({setIsLoading}) => {
    const [selected, setSelected] = useState(null)
    const [mediaName, setMediaName] = useState('')

    const handleSeriesClick = () => setSelected('Series')
    const handleMovieClick = () => setSelected('Movie')

    const handleChange = e => {
        setMediaName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const endpoint = selected === 'Series' ? 'series' : 'movies'
        await fetch(`http://${apiUrl}/api/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: mediaName })
        })
        setMediaName('')
        setSelected(null)
        setIsLoading(false)
    }

    const handleFormCancel = e => {
        e.preventDefault()
        setSelected(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            {!selected && <button onClick={handleSeriesClick}>Add Series</button>}
            {!selected && <button onClick={handleMovieClick}>Add Movie</button>}
            {selected && <input autoFocus placeholder={`Insert ${selected} Name Here`} value={mediaName} onChange={e => handleChange(e)}></input>}
            {selected && <button>Add</button>}
            {selected && <button id="formCancelBtn" onClick={handleFormCancel}>Cancel</button>}
        </form>
    )
}

export default Create