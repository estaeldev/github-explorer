import type { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import {GoOctoface} from 'react-icons/go'
import styles from 'styles/home.module.scss'

const HomePage: NextPage = () => {
    const router = useRouter()
    const [username, setUsername] = useState<string>('')
    const onSubmit = (event: FormEvent): void => {
        event.preventDefault()
        router.push(`/usuario/${username}`)
    }

    return (
        <div className={styles.container}>
            <GoOctoface size={80}/>
            <form onSubmit={onSubmit}>
                <input 
                    className={styles.input}
                    type="text" 
                    placeholder="Digite o nome do usuário" 
                    onChange={event => setUsername(event.target.value)}
                />
            </form>
        </div>
    )
}

export default HomePage
