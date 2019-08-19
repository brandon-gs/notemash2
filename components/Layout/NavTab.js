const NavTab = ({ title, id, ref }) => {
    return (
        <li className="nav-item">
            <a className="nav-link active"
                id={id}
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
            >
                {title}
            </a>
        </li>
    )
}

export default NavTab;