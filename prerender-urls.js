const { generateFileList } = require('./src/crawler');
const { join } = require('path');
const fs = require('fs');
const parseMD = require('parse-md').default;

const [friends] = generateFileList(join(__dirname, 'content')).nodes;
module.exports = () => {
	const pages = [
		{
			url: '/',
			data: friends.edges.map(friend => {
				let data;
				if (friend.format === 'md') {
					const { content } = parseMD(fs.readFileSync(join('content', 'friend', friend.id), 'utf-8'));
					data = content;
				} else {
					data = fs.readFileSync(join('content', 'blog', friend.id), 'utf-8').replace(/---(.*(\r)?\n)*---/, '');
				}
				return  {
						details: friend.details,
						content: data
					};
			}),
			seo: {
				cover: '/assets/profile.jpg'
			},
		},
		{ url: '/contact/' },
		{ url: '/contact/success' }
	];

	// adding blogs list posts page
	// pages.push({
	// 	url: '/blogs/',
	// 	data: blogs
	// });

	// adding all blog pages
	// pages.push(...blogs.edges.map(blog => {
	// 	let data;
	// 	if (blog.format === 'md') {
	// 		const { content } = parseMD(fs.readFileSync(join('content', 'blog', blog.id), 'utf-8'));
	// 		data = content;
	// 	} else {
	// 		data = fs.readFileSync(join('content', 'blog', blog.id), 'utf-8').replace(/---(.*(\r)?\n)*---/, '');
	// 	}
	// 	return {
	// 		url: `/blog/${blog.id}`,
	// 		seo: blog.details,
	// 		data: {
	// 			details: blog.details,
	// 			content: data
	// 		}
	// 	};
	// }));

	return pages;
};
