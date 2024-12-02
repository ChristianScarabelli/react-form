import style from './Card.module.css'
import placeHolderImage from '../../assets/Img/600x400_placeholder.jpg'
import Button from '../ui/Button/Button.jsx'
import Tags from '../Tags/Tags.jsx'


export default function Card({ title = '', image, content = '', tags = [] }) {

    return (
        <>
            <div className="container">
                <div className={style.card}>
                    <figure className={style.image}>
                        <img className={style.thumb} src={image || placeHolderImage} alt={title} />
                    </figure>
                    <div className={style.body}>
                        <h3 className={style.title}>{title}</h3>
                        < Tags tags={tags} />
                        <p className={style.description}>{content}</p>
                        <Button />
                    </div>
                </div>
            </div>
        </>
    )
}