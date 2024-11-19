import React, { useState } from 'react'
import styles from '../CSS/search.module.css'

function SearchSection(props) {

    const [searchValue, setSearchValue] = useState("")

    const handleChange = (e)=>{
        setSearchValue(e.target.value)
    }


  return (
    <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
            <input type="text" onChange={handleChange} value={searchValue} placeholder='search movie title'/>
            <button onClick={()=>{props.handleText(searchValue)}}>Search</button>
        </div>
    </div>
  )
}

export default SearchSection