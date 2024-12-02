import Card from './Card/Card.jsx'
import { posts } from '../data/posts.js'
import Tags from './Tags/Tags.jsx'
import { useState } from 'react'

export default function Main() {
    const uniqueTags = []
    for (const post of posts) { // per ogni post dell'array di oggetti posts
        for (const tag of post.tags) { // per ogni array di tags di ogni post
            if (!uniqueTags.includes(tag)) {
                uniqueTags.push(tag) // se il tag se non è già presente lo pusho
            }
        }
    }

    const [post, setPost] = useState(posts)  // variabile di stato per aggiungere un nuovo post all'array originale
    const [title, setTitle] = useState('')  // variabile per aggiungere il titolo del nuovo post
    const [author, setAuthor] = useState('')  // variabile per aggiungere il nome dell'autore
    const [workState, setWorkState] = useState('')  // variabile per inserire lo stato di completamento dell'articolo

    // funzione per aggiungere il nuovo post (con le variabili di stato)
    function addNewPost(event) {        // disattivo la pagina che si aggiorna da sola
        event.preventDefault()

        function controlData(...data) {    // funzione per validare un minimo i dati del form
            data.forEach(d => d.trim().replace('.', ''))
        }
        controlData(title, author, workState)

        if (title === '' || author === '' || workState === '') return

        const newPost = {       // nuovo oggetto post
            id: Date.now(),
            title: title,
            author: author,
            image: undefined,
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.',
            tags: [],
            published: workState,
        }

        setPost([...posts, newPost])     // aggiorno la variabile di stato con l'array originale e il nuovo post
        setTitle('')        // svuoto i campi dopo il submit
        setAuthor('')
        setWorkState('')
    }


    const publishedPosts = posts.filter((post) => post.published === true) // meglio fare con filter, per fare poi meno iterazioni dopo
    return (
        <>
            <main>
                <section className='posts_section'>
                    <div className='container'>
                        <h1 className='page-title'>Il mio blog</h1>
                        <div className='tags_stripe'>
                            < Tags tags={uniqueTags} />
                        </div>
                        <form onSubmit={addNewPost} action="">
                            <input type="text" onChange={(event) => setTitle(event.target.value)} placeholder='Titolo' value={title} />
                            <input type="text" onChange={(event) => setAuthor(event.target.value)} placeholder='Nome' value={author} />
                            <input type="text" onChange={(event) => setWorkState(event.target.value)} placeholder='Stato pubblicazione' value={workState} />
                            <input type="submit" value='aggiungi' />
                        </form>
                    </div>
                    <div className='container'>
                        {publishedPosts.length ? ( // Se ci sono post
                            <div className="row">
                                {publishedPosts.map((post) =>
                                    <div key={post.id} className="col-6">
                                        <Card
                                            image={post.image}
                                            title={post.title}
                                            tags={post.tags}
                                            content={post.content}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p>No posts available</p> // Se l'array `posts` è vuoto
                        )}
                    </div>
                </section>
            </main>
        </>
    )
}