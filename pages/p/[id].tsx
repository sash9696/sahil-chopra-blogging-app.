import React from "react";
import { PostProps } from "@/components/Post";
import Layout from "@/components/Layout";
import ReactMarkdown from "react-markdown";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import Router from "next/router";
import { useSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps<any> = async ({
	params,
}) => {
	const post = await prisma.post.findUnique({
		where: {
			id: String(params?.id),
		},
		include: {
			author: {
				select: { name: true, email: true },
			},
		},
	});

	// const post = {}

	return {
		props: post,
	};
};

async function publishPost(id: string): Promise<void> {
	await fetch(`/api/publish/${id}`, {
		method: "PUT",
	});
	await Router.push("/");
}

async function deletePost(id: String): Promise<void> {
	await fetch(`/api/post/${id}`, {
		method: "DELETE",
	});
	Router.push("/");
}

const Post: React.FC<PostProps> = (props) => {
	console.log("props", props);
	const { data: session, status } = useSession();

	if (status == "loading") {
		return <div>Authenticating...</div>;
	}
	const userHasValidSession = Boolean(session);
	const postBelongsToUser = session?.user?.email === props.author?.email;

	let title = props.title;

	if (!props.published) {
		title = `${title} (Draft)`;
	}

	return (
		<Layout>
			<div>
				<h2>{title}</h2>
				<p>By {props?.author?.name || "Unknow Author"}</p>
				{/* eslint-disable-next-line react/no-children-prop */}
				<ReactMarkdown children={props?.content} />
				{!props.published &&
					userHasValidSession &&
					postBelongsToUser && (
						<button onClick={() => publishPost(props.id)}>
							Publish
						</button>
					)}

				{userHasValidSession && postBelongsToUser && (
					<button onClick={() => deletePost(props.id)}>Delete</button>
				)}
			</div>
			<style jsx>{`
				.page {
					background: white;
					padding: 2rem;
				}

				.actions {
					margin-top: 2rem;
				}

				button {
					background: #ececec;
					border: 0;
					border-radius: 0.125rem;
					padding: 1rem 2rem;
				}

				button + button {
					margin-left: 1rem;
				}
			`}</style>
		</Layout>
	);
};

export default Post;
