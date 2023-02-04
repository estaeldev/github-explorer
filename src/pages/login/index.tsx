import { GetServerSideProps } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GoOctoface } from "react-icons/go";
import styles from './styles.module.scss'

export default function LoginPage(){

    const {data} = useSession()
    const route = useRouter()

    if(!data?.user) {
        return (
            <div className={styles.container}>

                <div className={styles.home}>
                    <strong onClick={() => route.push('/')}>HOME</strong>
                </div>
            
                <div className={styles.content}>
                    <button onClick={() => signIn()}>
                        <GoOctoface />
                        Entrar
                    </button>
                </div>

            </div>
        )
    }

}

export const getServerSideProps: GetServerSideProps = async ({req}) => {

    const session = await getSession({req})

    if(session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {props: {}}


}
