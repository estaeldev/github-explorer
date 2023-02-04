import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { GoHeart, GoLinkExternal, GoLocation, GoOrganization, GoPerson, GoRepo } from 'react-icons/go';
import LayoutPane from 'components/layout';
import github from 'service/github';
import {User, UserLocal} from 'types/user'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';

export default function UserPage(user: User) {

    const {status} = useSession()
    const [isLike, setIsLike] = useState<boolean>(false)
    const [usersLike, setUsersLike] = useState<UserLocal[]>([])

    const handlerLikeUser = () => {
        let updateUsersLike = [...usersLike]
        
        if(isLike) {
            updateUsersLike = updateUsersLike.filter(userLike => userLike.login != user.login)
        } else {
            updateUsersLike.push({
                login: user.login,
                name: user.name,
                avatar_url: user.avatar_url
            })
        }
        
        setIsLike(currentState => !currentState)
        setUsersLike(updateUsersLike)   
        localStorage.setItem('github-explorer-likes', JSON.stringify(updateUsersLike))
        
    }

    useEffect(() => {
        const usersLikeLocal = localStorage.getItem('github-explorer-likes')

        if(usersLikeLocal){
            const parseUsersLikeLocal: UserLocal[] = (JSON.parse(usersLikeLocal))
            if(parseUsersLikeLocal.find(userLike => userLike.login == user.login)) {
                setIsLike(true)
            }
            setUsersLike(parseUsersLikeLocal)
        }
    }, [])

    return (
        <LayoutPane>

            <div className={styles.card}>
                <button 
                    type='button'
                    className={styles.like}
                    onClick={handlerLikeUser}>
                    <GoHeart className={isLike ? styles.active : ''}/>
                </button>

                <div className={styles.card__content}>
                    <div className={styles.user__avatar}>
                        <Image src={user.avatar_url} width={150} height={150} alt='Imagem de avatar do usuário.'/>
                    </div>
                    <h1>{user.name || user.login}</h1>
                    <h2>{user.bio}</h2>
                    <p>
                        <GoLocation size={20}/>
                        {user.location || 'Via Lacte'}
                    </p>
                </div>

                <footer className={`${styles.card__footer} ${status == 'unauthenticated' ? styles.disable : ''}`}>
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
                </footer>

            </div>

        </LayoutPane>
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