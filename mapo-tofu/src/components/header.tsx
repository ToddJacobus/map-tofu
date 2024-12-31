import classes from '../mapo-tofu.module.css'

interface HeaderProps {

}

const Header = function (props: HeaderProps) {
    const {} = props;

    return (
        <div className={classes.header}>
            <h2>Mapo Tofu</h2>
        </div>
    )
}

export default Header;