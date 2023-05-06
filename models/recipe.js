module.exports = (mongoose) => {
	const Temple = mongoose.model(
		'recipe',
		new mongoose.Schema(
			{
				'@context': 'https://schema.org',
				'@type': 'Recipe',
				author: String,
				cookTime: String,
				datePublished: Date,
			},
			{timestamps: true},
		),
	)

	return Temple
}
