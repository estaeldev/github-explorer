import type { GetServerSideProps, NextPage } from 'next';
import { FormEvent, useState } from 'react';
import {GoOctoface} from 'react-icons/go'
import styles from 'styles/home.module.scss'
import github from 'service/github';


interface HomePageProps {
    name: string
}

const HomePage: NextPage<HomePageProps> = ({name}) => {
    
    const [username, setUsername] = useState<string>('')

    const loadData = async () => {
        const response = await github.get(`users/${username}`)
        console.log(response.data);
        
    }

    const onSubmit = (event: FormEvent): void => {
        event.preventDefault()
        loadData();
    }

    return (
        <div className={styles.container}>
            <GoOctoface size={80}/>
            <form onSubmit={onSubmit}>
                <input 
                    className={styles.input}
                    value={name}
                    type="text" 
                    placeholder="Digite o nome do usuário" 
                    onChange={event => setUsername(event.target.value)}
                />
            </form>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {    
    const {data} = await github.get(`users/estaeldev`)
    const name = data.login
        
    
    return {
        props: {
            name: name
        }
    }
}

export default HomePage
