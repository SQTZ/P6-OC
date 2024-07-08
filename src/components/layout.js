import logo from "../logo.png";

function Layout() {
    return (
        <div>
            <header>
                <a href="/"><img src={logo} class="logo" alt="fisheye logo" /></a>
                <h1>Nos photographes</h1>
            </header>
        </div>
    );
}

export default Layout;