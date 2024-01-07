import Link from "next/link";

const UserDropDown = () => {
    return (
        <div className="float-right mx-3 h-auto d-flex  ">
            <div className="user-dropdown">
                <img className="icon-nav-img icon-nav" src="/images/profile.png" alt=""/>
                <div className="user-dropdown-content rounded-3 ">
                    <div className="mt-4 text-center ">
                        <img className="icon-nav-img" src="/images/profile.png" alt=""/>
                        <hr className="user-dropdown-divider  p-0"/>
                    </div>
                    <Link href="/profile" className="side-bar-item">
                        <span className="side-bar-item-caption">Profile</span>
                    </Link>
                    <a href="/api/user/login" className="side-bar-item">
                        <span className="side-bar-item-caption">Logout</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UserDropDown;