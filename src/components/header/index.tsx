import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'


export default function Header() {

    const {data} = useSession()
    const route = useRouter()

    if(!data?.user) {
        return (
            <div className={styles.home}>
                <strong onClick={() => route.push('/')}>HOME</strong>
                <strong onClick={() => route.push('/login')}>LOGIN</strong>
            </div>
        )
    }

    return (
        <header className={styles.header}>
            <div className={styles.user}>
                <div className={styles.user__avatar}>
                    <Image 
                        onClick={() => route.push('/')}
                        src={data.user.image as string} 
                        width={50} 
                        height={50} 
                        alt={'Imagem de avatar do usuário.'}
                    />
                </div>
                <div className={styles.user__info}>
                    <strong>{data.user.name}</strong>
                    <span>{data.user.email}</span>  
                </div>
            </div>

            <button 
                className={styles.signOut}
                type='button' 
                onClick={() => signOut()}>
                Sair
            </button>

        </header>
    )
}