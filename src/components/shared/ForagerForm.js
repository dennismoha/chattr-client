import React from 'react'
import { Link } from 'react-router-dom'

const ForagerForm = ({ forager, remaining, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Name</label>
    <input
      placeholder="A Superb Forager"
      value={forager.name}
      name="name"
      onChange={handleChange}
    />

    <label>Description</label>
    <input
      placeholder="John Doe"
      value={forager.description}
      name="description"
      onChange={handleChange}
    />

    <label>Hp</label>
    <input
      type="number"
      placeholder="00"
      value={forager.hp}
      name="hp"
      onChange={handleChange}
    />

    <label>Mp</label>
    <input
      type="number"
      placeholder="00"
      value={forager.mp}
      name="mp"
      onChange={handleChange}
    />

    <label>Str</label>
    <input
      type="number"
      placeholder="00"
      value={forager.str}
      name="str"
      onChange={handleChange}
    />

    <p>Remaining Stats Points: {remaining}</p>

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default ForagerForm
