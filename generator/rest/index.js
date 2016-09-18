/* eslint-env node */

var fs = require('fs-extra'),
	  path = require('path');

function parseCategories(categories) {
	if (categories === undefined) {
		return [];
	}

	return categories.split(',').map(function (category) {
		return category.trim();
	});
}

module.exports = {
	post: function (data, cb) {
		data.href += '.json';
		data.categories = parseCategories(data.categories);

		cb(data.name + '.json', JSON.stringify(data));
	},
	page: function (data, cb) {
		data.href += '.json';
		cb(data.name + '.json', JSON.stringify(data));
	},
	custom: function (data, cb) {
		var posts = data.content['posts/'],
			pages = data.content['pages/'],
			postsIndex = [],
			pagesIndex = [];

		posts.files.forEach(function (file) {
			var post = posts[file];

			postsIndex.push({
				title: post.title,
				categories: post.categories,
				publish: post.publish,
				name: post.name,
				href: post.href
			});
		});

		fs.outputFileSync(path.resolve(data.buildDir, 'posts.json'), JSON.stringify(postsIndex));

		pages.files.forEach(function (file) {
			var page = pages[file];

			pagesIndex.push({
				title: page.title,
				name: page.name,
				href: page.href
			});
		});

		fs.outputFileSync(path.resolve(data.buildDir, 'pages.json'), JSON.stringify(pagesIndex));
	}
};
