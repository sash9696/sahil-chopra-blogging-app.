import React from "react";
import { PostProps } from "@/components/Post";
import Layout from "@/components/Layout";
import ReactMarkdown from "react-markdown";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";

export const getServerSideProps: GetServerSideProps<any> = async ({
	params,
}) => {
	const post = await prisma.post.findUnique({
		where: {
			id: String(params?.id),
		},
		include: {
			author: {
				select: { name: true },
			},
		},
	});
	return {
		props: post,
	};
};

const Post: React.FC<PostProps> = (props) => {
	// console.log("props", props);
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
