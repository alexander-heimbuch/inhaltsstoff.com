import utterson from 'utterson';

const meta = {
	'posts/': {
		type: 'posts',
		indexed: false
	},
	'pages/': {
		type: 'pages',
		indexed: false
	},
	'statics/': {
		type: 'statics'
	}
};

utterson({
	content: meta,
	themesDir: 'server/',
	theme: 'rest',
	contentDir: 'content/',
	buildDir: 'build/data'
});
