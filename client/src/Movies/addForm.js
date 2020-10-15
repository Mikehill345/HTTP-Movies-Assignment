import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const initialValues = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}
const AddForm = ({ movieList, setMovieList }) => {
    const [formValues, setFormValues] = useState(initialValues)
    const history = useHistory()

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }


    const onSubmit = (e) => {
        e.preventDefault();
        const newMovie = {
            ...formValues,
            stars: formValues.stars.split(',')
        }
        axios
            .post(`http://localhost:5000/api/movies`, newMovie)
            .then((res) => {
                history.push('/')
            })
            .catch((err) => {
                console.log(err)
            });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    name='director'
                    value={formValues.director}
                    placeholder='director'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='metascore'
                    value={formValues.metascore}
                    placeholder='metascore'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='title'
                    value={formValues.title}
                    placeholder='Movie title'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='stars'
                    value={formValues.stars}
                    placeholder='Movie Stars'
                    onChange={handleChange}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddForm
