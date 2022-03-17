import React from 'react'
import { InputGroup, FormControl  } from 'react-bootstrap'

const SearchFilter = ({ masterData }) => {
    const [ text, setText ] = React.useState(null)
    // filter stuff going on here
    return (
        <>
            <InputGroup className="mb-3" onChange={(e) => masterData(e.target.value)}>
                {/* <InputGroup.Text id="inputGroup-sizing-default">Default</InputGroup.Text> */}
                <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="ค้นหาด้วย ชื่อ หรือ อีเมล์"
                />
            </InputGroup>
        </>
    )
}

export default SearchFilter;