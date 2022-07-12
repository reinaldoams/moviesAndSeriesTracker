import { useState } from "react"
import ListItem from "./ListItem"

const List = ({ data, type, setIsLoading }) => {

    return (<div className="List">
        <ul>
            {data && data && data.map(item => {
                return (
                    <li key={item._id}>
                        <ListItem setIsLoading={setIsLoading} item={item} type={type} />
                    </li>
                )
            })}
        </ul>
    </div>)
}

export default List