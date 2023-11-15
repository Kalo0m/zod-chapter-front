// synchronizing "ticket" state with local storage
const ticketData = JSON.parse(localStorage.get('ticket'))
//    ^? any 😱

// getting values from a form
// <form>
//   ...
//   <input type="date" name="workshop-date" />
//   ...
// </form>
const workshopDate = form.elements.namedItem('workshop-date')
//    ^? Element | RadioNodeList | null 😵

// fetching data from an API
const data = await fetch('/api/workshops').then(r => r.json())
//    ^? any 😭

// getting config and/or conventional params (like from Remix or React Router)
const { workshopId } = useParams()
//      ^? string | undefined 🥴

// reading/parsing a string from fs
const workshops = YAML.parse(await fs.readFile('./workshops.yml'))
//    ^? any 🤔

// reading from a database
const dbData = await SQL`select * from workshops`
//    ^? any 😬

// reading form data from a request
const description = formData.get('description')
//    ^? FormDataEntryValue | null 🧐
