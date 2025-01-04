import classes from '../mapo-tofu.module.css'

interface HeaderProps {

}

function Header(props: HeaderProps) {
    const {} = props;

    return (
        <div className={classes.header}>
            <h2>Mapo Tofu</h2>
        </div>
    )
}

export default Header;