import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

const UpdateForm = ({ movieList, setMovieList }) => {
    const [formValues, setFormValues] = useState()
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                setFormValues(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }
     
    const onSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, formValues)
        .then((res) => {
            setMovieList([...movieList, res.data])
            history.push(`/`)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    // const handleStarChange = (e) => {
    //     setFormValues({...formValues, stars:[...formValues.stars, formValues.stars[e.target.name]: e.target.value]})
    // }

    return (
        <div>
            {!formValues ? ('loading' ):(
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    name='director'
                    value={formValues.director}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='metascore'
                    value={formValues.metascore}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='title'
                    value={formValues.title}
                    onChange={handleChange}
                />
                <button>Submit</button>
                {/* {formValues.stars.map((star, index) => <input key={index} type='text' name={index} value={star} onChange={handleChange} />)} */}
            </form>
            )}
        </div>
    )
}

export default UpdateForm
