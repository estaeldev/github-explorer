import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {GoOctoface} from 'react-icons/go'
import LayoutPane from 'components/layout';
import CardsLike from 'components/cardlike';
import { UserLocal } from 'types/user';
import styles from './styles.module.scss'


export default function HomePage() {
    const router = useRouter()
    const [username, setUsername] = useState<string>('')
    const [usersLike, setUsersLike] = useState<UserLocal[]>([])

    const onSubmit = (event: FormEvent): void => {
        event.preventDefault()
        router.push(`/usuario/${username}`)
    }

    useEffect(() => {
        const usersLikeLocal = localStorage.getItem('github-explorer-likes')
        if(usersLikeLocal){
            setUsersLike(JSON.parse(usersLikeLocal))
        }
    }, [])


    return (
        <LayoutPane>
            <div className={styles.home}>
                <GoOctoface size={80}/>
                <form onSubmit={onSubmit}>
                    <input 
                        className={styles.input}
                        type="text" 
                        placeholder="Digite o nome do usuário" 
                        onChange={event => setUsername(event.target.value)}
                    />
                </form>

                <ul className={styles.users}>
                    {usersLike.map(user => (
                        <CardsLike key={user.login} {...user} />
                    ))}
                </ul>

            </div>
        </LayoutPane>
    )
}
