
import Header from 'components/header'
import styles from  './styles.module.scss'

interface LayoutPaneProps {
    children: React.ReactNode
}

export default function LayoutPane({children}: LayoutPaneProps) {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.main}>
                {children}
            </div>
        </div>
    )
}