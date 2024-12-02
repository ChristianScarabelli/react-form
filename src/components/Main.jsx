import Card from './Card/Card.jsx'
import { posts } from '../data/posts.js'
import Tags from './Tags/Tags.jsx'

export default function Main() {
    const uniqueTags = [];
    for (const post of posts) { // per ogni post dell'array di oggetti posts
        for (const tag of post.tags) { // per ogni array di tags di ogni post
            if (!uniqueTags.includes(tag)) {
                uniqueTags.push(tag); // se il tag se non è già presente lo pusho
            }
        }
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