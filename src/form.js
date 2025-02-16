import { pipe, map, filter, identity, fromPairs } from "ramda"

export const formValues = pipe(
  map(({ name, value }) => (name && value ? [name, value] : false)),
  filter(identity),
  fromPairs,
)

export const handleForm = (e) => {
  e.preventDefault()
  return formValues(e.target.elements)
}
