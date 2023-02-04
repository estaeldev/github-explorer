import Image from 'next/image'
import Link from 'next/link'
import { UserLocal } from 'types/user'
import styles from './styles.module.scss'

export default function CardsLike(user: UserLocal) {
    return (
        <li>
            <Link href={`/usuario/${user.login}`}>
                <div className={styles.user}>
                    <div className={styles.user__avatar}>
                        <Image src={user.avatar_url} width={50} height={50} alt='Imagem do usuario.' />
                    </div>
                    <strong>{user.name || user.login}</strong>
                </div>
            </Link>
        </li>
    )
}