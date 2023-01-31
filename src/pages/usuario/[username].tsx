import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { GoLinkExternal, GoLocation, GoOrganization, GoPerson, GoRepo } from 'react-icons/go';
import github from 'service/github';
import styles from './styles.module.scss'
import {User} from 'types/user'

const UserPage: NextPage<User> = (user) => {

    return (
        <div className={styles.container}>

            <div className={styles.card}>

                <div className={styles.card__content}>
                    <div className={styles.user__avatar}>
                        <Image src={user.avatar_url} width={30} height={30} alt='Imagem de avatar do usuário.'/>
                    </div>
                    <h1>{user.name || user.login}</h1>
                    <h2>{user.bio}</h2>
                    <p>
                        <GoLocation size={20}/>
                        {user.location || 'Via Lacte'}
                    </p>
                </div>

                <footer className={styles.card__footer}>
                    <ul>
                        <li title='Número de repositórios.'>
                            <GoRepo />
                            {user.public_repos}
                        </li>
                        <li title='Número de seguidores.'>
                            <GoOrganization />
                            {user.followers}
                        </li>
                        <li title='Número de usuários seguidos.'>
                            <GoPerson />
                            {user.following}
                        </li>
                    </ul>
                </footer>

                <div className={styles.card__links}>
                    <a href={user.html_url} target='_blank' rel="noreferrer">
                        <GoLinkExternal />
                        Mais detalhes
                    </a>
                    <Link legacyBehavior href={`/usuario/${user.login}/repositorios`}>
                        <a>
                            <GoRepo />
                            Repositórios
                        </a>
                    </Link>
                </div>

            </div>

        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const username = params?.username

    if(username) {
        const {data} = await github.get<User>(`users/${username}`)

        return {
            props: data
        }
    } 

    return {
        props: {}
    }
}

export default UserPage