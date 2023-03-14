import {signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Header: React.FC = () => {
	const router = useRouter();
	const isActive: (pathname: string) => boolean = (pathname) =>
		router.pathname === pathname;

	const { data: session, status } = useSession();

	let left = (
		<div className="left">
			<Link href="/">
				<p className="bold" data-active={isActive("/")}>
					Feed
				</p>
			</Link>
			<style jsx>{`
				.bold {
					font-weight: bold;
				}

				p {
					text-decoration: none;
					color: #000;
					display: inline-block;
				}

				.left p[data-active="true"] {
					color: gray;
				}

				p + p {
					margin-left: 1rem;
				}
			`}</style>
		</div>
	);

	let right = null;

	if (status === "loading") {
		left = (
			<div className="left">
				<Link href="/">
					<p className="bold" data-active={isActive("/")}>
						Feed
					</p>
				</Link>
				<style jsx>{`
					.bold {
						font-weight: bold;
					}

					p {
						text-decoration: none;
						color: var(--geist-foreground);
						display: inline-block;
					}

					.left p[data-active="true"] {
						color: gray;
					}

					p + p {
						margin-left: 1rem;
					}
				`}</style>
			</div>
		);
		right = (
			<div className="right">
			  <p>Validating session ...</p>
			  <style jsx>{`
				.right {
				  margin-left: auto;
				}
			  `}</style>
			</div>
		  );
	}

	if (!session) {
		right = (
		  <div className="right">
			<Link href="/api/auth/signin">
			  <p data-active={isActive('/signup')}>Log in</p>
			</Link>
			<style jsx>{`
			  p {
				text-decoration: none;
				color: var(--geist-foreground);
				display: inline-block;
			  }
	
			  p + p{
				margin-left: 1rem;
			  }
	
			  .right {
				margin-left: auto;
			  }
	
			  .right p {
				border: 1px solid var(--geist-foreground);
				padding: 0.5rem 1rem;
				border-radius: 3px;
			  }
			`}</style>
		  </div>
		);
	  }

	  if (session) {
		left = (
		  <div className="left">
			<Link href="/">
			  <p className="bold" data-active={isActive('/')}>
				Feed
			  </p>
			</Link>
			<Link href="/drafts">
			  <p data-active={isActive('/drafts')}>My drafts</p>
			</Link>
			<style jsx>{`
			  .bold {
				font-weight: bold;
			  }
	
			  p {
				text-decoration: none;
				color: var(--geist-foreground);
				display: inline-block;
				margin-left: 10px;
			  }
	
			  .left p[data-active='true'] {
				color: gray;
			  }
	
			  p + p {
				margin-left: 1rem;
			  }
			`}</style>
		  </div>
		);
		right = (
		  <div className="right">
			<p>
			  {session && session?.user?.name} {session && session?.user?.email}
			</p>
			<Link href="/create">
			  <button>
				<p>New post</p>
			  </button>
			</Link>
			<button onClick={() => signOut()}>
			  <p>Log out</p>
			</button>
			<style jsx>{`
			  p {
				text-decoration: none;
				color: var(--geist-foreground);
				display: inline-block;
			  }
	
			  p {
				display: inline-block;
				font-size: 13px;
				padding-right: 1rem;
			  }
	
			  p + p {
				margin-left: 1rem;
			  }
	
			  .right {
				margin-left: auto;
			  }
	
			  .right p {
				border: 1px solid var(--geist-foreground);
				padding: 0.5rem 1rem;
				border-radius: 3px;
			  }
			  button {
				border: none;
			  }
			`}</style>
		  </div>
		);
	  }

	return (
		<nav>
			{left}
			{right}
			<style jsx>{`
				nav {
					display: flex;
					padding: 2rem;
					align-items: center;
				}
			`}</style>
		</nav>
	);
};

export default Header;
