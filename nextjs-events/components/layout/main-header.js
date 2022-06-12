import Link from 'next/link'
import classes from './main-header.module.css'

const MainHeader = () => {
  return (
    <header className={classes.header}>
        <div className={classes.logo}>
            <Link href="/">Java Events</Link>
        </div>
        <ul className={classes.navigation}>
            <li>
                <Link href="/events">Browse All Events</Link>
            </li>
        </ul>
    </header>
  )
}

export default MainHeader