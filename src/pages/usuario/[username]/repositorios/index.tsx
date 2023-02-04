import LayoutPane from "components/layout";
import { GetServerSideProps, NextPage } from "next"
import { getSession } from "next-auth/react";
import { GoCalendar, GoLinkExternal, GoStar } from "react-icons/go";
import github from "service/github";
import { Repo } from "types/repo";
import styles from './styles.module.scss'

interface RepositoriosPageProps {
    repos: Repo[]
}

export default function RepositoriesPage({repos}: RepositoriosPageProps) {    

    return (
        <LayoutPane>

            <ul className={styles.repos}>
                {repos.map(repo => (
                    <li key={repo.id}>
                        <a 
                            className={styles.repo} 
                            href={repo.html_url} target="_blank" 
                            rel="noreferrer">
                            <div className={styles.repo__info}>
                                <strong>{repo.name}</strong>
                                <div>
                                    <time>
                                        <GoCalendar />
                                        {new Date(repo.created_at).toLocaleDateString()}
                                    </time>
                                    <span>
                                        <GoStar />
                                        {repo.stargazers_count}
                                    </span>
                                </div>
                            </div>
                            <GoLinkExternal />
                        </a>
                    </li>
                ))}
            </ul>
            
        </LayoutPane>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const session = await getSession({req})
    
    if(!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const username = params?.username
    
    if(username) {
        const {data} = await github.get<Repo[]>(`users/${username}/repos`)
        return {
            props: {repos: data.sort((repoA, repoB) => repoA.stargazers_count < repoB.stargazers_count ? 1 : -1)}
        } 
    }

    return {
        props: {}
    }
    
}

