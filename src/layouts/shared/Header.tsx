import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <Link href="/articles">
            <a>Articles</a>
          </Link>
        </li>
        <li>
          <Link href="/my/profile">
            <a>My Profile</a>
          </Link>
        </li>
        <li>
          <Link href="/my/login">
            <a>Login</a>
          </Link>
        </li>
      </ul>
    </header>
  );
};
